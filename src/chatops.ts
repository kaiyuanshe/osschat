import {
  UrlLink,
  Message,
  Room,
}             from 'wechaty'

import { DelayQueueExecutor } from 'rx-queue'
import { HAWechaty } from 'ha-wechaty'

import {
  log,
  CHATOPS_ROOM_ID,
  DEV_ROOM_ID,
  HEARTBEAT_ROOM_ID,
}                     from './config'

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
    return this.roomMessage(HEARTBEAT_ROOM_ID, text, {
      parallel: true,
    })
  }

  public async say (textOrMessage: string | Message | UrlLink) {
    return this.roomMessage(CHATOPS_ROOM_ID, textOrMessage)
  }

  public async dev (urlLink: UrlLink) {
    return this.roomMessage(DEV_ROOM_ID, urlLink)
  }

  private async roomMessage (
    roomId: string,
    info:   string | Message | UrlLink,
    options: {
      parallel: boolean,
    } = {
      parallel: false,
    },
  ): Promise<void> {
    log.info('Chatops', 'roomMessage(%s, %s)', roomId, info)

    const online = this.haBot.logonoff()
    if (!online) {
      log.error('Chatops', 'roomMessage() this.bot is offline')
      return
    }

    let roomList = [] as Room[]

    if (options.parallel) {
      roomList = this.haBot.nodes()
        .filter(wechaty => wechaty.logonoff())
        .map(wechaty => wechaty.Room.load(roomId))
    } else {
      const room = await this.haBot.Room.load(roomId)
      if (room) {
        roomList = [room]
      }
    }

    if (roomList.length <= 0) {
      log.error('Chatops', 'roomMessage() no bot found in room %s', roomId)
      return
    }

    if (typeof info === 'string') {
      await Promise.all(
        roomList.map(room => room.say(info)),
      )
    } else if (info instanceof Message) {
      switch (info.type()) {
        case Message.Type.Text:
          await Promise.all(
            roomList.map(room => room.say(`${info}`)),
          )
          break
        case Message.Type.Image:
          const image = await info.toFileBox()
          await Promise.all(
            roomList.map(room => room.say(image))
          )
          break
        case Message.Type.Url:
          const urlLink = await info.toUrlLink()
          await Promise.all(
            roomList.map(room => room.say(urlLink))
          )
          break
        default:
          const typeName = Message.Type[info.type()]
          await Promise.all(
            roomList.map(room => room.say(`message type: ${typeName}`))
          )
          break
      }
    } else if (info instanceof UrlLink) {
      await Promise.all(
        roomList.map(room => room.say(info))
      )
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
