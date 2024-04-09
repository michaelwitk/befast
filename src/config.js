import { join } from 'path'

import XDGAppPaths from 'xdg-app-paths'
import fse from 'fs-extra'
const { readJSONSync, writeJSONSync, ensureFileSync } = fse

export const config_path_get = () => {
  const dirs = XDGAppPaths('com.befast.cli').dataDirs()
  return dirs[0]
}

export const config_read = () => {
  let path = join(config_path_get(), 'config.json')
  try {
    return readJSONSync(path)
  } catch (error) {
    if (error.code === 'ENOENT') {
      ensureFileSync(path)
      config_write({})
      return config_read()
    }

    throw error
  }
}

export const config_write = (data) => {
  let path = join(config_path_get(), 'config.json')
  return writeJSONSync(path, data)
}
