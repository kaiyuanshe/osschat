/**
 * VERSION
 */
import readPkgUp from 'read-pkg-up'

export {
  log,
}               from 'brolog'

const pkg = readPkgUp.sync({ cwd: __dirname })!.packageJson
export const VERSION = pkg.version

/**
 * Env Vars
 */
export const PORT = process.env.PORT || 8788
