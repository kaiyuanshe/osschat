import {
  combineReducers,
  createStore,
}                   from 'redux'

interface LogonoffState {
  [k: string]: {
    qrcode?   : string,
    userName? : string,
  }
}

interface CounterState {
  mt: number,
  mo: number,
}

// interface OssChatState {
//   logonoff : LogonoffState,
//   counter  : CounterState,
// }

function logonoff (
  state: LogonoffState = {},
  action: Action,
) {
  if (!action) {
    return state
  }

  const newState = { ...state } as LogonoffState

  switch (action.type) {
    case 'SCAN':
      newState[action.wechaty.id] = {
        qrcode: action.qrcode,
      }
      return newState
    case 'LOGIN':
      newState[action.wechaty.id] = {
        userName: action.userName,
      }
      return newState
    case 'LOGOUT':
      newState[action.wechaty.id] = {}
      return newState
    default:
      return state
  }
}

const DEFAULT_COUNTER_STATE = {
  mo: 0,
  mt: 0,
} as CounterState

function counter (
  state = DEFAULT_COUNTER_STATE,
  action: any,
) {
  switch (action.type) {
    case 'MESSAGE/MO':
      return {
        ...state,
        mo: state.mo + 1,
      }
    case 'MESSAGE/MT':
      return {
        ...state,
        mt: state.mt + 1,
      }
    default:
      return state
  }
}

// const DEFAULT_OSSCHAT_STATE = {
//   counter: {
//     mo: 0,
//     mt: 0,
//   },
//   logonoff: {},
// } as OssChatState

// function osschatApp(
//   state: OssChatState = DEFAULT_OSSCHAT_STATE,
//   action: Action,
// ) {
//   return {
//     counter  : counter(state.counter, action),
//     logonoff : logonoff(state.logonoff, action),
//   }
// }

const reducer = combineReducers({
  counter,
  logonoff,
})

const store = createStore(reducer)

interface Action {
  type: string,
  [k: string]: any,
}

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => console.info(store.getState()))

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'MESSAGE/MO' })
// 1
store.dispatch({ type: 'MESSAGE/MT' })
// 2
store.dispatch({
  type: 'LOGIN',
  userName: 'test name',
  wechaty: {
    id: 'wechatyid',
  },
})
// 1
