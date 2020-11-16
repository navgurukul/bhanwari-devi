import { takeLatest, put, call } from 'redux-saga/effects'
import { types, actions } from './action'
import { sendGoogleUserData } from './api'

/**
 * Handles sending google sign in user udata to back-end
 * @param {object} payload
*/
function* handleGoogleUserData({ data }) {
  console.log('data', data)
  const res = yield call( sendGoogleUserData, data)
  console.log('res', res)
  if(res.status === 200) {
    yield put(actions.onUserSigninResolved(res.data))
  } else {
    yield put(actions.onUserSigninRejected(res))
  }
  
}


export default function* () {
  yield takeLatest(types.ON_USER_SIGN_INTENT, handleGoogleUserData)
}
