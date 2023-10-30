import React, { useState, useEffect } from "react";
import { Typography, Paper, Button, Grid } from "@mui/material";
import useStyles from "./style";
const YouTubePlaylist = ({
  playlistId,
  apiKey,
  videoSpacing,
  setPlaylistVideos,
  playlistVideos,
  slicedVideos,
  setSlicedVideos,
  pageNumber,
  limit,
}) => {
  const classes = useStyles();

  useEffect(() => {
    async function getPlaylistVideos() {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPlaylistVideos(data.items || []);
        setSlicedVideos(
          data.items.slice(pageNumber * limit, (pageNumber + 1) * limit) || []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getPlaylistVideos();
  }, [playlistId, apiKey]);

  useEffect(() => {
    const slicedData = playlistVideos.slice(
      pageNumber * limit,
      (pageNumber + 1) * limit
    );
    setSlicedVideos(slicedData);
  }, [pageNumber]);

  return (
    <Grid container spacing={2}>
      {slicedVideos.map((video, index) => (
        <Grid item md={4} sm={6} xs={12} key={video.id}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6" mt={1} mb={2}>
              {video.snippet.title}
            </Typography>
            {/* <video
                controls
                className={classes.video}
              >
                <source src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                  type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
            <div className={classes.videoContainer}>
              <iframe
                src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                title={video.snippet.title}
                style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                allowFullScreen
              ></iframe>
            </div>
            <Button
              // variant="contained"
              color="primary"
              className={classes.button}
              onClick={() =>
                window.open(
                  `https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`,
                  "_blank"
                )
              }
            >
              Go to YouTube
            </Button>
          </Paper>

          {/* Add a button to go to YouTube */}
        </Grid>
      ))}
    </Grid>
  );
};

export default YouTubePlaylist;
