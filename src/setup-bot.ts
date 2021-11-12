import { pluginList }       from './plugins/mod.js'
import { addEventHandlers } from './handlers-wechaty/mod.js'

import {
  log,
}                   from './config.js'
import { getBot }   from './get-bot.js'

// import {
//   Wtmp,
// }                     from './wtmp.js'

export async function setupBot (): Promise<void> {
  log.verbose('startBot', 'startBot()')

  const haWechaty = getBot()

  addEventHandlers(haWechaty)
  haWechaty.use(...pluginList)

  // const wtmp = Wtmp.instance()
  // const loginWtmp = (user: Contact) => wtmp.login(user.name())
  // const logoutWtmp = (user: Contact) => wtmp.logout(user.name())
  // haWechaty.on('login', loginWtmp)
  // haWechaty.on('logout', logoutWtmp)
}
