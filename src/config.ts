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

export const BOT_ROOM_ID        = '18995691396@chatroom'  // ChatOps - Oss Bot
export const HEARTBEAT_ROOM_ID  = '17376996519@chatroom'  // 'ChatOps - Heartbeat'

export function debug () : boolean {
  return process.env.DEBUG === 'true'
}
