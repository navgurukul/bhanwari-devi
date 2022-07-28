import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
const Arrow = (props) => {
  const { className = "", left, onClick } = props;

  return (
    <div
      className={`ng-arrow ${className} ${left && "ng-left"}`}
      onClick={onClick}
    />
  );
};

Arrow.propTypes = {
  className: PropTypes.string,
};

export default Arrow;
