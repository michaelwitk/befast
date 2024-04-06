import { exec_raw } from 'child_process'
const exec = util.promisify(exec_raw)

export const git_selfhostnext = async (name) => {
  await exec(
    `git clone --no-checkout https://github.com/michaelwitk/nextselfhost ${name}`
  )
  await exec(`cd ${name}`)
  await exec(`git config core.sparseCheckout true`)
  await exec(`echo "/examples/${name}/*" >> .git/info/sparse-checkout`)
  await exec(`git checkout main`)
}
