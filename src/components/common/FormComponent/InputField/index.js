import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const InputField = (props) => {
  const {
    type = "input",
    className = "",
    label = "",
    labelClassName = "",
    inputClassName = "",
    ...rest
  } = props;

  if (type === "textarea") {
    return (
      <div className={`ng-input-field ${className}`}>
        <label className={`label ${labelClassName}`}>{label}</label>
        <textarea className={`textarea-field ${inputClassName}`} {...rest} />
      </div>
    );
  }

  return (
    <div className={`ng-input-field ${className}`}>
      <label className={`label ${labelClassName}`}>{label}</label>
      <input
        type={type}
        className={`input-field ${inputClassName}`}
        {...rest}
      />
    </div>
  );
};

InputField.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default InputField;
