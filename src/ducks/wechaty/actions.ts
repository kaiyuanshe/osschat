import {
  Message,
}           from 'wechaty'
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

const prepareMessage = (
  message: Message,
) => {
  const payload = {
    message,
  }
  return { payload }
}

const prepareHaDing = (
  payload: string,
) => ({ payload })

const prepareHaDingTimeout = (
  payload: string,
) => ({ payload })

const prepareHaDingSuccess = (
  payload: string,
) => ({ payload })

const prepareHaDong = (
  payload: string,
) => ({ payload })

const prepareSwitchOn = (
  payload: true | 'pending',
) => ({ payload })

const prepareSwitchOff = (
  payload: true | 'pending',
) => ({ payload })

export const scan   = createAction(types.SCAN, prepareScan)
export const login  = createAction(types.LOGIN, prepareLogin)
export const logout = createAction(types.LOGOUT, prepareLogout)
export const message = createAction(types.MESSAGE, prepareMessage)

export const haDing        = createAction(types.HA_DING,          prepareHaDing)
export const haDingTimeout = createAction(types.HA_DING_TIMEOUT,  prepareHaDingTimeout)
export const haDingSuccess = createAction(types.HA_DING_SUCCESS,  prepareHaDingSuccess)
export const haDong        = createAction(types.HA_DONG,          prepareHaDong)

export const switchOn  = createAction(types.SWITCH_ON,  prepareSwitchOn)
export const switchOff = createAction(types.SWITCH_OFF, prepareSwitchOff)
