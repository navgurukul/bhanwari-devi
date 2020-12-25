import { call, put, select } from "redux-saga/effects";
// import { NetworkError } from '../services/error'

import { actions as userActions } from "../components/User/redux/action";

export const httpStatuses = {
  UNAUTHORIZED: [401],
  FORBIDDEN: [403],
  OPERATION_FAILED: [400, 404, 500, 502],
  SUCCESS: [200, 201, 202],
};

export const authorizeRequest = function* (fn, data) {
  let token;
  try {
    token = yield select(({ User }) => User.data.token);
  } catch (error) {
    // if we don't have any token data in the redux for the user(i.e no tokens available) we will log out.
    yield put(userActions.logout());
    return;
  }
  try {
    let response = yield call(fn, data, token);
    // TODO: check if token needs to be refreshed by checking some particular code.
    // response = yield refreshToken(fn, data, token)
    if (httpStatuses.SUCCESS.includes(response.status)) {
      return response;
    }
  } catch (error) {
    const errorResponse = error.response;
    if (httpStatuses.OPERATION_FAILED.includes(errorResponse.status)) {
      return errorResponse;
    } else if (httpStatuses.FORBIDDEN.includes(errorResponse.status)) {
      return yield put(userActions.logout());
    }
    return { status: 503, message: "Something went wrong" };
  }
};
