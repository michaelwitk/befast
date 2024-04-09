import assert from 'assert'
import { pathExists } from 'fs-extra'

import { exec } from './libs/exec'

export const git_clone_befast = async (name) => {
  assert(/^[a-z0-9-_]+$/.test(name), 'name can only include a-z0-9-_')

  assert(!(await pathExists(name)), 'clone destination already exists')
  assert(!(await pathExists('tmp')), 'tmp destination already exists')

  await exec(
    `git clone --no-checkout git@github.com:michaelwitk/befast.git ${name}`
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

export const git_deploy = async (name, repo) => {
  await exec(`git init`)
  await exec(`git add .`)
  await exec(`git commit -m "first commit"`)
  await exec(`git branch -M main`)
  await exec(`git remote add origin git@github.com:${name}/${repo}.git`)
  await exec(`git push -u origin main`)
}
