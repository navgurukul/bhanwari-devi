import { takeLatest, put } from 'redux-saga/effects'
import { types, actions } from './action'
// import { authorizedRequest } from './Auth'


/**
 * Handles adding a new class.
 * @param {object} payload
*/
function* handleAddClass({ data }) {
  yield put(actions.getAddClassResolved('Adding data with saga'))
  
}


export default function* () {
  yield takeLatest(types.GET_ADD_CLASS_INTENT, handleAddClass)
}
