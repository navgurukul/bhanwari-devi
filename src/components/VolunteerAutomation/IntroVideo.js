import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  useMediaQuery,
  Button,
  Card,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReactPlayer from "react-player";

import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";

function IntroVideo({ setDisable }) {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  const handleProgress = (secs) => {
    if (secs > 10) {
      setDisable(false);
    }
  };

  return (
    <Container maxWidth="lg" align="center">
      <Container maxWidth="sm" mb={3}>
        <Typography variant="h6" align="left" mb={2}>
          Our teaching philosophy
        </Typography>
        <Card mb={2}>
          <CardActionArea>
            <Container maxWidth="sm">
              {/* <CardMedia
                component="iframe"
                maxWidth=""
                image="https://www.youtube.com/embed/muuK4SpRR5M"

              /> */}
              <ReactPlayer
                url="https://www.youtube.com/watch?v=kmk5xYOpAlM"
                className="react-player"
                playing={false}
                width="100%"
                height="100%"
                onProgress={(e) => handleProgress(e.playedSeconds)}
              />
            </Container>
          </CardActionArea>
        </Card>

        <Box className={classes.TrackButtonBox}>
          <Button
            variant="text"
            startIcon={<ArrowBackIosIcon />}
            sx={{
              color: "#6D6D6D",
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIosIcon />}
          >
            Next Step
          </Button>
        </Box>
      </Container>
    </Container>
  );
}

export default IntroVideo;
