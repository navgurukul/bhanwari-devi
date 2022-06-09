import React from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import { isValidPhoneNumber } from "libphonenumber-js";

const handleChange = (handler, phoneNumber, countryInfo) => {
  handler(phoneNumber, countryInfo, isValidPhoneNumber(phoneNumber));
};

function PhoneInput({ onChange, ...otherProps }) {
  return (
    <MuiPhoneNumber
      defaultCountry="in"
      label="Phone Number"
      onChange={handleChange.bind(null, onChange)}
      {...otherProps}
    />
  );
}

export default PhoneInput;