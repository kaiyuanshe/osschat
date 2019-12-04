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

  while (!room) {
    const tryRoom = await bot.Room.find({ topic: CHATOPS_ROOM_TOPIC })
    if (tryRoom) {
      room = tryRoom
    } else {
      log.verbose('chatops', `chatops() can not find room with topic "${CHATOPS_ROOM_TOPIC}"`)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  await room.say(text)
}
