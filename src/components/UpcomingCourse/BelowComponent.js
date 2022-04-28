import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import { CardMedia, CardContent, Card, Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import AlertDialog from "./dilog";
// import { Button } from "framework7-react";

const BelowComponent = () => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  return (
    <>
      <Container align="center">
        <Box maxWidth={500} bgcolor="#E9F5E9" mb={10} pt={3} height={280}>
          <Typography align="center" gutterBottom variant="h5">
            Batch: Ankit_15SEP21
          </Typography>
          <Typography variant="body1" mb={2} align="center">
            <img
              className={classes.icons}
              src={require("./assets/calender.svg")}
              alt="Students Img"
            />
            15 Sep 21 - 15 Nov 21
          </Typography>
          <Typography variant="body1" mb={1} align="center">
            <img
              className={classes.icons}
              src={require("./assets/degree.svg")}
              alt="Students Img"
            />
            Access to live classes
          </Typography>
          <Stack alignItems="center" maxWidth={600}>
            <AlertDialog />
          </Stack>
          <Typography mt={2} color="primary.text" align="center">
            Can’t start on 15 Sep 21?
            <Link className={classes.link} color="success" href="#">
              {" "}
              Check out our other batches
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};
export default BelowComponent;
