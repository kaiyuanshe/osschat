import {
  createReducer,
  Action,
}                   from '@reduxjs/toolkit'

import * as types from './types'
import * as actions from './actions'

export interface LogonoffState {
  [k: string]: {
    qrcode?   : string,
    userName? : string,
  }
}

const initialState: LogonoffState = {}

const scanReducer = (state: LogonoffState, action: Action) => {
  if (actions.scan.match(action)) {
    return {
      ...state,
      [action.payload.id]: {
        qrcode: action.payload.qrcode,
      },
    }
  }
  return state
}

const loginReducer = (state: LogonoffState, action: Action) => {
  if (actions.login.match(action)) {
    return {
      ...state,
      [action.payload.id]: {
        userName: action.payload.userName,
      },
    }
  }
  return state
}

const logoutReducer = (state: LogonoffState, action: Action) => {
  if (actions.logout.match(action)) {
    return {
      ...state,
      [action.payload.id]: {},
    }
  }
  return state
}

/**
 * https://redux-toolkit.js.org/usage/usage-with-typescript#building-type-safe-reducer-argument-objects
 */
// const logonoffReducder = createReducer(0, builder =>
//   builder
//     .addCase(types.SCAN, (state, action) => {
//       // action is inferred correctly here
//       console.info(state, action.payload)
//     })
//     .addCase(types.LOGIN, (state, action) => {
//       console.info(state, action)
//     })
//     .addCase(types.LOGOUT, (state, action) => {
//       console.info(state, action)
//     })
// )

const logonoffReducer = createReducer(
  initialState,
  {
    [types.SCAN]   : scanReducer,
    [types.LOGIN]  : loginReducer,
    [types.LOGOUT] : logoutReducer,
  },
)

export default logonoffReducer
