import React from "react";
import "./style.scss";

export default ({ isOpen, className, options = [] }) => {
  if (isOpen) {
    return (
      <div className={`dropdown ${className ? className : ""}`}>
        {options.map((option) => {
          return (
            <button
              className={`dropdown-button ${
                option.className ? option.className : ""
              }`}
              key={option.value}
              onClick={option.onClick}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }
  return null;
};
