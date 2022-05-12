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
import CheckMoreBatches from "./CheckMoreBatches";
// import { Button } from "framework7-react";

const BelowComponent = (props) => {
  const [open, setOpen] = React.useState(false);

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const { upcomingBatchesData } = props;

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const close = () => {
    setOpen(false);
  };
  const [upcomingBatchesOpen, setUpcomingBatchesOpen] = React.useState(false);

  const { title, start_time, end_time, id } = props;
  const user = useSelector(({ User }) => User);
  // const handelEnrollment = (Id) => {
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register`,
  //       {},
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: user.data.token,
  //           "register-to-all": true,
  //         },
  //       }
  //     )
  //     .then(() => {
  //       handleClose();
  //     });
  // };
  const handleUpcomingBatchesClickOpen = () => {
    setUpcomingBatchesOpen(true);
  };
  const handleUpcomingBatchesClickClose = () => {
    setUpcomingBatchesOpen(false);
  };
  return upcomingBatchesData ? (
    <>
      <Container align="center">
        <Box maxWidth={500} bgcolor="#E9F5E9" mb={10} pt={3} height={280}>
          <Typography align="center" gutterBottom variant="h5">
            {upcomingBatchesData[0]?.title}
          </Typography>
          <Typography
            variant="body1"
            mb={1}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px 0",
            }}
          >
            <img
              className={classes.icons}
              src={require("./assets/calender.svg")}
              alt="Students Img"
            />
            {upcomingBatchesData[0]?.start_time.split("T")[0]} -{" "}
            {upcomingBatchesData[0]?.end_time.split("T")[0]}
          </Typography>
          <Typography
            variant="body1"
            mb={1}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px 0",
            }}
          >
            <img
              className={classes.icons}
              src={require("./assets/degree.svg")}
              alt="Students Img"
            />
            Access to live classes
          </Typography>
          <Stack alignItems="center" maxWidth={600}>
            <Button variant="contained" onClick={handleClickOpen}>
              {upcomingBatchesData[0]?.title} Enroll Batch
            </Button>
            <AlertDialog open={open} close={close} />
          </Stack>
          <Typography
            mt={2}
            align="start"
            style={{
              display: "flex",
            }}
          >
            Can’t start on {upcomingBatchesData[0]?.start_time.split("T")[0]}
            {" ? "}
            <Typography
              onClick={handleUpcomingBatchesClickOpen}
              color="primary"
            >
              {" "}
              Check out our other batches
            </Typography>
            <CheckMoreBatches
              open={upcomingBatchesOpen}
              handleUpcomingBatchesClickOpen={handleUpcomingBatchesClickOpen}
              handleUpcomingBatchesClickClose={handleUpcomingBatchesClickClose}
              upcomingBatchesData={upcomingBatchesData}
            />
          </Typography>
        </Box>
      </Container>
    </>
  ) : (
    ""
  );
};
export default BelowComponent;
