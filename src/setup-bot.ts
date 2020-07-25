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

import onScan  from './handlers/on-scan'
import onError  from './handlers/on-error'
import onFriendship  from './handlers/on-friendship'
import onLogout  from './handlers/on-logout'
import onLogin  from './handlers/on-login'
import onMessage  from './handlers/on-message'
import onRoomTopic  from './handlers/on-room-topic'
import onRoomInvite  from './handlers/on-room-invite'
import onRoomJoin  from './handlers/on-room-join'
import onRoomLeave  from './handlers/on-room-leave'

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
