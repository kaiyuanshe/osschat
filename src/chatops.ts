import {
  Room,
  Wechaty,
}             from 'wechaty'

import {
  log,
}                   from './config'

// const CHATOPS_ROOM_TOPIC = 'OSS Bot ChatOps'
const CHATOPS_ROOM_ID = '18995691396@chatroom'

let room: Room

export async function chatops (
  bot: Wechaty,
  text: string,
): Promise<void> {
  log.info('chatops', 'chatops(%s)', text)

  if (!room) {
    room = bot.Room.load(CHATOPS_ROOM_ID)
  }

  await room.say(text)
}
