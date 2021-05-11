import { takeLatest, put, call } from "redux-saga/effects";
import { types, actions } from "./action";
import { httpStatuses } from "../../../services/auth";
import { mapCourses, mapCourseContent } from "./util.js";
import { getCourses, getCourseContent } from "./api";

/**
 * Handles getting all the courses
 * @param {object} payload
 */
function* handleGetCourses({ data }) {
  const coursesResponse = yield call(getCourses, data);
  if (
    coursesResponse &&
    httpStatuses.SUCCESS.includes(coursesResponse.status)
  ) {
    const mappedCourses = mapCourses(coursesResponse.data);
    yield put(actions.getCoursesResolved(mappedCourses));
  } else {
    yield put(actions.getCoursesRejected(coursesResponse));
    alert(
      `Something went wrong with error status: ${coursesResponse.status} ${coursesResponse.data.message}`
    );
  }
}

/**
 * Handle getting exercises fo a particular course
 * @param {object} payload
 */
function* handleGetCourseContent({ data }) {
  const contentResponse = yield call(getCourseContent, data);
  if (
    contentResponse &&
    httpStatuses.SUCCESS.includes(contentResponse.status)
  ) {
    const mappedCourseContent = mapCourseContent(contentResponse.data);
    yield put(actions.getCourseContentResolved(mappedCourseContent));
  } else {
    yield put(actions.getCourseContentRejected(contentResponse));
    alert(
      `Something went wrong with error status: ${contentResponse.status} ${contentResponse.message}`
    );
  }
}

export default function* () {
  yield takeLatest(types.GET_COURSES_INTENT, handleGetCourses);
  yield takeLatest(types.GET_COURSE_CONTENT_INTENT, handleGetCourseContent);
}
