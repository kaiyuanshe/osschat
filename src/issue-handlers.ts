import {
  Context,
}             from 'probot'
import {
  WebhookEvent,
}               from '@octokit/webhooks'
import {
  HandlerFunction,
}                   from '@octokit/webhooks/dist-types/types'

import {
  UrlLink,
  UrlLinkPayload,
  Room,
}                     from 'wechaty'

import { getBot } from './get-bot'

import { Chatops } from './chatops'

import request from 'request'

import {
  managedRepoConfig,
  log,
}                     from './config'

import {
  matchOwner,
  matchRepo,
  // exactMatch,
}               from './pure-functions/match-org-repo'

type OpenIssueHandler = HandlerFunction<
  'issues.opened',
  Omit<
    Context<any>,
    keyof WebhookEvent<any>
  >
>

type CommentIssueHandler = HandlerFunction<
  'issue_comment.created',
  Omit<
    Context<any>,
    keyof WebhookEvent<any>
  >
>

export const openIssue: OpenIssueHandler = async (context) => {
  const fullName = context.payload.repository.full_name
  const issueNumber = context.payload.issue.number
  const issueTitle = context.payload.issue.title
  const issueBody = context.payload.issue.body
  const htmlUrl = context.payload.issue.html_url
  const avatarUrl = context.payload.repository.owner.avatar_url

  const title = [
    `#${issueNumber}`,
    issueTitle.slice(0, Math.max(issueTitle.length, 30)),
    fullName,
  ].join(' ')
  const url = htmlUrl
  const description = issueBody.slice(0, Math.max(issueBody.length, 70))
  const thumbnailUrl = avatarUrl

  const urlLinkPayload = {
    description,
    thumbnailUrl,
    title,
    url,
  } as UrlLinkPayload

  manageIssue(
    context.payload.repository.owner.login,
    context.payload.repository.name,
    urlLinkPayload,
  ).catch(e => log.error('issue-handler', 'openIssue() manageIssue(%s) rejection: %s',
    context.payload.repository.full_name,
    e,
  ))
}

export const commentIssue: CommentIssueHandler = async (context) => {
  // const issue = context .issue()
  // console.info(context.payload.repository)
  const fullName = context.payload.repository.full_name
  const issueNumber = context.payload.issue.number
  const issueTitle = context.payload.issue.title
  const commentBody = context.payload.comment.body
  const htmlUrl = context.payload.comment.html_url
  const avatarUrl = context.payload.comment.user.avatar_url

  const title = [
    `#${issueNumber}`,
    issueTitle.slice(0, Math.max(issueTitle.length, 30)),
    fullName,
  ].join(' ')
  const url = htmlUrl
  const description = commentBody.slice(0, Math.max(commentBody.length, 70))
  const thumbnailUrl = avatarUrl

  // console.info(context.payload.repository)

  const urlLinkPayload = {
    description,
    thumbnailUrl,
    title,
    url,
  } as UrlLinkPayload

  manageIssue(
    context.payload.repository.owner.login,
    context.payload.repository.name,
    urlLinkPayload,
  ).catch(e => log.error('issue-handler', 'commentIssue() manageIssue(%s) rejection: %s',
    context.payload.repository.full_name,
    e,
  ))
  // const issueComment = context.issue({ body: `Thanks for comment this issue! ${n++}` })
  // await context.github.issues.createComment(issueComment)
  // console.info(context)
}

async function getRoomList (
  owner      : string,
  repository : string,
): Promise<Room[]> {
  log.verbose('issue-handler', 'getRoom(%s, %s, config)', owner, repository)

  const managedList = Object.keys(managedRepoConfig)

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
    const roomIdOrList = managedRepoConfig[fullName]
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

async function manageIssue (
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
    const key      = process.env.JUZI_WECHAT_WORK_TASKS_BOT_KEY

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
