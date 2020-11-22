import { fork, all } from 'redux-saga/effects'
import Class from './components/Class/redux/saga'
import User from './components/User/redux/saga'
// import Notifications from './Notifications'


export default function*() {
  yield all([
    fork(Class),
    fork(User)
  ])
}
