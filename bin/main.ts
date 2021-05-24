import {
  Probot,
  ApplicationFunctionOptions,
}                             from 'probot' // eslint-disable-line no-unused-vars

import { Command } from 'commander'

import {
  log,
  VERSION,
}                     from '../src/config'
import { getBot }     from '../src/get-bot'
import { setupBot }   from '../src/setup-bot'
import { setupFinis } from '../src/setup-finis'

import {
  commentIssue,
  openIssue,
}                 from '../src/issue-handlers'
import { configureRoutes } from '../src/routers'

export = async (
  app: Probot,
  {
    getRouter,
  }: ApplicationFunctionOptions,
) => {
  app.on('issue_comment.created', commentIssue)
  app.on('issues.opened', openIssue)

  configureRoutes(getRouter!())

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/

  const program = new Command()
  program
    .version(VERSION)
    .option('-d, --debug', 'enable debug mode')

  program.parse(process.argv)
  if (program.opts().debug) {
    process.env.DEBUG = program.opts().debug.toString()
  }

  log.verbose('main', 'main()')

  const bot = getBot()

  await bot.start()
  await setupBot()
  await setupFinis(bot)

  await bot.state.ready('off')
}
