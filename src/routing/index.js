import React from "react";
import { Route } from "react-router-dom";
import { PrivateRoute } from "./Routes";
// import { userRoles } from '../services/auth'
import Home from "../pages/Home";
import { PATHS } from "../constant";
import Login from "../pages/Login";
import CreateClass from "../pages/CreateClass";
import Course from "../pages/Course";
import CourseContent from "../pages/CourseContent";
import Mentor from "../pages/Mentor";
import User from "../components/User";
import PrivacyPolicy from "../components/PrivacyPolicy";
import PartnerData from "../components/Dashboard/PartnerData";
import StudentData from "../components/Dashboard/StudentData";
import StudentClassData from "../components/Dashboard/StudentClassData";
import Profile from "../pages/Profile";
import Opportunities from "../pages/Opportunities";
import AFEpage from "../components/AFEpage";
import NavgurukulIntroduce from "../pages/Navgurukul";
import Admission from "../pages/Navgurukul/merakiAdmission";
import RedirectComponent from "../components/common/RedirectComponent";
import VolunteerDashboard from "../components/VolunteerDashbord/VolunteerDetails";
import VolunteerOverview from "../components/VolunteerDashbord/IndividualVolunteers";
import StatePartnerDashboard from "../pages/StatePartner Dashboard";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";
//  import "../../styles/styles.css";
import "../styles/styles.css";

// import Classes from '../pages/classes'

const Routing = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Public routes */}
        {/* Route home page to login in  */}
        <Route exact path={PATHS.HOME_PATH} component={Home} />
        <Route exact path={PATHS.COURSE} component={Course} />
        <Route path={PATHS.COURSE_CONTENT} component={CourseContent} />
        <Route exact path={PATHS.LOGIN} component={Login} />
        <Route exact path={PATHS.PRIVACY_POLICY} component={PrivacyPolicy} />
        <Route exact path={PATHS.AFE} component={AFEpage} />
        <Route exact path={PATHS.OPPORTUNITIES} component={Opportunities} />
        <Route
          exact
          path={PATHS.NAVGURUKUL_INTRODUCE}
          component={NavgurukulIntroduce}
        />
        <Route exact path={PATHS.REDIRECT} component={RedirectComponent} />
        <PrivateRoute exact path={PATHS.ADMISSION} component={Admission} />

        {/* Private routes */}
        {/* <PrivateRoute
        exact
        path={ PATHS.CLASS }
        component={ Class }
      />*/}
        <PrivateRoute
          exact
          path={PATHS.STATEPARTNER}
          component={StatePartnerDashboard}
        />
        <PrivateRoute exact path={PATHS.PROFILE} component={Profile} />
        <PrivateRoute
          exact
          path={PATHS.VOLUNTEER}
          component={VolunteerDashboard}
        />
        <PrivateRoute
          exact
          path={PATHS.VOLUNTEER_OVERVIEW}
          component={VolunteerOverview}
        />

        <PrivateRoute exact path={PATHS.CLASS} component={CreateClass} />
        <PrivateRoute exact path={PATHS.USER} component={User} />
        <PrivateRoute exact path={PATHS.MENTOR} component={Mentor} />
        <PrivateRoute exact path={PATHS.PARTNERS} component={PartnerData} />
        <PrivateRoute exact path={PATHS.PARTNER_DATA} component={StudentData} />
        <PrivateRoute exact path={PATHS.STUDENT} component={StudentClassData} />
      </ThemeProvider>
    </>
  );
};

export default Routing;
