import assert from 'assert'
import { config_read, config_write } from './cli/config'
import { git_selfhostnext } from './git'

let [_node, _path, ...args] = process.argv

let [command, ...command_args] = args

let debug = true
// if (command_args.includes('--d') || command_args.includes('--debug'))
//   debug = true

console.log({
  command,
  command_args,
})

config_read()
console.log(config_read())
const { host } = config_read()

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

    refresh = data.refresh
    pathname = data.pathname
  }

  console.log(
    `Please visit the URL in your browser to confirm you are authorized. Will automatically grant access once completed.`
  )
  console.log(`${origin}${pathname}`)

  if (debug) console.log('waiting 5 seconds...')
  if (!debug) await new Promise((r) => setTimeout(r, 1000 * 5))

  let apikey
  while (!apikey) {
    let url = `${origin}/api/apikey/create?refresh=${refresh}`
    console.log(url)
    let res = await fetch(url)
    assert(
      res.ok,
      `Could not create apikey. Ensure selfhostnext is setup on ${host}`
    )
    let data = await res.json()
    console.log({ data })
    apikey = data?.apikey

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
    process.exit(1)
  }

  await git_selfhostnext(name)
}
