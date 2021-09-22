import type {
  Probot,
}             from 'probot'
import {
  UrlLinkPayload,
  log,
}                 from 'wechaty'

import { deliverCard } from '../deliver-card.js'

const pullRequestReviewSubmittedPlugin = (app: Probot) => app.on('pull_request_review.submitted', async (context) => {
  const fullName = context.payload.repository.full_name
  const pullRequestNumber = context.payload.pull_request.number
  const pullRequestTitle = context.payload.pull_request.title
  const pullRequestReviewBody = context.payload.review.body || ''
  const avatarUrl = context.payload.review.user.avatar_url
  const htmlUrl = context.payload.pull_request.html_url

  const title = [
    `#${pullRequestNumber}`,
    pullRequestTitle.slice(0, Math.max(pullRequestTitle.length, 30)),
    fullName,
  ].join(' ')
  const url = htmlUrl
  const description = pullRequestReviewBody.slice(0, Math.max(pullRequestReviewBody.length, 70))
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
    log.error('issue-handler', 'openIssue() manageIssue(%s) rejection: %s',
      context.payload.repository.full_name,
      e,
    )
  }
})

export { pullRequestReviewSubmittedPlugin }
