import {
  createReducer,
  Action,
}                   from '@reduxjs/toolkit'

import * as types from './types'
import * as actions from './actions'

const initialState: types.State = {
  wechaty: {},
}

const scanReducer = (state: types.State, action: Action) => {
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

const loginReducer = (state: types.State, action: Action) => {
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

const logoutReducer = (state: types.State, action: Action) => {
  if (actions.logout.match(action)) {
    return {
      ...state,
      [action.payload.id]: {},
    }
  }
  return state
}

const haDingTimeoutReducer = (state: types.State, action: Action) => {
  if (actions.haDingTimeout.match(action)) {
    const newEntry = {
      ...state.wechaty[action.payload],
      available: false,
    }
    return {
      ...state,
      [action.payload]: newEntry,
    }
  }
  return state
}

const haDingSuccessReducer = (state: types.State, action: Action) => {
  if (actions.haDingSuccess.match(action)) {
    const newEntry = {
      ...state.wechaty[action.payload],
      available: true,
    }
    return {
      ...state,
      [action.payload]: newEntry,
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

    // [types.HA_DING]: haDingReducer,
    [types.HA_DING_SUCCESS]: haDingSuccessReducer,
    [types.HA_DING_TIMEOUT]: haDingTimeoutReducer,
    // [types.HA_DONG]: haDongReducer,
  },
)

export default logonoffReducer
