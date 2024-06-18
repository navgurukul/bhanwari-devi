import React from "react";
import { Typography, Container } from "@mui/material";
import { Grid } from "@mui/material";
import LearningTrackCard from "./LearningTrackCard";

function ReturningUserPage({ learningTracks }) {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h6" mb={5} mt={5}>
          My Learning Tracks
        </Typography>
        <Grid container spacing={1}>
          {learningTracks.map((item) => (
            <LearningTrackCard item={item} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
export default ReturningUserPage;
