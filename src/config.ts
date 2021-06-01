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

const WECOM_CHATOPS_ROOM_ID   = '21453880635@chatroom' // WeCom: ChatOps - OSSChat
const WECOM_HEARTBEAT_ROOM_ID = '18995691396@chatroom' // WeCom: ChatOps - Heartbat
void WECOM_CHATOPS_ROOM_ID
void WECOM_HEARTBEAT_ROOM_ID

const CHATOPS_ROOM_ID    = '18995691396@chatroom'  // WeChat: ChatOps - OSSChat
const HEARTBEAT_ROOM_ID  = '17376996519@chatroom'  // WeChat: ChatOps - Heartbeat
const DEV_ROOM_ID        = '17591588552@chatroom'  // WeChat: OSSChat Project Group

function debug () : boolean {
  return process.env['DEBUG'] === 'true'
}

export {
  log,
  VERSION,
  CHATOPS_ROOM_ID,
  HEARTBEAT_ROOM_ID,
  DEV_ROOM_ID,
  debug,
}
