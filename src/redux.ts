import { configureStore } from '@reduxjs/toolkit'
// import {
//   createStore,
// }                   from 'redux'

// import reducer from './ducks/'

import reducer, {
  logonoffActions,
  counterActions,
}                   from './ducks/'

const store = configureStore({
  reducer,
})

store.subscribe(() => console.info(store.getState()))

store.dispatch(counterActions.mo())
store.dispatch(logonoffActions.scan('1', '2'))

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
