import React, { useEffect, useState } from "react";
import { format } from "../../common/date";
import {
  Typography,
  Container,
  CardActionArea,
  CardMedia,
  Card,
  CardContent,
  Box,
  Link,
  LinearProgress,
  Collapse,
  Button,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, IconButton } from "@mui/material";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";
import { actions as upcomingBatchesActions } from "../PathwayCourse/redux/action";
import { actions as upcomingClassActions } from "../PathwayCourse/redux/action";
import { actions as enrolledBatchesActions } from "../PathwayCourse/redux/action";

import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import { useHistory } from "react-router-dom";
import { interpolatePath, PATHS } from "../../constant";
import { getPathwaysCourse } from "../PathwayCourse/redux/api";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { METHODS } from "../../services/api";
import ClassJoinTimerButton from "../Class/ClassJoinTimerButton";

import axios from "axios";
const CardData = {
  1: {
    image: "python",
    course_Name: "Python",
    NoOfCourse: "8",
    NoOfTopic: "1",
    TopicName: "Introduction To Python",
  },
  2: {
    image: "typeicon",
    course_Name: "Typing Guru",
    NoOfCourse: "5",
    NoOfTopic: "1",
    TopicName: "Home Row",
  },
  3: {
    image: "jsicon",
    course_Name: "Javascript",
    NoOfCourse: "8",
    NoOfTopic: "2",
    TopicName: "JS Variable",
  },
};
const CardDatas = {
  1: {},
};

