import type {
  Probot,
}             from 'probot'
import {
  UrlLinkPayload,
  log,
}                 from 'wechaty'

import { deliverCard } from '../deliver-card'

const pullRequestReviewCommentCreatedPlugin = (app: Probot) => app.on('pull_request_review_comment.created', async (context) => {
  const fullName = context.payload.repository.full_name
  const issueNumber = context.payload.pull_request.number
  const issueTitle = context.payload.pull_request.title
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

  const urlLinkPayload = {
    description,
    thumbnailUrl,
    title,
    url,
  } as UrlLinkPayload

  try {
    await deliverCard(
      context.payload.repository.owner.login,
      context.payload.repository.name,
      urlLinkPayload,
    )
  } catch (e) {
    log.error('issue-handler', 'commentIssue() manageIssue(%s) rejection: %s',
      context.payload.repository.full_name,
      e,
    )
  }
})

export { pullRequestReviewCommentCreatedPlugin }
