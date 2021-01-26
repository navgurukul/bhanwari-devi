import React from "react";
import { Route } from "react-router-dom";
import { PrivateRoute } from "./Routes";
// import { userRoles } from '../services/auth'
import { PATHS } from "../constant";
import Login from "../pages/Login";
import CreateClass from "../pages/CreateClass";
import Course from "../pages/Course";
import CourseContent from "../pages/CourseContent";
import Mentor from "../pages/Mentor";

// import Classes from '../pages/classes'

const Routing = () => {
  return (
    <>
      {/* Public routes */}
      {/* Route home page to login in  */}
      <Route exact path={PATHS.HOME_PATH} component={Course} />
      <Route exact path={PATHS.COURSE} component={Course} />
      <Route path={PATHS.COURSE_CONTENT} component={CourseContent} />
      <Route exact path={PATHS.LOGIN} component={Login} />
      <Route exact path={PATHS.MENTOR} component={Mentor} />
      {/* Private routes */}
      {/* <PrivateRoute
        exact
        path={ PATHS.CLASS }
        component={ Class }
      />*/}
      <PrivateRoute exact path={PATHS.CLASS} component={CreateClass} />
    </>
  );
};

export default Routing;
