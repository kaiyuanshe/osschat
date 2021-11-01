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
}               from './config.js'
import {
  getMemory,
}               from './get-memory.js'

import { Chatops } from './chatops.js'

const duckery = {
  counter : CounterDuck,
  ha      : HaDuck,
  wechaty : WechatyDuck,
}

type Duckery = typeof duckery

let haWechaty: undefined | HAWechaty<Duckery>

export function getBot () {
  log.verbose('getWechaty', 'getHAWechaty()')

  if (haWechaty) {
    return haWechaty
  }

  const ducks = new Ducks(duckery)

  const name = process.env['WECHATY_NAME'] || 'heroku-wechaty'
  const memory = getMemory(name)

  haWechaty = configureHa({
    ducks,
    memory,
    name,
    reduxDevTools: 'remote',
    remoteReduxDevToolsOptions: {
      hostname : 'dev.chatie.io',
      maxAge   : 500,
      port     : 8000,
      realtime : true,
    },
  })

  // const t = haWechaty.ducks.ducksify()

  // Initialize Chatops Instance:
  Chatops.instance(haWechaty)

  return haWechaty
}
