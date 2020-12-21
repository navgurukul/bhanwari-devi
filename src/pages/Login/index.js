import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import GoogleLogin from "react-google-login";
import { actions as userActions } from "../../components/User/redux/action";
import { PATHS } from "../../constant";

import "./styles.scss";

function Login(props) {
  const dispatch = useDispatch();
  const { loading, data } = useSelector(({ User }) => User);
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
    dispatch(userActions.onUserSignin(googleData));
  }

  const onGoogleLoginFail = (errorResponse) => {
    console.log("onGoogle login fail", errorResponse);
  };

  if (isAuthenticated) {
    return <Redirect to={PATHS.COURSE} />;
  }

  return (
    <div className="ng-login">
      <div className="logo" />
      {loading ? (
        "..."
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
