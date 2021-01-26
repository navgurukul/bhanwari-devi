import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { PATHS } from "../../constant";
import { actions as userActions } from "../User/redux/action";

import "./styles.scss";

const AuthenticatedHeaderOption = () => {
  const dispatch = useDispatch();
  return (
    <>
      <a className="link" href={PATHS.COURSE}>
        Courses
      </a>
      <a className="link" href={PATHS.MENTOR}>
        Mentor
      </a>
      <a className="link" href={PATHS.CLASS}>
        Classes
      </a>
      <div className="logout" onClick={() => dispatch(userActions.logout())}>
        Logout
      </div>
    </>
  );
};

const PublicMenuOption = () => {
  return (
    <>
      <a className="link" href={PATHS.COURSE}>
        Courses
      </a>
      <a className="login" href={PATHS.LOGIN}>
        Login/Signup
      </a>
    </>
  );
};

function Header() {
  const { data } = useSelector(({ User }) => User);
  const isAuthenticated = data && data.isAuthenticated;

  return (
    <div className="ng-header">
      <a href="/">
        <div className="logo" />
      </a>
      <div className="option">
        {isAuthenticated ? <AuthenticatedHeaderOption /> : <PublicMenuOption />}
      </div>
    </div>
  );
}

export default Header;
