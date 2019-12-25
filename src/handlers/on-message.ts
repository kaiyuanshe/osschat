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

  await dingDong.call(this, message)
}

async function dingDong (
  this:     Wechaty,
  message:  Message,
) {
  log.info('on-message', 'dingDong()')

  let text = message.text()
  const type = message.type()
  const room = message.room()
  // const from = message.from()
  const mentionSelf = await message.mentionSelf()

  if (room) {
    if (!mentionSelf) {
      return
    }

    log.info('on-message', 'dingDong() message in room and mentioned self')
    text = await message.mentionText()
    console.info('mentionText', text)
  }

  if (type === Message.Type.Text) {
    if (text.match(/^#ding$/i)) {
      await message.say('dong')
    }
  }

}
