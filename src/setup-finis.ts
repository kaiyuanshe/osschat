import { finis }    from 'finis'
import type {
  Contact,
}               from 'wechaty'
import type { HAWechaty } from 'ha-wechaty'

import {
  Chatops,
}             from './chatops'
import {
  log,
  VERSION,
  debug,
}             from './config'

const BOT_NAME = 'OSSChat'

const LOGIN_ANNOUNCEMENT  = `Der! I just got online!\n${BOT_NAME} v${VERSION}`
// const LOGOUT_ANNOUNCEMENT = `Der! I'm going to offline now, see you, bye!\nOSSChat v${VERSION}`
const EXIT_ANNOUNCEMENT   = `Der! I'm going to exit now, see you, bye!\n${BOT_NAME} v${VERSION}`

let bot: undefined | HAWechaty

export async function setupFinis (haWechaty: HAWechaty): Promise<void> {
  if (bot) {
    throw new Error('startFinis should only init once')
  }
  bot = haWechaty

  bot.on('login',   async function () { await Chatops.instance().say(LOGIN_ANNOUNCEMENT) })
  bot.on('logout',  function (user: Contact) { log.info('RestartReporter', 'startFinis() bot %s logout', user) })
}

/**
 *
 * SIGTERM
 *
 */
let FINIS_QUITING = false

finis(async (code, signal) => {
  if (FINIS_QUITING) {
    log.warn('RestartReporter', 'finis(%s, %s) called again when quiting... enforce QUIT', code, signal)
    process.exit(-1)
  }

  FINIS_QUITING = true
  log.info('RestartReporter', 'finis(%s, %s)', code, signal)

  if (!bot) {
    log.warn('RestartReporter', 'finis() no bot set, NOOP')
    return
  }

  if (bot.logonoff()) {
    log.info('RestartReporter', 'finis() announce exiting')
    try {
      // log.level('silly')
      await Chatops.instance().say(EXIT_ANNOUNCEMENT)
      log.info('startFinis', 'finis() chatops() done')
      if (!debug()) {
        await bot.say(EXIT_ANNOUNCEMENT)
      }
      log.info('startFinis', 'finis() bot.say() done')
      await new Promise(resolve => setTimeout(resolve, 10 * 1000))
      log.info('startFinis', 'finis() sleep 10s done')
    } catch (e) {
      log.error('RestartReporter', 'finis() exception: %s', e)
    }
  } else {
    log.info('RestartReporter', 'finis() bot had been logout-ed')
  }

  setTimeout(() => {
    log.info('RestartReporter', 'finis() hard exit')
    setImmediate(() => process.exit(code))
  }, 10 * 1000)
  log.info('RestartReporter', 'finis() setTimeoutprocess.exit(), 10 * 1000)')

  try {
    log.info('RestartReporter', 'finis() setTimeout() going to exit with %d', code)
    if (bot) {
      await bot.stop()
    }
  } catch (e) {
    log.error('RestartReporter', 'finis() setTimeout() exception: %s', e)
  } finally {
    log.info('RestartReporter', 'finis() soft exit')
    setImmediate(() => process.exit(code))
  }
})
