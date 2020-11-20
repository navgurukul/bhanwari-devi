import { fork, all } from 'redux-saga/effects'
import AddClass from './components/AddClass/redux/saga'
import User from './components/User/redux/saga'
// import Notifications from './Notifications'


export default function*() {
  yield all([
    fork(AddClass),
    fork(User)
  ])
}
