export const SCAN   = 'SCAN'
export const LOGIN  = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export interface ActionScanPayload {
  id: string,
  qrcode?   : string,
  userName? : string,
}

export interface ActionLoginPayload {
  userName: string,
}
