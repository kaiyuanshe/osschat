import type {
  WechatyPlugin,
}                     from 'wechaty'
import {
  WechatyChatopera,
}                     from 'wechaty-chatopera'

import {
  projectsRepoConfig,
}                       from '../config-projects/mod.js'

import {
  fileURLToPath,
}                       from 'url'

import path             from 'path'

let plugin: undefined | WechatyPlugin

// Auto load Wechaty Chatopera Plugin with ENV variables
if (
  (process.env['CHATOPERA_DEFAULT_CLIENTID'] && process.env['CHATOPERA_DEFAULT_SECRET'])
  || process.env['CHATOPERA_PERSONAL_ACC_TOKEN']
) {

  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  plugin = WechatyChatopera({
    clientId: process.env['CHATOPERA_DEFAULT_CLIENTID'],
    faqBestReplyThreshold: process.env['CHATOPERA_FAQ_BESTREPLY_THRES'] ? parseFloat(process.env['CHATOPERA_FAQ_BESTREPLY_THRES']) : undefined,
    faqPath: path.join(__dirname, '../../faqs'),
    faqSuggReplyThreshold: process.env['CHATOPERA_FAQ_SUGGREPLY_THRES'] ? parseFloat(process.env['CHATOPERA_FAQ_SUGGREPLY_THRES']) : undefined,
    mention: false,
    personalAccessToken: process.env['CHATOPERA_PERSONAL_ACC_TOKEN'],
    repoConfig: projectsRepoConfig,
    secret: process.env['CHATOPERA_DEFAULT_SECRET'],
  })
}

export {
  plugin,
}
