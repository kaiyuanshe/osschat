import {
  log,
  RoomInvitation,
  Wechaty,
}                   from 'wechaty'

export default async function onRoomInvite (
  this           : Wechaty,
  roomInvitation : RoomInvitation
): Promise<void> {
  log.info('on-room-invite', 'onRoomInvite(%s)', roomInvitation)
}
