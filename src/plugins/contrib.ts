import {
  Heartbeat,
  DingDong,
  ChatOps,
}                           from 'wechaty-plugin-contrib'

import {
  CHATOPS_ROOM_ID,
  HEARTBEAT_ROOM_ID,
}                     from '../config.js'

const dingDongPlugin = DingDong({
  mention : false,
  room    : /ChatOps/i,
})

const heartbeatPlugin = Heartbeat({
  emoji: {
    heartbeat : '[爱心]',
    login     : '[太阳]',
    logout    : '[月亮]',
    ready     : '[拳头]',
  },
  intervalSeconds: 60 * 60,       // 1 hour
  room: HEARTBEAT_ROOM_ID,
})

const chatopsPlugin = ChatOps({
  blacklist : ['dong'],
  contact   : true,
  mention   : true,
  room      : CHATOPS_ROOM_ID,
})

export {
  dingDongPlugin,
  heartbeatPlugin,
  chatopsPlugin,
}
