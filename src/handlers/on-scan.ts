import {
  log,
  Wechaty,
}             from 'wechaty'

export default async function onScan (
  this   : Wechaty,
  qrcode : string,
  status : number,
): Promise<void> {
  log.info('on-scan', 'onScan() [%s] %s\nScan QR Code above to log in.',
    status,
    qrcodeValueToUrl(qrcode),
  )
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
