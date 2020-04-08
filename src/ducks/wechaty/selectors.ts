import * as types from './types'

export function status (
  state: types.State,
  wechatyId: string,
) {
  if (wechatyId in state) {
    return state.wechaty[wechatyId]
  }
  return {}
}

export function available (
  state: types.State,
  wechatyId: string,
) {
  if (wechatyId in state) {
    return state.wechaty[wechatyId].available === true
  }
  return false
}
