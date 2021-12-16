import React from "react";
import "./styles.scss";
import GoogleLogin from "react-google-login";

function NavgurukulLogin() {
  return (
    <div className="login-container">
      <div className="flex-Container">
        <div className="left-side-conent">
          <video src="../../asset/video.mp4" className="video" controls></video>
        </div>
        <div className="right-side-conent">
          <h2 className="login-heading">
            Navgurukul One-Year Software Engineering Scholarship Test
          </h2>

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Continue with Google"
            // onSuccess={onSignIn}
            // onFailure={onGoogleLoginFail}
            cookiePolicy={"single_host_origin"}
            className="google-login"
          />
        </div>
      </div>
    </div>
  );
}

export default NavgurukulLogin;
