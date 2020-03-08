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

export const config: RepoConfig = {
  'wechaty/*wechaty*'      : WECHATY_DEVELOPER_ROOM_ID_LIST,
  'wechaty/bot5.club'      : '18095776930@chatroom',
  'wechaty/friday'         : WECHATY_DEVELOPER_ROOM_ID_LIST,
  'wechaty/python-wechaty' : '19367909379@chatroom',           // Python Wechaty
}

export default config
