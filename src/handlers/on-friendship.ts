import {
  Friendship,
  log,
  Wechaty,
}             from 'wechaty'

export default async function onFriendship (
  this       : Wechaty,
  friendship : Friendship,
): Promise<void> {
  log.info('on-friendship', 'onFriendship(%s)', friendship)
}
