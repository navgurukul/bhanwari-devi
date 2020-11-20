import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { types as appTypes } from './components/App/action'

import AddClass from './components/AddClass/redux/reducer'
import User from './components/User/redux/reducer'

// import User from './User'
// import Notifications from './Notifications'

export const history = createBrowserHistory()

const appReducer = combineReducers({
  User,
  // Notifications,
  AddClass,
  router: connectRouter(history),
})

const rootReducer = (state, action) => {
  // if we want to clean the redux state, i.e logging out the user
  if (action.type === appTypes.RESET_APP) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
