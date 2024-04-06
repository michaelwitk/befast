import assert from 'assert'
import util from 'util'
import { exec as exec_raw } from 'child_process'
import { pathExists } from 'fs-extra'

const exec = util.promisify(exec_raw)

export const git_selfhostnext = async (name) => {
  assert(/^[a-z0-9-_]+$/.test(name), 'name can only include a-z0-9-_')

  assert(!(await pathExists(name)), 'clone destination already exists')
  assert(!(await pathExists('tmp')), 'tmp destination already exists')

  await exec(
    `git clone --no-checkout git@github.com:michaelwitk/selfhostnext.git ${name}`
  )
  await exec(`cd ${name}`)
  await exec(`cd ${name} && git config core.sparseCheckout true`)
  await exec(
    `cd ${name} && echo "/examples/${name}/*" >> .git/info/sparse-checkout`
  )
  await exec(`cd ${name} && git checkout main`)

  await exec(`mv ${name}/examples/${name} tmp`)
  await exec(`rm -rf ${name}`)
  await exec(`mv tmp ${name}`)
}
