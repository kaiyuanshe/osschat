import { combineReducers } from 'redux'

import logonoff, {
  login,
  logout,
  scan,
}         from './logonoff'

import counter, {
  mo,
  mt,
}             from './counter'

export {
  login,
  logout,
  scan,
  mo,
  mt,
}

export default combineReducers({
  counter,
  logonoff,
})
