import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { getUserInitialState, userStateMiddleware } from "./services/storage";
import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";

const composeEnhanced =
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const initialStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    getUserInitialState(),
    composeEnhanced(applyMiddleware(sagaMiddleware, userStateMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default initialStore;
