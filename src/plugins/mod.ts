import type { WechatyPlugin } from 'wechaty'

import * as chatoperaPlugins  from './chatopera.js'
import * as contribPlugins    from './contrib.js'

function validPlugin (plugin?: WechatyPlugin): plugin is WechatyPlugin {
  if (!plugin) {
    return false
  }
  return !!plugin.name
}

const pluginMap = {
  ...chatoperaPlugins,
  ...contribPlugins,
}
const pluginList = Object.values(pluginMap)
  .filter(validPlugin)

export {
  pluginList,
}
