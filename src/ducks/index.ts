/**
 *  Huan(202003): Redux with Ducks
 *
 *  Scaling your Redux App with ducks:
 *    https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/
 *
 *  Redux Toolkit - Usage With TypeScript:
 *    https://redux-toolkit.js.org/usage/usage-with-typescript
 *
 */
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

const reducer = combineReducers({
  counter,
  logonoff,
})

export default reducer
