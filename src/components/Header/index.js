import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { PATHS } from "../../constant";

import { actions as userActions } from "../User/redux/action";
import "./styles.scss";

const AuthenticatedHeaderOption = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const rolesList = user.data.user.rolesList;

  const userId = user.data.user.partner_id;

  const canSpecifyUserBaseRole = rolesList.indexOf("admin") > -1;

  // const canSpecifyPartner =
  //   rolesList.includes("partner") && user.data.user.partner_id != null;

  return (
    <>
      {canSpecifyUserBaseRole ? (
        <>
          <a className="item" href={PATHS.USER}>
            User
          </a>

          <a className="item" href={PATHS.VOLUNTEER}>
            Volunteers
          </a>
        </>
      ) : null}
      {/* {canSpecifyPartner ? (
        <>
          <a className="item" href={`${PATHS.PARTNERS}/${userId}`}>
            Dashboard
          </a>
        </>
      ) : null} */}
      <a className="item" href={PATHS.COURSE}>
        Courses
      </a>
      <a className="item" href={PATHS.MENTOR}>
        Mentor
      </a>
      <a className="item" href={PATHS.CLASS}>
        Classes
      </a>

      <a className="item" href={PATHS.PARTNERS}>
        Partners
      </a>

      <a className="item" href={PATHS.OPPORTUNITIES}>
        Opportunities
      </a>
      <a className="item" href={PATHS.AFE}>
        Amazon Partnership
      </a>

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
      <a className="item" href={PATHS.PARTNERS}>
        Partners
      </a>
      <a className="item" href={PATHS.COURSE}>
        Courses
      </a>
      <a className="item" href={PATHS.AFE}>
        Amazon Partnership
      </a>
      <a className="item" href={PATHS.LOGIN}>
        Login/Signup
      </a>
    </>
  );
};

function Header() {
  const { data } = useSelector(({ User }) => User);
  const isAuthenticated = data && data.isAuthenticated;

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
