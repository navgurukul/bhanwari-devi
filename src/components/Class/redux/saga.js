import { takeLatest, put, call } from "redux-saga/effects";
import { types, actions } from "./action";
import { authorizeRequest, httpStatuses } from "../../../services/auth";
import { getAllClasses, createClass } from "./api";
/**
 * Handles creating a new class.
 * @param {object} payload
 */
function* handleCreateClass({ data }) {
  const classCreateResponse = yield call(authorizeRequest, createClass, data);
  if (
    classCreateResponse &&
    httpStatuses.SUCCESS.includes(classCreateResponse.status)
  ) {
    yield put(actions.createClassResolved(classCreateResponse.data));
    alert("You successfully created a class.");
  } else {
    yield put(actions.createClassRejected(classCreateResponse));
    alert(
      `Something went wrong with error status: ${classCreateResponse.status} ${classCreateResponse.message}`
    );
  }
}
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
    yield put(actions.getClassesResolved(classesResponse.data.classes));
  } else {
    yield put(actions.getClassesRejected(classesResponse));
  }
}
export default function* () {
  yield takeLatest(types.GET_CLASSES_INTENT, handleGetClasses);
  yield takeLatest(types.GET_CREATE_CLASS_INTENT, handleCreateClass);
}
