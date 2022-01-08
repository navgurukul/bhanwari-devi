import React from "react";
import { Redirect } from "react-router";
import { getQueryVariable } from "../../../common/utils";

function RedirectComponent() {
  // const uri = window.location.href;
  const uri = `https://www.merakilearn.org/redirect?token=xyz&redirectUrl=/admission`;
  // const token = uri.split("token=")[1].split("&")[0];
  // console.log("token", token);

  const token = getQueryVariable("token");
  const redirect = getQueryVariable("redirectUrl");
  console.log("redirect", redirect);
  console.log("token", token);

  if (uri.includes("token")) {
    return <Redirect to={redirect} />;
  } else {
    return <Redirect to="/admission-login" />;
  }

  return (
    <div>
      <h1>Komal</h1>
    </div>
  );
}

export default RedirectComponent;
