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
export const HEARTBEAT_ROOM_ID  = '17376996519@chatroom'  // ChatOps - Heartbeat
export const DEV_ROOM_ID        = '17591588552@chatroom'  // OSS-Bot Project Group

export function debug () : boolean {
  return process.env.DEBUG === 'true'
}

/**
 * Huan(202003)
 *  Key   - GitHub Repo Full Name: "Org/Repo"
 *  Value - WeChat Room Id / Id List
 */
export const managedRepoConfig = {
  'DSExtension/DSExtension': '18039997009@chatroom',
  'apache/incubator-iotdb' : '18378203056@chatroom',
  'kaiyuanshe/oss-bot'     : [
    '17591588552@chatroom',
    '17384390178@chatroom',
  ],
  'qihoo360/quicksql' : [
    '4808709382@chatroom',
    '4344886880@chatroom',
  ],
  'wechaty/python-wechaty' : '19367909379@chatroom',
} as {
  [fullName: string]: string | string[],
}
