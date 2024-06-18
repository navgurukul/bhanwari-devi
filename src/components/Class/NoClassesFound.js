import React from "react";
import { Box, Typography, Container } from "@mui/material";
function NoClassesFound() {
  return (
    <>
      <Container mt={2} maxWidth={500} align="center" mb={5}>
        <img alt="img" src={require("./assets/noClass.png")} />
        <Typography variant="body1" margin="32px 0px">
          Add classes by creating a new batch
        </Typography>
      </Container>
    </>
  );
}

export default NoClassesFound;
