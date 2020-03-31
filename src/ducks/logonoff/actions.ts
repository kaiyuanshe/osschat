import * as types from './types'

export const scan = (
  payload: types.ActionScanPayload,
) => ({
  ...payload,
  type: types.SCAN,
})

export const login = (
  payload: types.ActionLoginPayload,
) => ({
  ...payload,
  type: types.LOGIN,
})

export const logout = () => ({
  type: types.LOGOUT,
})
