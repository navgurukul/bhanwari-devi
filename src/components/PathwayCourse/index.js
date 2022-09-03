import React, { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CheckIcon from "@mui/icons-material/Check";
import useStyles from "./styles";
import { Link, useHistory } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import { useParams } from "react-router-dom";
import { breakpoints } from "../../theme/constant";
import { useSelector, useDispatch } from "react-redux";
import { actions as pathwayActions } from "./redux/action";
import { actions as upcomingBatchesActions } from "./redux/action";
import { actions as upcomingClassActions } from "./redux/action";
import { actions as enrolledBatchesActions } from "./redux/action";
import ExternalLink from "../common/ExternalLink";
import NoBatchEnroll from "../BatchClassComponents/NoBatchEnroll";
import {
  Container,
  Box,
  Grid,
  Card,
  Typography,
  CardMedia,
  Button,
  Se,
  Skeleton,
  LinearProgress,
} from "@mui/material";
import PathwayCourseBatchEnroll1 from "../BatchClassComponents/PathwayCourseBatchEnroll1";
import PathwayCourseBatchEnroll2 from "../BatchClassComponents/PathwayCourseBatchEnroll2";
import PathwayCards from "./PathwayCards/index.js";
import { useState } from "react";
import axios from "axios";
import { METHODS } from "../../services/api";

const pathways = [
  {
    pathway: "Python",
    code: "PRGPYT",
    yotubevideo: "https://youtu.be/DDFvJmC3J5M",
    description:
      "Learn the basics and become comfortable in one of the most popular programming languages Python.",
    outcomes: [
      "Get equipped to build small projects like calculator or to-do list",
      "Get the base knowledge to apply to advanced bootcamps such as Navgurukul or Zoho Schools",
    ],
  },
  {
    pathway: "Javascript",
    code: "JSRPIT",
    yotubevideo: "https://youtu.be/EC7UaTE9Z2Q",
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
    yotubevideo: "https://youtu.be/HQ9IYtBJO0U",

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
    yotubevideo: "https://youtu.be/g05oD3i67_A",
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
  const [completedPortionJason, setCompletedPortionJason] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [enrolledBatches, setEnrolledBatches] = useState(null);
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
    if (state?.Pathways?.enrolledBatches?.data?.length > 0) {
      return state?.Pathways?.enrolledBatches?.data;
    } else {
      return null;
    }
  });

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

  console.log("upcomingBatchesData", upcomingBatchesData);
  /*
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, [pathwayId]);
  useEffect(() => {
    if (
      enrolledBatches?.length > 0 ||
      userEnrolledClasses?.length > 0 ||
      upcomingBatchesData?.length > 0
    ) {
      setLoading(false);
    }
  }, [upcomingBatchesData, enrolledBatches, userEnrolledClasses]);
  */
  const history = useHistory();

  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: pathwayId }));
  }, [dispatch, pathwayId]);

  useEffect(() => {
    // setLoading(true);
    console.log(
      "Pathwayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      pathwayId
    );
    if (user?.data?.token && pathwayId) {
      dispatch(
        enrolledBatchesActions.getEnrolledBatches({
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
      dispatch(
        upcomingBatchesActions.getUpcomingBatches({
          pathwayId: pathwayId,
          authToken: user?.data?.token,
        })
      );

      // /pathways/{pathwayId}/completePortion
      axios({
        method: METHODS.GET,
        url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/completePortion`,
        headers: {
          accept: "application/json",
          Authorization: user?.data?.token,
        },
      }).then((response) => {
        console.log("response", response);
        response.data.pathway.map((item) => {
          setCompletedPortionJason((prevState) => ({
            ...prevState,
            [item.course_id]: item.completed_portion,
          }));
        });
        console.log("completedPortionJason", completedPortionJason);
      });
    }
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
  useEffect(() => {
    console.log(
      upcomingBatchesData,
      userEnrolledClasses,
      pathwayCourse?.data?.courses,
      "Here"
    );
  }, [upcomingBatchesData, userEnrolledClasses]);

  return (
    <>
      {enrolledBatches ? (
        <>
          <Typography
            align="center"
            className={classes.classTitle}
            variant="subtitle1"
            bgcolor="#E9F5E9"
          >
            {enrolledBatches[0]?.title}
          </Typography>
        </>
      ) : (
        ""
      )}

      <Container
        className={classes.pathwayContainer}
        mt={isActive ? 0 : 55}
        mb={isActive ? 32 : 48}
        maxWidth="lg"
      >
        {enrolledBatches ? (
          <>
            <PathwayCards
              userEnrolledClasses={userEnrolledClasses}
              data={data}
            />
          </>
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
                    mb={isActive ? 16 : 30}
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

                    <ExternalLink
                      style={{
                        textDecoration: "none",
                      }}
                      href={pathwayCourseData.yotubevideo}
                    >
                      <Typography
                        style={{ display: "flex" }}
                        mt={2}
                        align="start"
                        variant="body2"
                      >
                        <img
                          src={require("./asset/ComputerScreen.svg")}
                          alt="MonitorScreen Img"
                        />
                        <section
                          className={classes.link}
                          // onClick={handleVideo}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {"  "} &nbsp; &nbsp;
                          <b>What's it all about?</b>
                        </section>
                      </Typography>
                    </ExternalLink>
                    {!user?.data?.token &&
                    (pathwayCourseData.code == "PRGPYT" ||
                      pathwayCourseData.code == "SPKENG") ? (
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
                            padding: isActive ? "0px 130px" : "0px 60px",
                          }}
                          onClick={() => {
                            history.push(PATHS.LOGIN);
                          }}
                        >
                          Login
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                  </Card>
                </Grid>
                <Grid item xs={12} md={6} sx={{ pl: 2 }}>
                  {user?.data?.token &&
                  (pathwayCourseData.code == "PRGPYT" ||
                    pathwayCourseData.code == "SPKENG") ? (
                    loading ? (
                      <Card sx={{ p: 4 }}>
                        <Typography variant="subtitle1">
                          <Skeleton />
                        </Typography>
                        <Typography variant="subtitle2">
                          <Skeleton />
                        </Typography>
                        <Typography variant="body1">
                          <Skeleton />
                        </Typography>
                        <Typography variant="body1">
                          <Skeleton />
                        </Typography>
                        <Typography variant="body1">
                          <Skeleton />
                        </Typography>
                        <Typography variant="body1">
                          <Skeleton />
                        </Typography>
                      </Card>
                    ) : upcomingBatchesData?.length > 0 ? (
                      <PathwayCourseBatchEnroll1
                        upcomingBatchesData={upcomingBatchesData}
                      />
                    ) : (
                      <NoBatchEnroll />
                    )
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
              <Box className={classes.Box1}>
                <Typography
                  variant="h6"
                  sx={{ ml: 2, textAlign: isActive && "center" }}
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
            ml={4}
            variant="h6"
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
                      sx={{ ml: 3, p: "16px", mb: isActive ? "0px" : "16px" }}
                    >
                      <img
                        className={classes.courseImage}
                        src={item.logo}
                        alt="course"
                      />
                      <LinearProgress
                        className={classes.progressBar}
                        variant="determinate"
                        value={parseInt(completedPortionJason[item.id])||0}
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
                        >
                          {item.name}
                        </Typography>
                      </div>
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
          {/* <Grid  sx={{mb:15}}align="center">
            <Grid sx={{mb:3}} >
              <img src={require("./asset/separator.svg")} alt="icon" />
            </Grid>
            <Grid>
              <img
                src={require("./asset/certificate.svg")}
                alt="certificate icon"
              />
              <Typography sx={{mt:2}} variant="body1" mb={2}>
                {pathwayCourseData?.pathway} Certificate (Locked)
              </Typography>
            </Grid>
          </Grid> */}
          {!user?.data?.token ? (
            <Container align="center">
              <Box
                maxWidth={500}
                bgcolor="#E9F5E9"
                mb={isActive ? 1 : 10}
                pt={3}
                height={100}
                style={{ padding: isActive ? "24px" : "15px" }}
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
                    padding: isActive ? "0px 110px" : "0px 60px",
                  }}
                  onClick={() => {
                    history.push(PATHS.LOGIN);
                  }}
                >
                  Login
                </Button>
              </Box>
            </Container>
          ) : (
            ""
          )}
          {!enrolledBatches && upcomingBatchesData?.length > 0 ? (
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
