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
import { getUpcomingBatches } from "../PathwayCourse/redux/api";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { METHODS } from "../../services/api";
import axios from "axios";
import LearningTrackTimerButton from "./LearningTrackTimerButton";
import path from "path";

const pathwayData = [
  {
    title: "Python",
    code: "PRGPYT",
    image: "python",
    description: "Get familiar with programming with bite sized lessons",
  },
  {
    title: "Scratch (CEL)",
    code: "SHCEL",
    image: "",
    description: "Get started with programming with block-based games",
  },
  {
    title: "Typing",
    code: "TYPGRU",
    image: "typing",
    description: "Learn to type with pinpoint accuracy and speed.",
  },
  {
    title: "Spoken English",
    code: "SPKENG",
    image: "language",
    description: "Master English with easy to understand courses",
  },
  {
    title: "Web Development",
    code: "JSRPIT",
    image: "web-development",
    description: "Learn the basics of tech that powers the web",
  },
  {
    title: "Residential Programmes",
    image: "residential",
    description: "Explore Navgurukul’s on campus Software Engineering courses",
  },
  {
    title: "Miscellaneous Courses",
    image: "misc",
    description: "Courses on Android, Game dev projects and more",
  },
];

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
  const { item, setPathway } = props;
  const pathwayId = item.pathway_id;
  const [completedPortionJason, setCompletedPortionJason] = useState();
  const [upcomingBatchesData, setUpcomingBatchesData] = useState();
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
  // useEffect(()=>{
  //   // setPathway(pathwayId)
  // })
  const data = useSelector((state) => {
    return state;
  });

  // console.log("upcomingdata", upcomingBatchesData);

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
  }, [pathwayId]);

  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: pathwayId }));
  }, [dispatch, pathwayId]);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/upcomingBatches`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token,
      },
    }).then((res) => {
      setUpcomingBatchesData(res.data);
    });
  }, []);
  // const upcomingBatchesData = useSelector((state) => {
  //   return state.Pathways?.upcomingBatches?.data;
  // });

  data.Pathways.data &&
    data.Pathways.data.pathways.forEach((pathway) => {
      pathwayData.forEach((item) => {
        if (pathway.code === item.code) {
          item["id"] = pathway.id;
        }
      });
    });

  const pathwayCourseData = pathwayData.find((item) => {
    return item.id == pathwayId;
  });
  console.log(pathwayCourseData);

  return (
    <>
      <Card
        elevation={2}
        sx={{
          width: "640px",
          marginBottom: "32px",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
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
            <Grid item md={4} xs={3}>
              <Typography gutterBottom variant="body1" pt={1}>
                {PathwayData?.name}
              </Typography>
            </Grid>
            <Grid item md={2} xs={1}></Grid>
            <Grid
              item
              md={4}
              sx={{
                textAlign: "right",
                marginLeft: "15px",
              }}
              xs={5}
            >
              <Typography variant="body2" color="text.secondary">
                Progress:
                {completedPortionJason}%
              </Typography>
              <LinearProgress
                // className={classes.progressBar}
                sx={{ width: "73%", marginLeft: isActive ? "30px" : "50px" }}
                variant="determinate"
                value={parseInt(completedPortionJason) || 0}
              />
            </Grid>
          </Grid>

          {(pathwayCourseData?.code == "PRGPYT" ||
            pathwayCourseData?.code == "SPKENG") &&
            upcomingBatchesData?.length > 0 && (
              <>
                <Typography variant="subtitle1" mb={2} mt={2}>
                  Batch : {upcomingBatchesData[0].title}
                </Typography>
                <Typography variant="body1" mb={2} color="text.secondary">
                  Upcoming Classes
                </Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid item>
                    <img
                      src={require("./assets/classtype.svg")}
                      alt="Google Playstore Icon"
                    />
                  </Grid>
                  <Grid item md={6} xs={4}>
                    <Typography variant="body1">
                      {upcomingBatchesData[0]?.sub_title}
                    </Typography>
                  </Grid>
                  <Grid item md={2} xs={2} sx={{ justifyItems: "left" }}>
                    {upcomingBatchesData[0]?.type === "batch" && (
                      <Chip
                        label="Batch"
                        textAlign="left"
                        sx={{
                          backgroundColor: "primary.light",
                          color: "primary.main",
                        }}
                      />
                    )}
                  </Grid>
                  <Grid
                    item
                    md={2}
                    sx={{
                      marginLeft: isActive ? "15px" : "20px",
                      color: "text.secondary",
                    }}
                  >
                    <Typography variant="body1">
                      {upcomingBatchesData[0]?.start_time &&
                        format(upcomingBatchesData[0]?.start_time, "dd MMM yy")}
                    </Typography>
                  </Grid>
                </Grid>

                <LearningTrackTimerButton
                  startTime={upcomingBatchesData[0]?.start_time}
                  link={upcomingBatchesData[0]?.meet_link}
                />
              </>
            )}
          <Button
            variant="outlined"
            sx={{
              marginTop: isActive ? "0px" : "32px",
              left: isActive ? "180px" : "436px",
            }}
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
      </Card>
    </>
  );
}

export default LearningTrackCard;
