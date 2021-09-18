#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
import { test }  from 'tstest'

import {
  matchOwnerFullname,
  matchRepoFullname,
}               from './match-org-repo.js'

test('matchOwner', async t => {
  t.ok(
    matchOwnerFullname('wechaty', 'wechaty/docs'),
    'should match owner',
  )
  t.notOk(
    matchOwnerFullname('wechaty', 'chatie/blog'),
    'should match owner',
  )
})

test('matchRepo', async t => {
  t.ok(
    matchRepoFullname(
      'docs',
      'wechaty/docs',
    ),
    'should match repo in plan text'
  )

  t.notOk(
    matchRepoFullname(
      'docs',
      'wechaty/matrix',
    ),
    'should not match repo in plan text'
  )

  t.ok(
    matchRepoFullname(
      'docs',
      'wechaty/*cs',
    ),
    'should match repo in wildcat text'
  )

  t.notOk(
    matchRepoFullname(
      'docs',
      'wechaty/*trix',
    ),
    'should not match repo in wildcat text'
  )
})

test('matchOwner between uppercase with lowercase', async t => {
  t.ok(
    matchOwnerFullname(
      'weCHATY',
      'WEchaty/Docs',
    ),
    'should match owner in plan text for different cases'
  )
})

test('matchRepo between uppercase with lowercase', async t => {
  t.ok(
    matchRepoFullname(
      'docs',
      'wechaty/Docs',
    ),
    'should match repo in plan text for different cases'
  )
})

test('matchRepo with empty wildcat', async t => {
  t.ok(
    matchRepoFullname(
      'docs',
      'wechaty/*Docs*',
    ),
    'should match repo with empty wildcat for different cases'
  )
})

test('matchRepo with complex wildcat', async t => {
  const fullName = 'chatie/(blog|*wechaty*)'
  const repoList = [
    'matrix-wechaty-appservice',
    'blog',
  ]

  for (const repo of repoList) {
    t.ok(
      matchRepoFullname(
        repo,
        fullName,
      ),
      'should match repo with complex wildcat for ' + repo
    )
  }
})

test('matchRepo with group wildcat', async t => {
  const fullName = 'wechaty/(python|go|java)-wechaty'
  const repoList = [
    'python-wechaty',
    'go-wechaty',
    'java-wechaty',
  ]

  for (const repo of repoList) {
    t.ok(
      matchRepoFullname(
        repo,
        fullName,
      ),
      'should match repo with group match for ' + repo
    )
  }
})
