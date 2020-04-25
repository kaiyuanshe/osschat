/**
 * Project: Wechaty
 * GitHub: https://github.com/wechaty/
 * Maintainer: Huan LI (李卓桓) https://github.com/huan
 *
 */
import {
  RepoConfig,
}                 from '../config'

const ROOM_ID_LIST_WECHATY_DEVELOPER = [
  '17275396976@chatroom',   // Wechaty Developers' Home Next
  '18171595067@chatroom',   // Wechaty Developers' Home
  '7582163093@chatroom',    // Wechaty Developers' Home 1
  '5729603967@chatroom',    // Wechaty Developers' Home 2
  '4335801863@chatroom',    // Wechaty Developers' Home 3
  '22396239792@chatroom',   // Wechaty Developers' Home 4
  '19112581505@chatroom',   // Wechaty Developers' Home 5
  '24113855649@chatroom',   // Wechaty Developers' Home 6
  /* ******************** */
  '17559195108@chatroom',   // Wechaty Ignite 1
  '19487389780@chatroom',   // Wechaty Ignite 3
]

const ROOM_ID_LIST_BOT5_CLUB = [
  '18095776930@chatroom',   // Bot Friday Open Forum - BFOF
  '17301175542@chatroom',   // Bot Friday Open Forum - 2019
]
const ROOM_ID_LIST_PYTHON_GO_JAVA_WECHATY = [
  '19367909379@chatroom',  // Python/Go/Java Wechaty
  '19460512625@chatroom',  // Python/Go/Java Wechaty Meetup
]

const ROOM_ID_PREANGEL = '17237607145@chatroom' // ChatOps - PreAngel
const ROOM_ID_CHATBOT_0_1 = '22598372108@chatroom' // 博文视点《Chatbot从0到1》读者群

export const config: RepoConfig = {
  'chatie/(blog|*wechaty*)'          : ROOM_ID_LIST_WECHATY_DEVELOPER,
  'chatie/grpc'                      : ROOM_ID_LIST_PYTHON_GO_JAVA_WECHATY,
  'juzibot/donut-tester'             : ROOM_ID_LIST_WECHATY_DEVELOPER,
  'lijiarui/chatbot-zero-to-one'     : ROOM_ID_CHATBOT_0_1,
  'preangel/pre-angel.com'           : ROOM_ID_PREANGEL,
  'wechaty/(python|go|java)-wechaty' : ROOM_ID_LIST_PYTHON_GO_JAVA_WECHATY,
  'wechaty/*wechaty*'                : ROOM_ID_LIST_WECHATY_DEVELOPER,
  'wechaty/bot5.club'                : ROOM_ID_LIST_BOT5_CLUB,
  'wechaty/friday'                   : [
    ...ROOM_ID_LIST_WECHATY_DEVELOPER,
    ...ROOM_ID_LIST_BOT5_CLUB,
  ],
  'wechaty/wishlist': ROOM_ID_LIST_WECHATY_DEVELOPER,
}

export default config
