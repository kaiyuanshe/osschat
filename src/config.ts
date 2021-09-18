/// <reference path="./typings.d.ts" />
/**
 * VERSION
 */
import { readPackageUpSync } from 'read-pkg-up'

import {
  log,
}               from 'wechaty'

import dotenv     from 'dotenv'
dotenv.config()

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const pkg = readPackageUpSync({ cwd: __dirname })!.packageJson
const VERSION = pkg.version

/**
 * Env Vars
 */
// export const PORT = process.env.PORT || 8788

// const CHATOPS_ROOM_ID   = '21453880635@chatroom'  // WeCom: ChatOps - OSSChat
const CHATOPS_ROOM_ID  = '18995691396@chatroom'  // WeChat: ChatOps - OSSChat

const HEARTBEAT_ROOM_ID   = '24980472405@chatroom'    // WeCom: ChatOps - Heartbat MIX

const DEVELOPER_ROOM_ID  = '17591588552@chatroom'  // WeChat: OSSChat Project Group

function debug () : boolean {
  return process.env['DEBUG'] === 'true'
}

export {
  log,
  VERSION,
  CHATOPS_ROOM_ID,
  HEARTBEAT_ROOM_ID,
  DEVELOPER_ROOM_ID,
  debug,
}
