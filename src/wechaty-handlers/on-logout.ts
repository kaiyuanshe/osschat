import {
  Contact,
  log,
  Wechaty,
}             from 'wechaty'

// import {
//   duckStore,
//   wechatyActions,
// }                     from '../ducks/.js'

export default async function onLogout (
  this : Wechaty,
  user : Contact,
): Promise<void> {
  log.info('on-logout', 'onLogout(%s)', user)

  // duckStore.dispatch(
  //   wechatyActions.logout(
  //     this.id,
  //   )
  // )

}
