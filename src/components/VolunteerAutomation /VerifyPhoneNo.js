import React from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
} from "@mui/material";

function VerifyPhoneNo() {
  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Please let us verify your phone number
      </Typography>
      <Typography variant="body1" gutterBottom>
        We will only use your number to contact you for volunteer related
        manners. We never share it to any third party
      </Typography>
      <Box sx={{ mt: 4 }}>
        <TextField
          label="Phone Number"
          type="number"
          pattern="^[0-9]{10}$"
          // onChange={(e) => {
          //     setMobile(e.target.value);
          // }}
          // value={mobile}
          variant="outlined"
          required
          fullWidth
        />
      </Box>
    </Container>
  );
}

export default VerifyPhoneNo;
