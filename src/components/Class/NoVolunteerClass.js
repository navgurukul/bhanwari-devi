import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";

function NoVolunteerClass() {
  return (
    <>
      <Container mt={2} align="center">
        <img alt="img" src={require("./assets/ClassCreated.svg")} />
        <Typography variant="body1" margin="32px 0px" align="center">
          Welcome to the Volunteer Dashboard!
        </Typography>
      </Container>
    </>
  );
}

export default NoVolunteerClass;
