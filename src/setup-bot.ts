import path from 'path'

import {
  Contact,
}               from 'wechaty'
import {
  Heartbeat,
  DingDong,
  ChatOps,
}               from 'wechaty-plugin-contrib'

import {
  log,
  CHATOPS_ROOM_ID,
  HEARTBEAT_ROOM_ID,
}                     from './config'
// import {
//   Chatops,
// }                     from './chatops'
import {
  Wtmp,
}                     from './wtmp'
import { getBot } from './get-bot'

const absPath = (relatedPath: string) => path.join(__dirname, relatedPath)

export async function setupBot (): Promise<void> {
  log.verbose('startBot', 'startBot()')

  const haWechaty = getBot()

  haWechaty
    .on('scan',         absPath('./handlers/on-scan'))
    .on('error',        absPath('./handlers/on-error'))
    .on('friendship',   absPath('./handlers/on-friendship'))
    .on('logout',       absPath('./handlers/on-logout'))
    .on('login',        absPath('./handlers/on-login'))
    .on('message',      absPath('./handlers/on-message'))
    .on('room-topic',   absPath('./handlers/on-room-topic'))
    .on('room-invite',  absPath('./handlers/on-room-invite'))
    .on('room-join',    absPath('./handlers/on-room-join'))
    .on('room-leave',   absPath('./handlers/on-room-leave'))

  haWechaty.use(
    DingDong({
      at   : true,
      room : false,
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
      at: true,
      dm: true,
      room: CHATOPS_ROOM_ID,
    }),
  )

  // const heartbeat = (emoji: string) => {
  //   return () => Chatops.instance().heartbeat(emoji)
  // }
  // const ONE_HOUR = 60 * 60 * 1000
  // setInterval(heartbeat('[爱心]'), ONE_HOUR)
  // haWechaty.on('login', heartbeat(`[太阳] (${haWechaty.name()})`))
  // haWechaty.on('ready', heartbeat(`[拳头] (${haWechaty.name()})`))
  // haWechaty.on('logout', heartbeat(`[月亮] (${haWechaty.name()})`))

  const wtmp = Wtmp.instance()
  const loginWtmp = (user: Contact) => wtmp.login(user.name())
  const logoutWtmp = (user: Contact) => wtmp.logout(user.name())
  haWechaty.on('login', loginWtmp)
  haWechaty.on('logout', logoutWtmp)
}
