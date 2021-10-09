import type { HAWechaty } from 'ha-wechaty'

import onScan       from './on-scan.js'
import onError      from './on-error.js'
import onFriendship from './on-friendship.js'
import onLogout     from './on-logout.js'
import onLogin      from './on-login.js'
import onMessage    from './on-message.js'
import onRoomTopic  from './on-room-topic.js'
import onRoomInvite from './on-room-invite.js'
import onRoomJoin   from './on-room-join.js'
import onRoomLeave  from './on-room-leave.js'

const addEventHandlers = (haWechaty: HAWechaty) => {
  haWechaty
    .on('scan',         onScan)
    .on('error',        onError)
    .on('friendship',   onFriendship)
    .on('logout',       onLogout)
    .on('login',        onLogin)
    .on('message',      onMessage)
    .on('room-topic',   onRoomTopic)
    .on('room-invite',  onRoomInvite)
    .on('room-join',    onRoomJoin)
    .on('room-leave',   onRoomLeave)
}

export {
  addEventHandlers,
}
