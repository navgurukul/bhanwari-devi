import { takeLatest, put, call } from "redux-saga/effects";
import { types, actions } from "./action";
import { httpStatuses } from "../../../services/auth";
import {
  getPathways,
  getPathwaysCourse,
  getUpcomingBatches,
  getupcomingEnrolledClasses,
  getEnrolledBatches,
} from "./api";

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

function* handleGetPathwaysCourse({ data }) {
  const pathwayCourseResponse = yield call(getPathwaysCourse, data);
  if (
    pathwayCourseResponse &&
    httpStatuses.SUCCESS.includes(pathwayCourseResponse.status)
  ) {
    yield put(actions.getPathwaysCourseResolved(pathwayCourseResponse.data));
  } else {
    yield put(actions.getPathwaysCourseRejected(pathwayCourseResponse));
  }
}

function* handleGetUpcomingBatches({ data }) {
  const upcomingBatchesResponse = yield call(getUpcomingBatches, data);
  if (
    upcomingBatchesResponse &&
    httpStatuses.SUCCESS.includes(upcomingBatchesResponse.status)
  ) {
    yield put(actions.getUpcomingBatchesResolved(upcomingBatchesResponse.data));
  } else {
    yield put(actions.getUpcomingBatchesRejected(upcomingBatchesResponse));
  }
}

function* handleGetUpcomingEnrolledClasses({ data }) {
  const upcomingEnrolledClassesResponse = yield call(
    getupcomingEnrolledClasses,
    data
  );
  if (
    upcomingEnrolledClassesResponse &&
    httpStatuses.SUCCESS.includes(upcomingEnrolledClassesResponse.status)
  ) {
    yield put(
      actions.getupcomingEnrolledClassesResolved(
        upcomingEnrolledClassesResponse.data
      )
    );
  } else {
    yield put(
      actions.getupcomingEnrolledClassesRejected(
        upcomingEnrolledClassesResponse
      )
    );
  }
}

function* handleGetEnrolledBatches({ data }) {
  const enrolledBatchesResponse = yield call(getEnrolledBatches, data);
  if (
    enrolledBatchesResponse &&
    httpStatuses.SUCCESS.includes(enrolledBatchesResponse.status)
  ) {
    yield put(actions.getEnrolledBatchesResolved(enrolledBatchesResponse.data));
  } else {
    yield put(actions.getEnrolledBatchesRejected(enrolledBatchesResponse));
  }
}

export default function* () {
  yield takeLatest(types.GET_PATHWAY_INTENT, handleGetPathways);
  yield takeLatest(types.GET_PATHWAY_COURSE_INTENT, handleGetPathwaysCourse);
  yield takeLatest(types.GET_UPCOMING_BATCHES_INTENT, handleGetUpcomingBatches);
  yield takeLatest(
    types.GET_UPCOMING_ENROLLED_CLASSES_INTENT,
    handleGetUpcomingEnrolledClasses
  );
  yield takeLatest(types.GET_ENROLLED_BATCHES_INTENT, handleGetEnrolledBatches);
}
