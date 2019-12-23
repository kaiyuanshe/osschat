import {
  Contact,
  log,
  VERSION,
  Wechaty,
}             from 'wechaty'
import { debug } from '../config'

export default async function onLogin (
  this : Wechaty,
  user : Contact,
): Promise<void> {
  const msg = `${user.name()} Heroku Wechaty Getting Started v${VERSION} logined`
  log.info('startBot', 'onLogin(%s) %s', user, msg)
  if (debug()) {
    await user.say(msg)
  }
}
