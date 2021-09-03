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
          <a href={PATHS.USER}>User</a>
          <a href={PATHS.PARTNERS}>Partners</a>
        </>
      ) : null}

      <a href={PATHS.COURSE}>Courses</a>
      <a href={PATHS.MENTOR}>Mentor</a>
      <a href={PATHS.CLASS}>Classes</a>
      <a>
        <button
          className="logout"
          onClick={() => dispatch(userActions.logout())}
        >
          Logout
        </button>
      </a>
    </>
  );
};

const PublicMenuOption = () => {
  return (
    <>
      <a href={PATHS.COURSE}>Courses</a>
      <a href={PATHS.LOGIN}>Login/Signup</a>
    </>
  );
};

let flag = false;

function Header() {
  const { data } = useSelector(({ User }) => User);
  const isAuthenticated = data && data.isAuthenticated;
  const rolesList = data && data.user.rolesList;

  if (rolesList != null) {
    /**
     * This is entirely incorrect logical condition, if a user has multiple user including 'admin'
     * and it will set the flag based on the last role it finds in the array
     * A simple check of indexOf('admin') > -1 || indexOf('partner') > -1 can solve this
     */
    rolesList.map((role) => {
      role === "admin" || role === "partner" ? (flag = true) : (flag = false);
    });
  }
  return (
    <div className="ng-header ">
      <input type="checkbox" id="nav-check" />
      <div className="logo">
        <a href="/">
          <div className="meraki-logo" />
        </a>
      </div>

      <div className="dropDown-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="option">
        {isAuthenticated ? <AuthenticatedHeaderOption /> : <PublicMenuOption />}
      </div>
    </div>
  );
}

export default Header;
