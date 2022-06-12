import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";

function ErrorPage() {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  return (
    <>
      <Container maxWidth="lg" align="center">
        <Box>
          <img src={require("../asset/ErrorDog.svg")} />
          <Typography variant="body1" width="400px" mt={3} mb={4}>
            Mischievous and strange things are happening while loading the
            conent
          </Typography>
          <Button variant="text">Refresh Content</Button>
        </Box>
      </Container>
    </>
  );
}

export default ErrorPage;
