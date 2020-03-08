import test  from 'blue-tape'

import {
  matchOwnerFullname,
  matchRepoFullname,
}               from './match-org-repo'

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
