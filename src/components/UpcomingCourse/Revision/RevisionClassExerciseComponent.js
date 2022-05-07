import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CardMedia, CardContent, Card, Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import useStyles from "../styles";
import { useSelector } from "react-redux";
import { breakpoints } from "../../../theme/constant";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// import { Button } from "framework7-react";

const RevisionClassExerciseComponent = () => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  return (
    <>
      <Container>
        <Box backgroundColor="primary.light" p={2}>
          <Typography
            variant="body1"
            mb={1}
            align="left"
            style={{
              display: "flex",
            }}
          >
            {" "}
            <img
              className={classes.icons}
              src={require("./assets/Group.svg")}
              alt="Students Img"
            />
            Need help? We got you covered. Enroll in the doubt class on 15 Oct,
            21 at 4 PM - 5 PM
          </Typography>

          <Button
            endIcon={<ArrowForwardIosIcon />}
            // variant="outlined"
            sx={{
              width: isActive ? "90%" : "215px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            View Class Details
          </Button>
        </Box>
      </Container>
    </>
  );
};
export default RevisionClassExerciseComponent;
