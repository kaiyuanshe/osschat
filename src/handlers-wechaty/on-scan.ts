import {
  log,
  Wechaty,
  qrcodeValueToImageUrl,
}                         from 'wechaty'

import qrTerminal from 'qrcode-terminal'

// import {
//   duckStore,
//   wechatyActions,
// }                     from '../ducks/.js'

export default async function onScan (
  this   : Wechaty,
  qrcode : string,
  status : number,
): Promise<void> {
  log.info('on-scan', 'onScan() [%s] %s\nScan QR Code above to log in.',
    status,
    qrcodeValueToImageUrl(qrcode),
  )

  // duckStore.dispatch(
  //   wechatyActions.scan(
  //     this.id,
  //     qrcode,
  //   )
  // )

  qrTerminal.generate(qrcode)
}
