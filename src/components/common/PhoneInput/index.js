import React from "react";
import MuiPhoneNumber from "material-ui-phone-number";
// import { isValidPhoneNumber } from "libphonenumber-js";
import parseMax from "libphonenumber-js/max";

const handleChange = (handler, phoneNumber, countryInfo) => {
  // handler(phoneNumber, countryInfo, isValidPhoneNumber(phoneNumber));
  const phoneData = parseMax(phoneNumber);
  handler(phoneNumber, countryInfo, phoneData?.getType());
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
