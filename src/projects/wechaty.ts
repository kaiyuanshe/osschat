/**
 * Project: Wechaty
 * GitHub: https://github.com/wechaty/
 * Maintainer: Huan LI (李卓桓) https://github.com/huan
 *
 */
import {
  RepoConfig,
}                 from '../config'

const WECHATY_DEVELOPERS_HEADQUARTERS = '17275396976@chatroom'

// const LIST_WECHATY_DEVELOPERS = [
//   '18171595067@chatroom',   // Wechaty Developers' Home
//   '7582163093@chatroom',    // Wechaty Developers' Home 1
//   '5729603967@chatroom',    // Wechaty Developers' Home 2
//   '4335801863@chatroom',    // Wechaty Developers' Home 3
//   '22396239792@chatroom',   // Wechaty Developers' Home 4
//   '19112581505@chatroom',   // Wechaty Developers' Home 5
//   '24113855649@chatroom',   // Wechaty Developers' Home 6
// ]

const BOT5_CLUB_2020 =   '18095776930@chatroom'   // Bot Friday Open Forum - BFOF
// const BOT5_CLUB_2019 =  '17301175542@chatroom'   // Bot Friday Open Forum - 2019

const MULTI_LANGUAGE_WECHATY = '19367909379@chatroom' // Python/Go/Java Wechaty

const PREANGEL             = '17237607145@chatroom'  // ChatOps - PreAngel
const CHATBOT_0_1          = '22598372108@chatroom'  // 博文视点《Chatbot从0到1》读者群
const WECHATY_CONTRIBUTORS = '6719192413@chatroom'   // Wechaty Contributors
const JAVASCRIPT_ML        = '4383052528@chatroom'   // Machine Learning in JavaScript

// '17817316202@chatroom'  // Wechaty ISCAS Code of Summer
const SUMMER_OF_CODE       = '18324919941@chatroom'  // Wechaty Summer of Code - Discuss

export const config: RepoConfig = {
  'chatie/(blog|*wechaty*)'                 : WECHATY_DEVELOPERS_HEADQUARTERS,
  'chatie/grpc'                             : MULTI_LANGUAGE_WECHATY,
  'huan/tensorflow-handbook-javascript'     : JAVASCRIPT_ML,
  'juzibot/donut-tester'                    : WECHATY_DEVELOPERS_HEADQUARTERS,
  'lijiarui/chatbot-zero-to-one'            : CHATBOT_0_1,
  'preangel/pre-angel.com'                  : PREANGEL,
  'wechaty/(python|go|java|scala)-wechaty*' : MULTI_LANGUAGE_WECHATY,
  'wechaty/*wechaty*'                       : WECHATY_DEVELOPERS_HEADQUARTERS,
  'wechaty/PMC'                             : WECHATY_CONTRIBUTORS,
  'wechaty/bot5.club'                       : BOT5_CLUB_2020,
  'wechaty/friday'                          : [
    ...WECHATY_DEVELOPERS_HEADQUARTERS,
    ...BOT5_CLUB_2020,
  ],
  'wechaty/summer-of-code': [
    ...WECHATY_DEVELOPERS_HEADQUARTERS,
    SUMMER_OF_CODE,
  ],
  'wechaty/wishlist': WECHATY_DEVELOPERS_HEADQUARTERS,
}

export default config
