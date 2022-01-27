import React from "react";
import { Redirect } from "react-router";
import { getQueryVariable } from "../../../common/utils";
import Login from "../../../pages/Login";
// import { PATHS } from "../../constant";
import { PATHS } from "../../../constant";

function RedirectComponent() {
  const uri = window.location.href;
  // const uri = `https://www.merakilearn.org/redirect?token=xyz&redirectUrl=/admission`;

  const token = getQueryVariable("token");
  const redirect = getQueryVariable("redirectUrl");

  localStorage.setItem("Token", token);

  return <Redirect to={uri.includes("token") ? redirect : PATHS.LOGIN} />;
}

export default RedirectComponent;
