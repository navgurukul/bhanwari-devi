import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";

function NoVolunteerClass({ setFormType, toggleModalOpen }) {
  return (
    <>
      <Container mt={2} maxWidth={500} align="center" mb={5}>
        <img alt="img" src={require("./assets/ClassCreated.svg")} />
        <Typography variant="body1" margin="32px 0px">
          Welcome to the Volunteer Dashboard!
        </Typography>
      </Container>
    </>
  );
}

export default NoVolunteerClass;
