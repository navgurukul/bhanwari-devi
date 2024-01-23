import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { types as appTypes } from "./components/App/redux/action";
import User from "./components/User/redux/reducer";
import Class from "./components/Class/redux/reducer";
import Course from "./components/Course/redux/reducer";
import {
  Pathways,
  PathwaysDropdown as PathwaysDropdow,
} from "./components/PathwayCourse/redux/reducer";

export const history = createBrowserHistory();

const appReducer = combineReducers({
  User,
  Pathways,
  PathwaysDropdow,
  Class,
  Course,
  router: connectRouter(history),
});

const rootReducer = (state, action) => {
  // if we want to clean the redux state, i.e logging out the user
  if (action.type === appTypes.RESET_APP) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
