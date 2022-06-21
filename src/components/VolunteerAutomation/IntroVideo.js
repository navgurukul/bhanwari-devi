import React from "react";
import { Typography, Container } from "@mui/material";
import ReactPlayer from "react-player";

function IntroVideo({ setDisable }) {
  const handleProgress = (secs) => {
    if (secs > 1) {
      setDisable(false);
    }
  };

  return (
    <Container sx={{ mt: 6 }} maxWidth="lg" align="center">
      <Container maxWidth="sm" mb={3}>
        <Typography variant="h6" align="left" mb={2}>
          Our teaching philosophy
        </Typography>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=6J1V3VNFYZU"
          className="react-player"
          playing={false}
          width="100%"
          // height="100%"
          onProgress={(e) => handleProgress(e.playedSeconds)}
        />
      </Container>
    </Container>
  );
}

export default IntroVideo;
