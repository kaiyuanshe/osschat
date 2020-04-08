// import {
//   ActionsObservable,
//   combineEpics,
//   ofType,
//   // StateObservable,
// }                     from 'redux-observable'
// import {
//   Action,
// }               from 'redux'

// import {
//   interval,
//   fromEvent,
//   of,
//   merge as mergeFrom,
//   pipe,
// }                 from 'rxjs'
// import {
//   catchError,
//   delay,
//   filter,
//   ignoreElements,
//   map,
//   mapTo,
//   merge,
//   mergeMap,
//   retryWhen,
//   repeat,
//   repeatWhen,
//   startWith,
//   takeUntil,
//   tap,
//   throttle,
//   timeout,
// }                   from 'rxjs/operators'

// import * as actions from './actions'
// import {
//   Contact,
// }             from 'wechaty'
// import { PUPPET_DEPENDENCIES } from 'wechaty/dist/src/puppet-config'

// const CHATIE_OA_ID = 'gh_051c89260e5d'  // chatieio official account
// const DONG = 'dong'

// const isChatieOA  = (action: ReturnType<typeof actions.message>) => action.payload.message.from()!.id === CHATIE_OA_ID
// const isDong      = (action: ReturnType<typeof actions.message>) => action.payload.message.text() === DONG
// const toHaDongAction = (action: ReturnType<typeof actions.message>) => actions.haDong(action.payload.message.wechaty.id)

// const onMessageHaDongEpic = (
//   action$: ActionsObservable<Action>,
// ) => action$.pipe(
//   filter(actions.message.match),
//   filter(isDong),
//   filter(isChatieOA),
//   map(toHaDongAction),
// )

// const sixtySecondsInterval = () => interval(60 * 1000)
// const fifteenSecondsInterval = () => interval(15 * 1000)
// const fifteenSecondsDelay = () => delay(15 * 1000)
// const sayDing = (contact: Contact) => contact.say('ding')

// const toChatieOA = (action: ReturnType<typeof actions.message>) => action.payload.message.wechaty.Contact.load(CHATIE_OA_ID)

// const onMessageEpic = (
//   action$: ActionsObservable<Action>,
//   // states$: StateObservable<types.State>,
// ) => action$.pipe(
//   filter(actions.message.match),
//   throttle(sixtySecondsInterval),
//   mergeMap(action => fifteenSecondsInterval()
//     .pipe(
//       mapTo(action),
//       tap(sendHaDing),
//       mergeMap(recvHaDong),
//     )
//   )
// )

// const sendHaDing =  (
//   action$: ActionsObservable<Action>,
//   // states$: StateObservable<types.State>,
// ) => action$.pipe(
//   filter(actions.message.match),
//   map(toChatieOA),
//   tap(sayDing),
// )

// const takeUntilDongOrOff = (
//   action$: ActionsObservable<Action>,
// ) => pipe(
//   takeUntil(mergeFrom(
//     action$.pipe(filter(actions.haDong.match)),
//     action$.pipe(filter(actions.switchOff.match))
//   )),
// )

// const recvHaDong = (
//   action$: ActionsObservable<Action>,
//   // states$: StateObservable<types.State>,
// ) => action$.pipe(
//   filter(actions.haDong.match),
//   mergeMap(action => of(action).pipe(
//     timeout(60 * 1000),
//     catchError(() => of(actions.haDingTimeout(action.payload))),
//     takeUntilDongOrOff ;(action$),
//   )),
// )

// const switchOnSuccess = (status: true | 'pending') => status === 'true'
// const heartbeat$ = fromEvent(this, 'heartbeat')
// const switchOn$ = fromEvent(this.state, 'on')
// const switchOff$ = fromEvent(this.state, 'off')
// const puppetReset = () => this.emit('reset', 'RxJS')

// switchOn$.pipe(
//   filter(switchOnSuccess),
//   mergeMap(_ => heartbeat$.pipe(
//     startWith(undefined), // force heartbeat to start the stream
//     throttle(() => interval(60 * 1000)),
//     mergeMap(_ => interval(60 * 1000).pipe(
//       tap(puppetReset),
//     )
//     takeUntil(mergeFrom(
//       heartbeat$,
//       switchOff$,
//     )),

//   )),
// )
// /**
//  *
//  */

// function haDing (
//   this: HAWechaty,
//   action$: ActionsObservable<Action>,
// ) {
//   action$.
//   this.wechatyList
//     .map(toChatieOA)
//     .forEach(sayDing)
// }

// function epic (
//   this: HAWechaty,
// ) {
//   log.verbose('HAWechaty', 'epic()')

//   ).pipe<any, any, any>(
//     mergeAll(),
//     debounce(() => interval(60 * 1000)),  // every 1 minute
//     mapTo(logonoffActions.dong()),
//   )

//   fromEvent(this.state, 'on').pipe(
//     filter(status => status === true),
//     mapTo(
//       debounce
//       ding
//     ),
//   )

//   const onEpic = (
//     action$: ActionsObservable<Action>,
//     // states$: StateObservable<types.State>,
//   ) => action$.pipe(
//     filter(logonoffActions.login.match),
//     map(action => actions.healthy(
//       action.payload.id,
//       true,
//     )),
//   )

//   const epic = combineEpics(
//     onMessageHaDongEpic,
//     // startSuccessEpic,
//   )
// }

// export default epic
