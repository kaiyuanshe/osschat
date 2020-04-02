#!/usr/bin/env ts-node

import { getHAWechaty } from '../../src/get-wechaty'
import { startBot }   from '../../src/start-bot'
import { startFinis } from '../../src/start-finis'

process.env.HA_WECHATY_PUPPET = 'wechaty-puppet-mock'
process.env.HA_WECHATY_PUPPET_MOCK_TOKEN = 'mock-token'

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
