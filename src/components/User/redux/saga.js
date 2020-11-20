import { takeLatest, put, call } from 'redux-saga/effects'
import { types, actions } from './action'
import { sendGoogleUserData } from './api'

/**
 * Handles sending google sign in user udata to back-end
 * @param {object} payload
*/
function* handleGoogleUserData({ data }) {
  const res = yield call( sendGoogleUserData, data)
  if(res.status === 200) {
    const mappedUserData = {...res.data, isAuthenticated: true}
    yield put(actions.onUserSigninResolved(mappedUserData))
  } else {
    yield put(actions.onUserSigninRejected(res))
  }
  
}


export default function* () {
  yield takeLatest(types.ON_USER_SIGN_INTENT, handleGoogleUserData)
}
