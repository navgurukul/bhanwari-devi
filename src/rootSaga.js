import { fork, all } from "redux-saga/effects";

import User from "./components/User/redux/saga";
import Class from "./components/Class/redux/saga";
import Course from "./components/Course/redux/saga";
import {
  Pathways,
  PathwaysDropdown,
} from "./components/PathwayCourse/redux/saga";

export default function* () {
  yield all([
    fork(User),
    fork(Class),
    fork(Course),
    fork(Pathways),
    fork(PathwaysDropdown),
  ]);
}
