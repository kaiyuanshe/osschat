import {
  log,
  Message,
  Wechaty,
}             from 'wechaty'

import {
  CHATOPS_ROOM_ID,
}                   from '../config'
import { VoteManager } from '../managers/vote-manager'

export default async function onMessage (
  this    : Wechaty,
  message : Message,
): Promise<void> {
  const text    = message.text()
  const contact = message.from()
  if (!contact) {
    return
  }
  if (text.toLowerCase() === 'oss') {

    // To Be Fix: Change "OSS Bot ChatOps" Group Name to actual group name
    log.info('on-message', 'Begin to find the OSS Bot ChatOps room')
    const room = this.Room.load(CHATOPS_ROOM_ID)

    if (room) {
      await room.add(contact)

      // To Be Fix: Change a formal welcome message
      await room.say('Welcome to join OSS Bot ChatOps Group', contact)
    }
  }
  log.info('on-message', 'onMessage(%s)', message)

  try {
    await VoteManager.checkVote(message)
  } catch (e) {
    log.error('on-message', 'Failed to check vote for the message:\n', e)
  }
}
