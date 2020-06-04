/**
 * Project: Wechaty
 * GitHub: https://github.com/wechaty/
 * Maintainer: Huan LI (李卓桓) https://github.com/huan
 *
 */
import {
  RepoConfig,
}                 from '../config'

const ROOM_ID_LIST_WECHATY_DEVELOPERS = [
  '17275396976@chatroom',   // Wechaty Developers' Home Next
  '18171595067@chatroom',   // Wechaty Developers' Home
  '7582163093@chatroom',    // Wechaty Developers' Home 1
  '5729603967@chatroom',    // Wechaty Developers' Home 2
  '4335801863@chatroom',    // Wechaty Developers' Home 3
  '22396239792@chatroom',   // Wechaty Developers' Home 4
  '19112581505@chatroom',   // Wechaty Developers' Home 5
  '24113855649@chatroom',   // Wechaty Developers' Home 6
]

const ROOM_ID_LIST_BOT5_CLUB = [
  '18095776930@chatroom',   // Bot Friday Open Forum - BFOF
  '17301175542@chatroom',   // Bot Friday Open Forum - 2019
]
const ROOM_ID_LIST_PYTHON_GO_JAVA_WECHATY = [
  '19367909379@chatroom',  // Python/Go/Java Wechaty
]

const ROOM_ID_PREANGEL             = '17237607145@chatroom'  // ChatOps - PreAngel
const ROOM_ID_CHATBOT_0_1          = '22598372108@chatroom'  // 博文视点《Chatbot从0到1》读者群
const ROOM_ID_WECHATY_CONTRIBUTORS = '6719192413@chatroom'   // Wechaty Contributors
const ROOM_ID_SUMMER_OF_CODE       =  '17817316202@chatroom'  // Wechaty ISCAS Code of Summer

export const config: RepoConfig = {
  'chatie/(blog|*wechaty*)'                 : ROOM_ID_LIST_WECHATY_DEVELOPERS,
  'chatie/grpc'                             : ROOM_ID_LIST_PYTHON_GO_JAVA_WECHATY,
  'juzibot/donut-tester'                    : ROOM_ID_LIST_WECHATY_DEVELOPERS,
  'lijiarui/chatbot-zero-to-one'            : ROOM_ID_CHATBOT_0_1,
  'preangel/pre-angel.com'                  : ROOM_ID_PREANGEL,
  'wechaty/(python|go|java|scala)-wechaty*' : ROOM_ID_LIST_PYTHON_GO_JAVA_WECHATY,
  'wechaty/*wechaty*'                       : ROOM_ID_LIST_WECHATY_DEVELOPERS,
  'wechaty/PMC'                             : ROOM_ID_WECHATY_CONTRIBUTORS,
  'wechaty/bot5.club'                       : ROOM_ID_LIST_BOT5_CLUB,
  'wechaty/friday'                          : [
    ...ROOM_ID_LIST_WECHATY_DEVELOPERS,
    ...ROOM_ID_LIST_BOT5_CLUB,
  ],
  'wechaty/summer-of-code': [
    ...ROOM_ID_LIST_WECHATY_DEVELOPERS,
    ROOM_ID_SUMMER_OF_CODE,
  ],
  'wechaty/wishlist': ROOM_ID_LIST_WECHATY_DEVELOPERS,
}

export default config
