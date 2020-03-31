import {
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
import { HAWechaty } from './ha-wechaty'

export class Chatops {

  private static singleton: Chatops

  public static instance (
    haBot?: HAWechaty,
  ) {
    if (!this.singleton) {
      if (!haBot) {
        throw new Error('instance need a Wechaty instance to initialize')
      }
      this.singleton = new Chatops(haBot)
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
    private haBot: HAWechaty,
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

    const online = this.haBot.logonoff()
    if (!online) {
      log.error('Chatops', 'roomMessage() this.bot is offline')
      return
    }

    const room = await this.haBot.Room.load(roomId)
    if (!room) {
      log.error('Chatops', 'roomMessage() no bot found in room %s', roomId)
      return
    }

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
