import { readdir } from 'fs/promises'

export const docker_compose_up = async (up) => {
  let files = await readdir('compose')
  console.log(files)
  files = files.filter(
    (file) => file.endsWith('.yml') || file.endsWith('.yaml')
  )
  for (let _file of files) {
    console.log(_file)
    let file = `compose/${_file}`
    let file_env = `./.env`
    await docker_compose(file, file_env, up)
  }
}

export const docker_compose = async (file, file_env, up = 'up -d --wait') => {
  console.log({
    file,
    file_env,
    up,
  })
  return
  await exec(`docker compose -f ${file} --env-file ${file_env} ${up}`)
}
