import { takeLatest, put, call} from 'redux-saga/effects'
import { types, actions } from './action'
import { authorizeRequest, httpStatuses } from '../../../services/auth'
import { createClass } from './api'


/**
 * Handles creating a new class.
 * @param {object} payload
*/
function* handleCreateClass({ data }) {
  const classCreateResponse = yield call(authorizeRequest, createClass, data)
  if(classCreateResponse && httpStatuses.SUCCESS.includes(classCreateResponse.status)){
    yield put(actions.createClassResolved(classCreateResponse.data))
    alert('You successfully created a class.')
  } else {
    yield put(actions.createClassRejected(classCreateResponse))
    alert(`Something went wrong with error status: ${classCreateResponse.status} ${classCreateResponse.message}`)
  }
}


export default function* () {
  yield takeLatest(types.GET_CREATE_CLASS_INTENT, handleCreateClass)
}
