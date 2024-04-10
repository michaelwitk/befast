import { ensureFile, readdir, readFile, writeFile } from 'fs-extra'

import { exec } from './libs/exec'
import chalk from 'chalk'

export const docker_version = async () => {
  let { stdout } = await exec(`docker version --format json`)
  stdout = JSON.parse(stdout)
  // stdout.Version
  return stdout
}

export const dotenv_example = async () => {
  await ensureFile(`./.env`)
  await ensureFile(`./.env.example`)

  let dotenv = await readFile(`./.env`, 'utf8')
  let split = dotenv.split('\n')

  let dotenv_example = await readFile(`./.env.example`, 'utf8')
  let missing = dotenv_example.split('\n')
  missing = missing.filter((line) => {
    const [key] = line.split('=')
    let found = split.some((line) => line.startsWith(`${key}=`))
    if (found) return

    return true
  })

  let prev = [...split]
  if (missing.length > 0)
    prev = [...prev, `# BeFast added missed variables:`, ...missing]

  prev = prev.join('\n')
  await writeFile(`./.env`, prev, 'utf8')
}

export const docker_compose_up = async (up) => {
  let files = await readdir('compose')
  files = files.filter(
    (file) => file.endsWith('.yml') || file.endsWith('.yaml')
  )
  for (let _file of files) {
    let file = `compose/${_file}`
    let file_env = `./.env`
    try {
      await docker_compose(file, file_env, up)
    } catch (error) {
      console.log(error)
      console.log(chalk.red.bold(`${_file}`))
      console.log(chalk.red(error.stderr))

      let port_solution = error.stderr.includes(
        'failed: port is already allocated'
      )
      if (port_solution) {
        console.log()
        console.log(
          chalk.gray(
            'Port already in use. Recommended action: shutdown the other process and try again'
          )
        )
        console.log(
          chalk.gray(
            `This is most likely because you didn't run ${chalk.cyan.bold(
              'befast down'
            )} on the last example.`
          )
        )
        console.log(
          chalk.gray(
            `Try to run ${chalk.cyan.bold('docker ps')} and ${chalk.cyan.bold(
              'docker stop [container_id]'
            )}`
          )
        )
      }
    }
  }
}

export const docker_network_create = async (name) => {
  try {
    await exec(`docker network create ${name}`)
  } catch (error) {
    if (
      error.stderr.startsWith(
        `Error response from daemon: network with name ${name} already exists`
      )
    )
      return

    throw error
  }
}

let default_docker_network = `befast-compose-shared`
export const docker_compose = async (file, file_env, up = 'up -d --wait') => {
  await docker_network_create(default_docker_network)

  await exec(`docker compose -f ${file} --env-file ${file_env} ${up}`)
}
