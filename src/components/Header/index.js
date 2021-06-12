import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { PATHS } from "../../constant";
import { actions as userActions } from "../User/redux/action";

import "./styles.scss";

const AuthenticatedHeaderOption = () => {
  const dispatch = useDispatch();
  return (
    <>
      {flag ? (
        <>
          <a className="link" href={PATHS.USER}>
            User
          </a>
          <a className="link" href={PATHS.PARTNERS}>
            Partners
          </a>
        </>
      ) : null}

      <a className="link" href={PATHS.COURSE}>
        Courses
      </a>
      <a className="link" href={PATHS.CLASS}>
        Classes
      </a>
      {/* <a className="link" href={PATHS.PARTNERS}>
      Partners
      </a> */}
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

let flag = false;

function Header() {
  const { data } = useSelector(({ User }) => User);
  const isAuthenticated = data && data.isAuthenticated;
  const rolesList = data && data.user.rolesList;

  if (rolesList != null) {
    rolesList.map((role) => {
      role === "classAdmin" || role === "dumbeldore"
        ? (flag = true)
        : (flag = false);
    });
  }

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
