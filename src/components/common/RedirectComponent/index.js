import React from "react";
import { Redirect } from "react-router";
import { getQueryVariable } from "../../../common/utils";

function RedirectComponent() {
  const uri = window.location.href;
  // const uri = `https://www.merakilearn.org/redirect?token=xyz&redirectUrl=/admission`;

  const token = getQueryVariable("token");
  const redirect = getQueryVariable("redirectUrl");

  localStorage.setItem("Token", token);

  if (uri.includes("token")) {
    return <Redirect to={redirect} />;
  } else {
    return <Redirect to="/admission-login" />;
  }

  return <div></div>;
}

export default RedirectComponent;
