import React from "react";
import { Typography, Container, Box, TextField } from "@mui/material";

function VerifyPhoneNo({ setDisable, setContact, contact }) {
  const handleChange = (event) => {
    const number = event.target.value?.replace(/[^0-9]/g, "") || "";
    setDisable(number.length !== 10);
    setContact(number);
  };

  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Please let us verify your phone number
      </Typography>
      <Typography variant="body1" gutterBottom>
        We will only use your number to contact you for volunteer related
        matters. We never share it to any third party.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <TextField
          label="Phone Number"
          type="tel"
          pattern="^[0-9]{10}$"
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
