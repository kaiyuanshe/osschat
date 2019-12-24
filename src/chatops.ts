import {
  Room,
  Wechaty,
}             from 'wechaty'

import {
  log,
  CHATOPS_ROOM_ID,
}                   from './config'

let room: Room

export async function chatops (
  bot: Wechaty,
  text: string,
  opt: boolean = true
): Promise<void> {
  log.info('chatops', 'chatops(%s)', text)

  if (!room) {
    room = bot.Room.load(CHATOPS_ROOM_ID)
  }

  if (opt) {
    await room.say(text)
  }
}
