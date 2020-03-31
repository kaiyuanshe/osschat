import { combineReducers } from 'redux'

import logonoff, {
  logonoffActions,
}                   from './logonoff'

import counter, {
  counterActions,
}                   from './counter'

export {
  logonoffActions,
  counterActions,
}

export default combineReducers({
  counter,
  logonoff,
})
