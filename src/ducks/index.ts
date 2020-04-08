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

/**
 * Import all Redux from RTK
 */
import {
  combineReducers,
  configureStore,
  // Action,
  EnhancedStore,
}                           from '@reduxjs/toolkit'
// import {
//   combineEpics,
//   createEpicMiddleware,
//   ActionsObservable,
//   StateObservable,
// }                         from 'redux-observable'

// import { BehaviorSubject } from 'rxjs'
// import {
//   mergeMap,
// }                         from 'rxjs/operators'

import wechaty, {
  wechatyActions,
  wechatySelectors,
  // wechatyEpic,
}                     from './wechaty'
import counter, {
  counterActions,
  counterSelectors,
}                     from './counter'

/**
 * Reducer
 */
const reducer = combineReducers({
  counter,
  wechaty,
})
export type RootState = ReturnType<typeof reducer>

/**
 * Store
 */
// const epicMiddleware = createEpicMiddleware()

export const duckStore = configureStore({
  // middleware: [
  //   epicMiddleware,
  // ],
  reducer,
})
export type AppDispatch = typeof duckStore.dispatch

/**
 * Epic
 *
 *  Adding New Epics Asynchronously/Lazily
 *    https://redux-observable.js.org/docs/recipes/AddingNewEpicsAsynchronously.html
 */
// export const epic$ = new BehaviorSubject(combineEpics(
//   wechatyEpic,
// ))

// Huan(20200404) FIXME: any -> RootState
// const rootEpic = (
//   action$: ActionsObservable<Action>,
//   state$: StateObservable<any>,
//   dependencies: Object,
// ) => epic$.pipe(
//   mergeMap(epic =>
//     epic(action$, state$, dependencies)
//   )
// )

// epicMiddleware.run(rootEpic)

// // sometime later...add another Epic, keeping the state of the old ones...
// epic$.next(wechatyEpic)
// // and again later add another...
// epic$.next(wechatyEpic)

/**
 * Others
 */
duckStore.subscribe(() => {
  console.info('state:', duckStore.getState())
})

export * from 'redux-observable'
export * from 'redux'

export {
  EnhancedStore,

  wechatyActions,
  wechatySelectors,

  counterActions,
  counterSelectors,
}
