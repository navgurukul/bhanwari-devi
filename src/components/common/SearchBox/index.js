import React, { useState, useEffect } from "react";
import axios from "axios";
import { METHODS } from "../../../services/api";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { PATHS } from "../../../constant";

import "./styles.scss";

function SearchBox(props) {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // // const [toggle, setToggle] = useState(false);
  // const user = useSelector(({ User }) => User);
  // const url = window.location.href;
  // let code;

  // const userCalender = (code) => {
  //   return axios({
  //     method: METHODS.PUT,
  //     url: `${process.env.REACT_APP_MERAKI_URL}/users/calendar/tokens`,
  //     headers: {
  //       accept: "application/json",
  //       Authorization: user.data.token,
  //       code: code,
  //     },
  //   }).then((res) => {
  //     if (res.data.success) setIsAuthenticated(res.data.success);
  //     console.log("res", res);
  //   });
  // };

  // if (url.includes("code")) {
  //   code = url.split("code=")[1].split("scope")[0];
  //   console.log("url", url.split("code=")[1].split("scope")[0]);
  //   userCalender(code);
  // }

  // console.log("isAuthenticated", isAuthenticated);

  // if (isAuthenticated) {
  //   // return <Redirect to={PATHS.CLASS} />;
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: `${PATHS.CLASS}`,
  //         state: { toggle: isAuthenticated },
  //       }}
  //     />
  //   );
  // }
  return (
    <div className="ng-search">
      <input
        type="text"
        placeholder="Search for a course"
        onChange={props.onChange}
        value={props.value}
      />
      <button type="submit">
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBox;
