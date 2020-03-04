import {
  OnCallback,
}              from 'probot/lib/application'
import Webhooks from '@octokit/webhooks'

import { getWechaty } from './get-wechaty'
import {
  UrlLink,
  UrlLinkPayload,
}                     from 'wechaty'

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

  if (belongsToApache(context.payload.repository.owner.login)) {
    await chatopsIssue({
      description,
      thumbnailUrl,
      title,
      url,
    })
  }
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

  if (belongsToApache(context.payload.repository.owner.login)) {
    await chatopsIssue({
      description,
      thumbnailUrl,
      title,
      url,
    })
  }

  // const issueComment = context.issue({ body: `Thanks for comment this issue! ${n++}` })
  // await context.github.issues.createComment(issueComment)
  // console.info(context)
}

function belongsToApache (login: string): boolean {
  return !!login.match(/^(kaiyuanshe|apache)$/i)
}

async function chatopsIssue (
  payload: UrlLinkPayload,
) {
  console.info('chatopsIssue:', JSON.stringify(payload))

  const wechaty = getWechaty()

  const urlLink = new UrlLink(payload)

  const DEV_ROOM_ID = ''
  const room = wechaty.Room.load(DEV_ROOM_ID)

  await room.say(urlLink)
}
