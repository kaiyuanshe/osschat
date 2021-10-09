import type {
  WechatyPlugin,
}                     from 'wechaty'
import {
  WechatyChatopera,
}                     from 'wechaty-chatopera'

import {
  projectsRepoConfig,
}                       from '../config-projects/mod.js'

let plugin: undefined | WechatyPlugin

// Auto load Wechaty Chatopera Plugin with ENV variables
if (
  (process.env['CHATOPERA_DEFAULT_CLIENTID'] && process.env['CHATOPERA_DEFAULT_SECRET'])
  || process.env['CHATOPERA_PERSONAL_ACC_TOKEN']
) {
  plugin = WechatyChatopera({
    clientId: process.env['CHATOPERA_DEFAULT_CLIENTID'],
    faqBestReplyThreshold: process.env['CHATOPERA_FAQ_BESTREPLY_THRES'] ? parseFloat(process.env['CHATOPERA_FAQ_BESTREPLY_THRES']) : undefined,
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
