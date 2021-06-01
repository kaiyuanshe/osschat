import {
  log,
  UrlLinkPayload,
  UrlLink,
  Room,
}                     from 'wechaty'
import request from 'request'

import {
  projectsRepoConfig,
}                       from './config-projects/mod'

import {
  matchOwner,
  matchRepo,
  // exactMatch,
}               from './pure-functions/match-org-repo'

import { getBot } from './get-bot'
import { Chatops } from './chatops'

async function deliverCard (
  owner          : string,
  repository     : string,
  urlLinkPayload : UrlLinkPayload,
): Promise<void> {
  const len = urlLinkPayload.description!.length

  if (len > 70) {
    urlLinkPayload.description = urlLinkPayload.description?.slice(0, Math.max(len, 70))
  }

  log.verbose('issue-handlers', 'manageIssue(%s, %s, %s)', owner, repository, JSON.stringify(urlLinkPayload))

  const urlLink = new UrlLink(urlLinkPayload)
  await Chatops.instance().queue(
    async () => {
      await Chatops.instance().say(urlLinkPayload.url)
      await Chatops.instance().say(urlLink)
    },
    'issue card for chatops',
  )

  if (owner === 'juzibot' && repository === 'Juzi-WeChat-Work-Tasks') {
    const wxBotUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send'
    const key      = process.env['JUZI_WECHAT_WORK_TASKS_BOT_KEY']

    const options = {
      body: {
        markdown: {
          content: `[${urlLinkPayload.title}](${urlLinkPayload.url}) \n ${urlLinkPayload.description}`,
        },
        msgtype: 'markdown',
      },
      headers: { 'content-type': 'application/json' },
      json: true,
      method: 'POST',
      qs: { key: key },
      url: wxBotUrl,
    }

    request(options, function (error) {
      if (error) throw new Error(error)
    })

  }

  const roomList = await getRoomList(owner, repository)
  if (roomList.length <= 0) {
    return
  }

  for (const room of roomList) {
    log.verbose('issue-handlers', 'manageIssue() sending to room %s', room)
    await Chatops.instance().queue(
      () => room.say(urlLink),
      'issue card in ' + room,
    )
  }

  log.verbose('issue-handler', 'manageIssue(%s, %s) done', owner, repository)
}

// function isBot (login: string): boolean {
//   const matched = login.match(/\[bot\]$/i)
//   return matched !== null
// }

async function getRoomList (
  owner      : string,
  repository : string,
): Promise<Room[]> {
  log.verbose('issue-handler', 'getRoom(%s, %s, config)', owner, repository)

  const managedList = Object.keys(projectsRepoConfig)

  const matchedList = managedList
    .filter(matchOwner(owner))
    .filter(matchRepo(repository))

  log.verbose('issue-handler', 'getRoom() found %s matched', matchedList.length)

  /**
   * `wechaty/python-wechaty` will have higher priority than `wechaty/*wechaty*`
   */
  // const exactMatchList = matchedList
  //   .filter(exactMatch(owner, repository))

  // log.verbose('issue-handler', 'getRoom() found %s exact matched', exactMatchList.length)

  /**
   * If we have exactly the match found,
   * then we will only process the exactly match ones.
   */
  // if (exactMatchList.length > 0) {
  //   log.verbose('issue-handler', 'getRoom() list that does not exact matched are dropped')
  //   matchedList = exactMatchList
  // }

  const idsToRooms = async (idOrList: string | string[]) => {
    if (Array.isArray(idOrList)) {
      const roomList = await Promise.all(
        idOrList.map(
          id => getBot().Room.load(id)
        )
      )
      return roomList.filter(r => !!r) as Room[]
    } else {
      const room = await getBot().Room.load(idOrList)
      return room ? [room] : []
    }
  }

  const roomIdList: string[] = []
  for (const fullName of matchedList) {
    log.verbose('issue-handler', 'getRoom() adding rooms for fullName "%s"', fullName)
    const roomIdOrList = projectsRepoConfig[fullName]!
    if (Array.isArray(roomIdOrList)) {
      roomIdList.push(...roomIdOrList)
    } else {
      roomIdList.push(roomIdOrList)
    }
  }

  // make the id unique (in case an id appear in different repo configs)
  const roomList = await idsToRooms(
    [...new Set(roomIdList)],
  )

  return roomList
}

export {
  deliverCard,
}
