import React from "react";
import "./styles.scss";
import { PATHS } from "../../constant";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Link className="footer-link" to={PATHS.PRIVACY_POLICY}>
        Privacy Policy
      </Link>
    </div>
  );
}

export default Footer;
