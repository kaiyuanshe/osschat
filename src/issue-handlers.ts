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

import { managedRepoConfig } from './config'

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

  await manageIssue(
    context.payload.repository.full_name,
    urlLinkPayload,
  )
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

  console.info(context.payload.repository)

  const urlLinkPayload = {
    description,
    thumbnailUrl,
    title,
    url,
  } as UrlLinkPayload

  await manageIssue(
    context.payload.repository.full_name,
    urlLinkPayload,
  )

  // const issueComment = context.issue({ body: `Thanks for comment this issue! ${n++}` })
  // await context.github.issues.createComment(issueComment)
  // console.info(context)
}

function getRepoRoom (orgRepo: string): undefined | Room {
  if (orgRepo in managedRepoConfig) {
    const roomId = managedRepoConfig[orgRepo]
    return getWechaty().Room.load(roomId)
  }
  return undefined
  // !!login.match(/^(kaiyuanshe|apache)$/i)
}

async function manageIssue (
  orgRepo        : string,
  urlLinkPayload : UrlLinkPayload,
): Promise<void> {

  const room = getRepoRoom(orgRepo)
  if (room) {

    const urlLink = new UrlLink(urlLinkPayload)
    await room.say(urlLink)
  }
}
