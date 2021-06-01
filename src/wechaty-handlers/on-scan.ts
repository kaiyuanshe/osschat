import {
  log,
  Wechaty,
}             from 'wechaty'

import { generate } from 'qrcode-terminal'

// import {
//   duckStore,
//   wechatyActions,
// }                     from '../ducks/'

export default async function onScan (
  this   : Wechaty,
  qrcode : string,
  status : number,
): Promise<void> {
  log.info('on-scan', 'onScan() [%s] %s\nScan QR Code above to log in.',
    status,
    qrcodeValueToUrl(qrcode),
  )

  // duckStore.dispatch(
  //   wechatyActions.scan(
  //     this.id,
  //     qrcode,
  //   )
  // )

  generate(qrcode)
}

/**
 * Generate a QR Code online via
 * http://goqr.me/api/doc/create-qr-code/
 */
function qrcodeValueToUrl (value: string): string {
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(value),
  ].join('')

  return qrcodeImageUrl
}
