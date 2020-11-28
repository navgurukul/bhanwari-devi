import { takeLatest, put, call} from 'redux-saga/effects'
import { types, actions } from './action'
import { authorizeRequest, httpStatuses } from '../../../services/auth'
import { mapCourses, mapCourseContent, mapExerciseContent } from './util.js'
import { getCourses, getCourseContent, getExerciseContent } from './api'


/**
 * Handles getting all the courses
 * @param {object} payload
*/
function* handleGetCourses({ data }) {
  const coursesResponse = yield call(authorizeRequest, getCourses, data)
  if(coursesResponse && httpStatuses.SUCCESS.includes(coursesResponse.status)){
    const mappedCourses = mapCourses(coursesResponse.data)
    yield put(actions.getCoursesResolved(mappedCourses))
  } else {
    yield put(actions.getCoursesRejected(coursesResponse))
    alert(`Something went wrong with error status: ${coursesResponse.status} ${coursesResponse.message}`)
  }
}

/**
 * Handle getting exercises fo a particular course
 * @param {object} payload
*/
function* handleGetCourseContent({ data }) {
  const contentResponse = yield call(authorizeRequest, getCourseContent, data)
  if(contentResponse && httpStatuses.SUCCESS.includes(contentResponse.status)){
    const mappedCourseContent = mapCourseContent(contentResponse.data)
    yield put(actions.getCourseContentResolved(mappedCourseContent))
  } else {
    yield put(actions.getCourseContentRejected(contentResponse))
    alert(`Something went wrong with error status: ${contentResponse.status} ${contentResponse.message}`)
  }
}

/**
 * Handle getting exercise
 * @param {object} payload
*/
function* handleGetExerciseContent({ data }) {
  const exerciseResponse = yield call(authorizeRequest, getExerciseContent, data)
  if(exerciseResponse && httpStatuses.SUCCESS.includes(exerciseResponse.status)){
    const mappedCourseContent = mapExerciseContent(exerciseResponse.data)
    yield put(actions.getExerciseContentResolved(mappedCourseContent))
  } else {
    yield put(actions.getExerciseContentRejected(exerciseResponse))
    alert(`Something went wrong with error status: ${exerciseResponse.status} ${exerciseResponse.message}`)
  }
}


export default function* () {
  yield takeLatest(types.GET_COURSES_INTENT, handleGetCourses)
  yield takeLatest(types.GET_COURSE_CONTENT_INTENT, handleGetCourseContent)
  yield takeLatest(types.GET_EXERCISE_CONTENT_INTENT, handleGetExerciseContent)
}
