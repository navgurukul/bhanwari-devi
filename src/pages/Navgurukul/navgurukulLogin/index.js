import React from "react";
import "./styles.scss";
import GoogleLogin from "react-google-login";

function NavgurukulLogin() {
  return (
    <div className="login-container">
      <div className="flex-Container">
        <div className="left">
          <div className="video-of-ng">
            <video width="720" height="500" controls>
              <source src="movie.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="right">
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
