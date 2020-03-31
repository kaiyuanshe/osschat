#!/usr/bin/env ts-node

import { getHAWechaty } from '../../src/get-wechaty'
import { startBot }   from '../../src/start-bot'
import { startFinis } from '../../src/start-finis'

process.env.WECHATY_PUPPET = 'wechaty-puppet-mock'

async function main () {
  const haBot = getHAWechaty()

  await Promise.all([
    haBot.start(),
    startBot(haBot),
    startFinis(haBot),
  ])

  return 0
}

main()
  .then(process.exit)
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
