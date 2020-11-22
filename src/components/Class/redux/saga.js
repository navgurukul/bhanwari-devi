import { takeLatest, put } from 'redux-saga/effects'
import { types, actions } from './action'
// import { authorizedRequest } from './Auth'


/**
 * Handles creating a new class.
 * @param {object} payload
*/
function* handleCreateClass({ data }) {
  yield put(actions.getCreateClassResolved('Adding data with saga'))
  
}


export default function* () {
  yield takeLatest(types.GET_CREATE_CLASS_INTENT, handleCreateClass)
}
