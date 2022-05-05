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

// import { Button } from "framework7-react";

const IntroToPython = () => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg">
        <Box align="right" mt={1} maxWidth={350} mb={10}>
          <Card elevation={2} pl={10}>
            <CardContent>
              <Typography gutterBottom variant="h5" align="start"></Typography>
              <Typography
                variant="body1"
                mb={1}
                style={{
                  display: "flex",
                  padding: "10px 0",
                }}
              >
                <img
                  className={classes.icons}
                  src={require("./assets/calender.svg")}
                  alt="Students Img"
                />
                15 Sep 21, 4 PM - 5 PM
              </Typography>
              <Typography
                variant="body1"
                mb={1}
                style={{
                  display: "flex",
                  // padding: "10px 0",
                }}
              >
                {" "}
                <img
                  className={classes.icons}
                  src={require("./assets/Group.svg")}
                  alt="Students Img"
                />
                Prajakta Kishori
              </Typography>
              <Typography
                align="left"
                mb={2}
                variant="body1"
                color="secondery.text"
              >
                Please join at least 10 mintues before the scheduled time
              </Typography>

              <Button variant="contained" fullWidth>
                join Class
              </Button>
              <Typography
                mt={2}
                align="start"
                style={{
                  display: "flex",
                }}
              ></Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};
export default IntroToPython;
