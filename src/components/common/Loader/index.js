import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const Loader = ({ className = "", pageLoader = false }) => {
  return (
    <div className={`${className} ${pageLoader ? "ng-page-loader" : "loader"}`}>
      <div className="idsEllipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
  pageLoader: PropTypes.bool,
  // If main page loading pass this prop value as true
};

export default Loader;
