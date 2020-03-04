import { Application } from 'probot' // eslint-disable-line no-unused-vars

import { Command } from 'commander'

import {
  log,
  VERSION,
}                     from '../src/config'
import { getWechaty } from '../src/get-wechaty'
import { startBot }   from '../src/start-bot'
import { startFinis } from '../src/start-finis'

import {
  commentIssue,
  openIssue,
}                 from '../src/issue-handlers'
import configureRoutes from '../src/routers'

export = async (app: Application) => {
  app.on('issue_comment.created', commentIssue)
  app.on('issues.opened', openIssue)

  configureRoutes(app)

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/

  const program = new Command()
  program
    .version(VERSION)
    .option('-d, --debug', 'enable debug mode')

  program.parse(process.argv)
  if (program.debug) {
    process.env.DEBUG = program.debug.toString()
  }

  log.verbose('main', 'main()')

  const bot = getWechaty()

  await Promise.all([
    bot.start(),
    startBot(bot),
    startFinis(bot),
  ])

  while (bot.state.on()) {
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}
