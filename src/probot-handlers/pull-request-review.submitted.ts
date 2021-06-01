import {
  UrlLinkPayload,
  log,
}                 from 'wechaty'
import {
  Context,
}             from 'probot'
import {
  WebhookEvent,
}               from '@octokit/webhooks'
import {
  HandlerFunction,
}                   from '@octokit/webhooks/dist-types/types'

import { deliverCard } from '../deliver-card'

type PullRequestReviewSubmitted = HandlerFunction<
  'pull_request_review.submitted',
  Omit<
    Context<any>,
    keyof WebhookEvent<any>
  >
>

const pullRequestReviewSubmitted: PullRequestReviewSubmitted = async (context) => {
  const fullName = context.payload.repository.full_name
  const pullRequestNumber = context.payload.pull_request.number
  const pullRequestTitle = context.payload.pull_request.title
  const pullRequestBody = context.payload.pull_request.body
  const htmlUrl = context.payload.pull_request.html_url
  const avatarUrl = context.payload.repository.owner.avatar_url

  const title = [
    `#${pullRequestNumber}`,
    pullRequestTitle.slice(0, Math.max(pullRequestTitle.length, 30)),
    fullName,
  ].join(' ')
  const url = htmlUrl
  const description = pullRequestBody.slice(0, Math.max(pullRequestBody.length, 70))
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
}

export { pullRequestReviewSubmitted }
