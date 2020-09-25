/// <reference path="./typings.d.ts" />
/**
 * VERSION
 */
import readPkgUp  from 'read-pkg-up'

import projectsRepoConfig from './projects/'

import dotenv     from 'dotenv'
dotenv.config()

export {
  log,
}               from 'wechaty'

const pkg = readPkgUp.sync({ cwd: __dirname })!.packageJson
export const VERSION = pkg.version

/**
 * Env Vars
 */
export const PORT = process.env.PORT || 8788

export const CHATOPS_ROOM_ID    = '18995691396@chatroom'  // ChatOps - OSS Chat
export const HEARTBEAT_ROOM_ID  = '17376996519@chatroom'  // ChatOps - Heartbeat
export const DEV_ROOM_ID        = '17591588552@chatroom'  // OSSChat Project Group

export function debug () : boolean {
  return process.env.DEBUG === 'true'
}

/**
 * For map `org/repo` to WeChat Room id(s)
 */
export interface RepoConfig {
  [fullName: string]: string | string[],
}

/**
 * Huan(202003)
 *  Key   - GitHub Repo Full Name: "Org/Repo"
 *  Value - WeChat Room Id / Id List
 *
 *  Key should be in ascending order
 */
export const managedRepoConfig: RepoConfig = {
  'BUPT/ai-ml.club': '18968477245@chatroom',
  'DSExtension/DSExtension': '18039997009@chatroom',
  'JesseWeb/yxtg':'19611101639@chatroom',
  'Tencent/wepy': '21886945130@chatroom',
  'WeBankFinTech/DataSphereStudio' : [
    '17539577298@chatroom',
    '18720976935@chatroom',
    '18815198079@chatroom',
    '20244382563@chatroom',
    '20071581452@chatroom',
  ],
  'WeBankFinTech/Linkis' : [
    '17539577298@chatroom',
    '18720976935@chatroom',
    '18815198079@chatroom',
    '20244382563@chatroom',
    '20071581452@chatroom',
  ],
  'apache/incubator-dolphinscheduler'     : [
    '8676247154@chatroom',
    '19237597168@chatroom',
    '19380384367@chatroom',
    '19146409029@chatroom',
    '20259685174@chatroom',
    '18892613968@chatroom',
  ],
  'apache/incubator-doris' : '18440801276@chatroom',
  'apache/incubator-iotdb' : '18378203056@chatroom',
  'dailidong/ossbot': '18039997009@chatroom',
  'kaiyuanshe/osschat'     : [
    '17591588552@chatroom',
    '17384390178@chatroom',
  ],
  'qihoo360/quicksql' : [
    '4808709382@chatroom',
    '4344886880@chatroom',
  ],
  ...projectsRepoConfig,
}
