#!/usr/bin/env ts-node

import { getWechaty } from '../../src/get-wechaty'
import { startBot }   from '../../src/start-bot'
import { startFinis } from '../../src/start-finis'

process.env.WECHATY_PUPPET = 'wechaty-puppet-mock'

async function main () {
  const bot = getWechaty()

  await Promise.all([
    bot.start(),
    startBot(bot),
    startFinis(bot),
  ])

  return 0
}

main()
  .then(process.exit)
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
