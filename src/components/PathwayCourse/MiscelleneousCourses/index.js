import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as courseActions } from "../../Course/redux/action";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import axios from "axios";
import { METHODS } from "../../../services/api";

function MiscelleneousCourses() {
  const dispatch = useDispatch();
  const { data } = useSelector(({ Course }) => Course);
  const [pathwaysCourses, setPathwaysCourses] = useState([]);
  const user = useSelector(({ User }) => User);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, [dispatch]);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways?courseType=json`,
      headers: {
        accept: "application/json",
      },
    }).then((res) => {
      setPathwaysCourses(res.data.pathways);
    });
  }, []);

  let dataJSON;
  let filteredCourse;

  if (data) {
    dataJSON = data.allCourses.filter((c) => {
      return c.course_type === "json";
    });
    dataJSON.allCourses = dataJSON;
    filteredCourse = dataJSON.allCourses.filter((names) => {
      if (names.course_type === "json") {
        return names.name;
      }
    });
  }

  const pathwayCourseId = [];
  pathwaysCourses.filter((pathway) => {
    pathway.courses.filter((course) => {
      pathwayCourseId.push(course.id);
      return course.id;
    });
  });

  let otherCourses =
    filteredCourse &&
    filteredCourse.filter((item) => !pathwayCourseId.includes(item.id));

  return (
    <React.Fragment>
      <Container sx={{ mt: 10 }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Card align="left" elevation={0}>
              <CardContent>
                <Typography variant="h5" align={isActive ? "center" : "left"}>
                  Miscelleneous Courses
                </Typography>
              </CardContent>
              <CardContent>
                <Typography
                  variant="body2"
                  align={isActive ? "center" : "left"}
                >
                  Do you want to delve into Android, Game Development, Web Dev
                  Basics or just some fun projects? Check out these courses for
                  a sneak peak into these exciting fields.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" align={isActive ? "center" : "left"}>
            Courses
          </Typography>
          <Grid sx={{ mt: 2 }} container spacing={3} align="center">
            {otherCourses &&
              otherCourses.map((item, index) => (
                <Grid key={index} xs={12} sm={6} md={3}>
                  <Card elevation={0}>
                    <img
                      src={require(`../asset/course1.svg`)}
                      alt="course"
                      loading="lazy"
                    />

                    <CardContent sx={{ ml: 1 }}>
                      <Typography
                        align={isActive ? "center" : "left"}
                        variant="subtitle1"
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
    </React.Fragment>
  );
}

export default MiscelleneousCourses;
