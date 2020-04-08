import { HAWechaty } from 'ha-wechaty'

import {
  log,
}               from './config'
import {
  getMemory,
}               from './get-memory'
import { Chatops } from './chatops'

// let wechaty: Wechaty
let haWechaty: HAWechaty

export function getHAWechaty (): HAWechaty {
  log.verbose('getWechaty', 'getHAWechaty()')

  if (haWechaty) {
    return haWechaty
  }

  const name = process.env.WECHATY_NAME || 'heroku-wechaty'

  const memory = getMemory(name)

  haWechaty = new HAWechaty({
    memory,
    name,
  })

  // Initialize Chatops Instance:
  Chatops.instance(haWechaty)

  return haWechaty
}
