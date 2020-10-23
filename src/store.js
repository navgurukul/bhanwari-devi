import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import { routerMiddleware } from 'connected-react-router'

import allSaga from './allSaga'
import allReducer from './allReducer'
// import UserStorage from './middlewares/UserStorage'

const composeEnhanced =
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

const initialStore =  () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    allReducer,
    // UserStorage.initialState(),
    composeEnhanced(
      applyMiddleware(
        sagaMiddleware,
        // UserStorage.middleware(),
        // routerMiddleware(history)
      )
    )
  )
  sagaMiddleware.run(allSaga)
  return store
}

export default initialStore
