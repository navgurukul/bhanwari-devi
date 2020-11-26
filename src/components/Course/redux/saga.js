import { takeLatest, put, call} from 'redux-saga/effects'
import { types, actions } from './action'
import { authorizeRequest, httpStatuses } from '../../../services/auth'
import { mapCourses } from './service.js'
import { getCourses } from './api'


/**
 * Handles getting all the courses
 * @param {object} payload
*/
function* handleGetCourses({ data }) {
  const coursesResponse = yield call(authorizeRequest, getCourses, data)
  if(coursesResponse && httpStatuses.SUCCESS.includes(coursesResponse.status)){
    const mappedCourses = mapCourses(coursesResponse.data.allCourses)
    yield put(actions.getCoursesResolved(mappedCourses))
  } else {
    yield put(actions.getCoursesRejected(coursesResponse))
    alert(`Something went wrong with error status: ${coursesResponse.status} ${coursesResponse.message}`)
  }
}


export default function* () {
  yield takeLatest(types.GET_COURSES_INTENT, handleGetCourses)
}
