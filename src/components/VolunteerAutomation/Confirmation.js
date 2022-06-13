import React, { useEffect } from "react";
import { Typography, Container, Stack, Button } from "@mui/material";

function Confirmation({ setDisable }) {
  useEffect(() => {
    setDisable(false);
  }, []);

  return (
    <Container sx={{ mt: 5, mb: 15 }} maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        We can’t wait to see you taking classes
      </Typography>
      <Typography variant="body1" gutterBottom>
        It’s all done. Thanks for completing the short onboarding. Your students
        are eager to meet you in the first class
      </Typography>

      <Stack sx={{ mt: 5 }} alignItems="center">
        <img src={require("./assets/completed_task.svg")} />
      </Stack>
    </Container>
  );
}

export default Confirmation;
