import {
  log,
  Message,
  Wechaty,
}             from 'wechaty'

import {
  CHATOPS_ROOM_ID,
}                   from '../config.js'
import { Chatops } from '../chatops.js'

export default async function onMessage (
  this    : Wechaty,
  message : Message,
): Promise<void> {
  const text    = message.text()
  const contact = message.talker()
  if (!contact) {
    return
  }
  if (text.toLowerCase() === 'oss') {

    // To Be Fix: Change "OSSChat ChatOps" Group Name to actual group name
    log.info('on-message', 'Begin to find the OSSChat ChatOps room')
    const room = await this.Room.find({ id: CHATOPS_ROOM_ID })

    if (room) {
      await room.add(contact)

      // To Be Fix: Change a formal welcome message
      await room.say('Welcome to join OSSChat ChatOps Group', contact)
    }
  }
  log.info('on-message', 'onMessage(%s)', message)

  await directMessage(message)
  await mentionMessage(message)
}

async function directMessage (
  message: Message,
): Promise<void> {
  const room = message.room()
  if (room) {
    return
  }

  if (message.text() === 'dong') {
    // skip chatieio
    return
  }

  // direct message
  await Chatops.instance().say(message)
}

async function mentionMessage (
  message: Message,
): Promise<void> {
  const room = message.room()
  if (!room) {
    return
  }

  const mentionSelf = await message.mentionSelf()
  if (!mentionSelf) {
    return
  }

  await Chatops.instance().say(message)
}
