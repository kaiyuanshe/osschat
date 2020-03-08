import {
  OnCallback,
}              from 'probot/lib/application'
import Webhooks from '@octokit/webhooks'

import {
  UrlLink,
  UrlLinkPayload,
  Room,
}                     from 'wechaty'

import { getWechaty } from './get-wechaty'

import { Chatops } from './chatops'

import {
  managedRepoConfig,
  log,
}                     from './config'

import {
  matchOwner,
  matchRepo,
  exactMatch,
}               from './pure-functions/match-org-repo'

export const openIssue: OnCallback<Webhooks.WebhookPayloadIssues> = async (context) => {
  const fullName = context.payload.repository.full_name
  const issueNumber = context.payload.issue.number
  const issueTitle = context.payload.issue.title
  const issueBody = context.payload.issue.body
  const htmlUrl = context.payload.issue.html_url
  const avatarUrl = context.payload.repository.owner.avatar_url

  const title = [
    fullName,
    `#${issueNumber}`,
    issueTitle.slice(0, Math.max(issueTitle.length, 30)),
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

export const commentIssue: OnCallback<Webhooks.WebhookPayloadIssueComment> = async (context) => {
  // const issue = context .issue()
  // console.info(context.payload.repository)
  const fullName = context.payload.repository.full_name
  const issueNumber = context.payload.issue.number
  const issueTitle = context.payload.issue.title
  const commentBody = context.payload.comment.body
  const htmlUrl = context.payload.comment.html_url
  const avatarUrl = context.payload.comment.user.avatar_url

  const title = [
    fullName,
    `#${issueNumber}`,
    issueTitle.slice(0, Math.max(issueTitle.length, 30)),
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

function getRoomList (
  owner      : string,
  repository : string,
): Room[] {
  log.verbose('issue-handler', 'getRoom(%s, %s, config)', owner, repository)

  const managedList = Object.keys(managedRepoConfig)

  let matchedList = managedList
    .filter(matchOwner(owner))
    .filter(matchRepo(repository))

  log.verbose('issue-handler', 'getRoom() found %s matched', matchedList.length)

  /**
   * `wechaty/python-wechaty` will have higher priority than `wechaty/*wechaty*`
   */
  const exactMatchList = matchedList
    .filter(exactMatch(owner, repository))

  log.verbose('issue-handler', 'getRoom() found %s exact matched', exactMatchList.length)

  /**
   * If we have exactly the match found,
   * then we will only process the exactly match ones.
   */
  if (exactMatchList.length > 0) {
    log.verbose('issue-handler', 'getRoom() list that does not exact matched are dropped')
    matchedList = exactMatchList
  }

  const roomList: Room[] = []
  const idsToRooms = (idOrList: string | string[]) => {
    if (Array.isArray(idOrList)) {
      return idOrList.map(
        id => getWechaty().Room.load(id)
      )
    } else {
      return [
        getWechaty().Room.load(idOrList),
      ]
    }
  }

  for (const fullName of matchedList) {
    log.verbose('issue-handler', 'getRoom() adding rooms for fullName "%s"', fullName)
    const roomIdOrList = managedRepoConfig[fullName]
    roomList.push(...idsToRooms(roomIdOrList))
  }

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

  const roomList = getRoomList(owner, repository)
  if (roomList.length <= 0) {
    return
  }

  const urlLink = new UrlLink(urlLinkPayload)
  await Chatops.instance().queue(
    () => Chatops.instance().say(urlLink),
    'issue card for chatops',
  )

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
