import {
  Wechaty,
  UrlLink,
  Message,
}             from 'wechaty'

import { DelayQueueExecutor } from 'rx-queue'

import {
  log,
  BOT_ROOM_ID,
  DEV_ROOM_ID,
  HEARTBEAT_ROOM_ID,
}                     from './config'

export class Chatops {

  private static singleton: Chatops

  public static instance (
    bot?: Wechaty,
  ) {
    if (!this.singleton) {
      if (!bot) {
        throw new Error('instance need a Wechaty instance to initialize')
      }
      this.singleton = new Chatops(bot)
    }
    return this.singleton
  }

  /**
   * Static
   * --------
   * Instance
   */

  private delayQueueExecutor: DelayQueueExecutor

  private constructor (
    private bot: Wechaty,
  ) {
    this.delayQueueExecutor = new DelayQueueExecutor(5 * 1000)  // set delay period time to 5 seconds
  }

  public async heartbeat (text: string): Promise<void> {
    return this.roomMessage(HEARTBEAT_ROOM_ID, text)
  }

  public async say (textOrMessage: string | Message | UrlLink) {
    return this.roomMessage(BOT_ROOM_ID, textOrMessage)
  }

  public async dev (urlLink: UrlLink) {
    return this.roomMessage(DEV_ROOM_ID, urlLink)
  }

  private async roomMessage (
    roomId: string,
    info:   string | Message | UrlLink,
  ): Promise<void> {
    log.info('Chatops', 'roomMessage(%s, %s)', roomId, info)

    const online = this.bot.logonoff()
    if (!online) {
      log.error('Chatops', 'roomMessage() this.bot is offline')
      return
    }

    const room = this.bot.Room.load(roomId)

    if (typeof info === 'string') {
      await room.say(info)
    } else if (info instanceof Message) {
      switch (info.type()) {
        case Message.Type.Text:
          await room.say(`${info}`)
          break
        case Message.Type.Image:
          const image = await info.toFileBox()
          await room.say(image)
          break
        case Message.Type.Url:
          const urlLink = await info.toUrlLink()
          await room.say(urlLink)
          break
        default:
          const typeName = Message.Type[info.type()]
          await room.say(`message type: ${typeName}`)
          break
      }
    } else if (info instanceof UrlLink) {
      await room.say(info)
    }

  }

  public async queue (
    fn: (() => any),
    name?: string,
  ) {
    log.verbose('Chatops', 'queue(,"%s")', name)
    await this.delayQueueExecutor.execute(fn, name)
    log.verbose('Chatops', 'queue(,"%s") done.', name)
  }

}
