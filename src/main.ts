import {
  log,
  VERSION,
}                     from './config'
import { getWechaty } from './get-wechaty'
import { startBot }   from './start-bot'
import { startFinis } from './start-finis'
import { startWeb }   from './start-web'
import { Command } from 'commander'

async function main () {
  const program = new Command()
  program
    .version(VERSION)
    .option('-d, --debug', 'enable debug mode')

  program.parse(process.argv)
  if (program.debug) {
    process.env.DEBUG = program.debug.toString()
  }

  log.verbose('main', 'main()')

  const name = process.env.WECHATY_NAME || 'heroku-wechaty'

  const bot = getWechaty(name)

  await Promise.all([
    bot.start(),
    startBot(bot),
    startFinis(bot),
    startWeb(bot),
  ])

  while (bot.state.on()) {
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  return 0
}

main()
  .then(process.exit)
  .catch((e) => {
    log.error('Main', 'main() rejection: %s', e)
    process.exit(1)
  })
