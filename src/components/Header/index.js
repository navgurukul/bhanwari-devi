import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";

import { PATHS } from "../../constant";
import { actions as userActions } from "../User/redux/action";
import { hasOneFrom } from "../../common/utils";
import "./styles.scss";

const AuthenticatedHeaderOption = () => {
  const [partnerId, setPartnerId] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const rolesList = user.data.user.rolesList;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setPartnerId(res.data.user.partner_id);
    });
  }, []);

  const partnerGroupId = user.data.user.partner_group_id;

  const canSpecifyPartnerGroupId =
    hasOneFrom(rolesList, ["admin", "partner", "partner_view"]) &&
    user.data.user.partner_group_id;

  const canSpecifyUserBaseRole = rolesList.indexOf("admin") > -1;

  const canSpecifyPartner =
    hasOneFrom(rolesList, ["partner", "partner_view", "partner_edit"]) &&
    partnerId != null;

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
          <a className="item" href={PATHS.PARTNERS}>
            Partners
          </a>
        </>
      ) : null}

      {/* {canSpecifyPartnerGroupId ? (
        <>
          <a className="item" href={`${PATHS.STATE}/${partnerGroupId}`}>
            Dashboard
          </a>
        </>
      ) : canSpecifyPartner ? (
        <>
          <a className="item" href={`${PATHS.PARTNERS}/${partnerId}`}>
            Dashboard
          </a>
        </>
      ) : null} */}

      {canSpecifyPartnerGroupId || canSpecifyPartner ? (
        <>
          <a
            className="item"
            href={
              canSpecifyPartnerGroupId
                ? `${PATHS.STATE}/${partnerGroupId}`
                : `${PATHS.PARTNERS}/${partnerId}`
            }
          >
            Dashboard
          </a>
        </>
      ) : null}

      <a className="item" href={PATHS.COURSE}>
        Courses
      </a>
      <a className="item" href={PATHS.MENTOR}>
        Mentor
      </a>
      <a className="item" href={PATHS.CLASS}>
        Classes
      </a>

      <a className="item" href={PATHS.OPPORTUNITIES}>
        Opportunities
      </a>
      <a className="item" href={PATHS.AFE}>
        Amazon Partnership
      </a>

      <a>
        <i
          class="fa fa-user-circle-o profile-icon"
          onClick={() => setOpen(!open)}
        ></i>
      </a>
      {open && (
        <div className="dropdown-wrapper">
          <ul className="dropdown-menu">
            <li className="dropdown-menu__item">
              <a className="item" href={PATHS.PROFILE}>
                Profile
              </a>
            </li>
            <li className="dropdown-menu__item">
              <a
                className="logout-btn"
                onClick={() => dispatch(userActions.logout())}
              >
                {" "}
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

const PublicMenuOption = () => {
  return (
    <>
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
