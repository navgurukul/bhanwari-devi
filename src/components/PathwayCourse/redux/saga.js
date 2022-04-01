import { takeLatest, put, call } from "redux-saga/effects";
import { types, actions } from "./action";
import { httpStatuses } from "../../../services/auth";
// import { mapCourses, mapCourseContent } from "./util.js";
import { getPathways } from "./api";

function* handleGetPathways({ data }) {
  const pathwaysResponse = yield call(getPathways, data);
  console.log("pathwaysResponse", pathwaysResponse);
  if (
    pathwaysResponse &&
    httpStatuses.SUCCESS.includes(pathwaysResponse.status)
  ) {
    yield put(actions.getPathwaysResolved(pathwaysResponse.data));
  } else {
    yield put(actions.getPathwaysRejected(pathwaysResponse));
  }
}
export default function* () {
  yield takeLatest(types.GET_PATHWAY_INTENT, handleGetPathways);
}

// function* handleGetCourses({ data }) {
//     const coursesResponse = yield call(getCourses, data);
//     if (
//       coursesResponse &&
//       httpStatuses.SUCCESS.includes(coursesResponse.status)
//     ) {
//       const mappedCourses = mapCourses(coursesResponse.data);
//       yield put(actions.getPathwaysResolved(mappedCourses));
//     } else {
//       yield put(actions.getPathwaysRejected(coursesResponse));
//       alert(
//         `Something went wrong with error status: ${coursesResponse.status} ${coursesResponse.data.message}`
//       );
//     }
//   }
