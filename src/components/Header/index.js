import React from "react";
import Login from '../../pages/Login';
import { Helmet } from "react-helmet";



function Header() {
  return (
    <div>
      <Helmet>
        {/* // Add script tags or any meta tag here. below commented lines are just an example on how to do it.   */}
        {/* <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content={process.env.REACT_APP_GOOGLE_CLIENT_ID}></meta> */}
      </Helmet>
      <Login />
    </div>
  );
}

export default Header;
