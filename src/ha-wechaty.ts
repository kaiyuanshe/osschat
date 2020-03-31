import {
  Wechaty,
  WechatyOptions,
  Room,
}                   from 'wechaty'

import { StateSwitch } from 'state-switch'

import flattenArray from 'flatten-array'

import {
  log,
}             from './config'
import { WechatyEventName } from 'wechaty/dist/src/wechaty'

export class HAWechaty {

  public state: StateSwitch

  public wechatyList: Wechaty[]

  public Room = {
    findAll : this.roomFindAll.bind(this),
    load    : this.roomLoad.bind(this),
  }

  public async roomFindAll (): Promise<Room[]> {
    log.verbose('HAWechaty', 'roomFindAll()')
    const roomListList = Promise.all(
      this.wechatyList.map(
        wechaty => wechaty.Room.findAll()
      )
    )

    const roomList = [] as Room[]

    /**
     * allRoomList may contain one room for multiple times
     * because we have more than one bot in the same room
     */
    const allRoomList = flattenArray(roomListList) as Room[]
    for (const room of allRoomList) {
      const exist = roomList.some(r => r.id === room.id)
      if (exist) {
        // We have a room in our list, so skip this one
        continue
      }
      roomList.push(room)
    }
    return roomList
  }

  public async roomLoad (id: string): Promise<null | Room> {
    log.verbose('HAWechaty', 'roomLoad(%s)', id)
    const roomList = this.wechatyList.map(
      wechaty => wechaty.Room.load(id)
    )

    for (const room of roomList) {
      try {
        await room.ready()
        if (room.isReady()) {
          log.verbose('HAWechaty', 'roomLoad() %s has room id %s', room.wechaty, room.id)
          return room
        }
      } catch (e) {
        log.verbose('HAWechaty', 'roomLoad() %s has no room id %s', room.wechaty, room.id)
      }
    }

    return null
  }

  constructor (
    public options: WechatyOptions,
  ) {
    log.verbose('HAWechaty', 'constructor("%s")', JSON.stringify(options))
    this.wechatyList = []
    this.state = new StateSwitch('HAWechaty')
  }

  public async start () {
    log.verbose('HAWechaty', 'start()')

    try {
      this.state.on('pending')

      const wechatyPuppet = process.env.WECHATY_PUPPET || ''
      const wechatyPuppetList = wechatyPuppet
        .split(':')
        .filter(v => !!v)
        .map(v => v.toUpperCase())
        .map(v => v.replace(/-/g, '_'))

      if (wechatyPuppetList.includes('WECHATY_PUPPET_HOSTIE')
          && process.env.WECHATY_PUPPET_HOSTIE_TOKEN
      ) {
        this.wechatyList.push(
          new Wechaty({
            ...this.options,
            puppet: 'wechaty-puppet-hostie',
          }),
        )
      }

      if (wechatyPuppetList.includes('WECHATY_PUPPET_PADPLUS')
          && process.env.WECHATY_PUPPET_PADPLUS_TOKEN
      ) {
        this.wechatyList.push(
          new Wechaty({
            ...this.options,
            puppet: 'wechaty-puppet-padplus',
          }),
        )
      }

      if (wechatyPuppetList.includes('WECHATY_PUPPET_MOCK')
          && process.env.WECHATY_PUPPET_MOCK_TOKEN
      ) {
        this.wechatyList.push(
          new Wechaty({
            ...this.options,
            puppet: 'wechaty-puppet-mock',
          }),
        )
      }

      if (this.wechatyList.length <= 0) {
        throw new Error('no wechaty puppet found')
      }

      log.info('HAWechaty', 'start() %s puppet inited', this.wechatyList.length)

      await Promise.all(
        this.wechatyList.map(
          wechaty => wechaty.start()
        )
      )

      this.state.on(true)

    } catch (e) {
      log.warn('HAWechaty', 'start() rejection: %s', e)
      this.state.off(true)
    }

  }

  public async stop () {
    log.verbose('HAWechaty', 'stop()')

    try {
      this.state.off('pending')

      await Promise.all(
        this.wechatyList.map(
          wechaty => wechaty.stop()
        )
      )
    } catch (e) {
      log.warn('HAWechaty', 'stop() rejection: %s', e)
      throw e
    } finally {
      this.state.off(true)
    }
  }

  public logonoff (): boolean {
    log.verbose('HAWechaty', 'logonoff()')
    return this.wechatyList.some(wechaty => wechaty.logonoff())
  }

  public on (
    eventName     : WechatyEventName,
    handlerModule : string | Function,
  ): this {
    this.wechatyList.forEach(wechaty => wechaty.on(eventName as any, handlerModule as any))
    return this
  }

  public logout (): void {
    log.verbose('HAWechaty', 'logout()')

    this.wechatyList.forEach(
      wechaty => wechaty.logout()
    )
  }

  public async say (text: string): Promise<void> {
    log.verbose('HAWechaty', 'say(%s)', text)
    this.wechatyList.forEach(wechaty => wechaty.say(text))
  }

  public name (): string {
    return this.wechatyList
      .map(wechaty => wechaty.name())
      .join(',')
  }

}
