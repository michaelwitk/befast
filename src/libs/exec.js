import util from 'util'
import { exec as exec_raw } from 'child_process'

export const exec = util.promisify(exec_raw)
