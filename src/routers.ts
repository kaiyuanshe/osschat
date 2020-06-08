import { Application } from 'probot' // eslint-disable-line no-unused-vars
import {
  Router,
  Request,
  Response,
}             from 'express'

import {
  Room,
  Wechaty,
}               from 'wechaty'

import {
  log,
  VERSION,
}               from './config'
import { Chatops } from './chatops'
import { getHAWechaty } from './get-wechaty'

// import {
//   duckStore,
//   wechatySelectors,
//   counterSelectors,
// }                     from './ducks/'

const haBot = getHAWechaty()

const FORM_HTML = `
  <form action="/chatops/" method="get">
    <label for="chatops">ChatOps: </label>
    <input id="chatops" type="text" name="chatops" value="Hello, OSSChat.">
    <input type="submit" value="ChatOps">
  </form>
`

export default (app: Application) => {
  const routes = app.route() as Router

  routes.get('/', rootHandler)
  routes.get('/chatops/', chatopsHandler)
  routes.get('/logout/', logoutHandler)
}

async function logoutHandler (
  req: Request,
  res: Response,
) {
  log.info('routers', 'chatopsHandler()')

  await Chatops.instance().say('Logout request from web')

  const {
    secret,
  } = req.query as { secret?: string }

  if (secret && secret === process.env.HUAN_SECRET) {
    await haBot.logout()
    await Chatops.instance().say('Logout request from web accepted')

    res.end('logged out')
    return
  }

  res.end('permission denied')
  await Chatops.instance().say('Logout request from denied')
}

async function chatopsHandler (
  req: Request,
  res: Response,
) {
  log.info('routers', 'chatopsHandler()')

  const {
    chatops,
  } = req.query as { chatops?: string }

  if (!chatops) {
    log.error('routers', 'chatopsHandler() received empty param.')
    res.redirect('/')
    return
  }

  await Chatops.instance().say(chatops)
  return res.redirect('/')
}

async function rootHandler (
  _req: Request,
  res: Response,
) {
  let html = ''
  for (const wechaty of haBot.wechatyList) {
    // const info = wechatySelectors.status(
    //   duckStore.getState().wechaty,
    //   wechaty.id,
    // )
    const info = 'TODO'

    html += [
      '<hr />\n',
      await rootHtml(wechaty, info),
      '<hr />\n',
    ].join('')
  }

  const htmlHead = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8"/>
  </head>
  <body>
    `

  const mt = 0 // counterSelectors.mt(duckStore.getState().counter)
  const mo = 0 // counterSelectors.mo(duckStore.getState().counter)

  const htmlCounter = `
  <hr />
  <ul>
    <li>Message Received: ${mt}</li>
    <li>Message Sent: ${mo}</li>
  </ul>
  `
  const htmlFoot = `
  </body>
  </html>
    `
  res.end(
    [
      htmlHead,
      FORM_HTML,
      html,
      htmlCounter,
      htmlFoot,
    ].join('\n')
  )

}

async function rootHtml (
  wechaty: Wechaty,
  info: any, // ReturnType<typeof wechatySelectors.status>,
) {

  let html

  if (info.qrcode) {

    html = [
      `<h1>OSSChat v${VERSION} via ${escapeHtml(wechaty.puppet.toString())}</h1>`,
      'Scan QR Code: <br />',
      info.qrcode + '<br />',
      '<a href="http://goqr.me/" target="_blank">http://goqr.me/</a><br />',
      '\n\n',
      '<image src="',
      'https://api.qrserver.com/v1/create-qr-code/?data=',
      encodeURIComponent(info.qrcode),
      '">',
    ].join('')

  } else if (info.userName) {
    let rooms = await wechaty.Room.findAll()
    rooms = rooms.sort((a, b) => a.id > b.id ? 1 : -1)
    let roomHtml = `The rooms I have joined are as follows: <ol>`

    const roomInfo = async (room: Room) => {
      const id = room.id
      const topic = await room.topic()
      return { id, topic }
    }

    const roomInfoList = await Promise.all(rooms.map(roomInfo))
    const sortedList = roomInfoList.sort((a, b) => a.topic > b.topic ? 1 : -1)

    for (const info of sortedList) {
      roomHtml = roomHtml + `<li> ${info.topic} / ${info.id} </li>\n`
    }
    roomHtml = roomHtml + `</ol>`

    html = [
      `<p> OSSChat v${VERSION} User ${info.userName} logined via ${escapeHtml(wechaty.puppet.toString())}. </p>`,
      roomHtml,
    ].join('')
  } else {

    html = `OSSChat v${VERSION} via ${escapeHtml(wechaty.puppet.toString())} Hello, come back later please.`

  }

  return html
}

/**
 * https://stackoverflow.com/a/6234804/1123955
 */
function escapeHtml (unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&quot;')
    .replace(/'/g, '&#039;')
}
