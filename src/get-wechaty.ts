import {
  Wechaty,
}                 from 'wechaty'

import {
  log,
}               from './config'
import {
  getMemory,
}               from './get-memory'
import { Chatops } from './chatops'

let wechaty: Wechaty

export function getWechaty (): Wechaty {
  log.verbose('getWechaty', 'getWechaty()')

  if (wechaty) {
    return wechaty
  }

  const name = process.env.WECHATY_NAME || 'heroku-wechaty'

  const memory = getMemory(name)

  wechaty = new Wechaty({
    memory,
    name,
  })

  // Initialize Chatops Instance:
  Chatops.instance(wechaty)

  return wechaty
}
