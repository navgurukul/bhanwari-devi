import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import CheckIcon from "@mui/icons-material/Check";
import useStyles from "./styles";
import axios from "axios";
import { METHODS } from "../../../services/api";
import { breakpoints } from "../../../theme/constant";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
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
];

function Common({ pathwayId }) {
  const [pathwayCourse, setPathwayCourse] = useState([]);
  const user = useSelector(({ User }) => User);
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/courses?courseType=json`,
      headers: {
        accept: "application/json",
        "version-code": 40,
        Authorization: user.data.token,
      },
    }).then((res) => {
      console.log("res", res);
      setPathwayCourse(res.data.courses);
    });
  }, []);

  return (
    <>
      <Container sx={{ mt: 11 }} maxWidth="lg">
        <Grid container spacing={2} align="center" className={classes.box}>
          <Grid xs={12} md={6}>
            <Card align="left" elevation={0} className={classes.titleCard}>
              <Typography
                variant="body2"
                align={isActive ? "center" : "left"}
                className={classes.cardSubtitle}
              >
                Learning Track
              </Typography>
              {pathwayId == 1 && (
                <>
                  <Typography
                    variant="h4"
                    align={isActive ? "center" : "left"}
                    className={classes.heading}
                  >
                    Python
                  </Typography>
                  <Typography>
                    Learn the nuances and basics of the technology that powers
                    the web. Start with learning what is Javascript and
                    eventually build your own website.
                  </Typography>
                </>
              )}
              {pathwayId == 2 && (
                <>
                  <Typography variant="h5" className={classes.heading}>
                    JavaScript
                  </Typography>
                  <Typography>
                    Learn the nuances and basics of the technology that powers
                    the web. Start with learning what is Javascript and
                    eventually build your own website.
                  </Typography>
                </>
              )}
              {pathwayId == 3 && (
                <>
                  <Typography variant="h5" className={classes.heading}>
                    Typing Guru
                  </Typography>
                  <Typography>
                    The typing track allows you to practice keyboard typing in a
                    adaptive manner. You require a keyboard if on Android or use
                    your laptop keyboard.
                  </Typography>
                </>
              )}
              {pathwayId == 5 && (
                <>
                  <Typography variant="h5" className={classes.heading}>
                    English - Spoken & Grammar
                  </Typography>
                  <Typography>
                    The typing track allows you to practice keyboard typing in a
                    adaptive manner. You require a keyboard if on Android or use
                    your laptop keyboard.
                  </Typography>
                </>
              )}
            </Card>
          </Grid>
          <Grid xs={12} md={6} sx={{ pl: 2 }}>
            <CardMedia
              component="video"
              autoPlay
              controls
              height="260"
              // className={classes.myVideo}
              src="https://www.youtube.com/watch?v=Doo1T5WabEU"
              sx={{ width: isActive ? 300 : 480 }}
            />
          </Grid>
        </Grid>
        <Box className={classes.box}>
          <Typography variant="h5" align={isActive ? "center" : "left"}>
            Learning Outcomes
          </Typography>
          <Grid container spacing={0} align="center">
            {content.map((item) => (
              <Grid xs={12} md={4}>
                <Card align="left" elevation={0}>
                  <CardContent>
                    <Box className={classes.flex}>
                      <CheckIcon color="primary" />
                      <Typography sx={{ ml: 1 }}>{item}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box className={classes.box}>
          <Typography
            className={classes.course}
            variant="h5"
            align={isActive ? "center" : "left"}
          >
            Courses
          </Typography>
          <Grid container spacing={3} align="center">
            {pathwayCourse &&
              pathwayCourse.map((item, index) => (
                <Grid xs={12} sm={6} md={3} className={classes.courseCard}>
                  <Card elevation={0}>
                    <img
                      src={require(`./asset/${images[index]}.svg`)}
                      alt="course"
                      loading="lazy"
                    />
                    <CardContent sx={{ ml: 1 }}>
                      <Typography
                        variant="subtitle1"
                        align={isActive ? "center" : "left"}
                      >
                        {item.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Common;
