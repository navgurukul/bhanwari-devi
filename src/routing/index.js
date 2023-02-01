import React from "react";
import { Route } from "react-router-dom";
import { PrivateRoute } from "./Routes";
// import { userRoles } from '../services/auth'
import Home from "../pages/Home";
import { PATHS } from "../constant";
import Login from "../pages/Login";
import CreateClass from "../pages/CreateClass";
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
// import Admission from "../pages/Navgurukul/merakiAdmission";
import RedirectComponent from "../components/common/RedirectComponent";
import VolunteerDashboard from "../components/VolunteerDashbord/VolunteerDetails";
import VolunteerOverview from "../components/VolunteerDashbord/IndividualVolunteers";
import StatePartnerDashboard from "../pages/StatePartnerDashboard";
import OurStory from "../pages/OurStory";
import NewUserDashbord from "../components/NewUserDashbord";
import Team from "../pages/Team";
import Partner from "../pages/OurPartner";
import PathwayExercise from "../components/PathwayExercise/";
import ContentEdit from "../components/PathwayExercise/ContentEdit";
import PathwayCourse from "../components/PathwayCourse";
import ResidentialCourse from "../components/PathwayCourse/ResidentialCourse";
import MiscellaneousCourses from "../components/PathwayCourse/MiscellaneousCourses";
import SearchCourse from "../components/SearchBar";
import ReturningUserPage from "../components/ReturningUser/ReturningUserPage";
import VolunteerAutomation from "../components/VolunteerAutomation";
import VolunteerForm from "../components/VolunteerAutomation/Stepper";
import Tutor from "../components/TutorDashboard";
// import ClassFormModel from "../components/BatchClassComponents/ClassFormModel";

const Routing = () => {
  return (
    <>
      {/* Public routes */}
      {/* Route home page to login in  */}
      <Route exact path={PATHS.HOME_PATH} component={Home} />
      <Route exact path={PATHS.HOME_PAGE} component={Home} />
      <Route exact path={PATHS.PATHWAY_COURSE} component={PathwayCourse} />
      <Route
        exact
        path={PATHS.MISCELLANEOUS_COURSE}
        component={MiscellaneousCourses}
      />
      <Route
        exact
        path={PATHS.RESIDENTIAL_COURSE}
        component={ResidentialCourse}
      />

      <Route exact path={PATHS.LOGIN} component={Login} />
      <Route exact path={PATHS.PRIVACY_POLICY} component={PrivacyPolicy} />
      <Route exact path={PATHS.AFE} component={AFEpage} />
      <Route exact path={PATHS.OPPORTUNITIES} component={Opportunities} />
      <Route exact path={PATHS.TEAM} component={Team} />

      <Route exact path={PATHS.OUR_PARTNER} component={Partner} />
      <Route exact path={PATHS.OUR_STORY} component={OurStory} />

      <Route
        exact
        path={PATHS.RETURNING_USER_PAGE}
        component={ReturningUserPage}
      />

      <Route
        exact
        path={PATHS.NAVGURUKUL_INTRODUCE}
        component={NavgurukulIntroduce}
      />

      <PrivateRoute exact path={PATHS.TUTOR} component={Tutor} />

      <Route exact path={PATHS.REDIRECT} component={RedirectComponent} />
      <Route exact path={PATHS.SEARCHED_COURSE} component={SearchCourse} />
      <Route
        exact
        path={PATHS.VOLUNTEER_AUTOMATION}
        component={VolunteerAutomation}
      />

      {/* Private routes */}

      <PrivateRoute
        exact
        path={PATHS.VOLUNTEER_FORM}
        component={VolunteerForm}
      />
      <PrivateRoute
        path={PATHS.PATHWAY_COURSE_CONTENT}
        component={PathwayExercise}
      />
      <PrivateRoute
        path={PATHS.PATHWAY_COURSE_CONTENT_EDIT}
        component={ContentEdit}
      />
      <PrivateRoute
        exact
        path={PATHS.NEW_USER_DASHBOARD}
        component={NewUserDashbord}
      />
      {/* <PrivateRoute exact path={PATHS.ADMISSION} component={Admission} /> */}
      <PrivateRoute
        exact
        path={PATHS.STATEPARTNER}
        component={StatePartnerDashboard}
      />
      <PrivateRoute exact path={PATHS.PROFILE} component={Profile} />
      <PrivateRoute exact path={PATHS.ME} component={Profile} />
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
    </>
  );
};

export default Routing;
