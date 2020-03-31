import {
  createStore,
}                   from 'redux'

import reducer, {
  logonoffActions,
  counterActions,
}                   from './ducks/'

const store = createStore(reducer)

store.subscribe(() => console.info(store.getState()))

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch(counterActions.mo())
// 1
store.dispatch(counterActions.mt())
// 2
store.dispatch(
  logonoffActions.login({
    userName: 'test name',
    wechaty: {
      id: 'wechatyid',
    },
  }),
)
// 1
