import { call, put } from 'redux-saga/effects'
// import { NetworkError } from '../services/error'

import { actions as userActions } from './action'
import { AUTH_KEY } from '../../../constant'

const httpStatuses = {
  UNAUTHORIZED: [ 401 ],
  FORBIDDEN: [ 403 ],
  OPERATION_FAILED: [ 400, 404, 500, 502 ],
  SUCCESS: [ 200, 201, 202 ]
}


export const authorizedRequest = function* (fn, data, retryOnFail = true) {
  let userData
  let token
  try {
    //TODO:Put logic for refresh token
    userData = JSON.parse(localStorage.get(AUTH_KEY))
    token = userData.data.token
  } catch (error) {
    // if we don't have any data in the localstorage for the user(i.e no tokens available) we will log out.
    yield put(userActions.logout())
    return
  }
  try {
    let response = yield call(fn, data, token)
    if (httpStatuses.SUCCESS.includes(response.status)) {
      return response
    } else if (httpStatuses.OPERATION_FAILED.includes(response.status)){
      response = yield call(fn, data, token)
    } else if (httpStatuses.FORBIDDEN.includes(response.status)) {
      yield put(userActions.logout())
    }
  } catch {
    return {status:503,  message: 'Something went wrong'}
  }
}
