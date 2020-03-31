import * as types from './types'

export function status (
  state: types.LogonoffState,
  wechatyId: string,
) {
  if (wechatyId in state) {
    return state[wechatyId]
  }
  return {}
}
