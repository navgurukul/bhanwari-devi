import React from "react";
import { Typography, Container, Box, TextField } from "@mui/material";
// import PhoneInput from "../common/PhoneInput";

function VerifyPhoneNo({ setDisable, setContact, contact }) {
  const handleChange = (event) => {
    const number = event.target.value?.replace(/[^0-9]/g, "") || "";
    setDisable(number.length !== 10);
    setContact(number);
  };

  //International
  // const handleChange = (number, countryInfo, phoneType) => {
  //   const isValid = !!phoneType;
  //   console.log(number, countryInfo, phoneType);
  //   setDisable(!isValid);
  //   setContact(number);
  //   //setContact(number.replace(/[^0-9]/g, "") || "");
  // };

  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Please provide your phone number.
      </Typography>
      <Typography variant="body1" gutterBottom color="text.secondary">
        We only use your number to contact you for volunteer-related matters. We
        never share it with any third party.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <TextField
          label="Ten Digit phone Number"
          // <PhoneInput       //International
          onChange={handleChange}
          value={contact}
          name="contact"
          id="contact"
          variant="outlined"
          fullWidth
        />
      </Box>
    </Container>
  );
}

export default VerifyPhoneNo;
