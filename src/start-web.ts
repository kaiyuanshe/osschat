import Hapi, { Request, ResponseToolkit }    from '@hapi/hapi'
import {
  Wechaty,
}               from 'wechaty'

import {
  log,
  PORT,
  VERSION,
}             from './config'
import { chatops } from './chatops'

let wechaty: Wechaty

async function chatopsHandler (request: Request, response: ResponseToolkit) {
  log.info('startWeb', 'chatopsHandler()')

  const payload: {
    chatops: string,
  } = request.payload as any

  await chatops(wechaty, payload.chatops)

  return response.redirect('/')
}

export async function startWeb (bot: Wechaty): Promise<void> {
  log.verbose('startWeb', 'startWeb(%s)', bot)

  let qrcodeValue : undefined | string
  let userName    : undefined | string

  wechaty = bot

  const server =  new Hapi.Server({
    port: PORT,
  })

  const FORM_HTML = `
    <form action="/chatops/" method="post">
      <label for="chatops">ChatOps: </label>
      <input id="chatops" type="text" name="chatops" value="Hello, OSS Bot.">
      <input type="submit" value="ChatOps">
    </form>
  `
  const handler = async () => {
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
      // zhuangbiaowei add code begin
      let rooms = await bot.Room.findAll()
      let room_html : string = ``
      for(let room in rooms){
        const topic = await room.topic()
        room_html = room_html + topic + `</br>/n`
      }
      // zhuangbiaowei add code end

      html = [
        `<p> OSS Bot v${VERSION} User ${userName} logined. </p>`,
        FORM_HTML,
        room_html,
      ].join('')
    } else {

      html = `OSS Bot v${VERSION} Hello, come back later please.`

    }
    return html
  }

  server.route({
    handler,
    method : 'GET',
    path   : '/',
  })

  server.route({
    handler: chatopsHandler,
    method : 'POST',
    path   : '/chatops/',
  })

  bot.on('scan', qrcode => {
    qrcodeValue = qrcode
    userName    = undefined
  })
  bot.on('login', user => {
    qrcodeValue = undefined
    userName    = user.name()
  })
  bot.on('logout', () => {
    userName = undefined
  })

  await server.start()
  log.info('startWeb', 'startWeb() listening to http://localhost:%d', PORT)
}                                                                              
