import React from "react";
import YouTube from "react-youtube";
import { Typography, CardMedia, useMediaQuery } from "@mui/material";
import { breakpoints } from "../../../theme/constant";
import useStyles from "./styles";

function AdmissionVideo() {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  return (
    <div className={classes.admissionVideoContainer}>
      <CardMedia>
        <YouTube
          className={!isActive ? classes.admitionVideo : classes.admitionVideo1}
          videoId={`vuSwndj5cbs`}
        />
      </CardMedia>
      <Typography variant="subtitle1" gutterBottom align="center">
        Experience of NG Alumni & Graduates
      </Typography>
    </div>
  );
}

export default AdmissionVideo;
