import {
  Heartbeat,
  DingDong,
  ChatOps,
}               from 'wechaty-plugin-contrib'

import {
  WechatyChatopera,
}               from 'wechaty-chatopera'

import {
  log,
  CHATOPS_ROOM_ID,
  HEARTBEAT_ROOM_ID,
}                     from './config.js'

import {
  projectsRepoConfig,
}                       from './config-projects/mod.js'

// import {
//   Chatops,
// }                     from './chatops.js'
// import {
//   Wtmp,
// }                     from './wtmp.js'
import { getBot } from './get-bot.js'

import onScan  from './wechaty-handlers/on-scan.js'
import onError  from './wechaty-handlers/on-error.js'
import onFriendship  from './wechaty-handlers/on-friendship.js'
import onLogout  from './wechaty-handlers/on-logout.js'
import onLogin  from './wechaty-handlers/on-login.js'
import onMessage  from './wechaty-handlers/on-message.js'
import onRoomTopic  from './wechaty-handlers/on-room-topic.js'
import onRoomInvite  from './wechaty-handlers/on-room-invite.js'
import onRoomJoin  from './wechaty-handlers/on-room-join.js'
import onRoomLeave  from './wechaty-handlers/on-room-leave.js'

// const absPath = (relatedPath: string) => path.join(__dirname, relatedPath)

export async function setupBot (): Promise<void> {
  log.verbose('startBot', 'startBot()')

  const haWechaty = getBot()

  haWechaty
    .on('scan',         onScan)
    .on('error',        onError)
    .on('friendship',   onFriendship)
    .on('logout',       onLogout)
    .on('login',        onLogin)
    .on('message',      onMessage)
    .on('room-topic',   onRoomTopic)
    .on('room-invite',  onRoomInvite)
    .on('room-join',    onRoomJoin)
    .on('room-leave',   onRoomLeave)

  haWechaty.use(
    DingDong({
      mention : false,
      room    : /ChatOps/i,
    }),
    Heartbeat({
      emoji: {
        heartbeat : '[爱心]',
        login     : '[太阳]',
        logout    : '[月亮]',
        ready     : '[拳头]',
      },
      intervalSeconds: 60 * 60,       // 1 hour
      room: HEARTBEAT_ROOM_ID,
    }),
    ChatOps({
      blacklist : ['dong'],
      contact   : true,
      mention   : true,
      room      : CHATOPS_ROOM_ID,
    }),
  )

  // Auto load Wechaty Chatopera Plugin with ENV variables
  if ((process.env['CHATOPERA_DEFAULT_CLIENTID'] && process.env['CHATOPERA_DEFAULT_SECRET']) || process.env['CHATOPERA_PERSONAL_ACC_TOKEN']) {
    haWechaty.use(
      WechatyChatopera({
        clientId: process.env['CHATOPERA_DEFAULT_CLIENTID'],
        faqBestReplyThreshold: process.env['CHATOPERA_FAQ_BESTREPLY_THRES'] ? parseFloat(process.env['CHATOPERA_FAQ_BESTREPLY_THRES']) : undefined,
        faqSuggReplyThreshold: process.env['CHATOPERA_FAQ_SUGGREPLY_THRES'] ? parseFloat(process.env['CHATOPERA_FAQ_SUGGREPLY_THRES']) : undefined,
        mention: false,
        personalAccessToken: process.env['CHATOPERA_PERSONAL_ACC_TOKEN'],
        repoConfig: projectsRepoConfig,
        secret: process.env['CHATOPERA_DEFAULT_SECRET'],
      })
    )
  }

  // const heartbeat = (emoji: string) => {
  //   return () => Chatops.instance().heartbeat(emoji)
  // }
  // const ONE_HOUR = 60 * 60 * 1000
  // setInterval(heartbeat('[爱心]'), ONE_HOUR)
  // haWechaty.on('login', heartbeat(`[太阳] (${haWechaty.name()})`))
  // haWechaty.on('ready', heartbeat(`[拳头] (${haWechaty.name()})`))
  // haWechaty.on('logout', heartbeat(`[月亮] (${haWechaty.name()})`))

  // const wtmp = Wtmp.instance()
  // const loginWtmp = (user: Contact) => wtmp.login(user.name())
  // const logoutWtmp = (user: Contact) => wtmp.logout(user.name())
  // haWechaty.on('login', loginWtmp)
  // haWechaty.on('logout', logoutWtmp)
}
