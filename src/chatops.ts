import {
  Room,
  Wechaty,
}             from 'wechaty'

import {
  log,
}                   from './config'

const CHATOPS_ROOM_TOPIC = 'OSS Bot ChatOps'

let room: Room

export async function chatops (
  bot: Wechaty,
  text: string,
): Promise<void> {
  log.info('chatops', 'chatops(%s)', text)

  if (!room) {
    const tryRoom = await bot.Room.find({ topic: CHATOPS_ROOM_TOPIC })
    if (!tryRoom) {
      throw new Error('Can not found ChatOps Room!')
    }
    room = tryRoom
  }

  await room.say(text)
}
