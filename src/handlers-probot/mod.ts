import type { Probot } from 'probot'

import { issueCommentCreatedPlugin }              from './issue-comment.created.js'
import { issuesOpenedPlugin }                     from './issues.opened.js'
import { pullRequestReviewCommentCreatedPlugin }  from './pull-request-review-comment.created.js'
import { pullRequestReviewSubmittedPlugin }       from './pull-request-review.submitted.js'
import { pullRequestOpenedPlugin }                from './pull-request.opened.js'

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
