import createReducer from '../create-reducer'

import * as types from './types'

interface LogonoffState {
  [k: string]: {
    qrcode?   : string,
    userName? : string,
  }
}

const initialState: LogonoffState = {}

const scanReducer = (state: LogonoffState, action: any) => ({
  ...state,
  [action.wechaty.id]: {
    qrcode: action.qrcode,
  },
}) as LogonoffState

const loginReducer = (state: LogonoffState, action: any) => ({
  ...state,
  [action.wechaty.id]: {
    userName: action.userName,
  },
}) as LogonoffState

const logoutReducer = (state: LogonoffState, action: any) => ({
  ...state,
  [action.wechaty.id]: {},
}) as LogonoffState

const logonoffReducer = createReducer(initialState)({
  [types.SCAN]   : scanReducer,
  [types.LOGIN]  : loginReducer,
  [types.LOGOUT] : logoutReducer,
})

export default logonoffReducer
