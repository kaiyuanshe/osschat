import {
  finis,
  FinisCallback,
}                   from 'finis'
import { Wechaty }  from 'wechaty'

import {
  log,
  VERSION,
}           from './config'

let bot: Wechaty
let FINIS_QUITING = false

/**
 *
 * SIGTERM
 *
 */
const finisCallback: FinisCallback = async (code: number, signal: string) => {
  if (!bot) {
    log.warn('startFinis', 'finisCallback() no bot, NOOP')
    return
  }

  if (FINIS_QUITING) {
    log.warn('startFinis', 'finisCallback(%s, %s) called again when quiting... NOP', code, signal)
    return
  }

  FINIS_QUITING = true
  log.info('startFinis', 'finisCallback(%s, %s)', code, signal)

  if (bot.logonoff()) {
    log.info('startFinis', 'finisCallback() announce exiting')
    try {
      await bot.say(`I'm going to offline. v${VERSION}`)
    } catch (e) {
      log.error('startFinis', 'finisCallback() exception: %s', e)
    }
  } else {
    log.info('startFinis', 'finisCallback() bot is logout-ed')
  }

  setTimeout(() => {
    log.info('startFinis', 'finisCallback() hard exit')
    process.exit(code)
  }, 10 * 1000)

  try {
    if (bot) {
      await bot.stop()
    }
  } catch (e) {
    log.error('startFinis', 'finisCallback() bot.stop() exception: %s', e)
  } finally {
    log.info('startFinis', 'finisCallback() soft exit')
    process.exit(code)
  }
}

export function startFinis (wechaty: Wechaty): void {
  if (bot) {
    throw new Error('should not run twice')
  }

  bot = wechaty
  finis(finisCallback)
}
