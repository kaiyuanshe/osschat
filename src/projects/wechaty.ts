/**
 * Project: Wechaty
 * GitHub: https://github.com/wechaty/
 * Maintainer: Huan LI (李卓桓) https://github.com/huan
 *
 */
import {
  RepoConfig,
}                 from '../config'

const WECHATY_DEVELOPER_ROOM_ID_LIST = [
  '24113855649@chatroom',   // Wechaty Developers' Room Next
  '17275396976@chatroom',   // Wechaty Developers' Room 0
  '7582163093@chatroom',    // Wechaty Developers' Room 1
  '5729603967@chatroom',    // Wechaty Developers' Room 2
  '4335801863@chatroom',    // Wechaty Developers' Room 3
  '22396239792@chatroom',   // Wechaty Developers' Room 4
  '19112581505@chatroom',   // Wechaty Developers' Room 5
  /* ******************** */
  '17559195108@chatroom',   // Wechaty Ignite 1
  '18171595067@chatroom',   // Wechaty Ignite 2
  '19487389780@chatroom',   // Wechaty Ignite 3
]

const BOT5_CLUB_ROOM_ID = '18095776930@chatroom'
const PYTHON_WECHATY_ROOM_ID = '19367909379@chatroom'

export const config: RepoConfig = {
  'chatie/(blog|*wechaty*)' : WECHATY_DEVELOPER_ROOM_ID_LIST,
  'wechaty/*wechaty*'       : WECHATY_DEVELOPER_ROOM_ID_LIST,
  'wechaty/bot5.club'       : BOT5_CLUB_ROOM_ID,
  'wechaty/friday'          : [
    ...WECHATY_DEVELOPER_ROOM_ID_LIST,
    BOT5_CLUB_ROOM_ID,
  ],
  'wechaty/go-wechaty'  : PYTHON_WECHATY_ROOM_ID,
  'wechaty/java-wechaty'  : PYTHON_WECHATY_ROOM_ID,
  'wechaty/python-wechaty'  : PYTHON_WECHATY_ROOM_ID,
}

export default config
