import {
  createReducer,
}                   from '@reduxjs/toolkit'

import * as types from './types'
// import * as actions from './actions'

const initialState = {
  mo: 0,
  mt: 0,
} as types.CounterState

const moReducer = (state: types.CounterState) => ({
  ...state,
  mo: state.mo + 1,
})

const mtReducer = (state: types.CounterState) => ({
  ...state,
  mt: state.mt + 1,
})

const counterReducer = createReducer(
  initialState,
  {
    [types.MO]: moReducer,
    [types.MT]: mtReducer,
  },
)

export default counterReducer
