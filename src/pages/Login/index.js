import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import GoogleLogin from "react-google-login";

import { actions as userActions } from "../../components/User/redux/action";
import { PATHS } from "../../constant";
import { getQueryVariable } from "../../common/utils";
import Loader from "../../components/common/Loader";

import "./styles.scss";

function Login(props) {
  const [queryString, setqueryString] = useState(null);

  const updateQueryString = (value) => {
    setqueryString(value);
  };
  const dispatch = useDispatch();

  const { loading, data } = useSelector(({ User }) => User);

  const rolesList = data !== null && data.user.rolesList;
  const isAuthenticated = data && data.isAuthenticated;

  function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let { id_token: idToken } = googleUser.getAuthResponse();

    const googleData = {
      id: profile.getId(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
      idToken,
    };
    // let's send the data to our backend.
    const referrer = getQueryVariable("referrer");
    dispatch(userActions.onUserSignin(googleData));
    dispatch(userActions.onUserUpdate(referrer));
  }

  const onGoogleLoginFail = (errorResponse) => {
    // eslint-disable-next-line no-console
    console.log("onGoogle login fail", errorResponse);
  };

  if (rolesList != false) {
    if (!(rolesList.includes("partner") || rolesList.includes("admin"))) {
      return <Redirect to={PATHS.COURSE} />;
    }
  } else if (rolesList.length == 0) {
    return <Redirect to={PATHS.COURSE} />;
  }

  if (isAuthenticated && props.location.state) {
    return <Redirect to={props.location.state.from.pathname} />;
  } else if (isAuthenticated) {
    return <Redirect to={PATHS.COURSE} />;
  }

  return (
    <div className="ng-login">
      <div className="logo" />
      {loading ? (
        <Loader />
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login/Sign Up"
          onSuccess={onSignIn}
          onFailure={onGoogleLoginFail}
          cookiePolicy={"single_host_origin"}
          className="google-login"
        />
      )}
    </div>
  );
}

export default Login;
