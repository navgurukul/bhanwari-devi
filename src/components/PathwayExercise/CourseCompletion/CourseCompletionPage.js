import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";

function CourseCompletionPage() {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  return (
    <>
      <Container maxWidth="lg" align="center">
        <Box>
          <img src={require("../asset/specialdeals.svg")} />
          <Typography variant="h6" width="400px" mt={3} mb={4}>
            Congratulations! You completed Introduction to Python
          </Typography>
          <Button variant="contained">Next Up: Variables</Button>
        </Box>
      </Container>
    </>
  );
}

export default CourseCompletionPage;
