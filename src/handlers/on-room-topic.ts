import {
  Contact,
  log,
  Room,
  Wechaty,
}             from 'wechaty'

export default async function onRoomTopic (
  this     : Wechaty,
  room     : Room,
  newTopic : string,
  oldTopic : string,
  changer  : Contact,
): Promise<void> {
  log.info('startBot', 'onRoomTopic(%s, %s, %s, %s)', room, newTopic, oldTopic, changer)
}
