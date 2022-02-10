import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";

import { PATHS } from "../../constant";

import { actions as userActions } from "../User/redux/action";
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

  const canSpecifyUserBaseRole = rolesList.indexOf("admin") > -1;

  const canSpecifyPartner = rolesList.includes("partner") && partnerId != null;

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
      {canSpecifyPartner ? (
        <>
          <a className="item" href={`${PATHS.PARTNERS}/${partnerId}`}>
            Dashboard
          </a>
        </>
      ) : null}

      {["ADMISSION", "COURSE", "MENTOR", "CLASS", "OPPORTUNITIES", "AFE"].map(
        (item) => (
          <MenuOption
            item={item}
            className={
              ["COURSE", "MENTOR", "CLASS"].includes(item)
                ? "left-item"
                : "item"
            }
          />
        )
      )}

      <a>
        <i
          class="fa fa-user-circle-o profile-icon"
          onClick={() => setOpen(!open)}
        ></i>
      </a>
      {open && (
        <div class="dropdown-wrapper">
          <ul class="dropdown-menu">
            <li class="dropdown-menu__item">
              <a className="item" href={PATHS.PROFILE}>
                Profile
              </a>
            </li>
            <li class="dropdown-menu__item">
              <a
                class="logout-btn"
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

const AuthenticatedLeftHeaderOption = () => {
  return (
    <>
      {["COURSE", "MENTOR", "CLASS"].map((item) => (
        <MenuOption item={item} className="item" />
      ))}
    </>
  );
};

const PublicMenuOption = () => {
  return (
    <>
      <a className="item" href={PATHS.AFE}>
        Amazon Partnership
      </a>
      <a className="item" href={PATHS.LOGIN}>
        Login/Signup
      </a>
    </>
  );
};

const PublicLeftMenuOption = () => {
  return (
    <a className="item" href={PATHS.COURSE}>
      Courses
    </a>
  );
};

const MenuOption = (props) => {
  const NAMES = {
    COURSE: "Courses",
    MENTOR: "Mentors",
    CLASS: "Classes",
    ADMISSION: "Admission",
    OPPORTUNITIES: "Opportunities",
    AFE: "Amazon Partnership",
  };
  return (
    <a className={props.className} href={PATHS[props.item]}>
      {NAMES[props.item]}
    </a>
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

        <div className="option">
          {isAuthenticated ? (
            <AuthenticatedLeftHeaderOption />
          ) : (
            <PublicLeftMenuOption />
          )}
        </div>
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
