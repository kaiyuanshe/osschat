import {
  Contact,
  log,
  Wechaty,
}             from 'wechaty'

import {
  store,
  logonoffActions,
}                     from '../ducks/'

export default async function onLogout (
  this : Wechaty,
  user : Contact,
): Promise<void> {
  log.info('on-logout', `onLogout(%s)`, user)

  store.dispatch(
    logonoffActions.logout(
      this.id,
    )
  )

}
