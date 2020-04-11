import path from 'path'

import {
  Contact,
  HAWechaty,
}               from 'ha-wechaty'
import {
  log,
}               from './config'
import {
  Chatops,
}               from './chatops'
import {
  Wtmp,
}               from './wtmp'

const absPath = (relatedPath: string) => path.join(__dirname, relatedPath)

export async function startBot (haWechaty: HAWechaty): Promise<void> {
  log.verbose('startBot', 'startBot(%s)', haWechaty)

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

  const heartbeat = (emoji: string) => {
    return () => Chatops.instance().heartbeat(emoji)
  }
  const ONE_HOUR = 60 * 60 * 1000
  setInterval(heartbeat('[爱心]'), ONE_HOUR)
  haWechaty.on('login', heartbeat(`[太阳] (${haWechaty.name()})`))
  haWechaty.on('ready', heartbeat(`[拳头] (${haWechaty.name()})`))
  haWechaty.on('logout', heartbeat(`[月亮] (${haWechaty.name()})`))

  const wtmp = Wtmp.instance()
  const loginWtmp = (user: Contact) => wtmp.login(user.name())
  const logoutWtmp = (user: Contact) => wtmp.logout(user.name())
  haWechaty.on('login', loginWtmp)
  haWechaty.on('logout', logoutWtmp)

}
