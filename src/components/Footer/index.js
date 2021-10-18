import React from "react";
import "./styles.scss";
import { PATHS } from "../../constant";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="upper-footer">
        <div className="meraki-learn-logo">
          <img className="meraki" src={require("./assets/Meraki-logo.png")} />
          <img
            className="merakilearn"
            src={require("./assets/MerakiLearn.png")}
          />
        </div>
        <div className="social-media">
          <img
            className="insta-logo"
            src={require("./assets/social-icons.png")}
          />
          <img
            className="linkedIn-logo"
            src={require("./assets/social-icons-1.png")}
          />
          <img
            className="facebook-logo"
            src={require("./assets/social-icons-2.png")}
          />
          <img
            className="twitter-logo"
            src={require("./assets/social-icons-3.png")}
          />
        </div>
        <div className="playStor">
          <div className="playStor-text">Download on Playstore</div>
          <div className="playstore-logo">
            <img src={require("./assets/playstore.png")} />
          </div>
        </div>
      </div>
      <div className="lower-footer">
        <div className="contact">
          <div>Email us at:</div>
          <div className="email">team@meraki.org</div>
        </div>
        <Link className="footer-link" to={PATHS.PRIVACY_POLICY}>
          Privacy Policy
        </Link>
        <p className="footer-sentence">Made with ❤️ for our students</p>
      </div>
    </>
  );
}

export default Footer;
