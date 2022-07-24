import { takeLatest, put, call, delay, select } from "redux-saga/effects";
import { getUserData } from "./selectors";

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
    const mappedUserData = {
      ...res.data,
      isAuthenticated: true,
      waitingForUpdate: false
    };
    yield put(actions.onUserSigninResolved(mappedUserData));
  } else {
    yield put(actions.onUserSigninRejected(res));
  }
}

function* handlePollForUserUpdate() {
  while (true) {
    const currentUserData = yield select(getUserData);
    const res = yield call(sendToken, currentUserData);
    if (res.status === 200) {
      if (
        res.data.user.rolesList.length !== currentUserData.user.rolesList.length
      ) {
        res.data.token = currentUserData.token;
        const mappedUserData = {
          ...res.data,
          isAuthenticated: true,
          waitingForUpdate: false
        };

        yield put(actions.onServerUserUpdate(mappedUserData));
        break;
      } else {
        console.log("Checking for updates every 5 minutes");
        yield delay(300000);
      }
    }
  }
}

function* handleLogout() {
  yield (window.location.pathname = PATHS.LOGIN);
}

export default function* () {
  yield takeLatest(types.ON_USER_SIGN_INTENT, handleUserData);
  yield takeLatest(types.POLL_FOR_SERVER_USER_UPDATE, handlePollForUserUpdate);
  yield takeLatest(types.ON_LOGOUT_INTENT, handleLogout);
}
