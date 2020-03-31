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
