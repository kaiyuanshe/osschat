/**
 * Project: Wechaty
 * GitHub: https://github.com/wechaty/
 * Maintainer: Huan LI (李卓桓) https://github.com/huan
 *
 */
import { RepoConfig } from '../config'

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

const BOT5_CLUB_2021 = '18825797159@chatroom' // Bot Friday Open Forum 2021
// const BOT5_CLUB_2020 = '18095776930@chatroom' // Bot Friday Open Forum 2020
// const BOT5_CLUB_2019 =  '17301175542@chatroom'   // Bot Friday Open Forum - 2019

const MULTI_LANGUAGE_WECHATY = '19367909379@chatroom' // Python/Go/Java Wechaty

const CHATBOT_0_1          = '22598372108@chatroom'  // 博文视点《Chatbot从0到1》读者群
const WECHATY_CONTRIBUTORS = '6719192413@chatroom'   // Wechaty Contributors

// '17817316202@chatroom'  // Wechaty ISCAS Code of Summer
const SUMMER_OF_WECHATY_STUDENTS = '18324919941@chatroom'  // Summer of Wechaty Albums
const SUMMER_OF_WECHATY_MENTORS  = '21044280639@chatroom'  // Summer of Wechaty Mentor Candidates

const PUPPET_SERVICE_PROVIDER = '25578655216@chatroom' // Wechaty Puppet Service Provider

/* eslint-disable sort-keys */
export const config: RepoConfig = {
  'lijiarui/chatbot-zero-to-one' : CHATBOT_0_1,

  'juzibot/donut-tester'   : WECHATY_DEVELOPERS_HEADQUARTERS,
  'wechaty/wishlist'       : WECHATY_DEVELOPERS_HEADQUARTERS,
  'wechaty/*wechaty*'      : WECHATY_DEVELOPERS_HEADQUARTERS,
  'wechaty/*puppet*'       : WECHATY_DEVELOPERS_HEADQUARTERS,
  'wechaty/wechaty.js.org' : WECHATY_DEVELOPERS_HEADQUARTERS,

  'wechaty/puppet-services' : PUPPET_SERVICE_PROVIDER,

  'wechaty/PMC' : WECHATY_CONTRIBUTORS,

  'wechaty/bot5.club' : BOT5_CLUB_2021,
  'wechaty/friday'    : [
    WECHATY_DEVELOPERS_HEADQUARTERS,
    BOT5_CLUB_2021,
  ],

  'wechaty/grpc'                                       : MULTI_LANGUAGE_WECHATY,
  'wechaty/(python|go|java|scala|php|dotnet)-wechaty*' : MULTI_LANGUAGE_WECHATY,

  'wechaty/summer-of-wechaty': [
    SUMMER_OF_WECHATY_MENTORS,
    SUMMER_OF_WECHATY_STUDENTS,
    WECHATY_DEVELOPERS_HEADQUARTERS,
  ],

}

export default config
