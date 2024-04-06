import { exec_raw } from 'child_process'
const exec = util.promisify(exec_raw)

export const git_selfhostnext = async (name) => {
  console.log('git clone')
  await exec(
    `git clone --no-checkout https://github.com/michaelwitk/nextselfhost ${name}`
  )
  console.log('cd')
  await exec(`cd ${name}`)
  console.log('git config')
  await exec(`git config core.sparseCheckout true`)
  console.log('echo')
  await exec(`echo "/examples/${name}/*" >> .git/info/sparse-checkout`)
  console.log('git checkout')
  await exec(`git checkout main`)
}
