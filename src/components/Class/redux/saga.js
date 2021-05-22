import { takeLatest, put, call } from "redux-saga/effects";
import { types, actions } from "./action";
import { authorizeRequest, httpStatuses } from "../../../services/auth";
import { getAllClasses } from "./api";

/**
 * Handles getting all the classes
 * @param {object} payload
 */
function* handleGetClasses({ data }) {
  const classesResponse = yield call(authorizeRequest, getAllClasses, data);
  if (
    classesResponse &&
    httpStatuses.SUCCESS.includes(classesResponse.status)
  ) {
    yield put(actions.getClassesResolved(classesResponse.data));
  } else {
    yield put(actions.getClassesRejected(classesResponse));
  }
}
export default function* () {
  yield takeLatest(types.GET_CLASSES_INTENT, handleGetClasses);
}
