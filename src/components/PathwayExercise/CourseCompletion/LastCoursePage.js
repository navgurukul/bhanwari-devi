import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";

function LastCoursePage() {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  return (
    <>
      <Container maxWidth="lg" align="center">
        <Box>
          <img src={require("../asset/specialdeals.svg")} alt="icon" />
          <Typography variant="h6" width="400px" mt={3} mb={4}>
            Congratulations! You completed the Python track
          </Typography>
          <Button variant="contained">Return to Dashboard</Button>
        </Box>
      </Container>
    </>
  );
}

export default LastCoursePage;
