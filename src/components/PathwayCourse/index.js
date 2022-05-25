import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CheckIcon from "@mui/icons-material/Check";
import useStyles from "./styles";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { METHODS } from "../../services/api";

import { PATHS, interpolatePath } from "../../constant";
import { useParams } from "react-router-dom";
import { breakpoints } from "../../theme/constant";
import { useSelector, useDispatch } from "react-redux";
import { actions as pathwayActions } from "./redux/action";
import { actions as upcomingBatchesActions } from "./redux/action";
import { actions as upcomingClassActions } from "./redux/action";

import {
  Container,
  Box,
  Grid,
  Card,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import PathwayCourseBatchEnroll1 from "../BatchClassComponents/PathwayCourseBatchEnroll1";
import PathwayCourseBatchEnroll2 from "../BatchClassComponents/PathwayCourseBatchEnroll2";
import PathwayCards from "./PathwayCards/index.js";

const pathways = [
  {
    pathway: "Python",
    code: "PRGPYT",
    description:
      "Learn the basics and become comfortable in one of the most popular programming languages Python.",
    outcomes: [
      "Get equipped to build small projects like calculator or to-do list",
      "Get the base knowledge to apply to advanced bootcamps such as Navgurukul or Zoho Schools",
    ],
  },
  {
    pathway: "Javascript",
    code: "JVSCPT",
    description:
      "Learn the nuances and basics of the technology that powers the web. Start with learning what is Javascript and eventually build your own website.",
    outcomes: [
      "Build your first web page and power it with the interactive language of Javascript",
      "Build your basics of HTML, CSS and Javascript to prepare for advanced web development courses",
    ],
  },
  {
    pathway: "Typing Guru",
    code: "TYPGRU",
    description:
      "The typing track allows you to practice keyboard typing in a adaptive manner. You require a keyboard if on Android or use your laptop keyboard.",
    outcomes: [
      "Reach a typing speed of up to 30 to 40 words per minute",
      "Be able to type long text with minimal inaccuracies",
    ],
  },
  {
    pathway: "Spoken English & Grammar",
    code: "SPKENG",
    description:
      "English is a great tool needed to navigate the tech world and also in an International setting. Whether you are a total beginner or already know some English, prepare for the challenge with our Spoken English classes and online courses.",
    outcomes: [
      "Start speaking English without fear in about 6 months",
      "Be able to read, write, listen and speak English with fluency",
      "Be able to give oral presentations, talk to friends and prospective colleagues",
    ],
  },
];

function PathwayCourse() {
  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();

  const { pathwayCourse } = useSelector((state) => state.Pathways);
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const params = useParams();
  const pathwayId = params.pathwayId;
  const [enrolledBatches, setEnrolledBatches] = useState(null);
  const data = useSelector((state) => {
    return state;
  });

  const upcomingBatchesData = useSelector((state) => {
    return state.Pathways?.upcomingBatches?.data;
  });
  const userEnrolledClasses = useSelector((state) => {
    return state.Pathways?.upcomingEnrolledClasses?.data;
  });
  const history = useHistory();

  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: pathwayId }));
  }, [dispatch, pathwayId]);

  useEffect(() => {
    if (user?.data?.token) {
      dispatch(
        upcomingBatchesActions.getUpcomingBatches({
          pathwayId: pathwayId,
          authToken: user?.data?.token,
        })
      );
      dispatch(
        upcomingClassActions.getupcomingEnrolledClasses({
          pathwayId: pathwayId,
          authToken: user?.data?.token,
        })
      );
    }

    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}pathways/${pathwayId}/enrolledBatches`,
      headers: {
        Authorization: user?.data?.token,
      },
    }).then((res) => {
      if (res.data.length > 0) {
        setEnrolledBatches(res.data);
      }
    });
  }, [dispatch, pathwayId]);

  data.Pathways.data &&
    data.Pathways.data.pathways.forEach((pathway) => {
      pathways.forEach((item) => {
        if (pathway.code === item.code) {
          item["id"] = pathway.id;
        }
      });
    });

  const pathwayCourseData = pathways.find((item) => {
    return item.id == pathwayId;
  });

  return (
    <>
      <Container className={classes.pathwayContainer} maxWidth="lg">
        {userEnrolledClasses?.length > 0 ? (
          <PathwayCards userEnrolledClasses={userEnrolledClasses} />
        ) : (
          pathwayId &&
          pathwayCourseData && (
            <>
              <Grid
                container
                spacing={2}
                align="center"
                className={classes.box}
              >
                <Grid item xs={12} md={6} sx={{ pl: 2 }}>
                  <Card
                    align="left"
                    elevation={0}
                    className={classes.titleCard}
                  >
                    <Typography
                      variant="body2"
                      className={classes.cardSubtitle}
                      sx={{ textAlign: isActive && "center", pb: "8px" }}
                    >
                      Learning Track
                    </Typography>
                    <Typography
                      variant="h4"
                      className={classes.heading}
                      sx={{ textAlign: isActive && "center", pb: "16px" }}
                    >
                      {pathwayCourseData.pathway}
                    </Typography>
                    <Typography variant="body1">
                      {pathwayCourseData.description}
                    </Typography>
                    {!user?.data?.token ? (
                      <>
                        <Typography
                          variant="body1"
                          mt={2}
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          Want to learn through live classes by a teacher?
                        </Typography>
                        <Button
                          variant="contained"
                          mt={4}
                          sx={{
                            margin: "10px 0",
                            padding: "0px 60px",
                          }}
                          onClick={() => {
                            history.push(PATHS.LOGIN);
                          }}
                        >
                          Log In To Enroll
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                  </Card>
                </Grid>

                <Grid item xs={12} md={6} sx={{ pl: 2 }}>
                  <PathwayCourseBatchEnroll1
                    upcomingBatchesData={upcomingBatchesData}
                  />
                </Grid>
                {/* <Grid xs={12} md={6} sx={{ pl: 2 }}>
                  <CardMedia
                    component="video"
                    autoPlay
                    controls
                    height="260"
                    src="https://www.youtube.com/watch?v=Doo1T5WabEU"
                    sx={{ width: isActive ? 380 : 480 }}
                  />
                </Grid> */}
              </Grid>
              <Box className={classes.Box1}>
                <Typography
                  variant="h5"
                  sx={{ textAlign: isActive && "center" }}
                >
                  Learning Outcomes
                </Typography>
                <Grid container spacing={0} align="center">
                  {pathwayCourseData.outcomes.map((item) => (
                    <Grid xs={12} md={4}>
                      <Card align="left" elevation={0}>
                        <Box className={classes.flex}>
                          <CheckIcon color="primary" />
                          <Typography sx={{ ml: 1 }} variant="body1">
                            {item}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          )
        )}

        <Box className={classes.box}>
          <Typography
            className={classes.course}
            variant="h5"
            sx={{ textAlign: isActive && "center" }}
          >
            Courses
          </Typography>
          <Grid container spacing={3} align="center">
            {pathwayCourse &&
              pathwayCourse.data &&
              pathwayCourse.data.courses.map((item, index) => (
                <Grid xs={12} md={3} className={classes.courseCard}>
                  <Link
                    className={classes.pathwayLink}
                    to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                      courseId: item.id,
                      exerciseId: 0,
                      pathwayId: pathwayId,
                    })}
                  >
                    <Card
                      className={classes.pathwayCard}
                      elevation={0}
                      sx={{ ml: 3, p: "16px" }}
                    >
                      <img
                        className={classes.courseImage}
                        src={item.logo}
                        alt="course"
                      />
                      <div className={classes.courseTitleNumber} disableGutters>
                        <Typography
                          align={isActive ? "center" : "left"}
                          variant="body2"
                          className={classes.courseName}
                          sx={{
                            mr: "10px",
                            padding: isActive ? "5px" : "5px 0 5px 13px",
                            verticalAlign: "top",
                          }}
                        >
                          {index + 1}
                        </Typography>
                        <Typography
                          align={isActive ? "center" : "left"}
                          variant="body1"
                          // sx={{ mt: "16px" }}
                        >
                          {item.name}
                        </Typography>
                      </div>
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
          <Grid align="center">
            <Grid className={classes.certificateLogo}>
              <img src={require("./asset/separator.svg")} alt="icon" />
            </Grid>
            <Grid className={classes.certificateLogo}>
              <img
                src={require("./asset/Layer_1.svg")}
                alt="certificate icon"
              />
            </Grid>
          </Grid>
          {!user?.data?.token ? (
            <Container align="center">
              <Box
                maxWidth={500}
                bgcolor="#E9F5E9"
                mb={10}
                pt={3}
                height={100}
                style={{ padding: "15px" }}
              >
                <Typography
                  variant="body1"
                  mt={2}
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Want to learn through live classes by a teacher?
                </Typography>
                <Button
                  variant="contained"
                  mt={4}
                  sx={{
                    margin: "10px 0",
                    padding: "0px 60px",
                  }}
                  onClick={() => {
                    history.push(PATHS.LOGIN);
                  }}
                >
                  Log In To Enroll
                </Button>
              </Box>
            </Container>
          ) : (
            ""
          )}
          {!(userEnrolledClasses?.length > 0) &&
          upcomingBatchesData?.length > 0 ? (
            <PathwayCourseBatchEnroll2
              upcomingBatchesData={upcomingBatchesData}
            />
          ) : (
            ""
          )}
        </Box>
      </Container>
    </>
  );
}
export default PathwayCourse;
