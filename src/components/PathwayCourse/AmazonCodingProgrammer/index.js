import React from "react";
import YouTubePlaylist from "./YouTubePlaylist";
import { Grid, Typography, Box } from "@mui/material";

const AmazonCodingProgrammerindex = () => {
  let apikey = process.env.REACT_APP_amazon;
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <h1>Amazon Coding Bootcamp</h1>
      </Grid>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
             <Grid item>
          <Typography variant="h6">Batch 1</Typography>
          <YouTubePlaylist
            playlistId="PLidpa_6o_TvdD_KxySG-NJ2rh2t7MNy1P"
            apiKey={apikey}
            videoSpacing="20px"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AmazonCodingProgrammerindex;
