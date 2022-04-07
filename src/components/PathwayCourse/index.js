import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import CheckIcon from "@mui/icons-material/Check";
import useStyles from "./styles";
import axios from "axios";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import { METHODS } from "../../services/api";
import { useParams } from "react-router-dom";
import { breakpoints } from "../../theme/constant";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Toolbar,
} from "@mui/material";

const content = [
  "Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus blandit",
  "Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus blandit",
  "Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus blandit",
];

const images = [
  "course1",
  "course2",
  "course3",
  "course1",
  "course2",
  "course3",
  "course1",
  "course2",
  "course3",
  "course1",
];

function PathwayCourse() {
  const [pathwayCourse, setPathwayCourse] = useState([]);
  const user = useSelector(({ User }) => User);
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const params = useParams();
  const pathwayId = params.pathwayId;

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/courses?courseType=json`,
      headers: {
        accept: "application/json",
        "version-code": 40,
        Authorization: user.data ? user.data.token : null,
      },
    }).then((res) => {
      setPathwayCourse(res.data.courses);
    });
  }, []);

  return (
    <>
      <Container className={classes.pathwayContainer} maxWidth="lg">
        <Grid container spacing={2} align="center" className={classes.box}>
          <Grid xs={12} md={6}>
            <Card align="left" elevation={0} className={classes.titleCard}>
              <Typography
                variant="body2"
                className={classes.cardSubtitle}
                sx={{ textAlign: isActive && "center" }}
              >
                Learning Track
              </Typography>
              {pathwayId == 1 && (
                <>
                  <Typography
                    variant="h5"
                    className={classes.heading}
                    sx={{ textAlign: isActive && "center" }}
                  >
                    Python
                  </Typography>
                  <Typography variant="body1">
                    Learn the basics and become comfortable in one of the most
                    popular programming languages Python.
                  </Typography>
                </>
              )}
              {pathwayId == 2 && (
                <>
                  <Typography
                    variant="h5"
                    className={classes.heading}
                    sx={{ textAlign: isActive && "center" }}
                  >
                    JavaScript
                  </Typography>
                  <Typography variant="body1">
                    Learn the nuances and basics of the technology that powers
                    the web. Start with learning what is Javascript and
                    eventually build your own website.
                  </Typography>
                </>
              )}
              {pathwayId == 3 && (
                <>
                  <Typography
                    variant="h5"
                    className={classes.heading}
                    sx={{ textAlign: isActive && "center" }}
                  >
                    Typing Guru
                  </Typography>
                  <Typography variant="body1">
                    The typing track allows you to practice keyboard typing in a
                    adaptive manner. You require a keyboard if on Android or use
                    your laptop keyboard.
                  </Typography>
                </>
              )}
              {pathwayId == 5 && (
                <>
                  <Typography
                    variant="h5"
                    className={classes.heading}
                    sx={{ textAlign: isActive && "center" }}
                  >
                    English - Spoken & Grammar
                  </Typography>
                  <Typography variant="body1">
                    English is a great tool needed to navigate the tech world
                    and also in an International setting. Whether you are a
                    total beginner or already know some English, prepare for the
                    challenge with our Spoken English classes and online
                    courses.
                  </Typography>
                </>
              )}
            </Card>
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
          <Typography variant="h6" sx={{ textAlign: isActive && "center" }}>
            Learning Outcomes
          </Typography>
          <Grid container spacing={0} align="center">
            {content.map((item) => (
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
        <Box className={classes.box}>
          <Typography
            className={classes.course}
            variant="h6"
            sx={{ textAlign: isActive && "center" }}
          >
            Courses
          </Typography>
          <Grid container spacing={3} align="center">
            {pathwayCourse &&
              pathwayCourse.map((item, index) => (
                <Grid xs={12} md={3} className={classes.courseCard}>
                  {console.log("item", item)}
                  {/* <Link to={PATHS.PATHWAY_COURSE_CONTENT}> */}
                  <Link
                    className={classes.pathwayLink}
                    to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                      courseId: item.id,
                      exerciseId: 0,
                    })}
                  >
                    <Card elevation={0} sx={{ ml: 3 }}>
                      <img
                        src={require(`./asset/${images[index]}.svg`)}
                        alt="course"
                        loading="lazy"
                      />
                      {/* <CardContent> */}
                      <Toolbar disableGutters sx={{ ml: 2 }}>
                        <Typography
                          align={isActive ? "center" : "left"}
                          variant="body1"
                          className={classes.courseName}
                          sx={{
                            mr: "10px",
                            padding: isActive ? "5px" : "5px 0 5px 13px",
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
                      </Toolbar>
                      {/* </CardContent> */}
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default PathwayCourse;
