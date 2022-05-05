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
import CheckMoreBatches from "./CheckMoreBatches";
import IntroToPython from "./JoinClass/IntroToPython";

const UpcomingCourse = (props) => {
  const [open, setOpen] = React.useState(false);
  const [upcomingBatchesOpen, setUpcomingBatchesOpen] = React.useState(false);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  // const user = useSelector(({ User }) => User);
  const { upcomingBatchesData } = props;
  const [BatchData, setBatchData] = useState(upcomingBatchesData[0]);

  useEffect(() => {
    setBatchData(upcomingBatchesData[0]);
  }, [upcomingBatchesData]);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const close = () => {
    setOpen(false);
  };
  const handleUpcomingBatchesClickOpen = () => {
    setUpcomingBatchesOpen(true);
  };
  const handleUpcomingBatchesClickClose = () => {
    setUpcomingBatchesOpen(false);
  };
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

  // {
  //   "id": 27508,
  //   "title": "revision-3 by muskan",
  //   "description": "What are computers and what do they do? What is programming? Instances of programming in daily life. Basic definitions.Continue with basic definitions. Why Python? Explore the interface of Python. How to use indentation and comments in the Meraki app.",
  //   "facilitator_id": 1343,
  //   "start_time": "2022-05-15T05:56:42.000+05:30",
  //   "end_time": "2022-05-15T06:56:42.000+05:30",
  //   "category_id": 3,
  //   "video_id": null,
  //   "lang": "hi",
  //   "type": "batch",
  //   "meet_link": "https://meet.google.com/har-nxqs-fef",
  //   "calendar_event_id": "8t8ufp5pme9oegtnkjp7srthnc_20220515T002642Z",
  //   "material_link": null,
  //   "max_enrolment": 5,
  //   "recurring_id": 385,
  //   "sub_title": "Class 1 - Introduction to Computers, Programming and Python",
  //   "course_version": "v2",
  //   "facilitator": {
  //     "name": "Anand Patel",
  //     "email": "anandnavgurukul@gmail.com"
  //   },
  //   "registrations": [
  //     {
  //       "user_id": 1888
  //     },
  //     {
  //       "user_id": 1890
  //     },
  //     {
  //       "user_id": 77
  //     },
  //     {
  //       "user_id": 1899
  //     },
  //     {
  //       "user_id": 2025
  //     }
  //   ],
  //   "parent_class": {
  //     "id": 385,
  //     "frequency": "DAILY",
  //     "occurrence": 28,
  //     "until": null,
  //     "on_days": null,
  //     "calendar_event_id": "8t8ufp5pme9oegtnkjp7srthnc",
  //     "cohort_room_id": "!SZokxMutQQfbefCOJK:navgurukul.org"
  //   },
  //   "rules": {
  //     "en": "## Rules\n- Join the class atleast\n10 minutes before schedule.\n\n- Watch [this video](https://www.youtube.com/watch?v=QfBnS1Gnw2c) if you are new to\nMeraki, to follow the instructions."
  //   }
  // }
  return BatchData ? (
    <>
      <Container maxWidth="lg">
        <Box align="right" mt={1} maxWidth={500} mb={10}>
          <Card elevation={2} pl={10}>
            <CardContent>
              <Typography gutterBottom variant="h5" align="start">
                {BatchData?.title}
              </Typography>
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
                From {BatchData?.start_time.split("T")[0]} -{" "}
                {BatchData?.end_time.split("T")[0]}
              </Typography>
              <Typography
                variant="body1"
                mb={1}
                style={{
                  display: "flex",
                  // padding: "10px 0",
                }}
              >
                <img
                  className={classes.icons}
                  src={require("./assets/degree.svg")}
                  alt="Students Img"
                />
                Access to live classes
              </Typography>
              <Button variant="contained" onClick={handleClickOpen} fullWidth>
                Enroll Batch
              </Button>
              <AlertDialog
                open={open}
                close={close}
                title={BatchData?.title}
                start_time={BatchData?.start_time}
                end_time={BatchData?.end_time}
                id={BatchData?.id}
              />
              <Typography
                mt={2}
                align="start"
                style={{
                  display: "flex",
                }}
              >
                Can’t start on {BatchData?.start_time.split("T")[0]}
                {" ? "}
                <Link className={classes.link}>
                  <Typography
                    color="primary"
                    onClick={handleUpcomingBatchesClickOpen}
                  >
                    {" "}
                    Check out our other batches
                  </Typography>
                </Link>
                <CheckMoreBatches
                  open={upcomingBatchesOpen}
                  handleUpcomingBatchesClickOpen={
                    handleUpcomingBatchesClickOpen
                  }
                  handleUpcomingBatchesClickClose={
                    handleUpcomingBatchesClickClose
                  }
                  upcomingBatchesData={upcomingBatchesData}
                />
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <IntroToPython />
      </Container>
    </>
  ) : (
    ""
  );
};
export default UpcomingCourse;
