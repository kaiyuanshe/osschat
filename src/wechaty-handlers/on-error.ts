import {
  log,
  Wechaty,
}             from 'wechaty'

export default async function onError (
  this : Wechaty,
  e    : Error,
): Promise<void> {
  log.error('on-error', 'onError(%s)', e)
}
