import { takeLatest, put, call } from "redux-saga/effects";
import { types, actions } from "./action";
import { httpStatuses } from "../../../services/auth";
import { getPathways, getPathwayCourse } from "./api";

function* handleGetPathways({ data }) {
  const pathwaysResponse = yield call(getPathways, data);
  if (
    pathwaysResponse &&
    httpStatuses.SUCCESS.includes(pathwaysResponse.status)
  ) {
    yield put(actions.getPathwaysResolved(pathwaysResponse.data));
  } else {
    yield put(actions.getPathwaysRejected(pathwaysResponse));
  }
}

function* handleGetPathwayCourse({ data }) {
  const pathwayCourseResponse = yield call(getPathwayCourse, data);
  if (
    pathwayCourseResponse &&
    httpStatuses.SUCCESS.includes(pathwayCourseResponse.status)
  ) {
    yield put(actions.getPathwaysCourseResolved(pathwayCourseResponse.data));
  } else {
    yield put(actions.getPathwaysCourseRejected(pathwayCourseResponse));
  }
}

export default function* () {
  yield takeLatest(types.GET_PATHWAY_INTENT, handleGetPathways);
  yield takeLatest(types.GET_PATHWAY_COURSE_INTENT, handleGetPathwayCourse);
}
