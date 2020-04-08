export const SCAN   = 'osschat/wechaty/event/SCAN'
export const LOGIN  = 'osschat/wechaty/event/LOGIN'
export const LOGOUT = 'osschat/wechaty/event/LOGOUT'
export const MESSAGE = 'osschat/wechaty/event/MESSAGE'

export const HA_DING         = 'osschat/wechaty/event/HA_DING'
export const HA_DING_TIMEOUT = 'osschat/wechaty/event/HA_DING_TIMEOUT'
export const HA_DING_SUCCESS = 'osschat/wechaty/event/HA_DING_SUCCESS'
export const HA_DONG         = 'osschat/wechaty/event/HA_DONG'

export const SWITCH_ON  = 'osschat/wechaty/event/SWITCH_ON'
export const SWITCH_OFF = 'osschat/wechaty/event/SWITCH_OFF'

export interface State {
  [k: string]: {  // wechaty id
    qrcode?   : string,
    userName? : string,
    available?: boolean
  }
}
