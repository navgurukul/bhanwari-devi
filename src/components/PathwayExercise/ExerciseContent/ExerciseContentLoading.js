import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";

function ExerciseContentLoading() {
  return (
    <Container maxWidth="lg">
      <Grid container justifyContent={"center"}>
        <Grid xs={0} item>
          <Box sx={{ m: "32px 0px" }}>
            <Typography variant="h1"></Typography>
          </Box>
        </Grid>
        <Grid item sx={{ marginTop: "25px" }}>
          {/* create skeleton for text */}
          {[1, 1, 1, 6, 4, 4, 8, 3, 4].map((item, index) => (
            <Typography variant="h1" padding={2}>
              <Skeleton width={500} height={40 * item - index} />
              <Skeleton width={500} height={40 * item - index} />
            </Typography>
          ))}
        </Grid>
      </Grid>
      <Container maxWidth="sm"></Container>
    </Container>
  );
}

export default ExerciseContentLoading;
