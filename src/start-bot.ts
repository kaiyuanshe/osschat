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

export async function startBot (haWechaty: HAWechaty): Promise<void> {
  log.verbose('startBot', 'startBot(%s)', haWechaty)

  haWechaty
    .on('scan',         './handlers/on-scan')
    .on('error',        './handlers/on-error')
    .on('friendship',   './handlers/on-friendship')
    .on('logout',       './handlers/on-logout')
    .on('login',        './handlers/on-login')
    .on('message',      './handlers/on-message')
    .on('room-topic',   './handlers/on-room-topic')
    .on('room-invite',  './handlers/on-room-invite')
    .on('room-join',    './handlers/on-room-join')
    .on('room-leave',   './handlers/on-room-leave')

  const heartbeat = (emoji: string) => {
    return () => Chatops.instance().heartbeat(emoji)
  }
  const ONE_HOUR = 60 * 60 * 1000
  setInterval(heartbeat('💖'), ONE_HOUR)
  haWechaty.on('login', heartbeat(`🌞 (${haWechaty.name()})`))
  haWechaty.on('ready', heartbeat(`💪 (${haWechaty.name()})`))
  haWechaty.on('logout', heartbeat(`🌃 (${haWechaty.name()})`))

  const wtmp = Wtmp.instance()
  const loginWtmp = (user: Contact) => wtmp.login(user.name())
  const logoutWtmp = (user: Contact) => wtmp.logout(user.name())
  haWechaty.on('login', loginWtmp)
  haWechaty.on('logout', logoutWtmp)

}
