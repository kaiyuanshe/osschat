import createReducer from '../create-reducer'

import * as types from './types'

interface CounterState {
  mt: number,
  mo: number,
}

const initialState = {
  mo: 0,
  mt: 0,
} as CounterState

const moReducer = (state: CounterState) => ({
  ...state,
  mo: state.mo + 1,
})

const mtReducer = (state: CounterState) => ({
  ...state,
  mt: state.mt + 1,
})

const counterReducer = createReducer(initialState)({
  [types.MO]: moReducer,
  [types.MT]: mtReducer,
})

export default counterReducer
