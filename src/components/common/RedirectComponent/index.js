import React from "react";
import { Redirect } from "react-router-dom";
import { getQueryVariable } from "../../../common/utils";
import Login from "../../../pages/Login";
// import { PATHS } from "../../constant";
import { PATHS } from "../../../constant";

function RedirectComponent() {
  const uri = window.location.href;
  // const uri = `https://www.merakilearn.org/redirect?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZC[…]JKeaoO_2neSYUVf0fl1yjYlGt9YLNOeLr12Xs&redirectUrl=admission`;

  const token = getQueryVariable("token");
  // undefined => "", remove leading slashes in redirect
  const redirect = (getQueryVariable("redirectUrl") || "").replace(/^\/+/g, "");

  if (token) {
    localStorage.setItem("Token", token);
  }

  return <Redirect to={uri.includes("token") ? "/" + redirect : PATHS.LOGIN} />;
}

export default RedirectComponent;
