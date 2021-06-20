import React from "react";
import "./styles.scss";

const FloatingIcon = ({ icon, styles, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="floating-icon-container"
      style={styles}
    >
      {icon}
    </button>
  );
};

export default FloatingIcon;
