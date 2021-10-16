import React from "react";
import { Route } from "react-router-dom";
import { PrivateRoute } from "./Routes";
// import { userRoles } from '../services/auth'
import { PATHS } from "../constant";
import Login from "../pages/Login";
import CreateClass from "../pages/CreateClass";
import Course from "../pages/Course";

import { Home } from "../pages/Home";
import OurPartners from "../pages/Home/PartnersPage";
import CourseContent from "../pages/CourseContent";
import Mentor from "../pages/Mentor";
import User from "../components/User";
import PrivacyPolicy from "../components/PrivacyPolicy";
import PartnerData from "../components/Dashboard /PartnerData";
import StudentData from "../components/Dashboard /StudentData";
import StudentClassData from "../components/Dashboard /StudentClassData";
import MerakiTeam from "../pages/Home/MerakiTeam";

// import Classes from '../pages/classes'

const Routing = () => {
  return (
    <>
      {/* Public routes */}
      {/* Route home page to login in  */}
      <Route exact path={PATHS.HOME_PATH} component={Home} />
      <Route exact path={PATHS.MERAKI_TEAM} component={MerakiTeam} />
      <Route exact path={PATHS.OUR_PARTNERS} component={OurPartners} />
      <Route exact path={PATHS.COURSE} component={Course} />
      <Route path={PATHS.COURSE_CONTENT} component={CourseContent} />
      <Route exact path={PATHS.LOGIN} component={Login} />
      <Route exact path={PATHS.MENTOR} component={Mentor} />
      <Route exact path={PATHS.PRIVACY_POLICY} component={PrivacyPolicy} />
      <Route exact path={PATHS.PARTNERS} component={PartnerData} />
      <Route exact path={PATHS.PARTNER_DATA} component={StudentData} />
      <Route exact path={PATHS.STUDENT} component={StudentClassData} />
      {/* Private routes */}
      {/* <PrivateRoute
        exact
        path={ PATHS.CLASS }
        component={ Class }
      />*/}
      <PrivateRoute exact path={PATHS.CLASS} component={CreateClass} />
      <PrivateRoute exact path={PATHS.USER} component={User} />
    </>
  );
};

export default Routing;
