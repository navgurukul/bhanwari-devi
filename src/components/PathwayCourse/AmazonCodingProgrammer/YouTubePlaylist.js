import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { versionCode } from "../../../constant";
import axios from "axios";
import { METHODS } from "../../../services/api";

import { Typography, Paper, Button, Grid } from "@mui/material";
import useStyles from "./style";
const YouTubePlaylist = ({
  setPlaylistVideos,
  playlistVideos,
  slicedVideos,
  setSlicedVideos,
  pageNumber,
  limit,
}) => {
  const classes = useStyles();
  const user = useSelector(({ User }) => User);
  let recurring_id = null;

  // Getting the recurring_id and then calling youtubeBroadcast api to get the videos array to display videos.
  useEffect(() => {
    let isMounted = true;
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/7/ACBEnrolledBatches`,
      headers: {
        accept: "application/json",
        "version-code": versionCode,
        Authorization: user.data.token,
      },
    })
      .then((res) => {
        const foundBatch = res.data.find((item) => item.recurring_id);
        if (foundBatch) {
          recurring_id = foundBatch.recurring_id;
        }
      })
      .then(() => {
        axios({
          method: METHODS.GET,
          url: `${process.env.REACT_APP_MERAKI_URL}/youtubeBroadcast/${recurring_id}`,
          headers: {
            accept: "application/json",
            "version-code": versionCode,
            Authorization: user.data.token,
          },
        })
          .then((res) => {
            if (isMounted) {
              setPlaylistVideos(res.data);
            }
          })
          .catch((err) => {});
      })

      .catch((err) => {});

    return () => {
      isMounted = false;
    };
  }, [recurring_id]);

  // sliced videos setting:
  useEffect(() => {
    const slicedData = playlistVideos.slice(
      pageNumber * limit,
      (pageNumber + 1) * limit
    );
    setSlicedVideos(slicedData);
  }, [playlistVideos]);

  //  ---------------------------------------------

  return (
    <Grid container spacing={2}>
      {slicedVideos.map((video) => (
        <Grid item md={4} sm={6} xs={12} key={video.id}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6" mt={1} mb={2}>
              {video.title}
            </Typography>
            <div className={classes.videoContainer}>
              <iframe
                src={`https://www.youtube.com/embed/${video.video_id}`}
                title={video.title}
                style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                allowFullScreen
              ></iframe>
            </div>
            <Button
              color="primary"
              className={classes.button}
              onClick={() =>
                window.open(
                  `https://www.youtube.com/embed/${video.video_id}`,
                  "_blank"
                )
              }
            >
              Go to YouTube
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default YouTubePlaylist;
