import assert from 'assert'
import { config_read, config_write } from './config'
import { git_deploy, git_selfhostnext } from './git'

const main = async () => {
  let [_node, _path, ...args] = process.argv

  let [command, ...command_args] = args

  let debug = process.env.DEBUG ?? ''
  debug = debug.split(',').includes('selfhost')

  console.log({
    command,
    command_args,
  })

  config_read()
  console.log(config_read())
  const { host, apikey } = config_read()

  if (command === 'host') {
    let [host] = command_args
    console.log(host)
  }

  if (command === 'login') {
    let [host, refresh] = command_args
    let pathname
    console.log('login', host)

    assert(host, 'Missing domain. Run `selfhostnext login <url>`')

    let origin = `https://${host}`
    if (!refresh) {
      let res = await fetch(`${origin}/api/apikey/create`, {
        method: 'POST',
      })
      assert(
        res.ok,
        `Could not create apikey. Ensure selfhostnext is setup on ${host}`
      )

      let data = await res.json()
      if (debug) console.log({ data })

      const { code } = data
      refresh = data.refresh
      pathname = data.pathname
      console.log(`Your code should read: ${code}`)
      console.log(`Please confirm on the following page:`)
      console.log()
      console.log(`${origin}${pathname}`)
    }

    if (debug) console.log('waiting 5 seconds...')
    if (!debug) await new Promise((r) => setTimeout(r, 1000 * 5))

    let apikey
    while (!apikey) {
      try {
        let url = `${origin}/api/apikey/create?refresh=${refresh}`
        if (debug) console.log(url)
        let res = await fetch(url)
        assert(res.ok)
        let data = await res.json()
        console.log({ data })
        apikey = data?.apikey
      } catch (error) {
        if (debug) console.error(error)
      }

      if (debug) console.log('waiting 5 seconds...')
      if (!apikey) await new Promise((r) => setTimeout(r, 1000 * 5))
    }

    config_write({ host, apikey })
    console.log(`${host} successfully configured.`)
    process.exit(0)
  }

  assert(host, 'Missing domain. Run `selfhostnext login <url>`')
  console.log('host configured')

  if (command === 'init') {
    let [name] = command_args
    try {
      assert(name)
    } catch (error) {
      console.log('Missing example. Run `selfhostnext init <name>`')
      console.log('where <name> is one of:')
      console.log(`demo`)
      console.log(`static`)
      process.exit(1)
    }

    await git_selfhostnext(name)
  }

  if (command === 'deploy') {
    let [name] = command_args

    if (!name) {
      let cwd = process.cwd()
      if (debug) console.log({ cwd })
      name = cwd.split('/').at(-1)
      if (debug) console.log({ name })
    }

    assert(name, 'Missing example. Run `selfhostnext deploy <name>`')

    let origin = `https://${host}`
    let res = await fetch(`${origin}/api/deploy`, {
      method: 'POST',
      headers: {
        'x-apikey': apikey,
      },
      body: JSON.stringify({
        origin,
        name,
      }),
    })

    assert(res.ok)
    let json = await res.json()
    if (debug) console.log({ json })
    const { owner, repo } = json

    await git_deploy(owner, repo)

    console.log('Success! Try adding a domain with `nextselfhost domain`')
    console.log()
    console.log(`https://github.com/${owner}/${repo}`)
    console.log()
    console.log(`https://${host}/${repo}`)

    process.exit(0)
  }
}

main()
