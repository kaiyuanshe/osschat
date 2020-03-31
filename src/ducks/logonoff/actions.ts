import {
  createAction,
}                 from '@reduxjs/toolkit'

import * as types from './types'

const prepareScan = (
  id: string,
  qrcode: string,
) => {
  const payload = {
    id,
    qrcode,
  }
  return { payload }
}

const prepareLogin = (
  id: string,
  userName: string,
) => {
  const payload = {
    id,
    userName,
  }
  return { payload }
}

const prepareLogout = (
  id: string,
) => {
  const payload = {
    id,
  }
  return { payload }
}

export const scan   = createAction(types.SCAN, prepareScan)
export const login  = createAction(types.LOGIN, prepareLogin)
export const logout = createAction(types.LOGOUT, prepareLogout)
