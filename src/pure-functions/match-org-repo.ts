import micromatch from 'micromatch'

export function matchOwnerFullname (
  owner: string,
  fullName: string,
): boolean {
  return fullName.toLowerCase()
    .startsWith(
      owner.toLowerCase() + '/'
    )
}

export function matchRepoFullname (
  repo: string,
  fullName: string,
): boolean {
  const managedRepo = fullName.split('/')[1]
  // console.info('managedRepo:', managedRepo)
  // console.info('repo:', repo)
  return micromatch.isMatch(
    repo,
    managedRepo,
    {
      nocase: true,
    },
  )
}

export function matchOwner (
  owner: string,
) {
  return function (fullName: string) {
    return matchOwnerFullname(owner, fullName)
  }
}

export function matchRepo (
  repo: string,
) {
  return function (fullName: string) {
    return matchRepoFullname(repo, fullName)
  }
}

export function exactMatch (
  owner: string,
  repo: string,
) {
  return function (fullName: string) {
    return fullName.toLowerCase()
      === `${owner}/${repo}`.toLowerCase()
  }
}
