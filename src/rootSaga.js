import { fork, all } from "redux-saga/effects";

import User from "./components/User/redux/saga";
import Class from "./components/Class/redux/saga";
import Course from "./components/Course/redux/saga";
import Pathways from "./components/PathwayCourse/redux/saga";
// import Notifications from './Notifications'

export default function* () {
  yield all([fork(User), fork(Class), fork(Course), fork(Pathways)]);
}
