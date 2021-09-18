import type { Probot } from 'probot'

import { issueCommentCreatedPlugin } from './issue-comment.created'
import { issuesOpenedPlugin } from './issues.opened'
import { pullRequestReviewCommentCreatedPlugin } from './pull-request-review-comment.created'
import { pullRequestReviewSubmittedPlugin } from './pull-request-review.submitted'
import { pullRequestOpenedPlugin } from './pull-request.opened'

const pluginList = [
  issueCommentCreatedPlugin,
  issuesOpenedPlugin,
  pullRequestReviewCommentCreatedPlugin,
  pullRequestReviewSubmittedPlugin,
  pullRequestOpenedPlugin,
]

const configureProbot = (app: Probot) => {
  pluginList.forEach(plugin => plugin(app))
}

export { configureProbot }
