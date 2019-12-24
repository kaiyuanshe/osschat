import {
  Room,
  Wechaty,
  UrlLink,
}             from 'wechaty'

import {
  log,
  CHATOPS_ROOM_ID,
}                   from './config'

let room: Room

export async function chatops (
  bot: Wechaty,
  text: string,
  opt = true,
): Promise<void> {
  log.info('chatops', 'chatops(%s)', text)

  if (!room) {
    room = bot.Room.load(CHATOPS_ROOM_ID)
  }

  if (opt) {
    if (text.match(/^http/i)) {
      const urlLink = await UrlLink.create(text)
      await room.say(urlLink)
    } else {
      await room.say(text)
    }
  }
}
