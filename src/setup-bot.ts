import {
  Heartbeat,
  DingDong,
  ChatOps,
}                     from 'wechaty-plugin-contrib'
import {
  WechatyChatopera,
}                     from 'wechaty-chatopera'

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

import * as handlers from './handlers-wechaty/mod.js'

// const absPath = (relatedPath: string) => path.join(__dirname, relatedPath)

export async function setupBot (): Promise<void> {
  log.verbose('startBot', 'startBot()')

  const haWechaty = getBot()

  haWechaty
    .on('scan',         handlers.onScan)
    .on('error',        handlers.onError)
    .on('friendship',   handlers.onFriendship)
    .on('logout',       handlers.onLogout)
    .on('login',        handlers.onLogin)
    .on('message',      handlers.onMessage)
    .on('room-topic',   handlers.onRoomTopic)
    .on('room-invite',  handlers.onRoomInvite)
    .on('room-join',    handlers.onRoomJoin)
    .on('room-leave',   handlers.onRoomLeave)

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
