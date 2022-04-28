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
import axios from "axios";
import { useSelector } from "react-redux";
// import { Button } from "framework7-react";
import { METHODS } from "../../services/api";

const UpcomingCourse = () => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const user = useSelector(({ User }) => User);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `http://dev-api.navgurukul.org/apiDocs/pathways/1/upcomingBatches`,
      headers: {
        accept: "application/json",
        Authorization: user.data?.token || "",
      },
    }).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box align="right" mt={1} maxWidth={500} mb={10}>
          <Card elevation={2} pl={10}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                AnkitParashar_15SEP21
              </Typography>
              <Typography variant="body1" mb={2}>
                <img
                  className={classes.icons}
                  src={require("./assets/calender.svg")}
                  alt="Students Img"
                />
                From 15 Sep 21 - 15 Nov 21
              </Typography>
              <Typography variant="body1" mb={1}>
                <img
                  className={classes.icons}
                  src={require("./assets/degree.svg")}
                  alt="Students Img"
                />
                Access to live classes
              </Typography>
              <AlertDialog />
              <Typography mt={2}>
                Can’t start on 15 Sep 21?
                <Link className={classes.link} color="success" href="#">
                  {" "}
                  Check out our other batches
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};
export default UpcomingCourse;
