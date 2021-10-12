import {
  Contact,
  log,
  VERSION,
  Wechaty,
}             from 'wechaty'
import { debug } from '../config.js'

// import {
//   duckStore,
//   wechatyActions,
// }                     from '../ducks/.js'

export default async function onLogin (
  this : Wechaty,
  user : Contact,
): Promise<void> {
  const msg = `${user.name()} Heroku Wechaty Getting Started v${VERSION} logined`
  log.info('startBot', 'onLogin(%s) %s', user, msg)

  // duckStore.dispatch(
  //   wechatyActions.login(
  //     this.id,
  //     user.name(),
  //   )
  // )

  if (debug()) {
    await user.say(msg)
  }
}
