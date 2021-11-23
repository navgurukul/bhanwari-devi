import React, { useState } from "react";

const Form = ({
  onSubmit,
  className = "",
  initialFieldsState = {},
  children,
}) => {
  const [formFieldsState, setFormFieldsState] = useState(initialFieldsState);
  const setFormField = (fieldValue, fieldName) => {
    setFormFieldsState({
      ...formFieldsState,
      [fieldName]: fieldValue,
    });
  };

  return (
    <form onSubmit={onSubmit} className={className}>
      {children({
        formFieldsState,
        setFormField,
        setFormFieldsState,
      })}
    </form>
  );
};

export default Form;