function LearningTrackCard(props) {
  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");
  const classes = useStyles();
  const history = useHistory();
  const [PathwayData, setPathwayData] = useState([]);
  const [courseIndex, setCourseIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const { item } = props;
  const pathwayId = item.pathway_id;
  const [completedPortionJason, setCompletedPortionJason] = useState();
  const params = useParams();

  useEffect(() => {
    getPathwaysCourse({ pathwayId: pathwayId }).then((res) => {
      setPathwayData(res.data);
    });

    const COurseIndex = PathwayData?.courses?.findIndex((course, index) => {
      if (course.course_id === item.course_id) {
        return index;
      }
    });
    setCourseIndex(COurseIndex);
  }, [item]);
  // console.log(PathwayData,"pathwaydata");

  const data = useSelector((state) => {
    return state;
  });

  const upcomingBatchesData = useSelector((state) => {
    return state.Pathways?.upcomingBatches?.data;
  });
  const userEnrolledClasses = useSelector((state) => {
    return state.Pathways?.upcomingEnrolledClasses?.data;
  });

  const enrolledBatches = useSelector((state) => {
    console.log(state);
    if (state?.Pathways?.enrolledBatches?.data?.length > 0) {
      return state?.Pathways?.enrolledBatches?.data;
    } else {
      return null;
    }
  });

  console.log("upcomingdata", upcomingBatchesData);

  const loading = useSelector((state) => {
    const upcomingBatchesState = state?.Pathways?.upcomingBatches;
    const enrolledBatchesState = state?.Pathways?.enrolledBatches;
    return (
      (!upcomingBatchesState ||
        !enrolledBatchesState ||
        upcomingBatchesState.loading ||
        enrolledBatchesState.loading) &&
      !(upcomingBatchesData?.length > 0) &&
      !(enrolledBatches?.length > 0)
    );
  });

  useEffect(() => {
    // setLoading(true);
    if (user?.data?.token && pathwayId) {
      dispatch(
        enrolledBatchesActions.getEnrolledBatches({
          pathwayId: pathwayId,
          authToken: user?.data?.token,
        })
      );
      axios({
        method: METHODS.GET,
        url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/completePortion`,
        headers: {
          accept: "application/json",
          Authorization: user?.data?.token,
        },
      }).then((response) => {
        // console.log("response", response.data.total_completed_portion);
        setCompletedPortionJason(response.data.total_completed_portion);
      });
    }
  }, [dispatch, pathwayId]);

  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: pathwayId }));
  }, [dispatch, pathwayId]);

  useEffect(() => {
    if (user?.data?.token && enrolledBatches?.length > 0) {
      dispatch(
        upcomingClassActions.getupcomingEnrolledClasses({
          pathwayId: pathwayId,
          authToken: user?.data?.token,
        })
      );
    } else {
      if (user?.data?.token) {
        dispatch(
          upcomingBatchesActions.getUpcomingBatches({
            pathwayId: pathwayId,
            authToken: user?.data?.token,
          })
        );
      }
    }
  }, [enrolledBatches]);
  // data.Pathways.data &&
  //   data.Pathways.data.pathways.forEach((pathway) => {
  //     CardData.forEach((item) => {
  //       if (pathway.id === item.id) {
  //         item["id"] = pathway.id;
  //       }
  //     });
  //   });
  // console.log(CardDatas)
  // const pathwayCourseData = CardData.find((item) => {
  //   return item.id == pathwayId;
  // });

  // console.log(PathwayData)

  // useEffect(() => {
  //   // getupcomingEnrolledClasses
  //   if (
  //     user?.data?.token &&
  //     pathwayId !== "miscellaneous" &&
  //     pathwayId !== "residential"
  //   ) {
  //     // dispatch(
  //     //   upcomingBatchesActions.getupcomingEnrolledClasses({
  //     //     pathwayId: pathwayId,
  //     //     authToken: user?.data?.token,
  //     //   })
  //     // );
  //     dispatch(
  //       upcomingBatchesActions.getUpcomingBatches({
  //         pathwayId: pathwayId,
  //         authToken: user?.data?.token,
  //       })
  //     );
  //   }
  // }, [upcomingBatchesData]);
  // console.log(upcomingBatchesData,"upcoming")

  return (
    <>
      {/* <Grid
        onClick={() => {
          history.push(
            interpolatePath(PATHS.PATHWAY_COURSE, {
              pathwayId: item.pathway_id,
            })
          );
        }}
        xs={isActive ? 12 : isActiveIpad ? 6 : 4}
      >
        <Grid
          align="right"
          mt={1}
          maxWidth={350}
          mb={2}
          flexDirection="column"
          className={classes.courseCard}
        >
          <Card elevation={2} pl={10}>
            <CardActionArea>
              <CardContent>
                <Grid container mb={1} maxHeight={60}>
                  <Grid item>
                    <img
                      style={{
                        width: "55px",
                      }}
                      // align="left"
                      src={PathwayData?.logo}
                      alt="Students Img"
                    />
                  </Grid>
                  <Grid item mx={2}>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      pt={1}
                      maxWidth={75}
                    >
                      {PathwayData?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="body1"
                      mb={1}
                      color="text.secondary"
                      style={{
                        align: "left",
                        display: "flex",
                        padding: "10px 0",
                      }}
                    >
                      <img
                        src={require("./assets/Ellipse.svg")}
                        alt="Students Img"
                        style={{ margin: "0px 4px" }}
                      />
                      {PathwayData?.courses?.length} Courses
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  variant="body1"
                  mb={1}
                  style={{
                    display: "flex",
                  }}
                >
                  Ongoing Course
                </Typography>
                <Typography style={{ display: "flex" }} mt={2} variant="body1">
                  <Typography
                    mr="10px"
                    variant="body2"
                    // className={classes.courseNumber}
                  >
                    {/* {courseIndex} */}
      {/* </Typography>
                  {
                    PathwayData?.courses?.find(
                      (CourseItem) => CourseItem.id === item.course_id
                    )?.name
                  }
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid> */}
      <Card elevation={3} sx={{ width: "640px", marginBottom: "32px" }} pl={10}>
        <CardActionArea>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item>
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  // align="left"
                  src={PathwayData?.logo}
                  alt="Students Img"
                />
              </Grid>
              <Grid item md={4}>
                <Typography gutterBottom variant="subtitle1" pt={1}>
                  {PathwayData?.name}
                </Typography>
              </Grid>
              <Grid item md={2}></Grid>
              <Grid item md={4} sx={{ textAlign: "right" }}>
                <Typography variant="body2">
                  Progress:
                  {completedPortionJason}%
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    sx={{ textAlign: "right" }}
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </Typography>
                <LinearProgress
                  // className={classes.progressBar}
                  sx={{ width: "95%" }}
                  variant="determinate"
                  value={parseInt(completedPortionJason) || 0}
                />
              </Grid>
            </Grid>
          </CardContent>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              {PathwayData.code == "PRGPYT" ? (
                upcomingBatchesData ? (
                  <CardContent>
                    <Typography variant="subtitle1" mb={2}>
                      Upcoming Classes
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item>
                        <img
                          src={require("./assets/classtype.svg")}
                          alt="Google Playstore Icon"
                        />
                      </Grid>
                      <Grid item md={6}>
                        <Typography variant="body1">
                          {upcomingBatchesData[0]?.sub_title}
                        </Typography>
                      </Grid>
                      <Grid item md={2}>
                        {upcomingBatchesData[0]?.type === "batch" ? (
                          <Chip
                            label="Batch"
                            variant="outlined"
                            color="primary"
                            textAlign="left"
                          />
                        ) : (
                          ""
                        )}
                      </Grid>
                      <Grid item md={2}>
                        <Typography variant="body2">
                          {upcomingBatchesData[0]?.start_time
                            ? format(
                                upcomingBatchesData[0]?.start_time,
                                "dd MMM yy"
                              )
                            : ""}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Button sx={{ margin: "16px 0px" }}>
                      <ClassJoinTimerButton
                        startTime={upcomingBatchesData[0]?.start_time}
                        link={upcomingBatchesData[0]?.meet_link}
                      />
                    </Button>

                    <Grid container>
                      <Grid item md={1}>
                        <img
                          src={require("./assets/textline.svg")}
                          alt="Google Playstore Icon"
                        />
                      </Grid>
                      <Grid item md={4}>
                        <Typography variant="body1">
                          {upcomingBatchesData[0]?.title}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Button
                      variant="outlined"
                      mt={2}
                      sx={{ marginLeft: 50 }}
                      onClick={() => {
                        history.push(
                          interpolatePath(PATHS.PATHWAY_COURSE, {
                            pathwayId: item.pathway_id,
                          })
                        );
                      }}
                    >
                      Go to Track
                    </Button>
                  </CardContent>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </Box>
          </Collapse>
        </CardActionArea>
      </Card>
    </>
  );
}

export default LearningTrackCard;
