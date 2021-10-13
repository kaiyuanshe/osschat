/**
 * Project: OSSChat
 * GitHub: https://github.com/kaiyuanshe/osschat
 * Maintainer: Huan LI (李卓桓) https://github.com/huan
 *
 */
/* eslint-disable sort-keys */
import type { RepoConfig } from './config.js'

const roomConfig = {
  '17275396976@chatroom': [ // Wechaty Developers' Headquarters
    'juzibot/donut-tester',
    'wechaty/*wechaty*',
    'wechaty/friday',
    'wechaty/summer*',
    'wechaty/wechaty.js.org',
    'wechaty/wishlist',
  ],
  '18324919941@chatroom': [ // Summer of Wechaty Students
    'wechaty/summer*',
  ],
  '18825797159@chatroom': [ // Bot Friday Open Forum 2021
    'wechaty/bot5',
    'wechaty/friday',
  ],
  '19053006724@chatroom': [ // Matrix Appservice Wechaty
    'wechaty/matrix-appservice-wechaty',
  ],
  '17754743068@chatroom': [  // Wechaty Puppet Walnut
    'wechaty/wechaty-puppet-walnut',
  ],
  '20764206744@chatroom': [  // Wechaty Puppet Itchat
    'wechaty/python-wechaty-puppet-itchat',
  ],
  '21013901541@chatroom': [ // Wechaty Puppet XP
    'wechaty/wechaty-puppet-xp',
  ],
  '24082599405@chatroom': [ // Wechaty Puppet OICQ
    'wechaty/wechaty-puppet-oicq',
  ],
  '21044280639@chatroom': [ // Summer of Wechaty Mentor Candidates
    'wechaty/summer*',
  ],
  '22598372108@chatroom': [ // 博文视点《Chatbot从0到1》读者群
    'lijiarui/chatbot-zero-to-one',
  ],
  '18000948607@chatroom': [ // Puppet Wechaty User Group
    'juzibot/donut-tester',
    'juzibot/wxwork-tester',
    'padlocal/wechaty-puppet-padlocal',
    'wechaty/*grpc*',
    'wechaty/*puppet*',
  ],
  '6719192413@chatroom': [ // Wechaty Contributors
    'wechaty/PMC',
  ],

  /**
   * Polyglot Wechaty User Groups
   */
  '18005545363@chatroom': [ // .NET Wechaty User Group
    'wechaty/dotnet-*',
  ],
  '19236545415@chatroom': [ // PHP Wechaty User Group
    'wechaty/php-*',
  ],
  '19459143119@chatroom': [ // OpenAPI Wechaty User Group
    'wechaty/openapi-*',
  ],
  '20062821521@chatroom': [ // Java Wechaty User Group
    'wechaty/java-*',
  ],
  '20771403027@chatroom': [ // Python Wechaty User Group
    'wechaty/python-*',
  ],
  '21063503320@chatroom': [ // Rust Wechaty User Group
    'wechaty/rust-*',
  ],
  '21153390249@chatroom': [ // Go Wechaty User Group
    'wechaty/go-*',
  ],
  '21366491788@chatroom': [ // Scala Wechaty User Group
    'wechaty/scala-*',
  ],
  '21148500489@chatroom': [ // TypeScript Wechaty User Group
    'wechaty/wechaty',
    'wechaty/wechaty-puppet-service',
    'wechaty/wechaty-plugin*',
    'wechaty/wechaty-vorpal*',
    'wechaty/wechaty-redux*',
    'wechaty/cli',
    'wechaty/friday',
    'wechaty/wechaty-getting-started',
  ],

}

export interface RepoConfigEx {
  [repoMatch: string]: string[],
}

const config: RepoConfigEx = {}

Object
  .entries(roomConfig)
  .forEach(([roomId, repoList]) => repoList.forEach(repo => {
    config[repo] = [
      ...(config[repo] || []),
      roomId,
    ]
  }))

export default config as RepoConfig
