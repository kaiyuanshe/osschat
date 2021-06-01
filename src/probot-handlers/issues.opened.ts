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

type IssuesOpened = HandlerFunction<
  'issues.opened',
  Omit<
    Context<any>,
    keyof WebhookEvent<any>
  >
>

const issuesOpened: IssuesOpened = async (context) => {
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

export { issuesOpened }
