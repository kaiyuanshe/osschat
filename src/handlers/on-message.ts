import {
  log,
  Message,
  Room,
  Wechaty,
}             from 'wechaty'

export default async function onMessage (
  this    : Wechaty,
  message : Message,
): Promise<void> {
  const text = message.text()
  const contact = message.from()
  if (!contact) {
    return
  }
  if (text === 'oss') {

    // To Be Fix: Change "OSS Bot ChatOps" Group Name to actual group name
    const room = await Room.find({ topic: 'OSS Bot ChatOps' })
    if (room) {
      await room.add(contact)

      // To Be Fix: Change a formal welcome message
      await room.say('Welcome to join OSS Bot ChatOps Group', contact)
    }
  }
  log.info('on-message', 'onMessage(%s)', message)
}
