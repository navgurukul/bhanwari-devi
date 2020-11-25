import { takeLatest, put, call } from 'redux-saga/effects'

import { types, actions } from './action'
import { sendGoogleUserData } from './api'
import { PATHS } from '../../../constant'

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

function* handleLogout() {
  yield window.location.pathname = PATHS.LOGIN
}

export default function* () {
  yield takeLatest(types.ON_USER_SIGN_INTENT, handleGoogleUserData)
  yield takeLatest(types.ON_LOGOUT_INTENT, handleLogout)
}
