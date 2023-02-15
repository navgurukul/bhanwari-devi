import React, { useEffect, useState } from "react";
import { format } from "../../common/date";
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone";
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
  // console.log(props.item,'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
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
  const languageMap = {
    hi: "Hindi",
    en: "English",
    te: "Telugu",
    ta: "Tamil",
    mr: "Marathi",
  };

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

  const data = useSelector((state) => {
    return state;
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
  }, [pathwayId]);

  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: pathwayId }));
  }, [dispatch, pathwayId]);

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
  console.log(pathwayCourseData, ">>>>>>>>>>>.");
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
  console.log(upcomingBatchesData);

  return (
    <>
      <Card
        elevation={2}
        sx={{
          // width: "540px",
          width: "526px",
          marginBottom: "32px",
          borderRadius: "8px",
          padding: "16px",
          // padding: "16px",
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
                sx={{ width: "73%", marginLeft: isActive ? "30px" : "40px" }}
                variant="determinate"
                value={parseInt(completedPortionJason) || 0}
              />
            </Grid>
          </Grid>

          {(pathwayCourseData?.code == "PRGPYT" ||
            pathwayCourseData?.code == "SPKENG") &&
            (upcomingBatchesData?.length > 0 ? (
              <>
                <hr align="center" className={classes.hrunderLine} />
                <Typography variant="subtitle1" mb={2}>
                  Batch : {upcomingBatchesData[0].title}
                </Typography>
                <Typography variant="body1" mb={2} color="text.secondary">
                  Upcoming Classes
                </Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid item md={1}>
                    <img
                      src={require("./assets/classtype.svg")}
                      alt="Google Playstore Icon"
                    />
                  </Grid>
                  <Grid item md={9} xs={7}>
                    <Typography variant="body1">
                      {upcomingBatchesData[0]?.sub_title}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{ justifyItems: "right", alignItems: "right" }}
                  >
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
                </Grid>
                <Grid container sx={{ marginBottom: "16px" }}>
                  <Grid
                    item
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    <Typography variant="body2">
                      {upcomingBatchesData[0]?.start_time &&
                        format(upcomingBatchesData[0]?.start_time, "dd MMM yy")}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      marginLeft: "8px",
                      color: "text.secondary",
                    }}
                  >
                    <img
                      src={require("./assets/Ellipse26.svg")}
                      alt="Google Playstore Icon"
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{
                      marginLeft: "8px",
                      color: "text.secondary",
                    }}
                  >
                    <Typography variant="body2">
                      {languageMap[upcomingBatchesData[0]?.lang]}
                    </Typography>
                  </Grid>
                </Grid>
                <LearningTrackTimerButton
                  startTime={upcomingBatchesData[0]?.start_time}
                  link={upcomingBatchesData[0]?.meet_link}
                />
                <Button
                  variant="outlined"
                  sx={{
                    marginTop: isActive ? "0px" : "32px",
                    left: isActive ? "180px" : "350px",
                    border: "none",
                    // left: isActive ? "180px" : "436px",
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
                  <KeyboardArrowRightTwoToneIcon sx={{ marginTop: ".2rem" }} />
                </Button>
              </>
            ) : (
              <>
                <hr align="center" className={classes.hrunderLine} />

                <Grid container>
                  <Grid item md={2}>
                    <img
                      src={require("./assets/noclasses.png")}
                      alt="Google Playstore Icon"
                      sx={{ width: "62px", height: "114px" }}
                    />
                  </Grid>
                  <Grid item md={1}></Grid>
                  <Grid item md={8}>
                    <Typography variant="body1">
                      Your classes will start soon. Your tutor/partner will be
                      in touch about the upcoming batch.
                    </Typography>
                  </Grid>
                </Grid>
                <Button
                  variant="outlined"
                  sx={{
                    marginTop: "32px",
                    left: isActive ? "180px" : "350px",
                    border: "none",
                    // left: isActive ? "180px" : "436px",
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
                  <KeyboardArrowRightTwoToneIcon sx={{ marginTop: ".2rem" }} />
                </Button>
              </>
            ))}
        </CardContent>
      </Card>
    </>
  );
}

export default LearningTrackCard;
