/// <reference path="./typings.d.ts" />
/**
 * VERSION
 */
import readPkgUp  from 'read-pkg-up'

import {
  log,
}               from 'wechaty'

import dotenv     from 'dotenv'
dotenv.config()

const pkg = readPkgUp.sync({ cwd: __dirname })!.packageJson
const VERSION = pkg.version

/**
 * Env Vars
 */
// export const PORT = process.env.PORT || 8788

const CHATOPS_ROOM_ID    = '18995691396@chatroom'  // ChatOps - OSS Chat
const HEARTBEAT_ROOM_ID  = '17376996519@chatroom'  // ChatOps - Heartbeat
const DEV_ROOM_ID        = '17591588552@chatroom'  // OSSChat Project Group

function debug () : boolean {
  return process.env.DEBUG === 'true'
}

export {
  log,
  VERSION,
  CHATOPS_ROOM_ID,
  HEARTBEAT_ROOM_ID,
  DEV_ROOM_ID,
  debug,
}
