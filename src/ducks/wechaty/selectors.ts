import * as types from './types'

export function status (
  state: types.State,
  wechatyId: string,
) {
  if (wechatyId in state) {
    return state[wechatyId]
  }
  return {}
}

export function available (
  state: types.State,
  wechatyId: string,
) {
  if (wechatyId in state) {
    return state[wechatyId].available === true
  }
  return false
}
