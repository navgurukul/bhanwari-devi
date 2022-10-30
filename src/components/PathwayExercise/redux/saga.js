import { takeLatest, put, call } from "redux-saga/effects";
import { types, actions } from "./action";
import { httpStatuses } from "../../../services/auth";
import { getProgressTracking } from "./api";

function* handleGetProgressTracking({ data }) {
  const ProgressTracking = yield call(getProgressTracking, data);
  if (
    ProgressTracking &&
    httpStatuses.SUCCESS.includes(ProgressTracking.status)
  ) {
    yield put(actions.getProgressTrackingResolved(ProgressTracking.data));
  } else {
    yield put(actions.getProgressTrackingRejected(ProgressTracking));
  }
}

export default function* () {
  yield takeLatest(types.GET_PATHWAY_INTENT, handleGetProgressTracking);
}
