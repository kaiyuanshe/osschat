import { Application } from 'probot' // eslint-disable-line no-unused-vars
import {
  Router,
  Request,
  Response,
}             from 'express'

import {
  log,
  VERSION,
}               from './config'
import { Chatops } from './chatops'
import { getWechaty } from './get-wechaty'

const bot = getWechaty()

bot.on('scan', qrcode => {
  qrcodeValue = qrcode
  userName = undefined
})
bot.on('login', user => {
  qrcodeValue = undefined
  userName = user.name()
})
bot.on('logout', () => {
  qrcodeValue = undefined
  userName = undefined
})

let qrcodeValue: undefined | string
let userName: undefined | string

const FORM_HTML = `
  <form action="/chatops/" method="get">
    <label for="chatops">ChatOps: </label>
    <input id="chatops" type="text" name="chatops" value="Hello, OSS Bot.">
    <input type="submit" value="ChatOps">
  </form>
`

export default (app: Application) => {
  const routes = app.route() as Router

  routes.get('/', rootHandler)
  routes.get('/chatops/', chatopsHandler)
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

async function rootHandler (_req: Request, res: Response) {
  let html

  if (qrcodeValue) {

    html = [
      `<h1>OSS Bot v${VERSION}</h1>`,
      'Scan QR Code: <br />',
      qrcodeValue + '<br />',
      '<a href="http://goqr.me/" target="_blank">http://goqr.me/</a><br />',
      '\n\n',
      '<image src="',
      'https://api.qrserver.com/v1/create-qr-code/?data=',
      encodeURIComponent(qrcodeValue),
      '">',
    ].join('')

  } else if (userName) {
    let rooms = await bot.Room.findAll()
    let roomHtml = `The rooms I have joined are as follows: <ol>`
    for (let room of rooms) {
      const topic = await room.topic()
      const roomId = room.id
      roomHtml = roomHtml + `<li> ${topic} / ${roomId} </li>\n`
    }
    roomHtml = roomHtml + `</ol>`

    html = [
      `<p> OSS Bot v${VERSION} User ${userName} logined. </p>`,
      FORM_HTML,
      roomHtml,
    ].join('')
  } else {

    html = `OSS Bot v${VERSION} Hello, come back later please.`

  }
  res.end(html)
}
