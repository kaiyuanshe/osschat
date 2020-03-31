import { Application } from 'probot' // eslint-disable-line no-unused-vars
import {
  Router,
  Request,
  Response,
}             from 'express'

import {
  Room,
  ScanStatus,
  Contact,
  Wechaty,
}               from 'wechaty'

import {
  log,
  VERSION,
}               from './config'
import { Chatops } from './chatops'
import { getHAWechaty } from './get-wechaty'

const haBot = getHAWechaty()

interface BotInfo {
  qrcode?: string
  userName?: string
}

const botInfo = new WeakMap<Wechaty, BotInfo>()

haBot.on(
  'scan',
  function (
    this: Wechaty,
    qrcode: string,
    status: ScanStatus,
  ) {
    void status
    const info = { ...botInfo.get(this) } as BotInfo
    info.qrcode = qrcode
    info.userName = undefined
    botInfo.set(this, info)
  },
)
haBot.on(
  'login',
  function (
    this: Wechaty,
    user: Contact,
  ) {
    const info = { ...botInfo.get(this) } as BotInfo
    info.qrcode = undefined
    info.userName = user.name()
    botInfo.set(this, info)
  },
)
haBot.on(
  'logout',
  function (
    this: Wechaty,
  ) {
    const info = { ...botInfo.get(this) } as BotInfo
    info.qrcode = undefined
    info.userName = undefined
    botInfo.set(this, info)
  },
)

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
    const info = botInfo.get(wechaty)
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

  const htmlFoot = `
  </body>
    `

  res.end(
    [
      htmlHead,
      html,
      htmlFoot,
    ].join('\n')
  )

}

async function rootHtml (
  wechaty: Wechaty,
  info: BotInfo = {},
) {
  let html

  if (info.qrcode) {

    html = [
      `<h1>OSSChat v${VERSION}</h1>`,
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
      `<p> OSSChat v${VERSION} User ${info.userName} logined. </p>`,
      FORM_HTML,
      roomHtml,
    ].join('')
  } else {

    html = `OSSChat v${VERSION} Hello, come back later please.`

  }

  return html
}
