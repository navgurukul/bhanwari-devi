import { takeLatest, put, call } from "redux-saga/effects";

import { types, actions } from "./action";
import { sendGoogleUserData, sendToken } from "./api";
import { PATHS } from "../../../constant";

/**
 * Handles sending google sign in user udata or token to back-end
 *     depending on login method
 * @param {object} payload
 */
function* handleUserData({ data }) {
  const res = data.idToken
    ? yield call(sendGoogleUserData, data)
    : yield call(sendToken, data);
  if (res.status === 200) {
    res.data.token = res.data.token || data.token;
    const mappedUserData = { ...res.data, isAuthenticated: true };
    yield put(actions.onUserSigninResolved(mappedUserData));
  } else {
    yield put(actions.onUserSigninRejected(res));
  }
}

function* refreshUserData({ data }) {
  const res = yield call(sendToken, data);
  if (res.status === 200) {
    res.data.token = data.token;
    const mappedUserData = { ...res.data, isAuthenticated: true };
    yield put(actions.onUserRefreshDataSuccess(mappedUserData));
  } else {
    yield put(actions.onUserRefreshDataFailure(res));
  }
}

function* handleLogout() {
  yield (window.location.pathname = PATHS.LOGIN);
}

export default function* () {
  yield takeLatest(types.ON_USER_SIGN_INTENT, handleUserData);
  yield takeLatest(types.ON_USER_REFRESH_DATA_INTENT, refreshUserData);
  yield takeLatest(types.ON_LOGOUT_INTENT, handleLogout);
}
