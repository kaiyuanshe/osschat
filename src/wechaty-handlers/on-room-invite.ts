import {
  log,
  RoomInvitation,
  Wechaty,
}                   from 'wechaty'

import { Chatops } from '../chatops.js'

export default async function onRoomInvite (
  this           : Wechaty,
  roomInvitation : RoomInvitation
): Promise<void> {
  log.info('on-room-invite', 'onRoomInvite(%s)', roomInvitation)

  const topic   = await roomInvitation.topic()
  const inviter = await roomInvitation.inviter()

  await Chatops.instance().queue(() => {
    Chatops.instance().say(`recreived room invitation from ${inviter} to ${topic}`)
      .then(() => roomInvitation.accept())
      .then(() => Chatops.instance().say('accepted.'))
      .catch(e => log.error('on-room-invite', 'onRoomInvite() queue() rejection %s', e))
  })

}
