import {
  Friendship,
  log,
  Wechaty,
}             from 'wechaty'

import { Chatops } from '../chatops'

export default async function onFriendship (
  this       : Wechaty,
  friendship : Friendship,
): Promise<void> {
  log.info('on-friendship', 'onFriendship(%s)', friendship)

  const contact = await friendship.contact()
  const hello = await friendship.hello()

  await Chatops.instance().queue(() => {
    Chatops.instance().say(`recreived friendship from ${contact} with ${hello}`)
      .then(() => friendship.accept())
      .then(() => Chatops.instance().say('accepted.'))
      .catch(e => log.error('on-friendship', 'onFriendship() queue() rejection %s', e))
  })

}
