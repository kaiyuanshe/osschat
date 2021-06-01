import {
  Probot,
  ApplicationFunctionOptions,
}                             from 'probot' // eslint-disable-line no-unused-vars

// import { Command } from 'commander'

import {
  log,
  // VERSION,
}                     from '../src/config'
import { getBot }     from '../src/get-bot'
import { setupBot }   from '../src/setup-bot'
import { setupFinis } from '../src/setup-finis'

import { configureProbot } from '../src/probot-handlers/mod'

import { configureRoutes }  from '../src/routers'

async function probotApp (
  app: Probot,
  options: ApplicationFunctionOptions,
) {
  if (!options.getRouter) {
    throw new Error('getRouter() is required for OSSChat')
  }

  configureProbot(app)

  configureRoutes(options.getRouter())

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/

  // const program = new Command()
  // program
  //   .version(VERSION)
  //   .option('-d, --debug', 'enable debug mode')

  // program.parse(process.argv)
  // if (program.opts().debug) {
  //   process.env.DEBUG = program.opts().debug.toString()
  // }

  log.verbose('main', 'main()')

  const bot = getBot()

  await bot.start()
  await setupBot()
  await setupFinis(bot)

  /**
   * Huan(202105):
   *  if the returned promise from this function (app)
   *  will not resolved, then the HTTP listener will not be started.
   *
   * Comment out the following code will resolve
   *  the heroku R10 (boot timeout) problem
   */
  // await bot.state.ready('off')
}

export default probotApp
export {
  probotApp,
}
