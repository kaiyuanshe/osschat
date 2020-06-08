import { Ducks } from 'ducks'
import { Counter as CounterDuck } from 'wechaty-ducks-contrib'
import { Duck as WechatyDuck } from 'wechaty-redux'

import {
  HAWechaty,
  configureHa,
  Duck as HaDuck,
}                 from 'ha-wechaty'

import {
  log,
}               from './config'
import {
  getMemory,
}               from './get-memory'

import { Chatops } from './chatops'

const duckery = {
  counter : CounterDuck,
  ha      : HaDuck,
  wechaty : WechatyDuck,
}

type Duckery = typeof duckery

let haWechaty: HAWechaty<Duckery>

export function getBot () {
  log.verbose('getWechaty', 'getHAWechaty()')

  if (haWechaty) {
    return haWechaty
  }

  const ducks = new Ducks(duckery)

  const name = process.env.WECHATY_NAME || 'heroku-wechaty'
  const memory = getMemory(name)

  haWechaty = configureHa({
    ducks,
    memory,
    name,
  })

  // const t = haWechaty.ducks.ducksify()

  // Initialize Chatops Instance:
  Chatops.instance(haWechaty)

  return haWechaty
}
