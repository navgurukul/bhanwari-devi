import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as courseActions } from "../../Course/redux/action";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

// import useStyles from "./styles";
import axios from "axios";
import { METHODS } from "../../../services/api";

function MiscelleneousCourses() {
  const dispatch = useDispatch();
  const { data } = useSelector(({ Course }) => Course);
  const [pathwaysCourses, setPathwaysCourses] = useState([]);
  const user = useSelector(({ User }) => User);

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
  // const classes = useStyles();

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

  const Images = new Array(otherCourses ? otherCourses.length : 1).fill(
    "image"
  );
  return (
    <React.Fragment>
      <Container sx={{ mt: 10 }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Card align="left" elevation={0}>
              <Typography variant="h4">Miscelleneous Courses</Typography>
              <Typography variant="body2">
                Do you want to delve into Android, Game Development, Web Dev
                Basics or just some fun projects? Check out these courses for a
                sneak peak into these exciting fields.
              </Typography>
            </Card>
          </Grid>
          {/* <Grid xs={12} md={6} sx={{ pl: 2 }}>

                    </Grid> */}
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h6">Courses</Typography>
          <Grid sx={{ mt: 2 }} container spacing={3} align="center">
            {otherCourses &&
              otherCourses.map((item, index) => (
                <Grid key={index} xs={12} md={3}>
                  <Card elevation={0}>
                    <img
                      // src={require(`../Common/asset/${images}.svg`)}
                      src={require(`../Common/asset/course1.svg`)}
                      alt="course"
                      loading="lazy"
                    />

                    <CardContent>
                      <Typography
                        // align={isActive ? "center" : "left"}
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
