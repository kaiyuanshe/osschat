import type { RepoConfig } from './config.js'
const roomConfig = {
  '21688825081@chatroom': [
    'Wuzhijieoooo/HelloGitHub',
    'Wuzhijieoooo/fe-interview',
    'Wuzhijieoooo/Learn-Git-in-30-days',
    'Wuzhijieoooo/oss-chat',
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
