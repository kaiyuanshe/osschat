import {
  Contact,
  log,
  Wechaty,
}             from 'wechaty'

export default async function onLogout (
  this : Wechaty,
  user : Contact,
): Promise<void> {
  log.info('on-logout', `onLogout(%s)`, user)
}
