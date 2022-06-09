import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as courseActions } from "../../Course/redux/action";
import { actions as pathwayActions } from "../../PathwayCourse/redux/action";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";

import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../../constant";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import useStyles from "../styles";

function MiscellaneousCourses() {
  const dispatch = useDispatch();
  const { data } = useSelector(({ Course }) => Course);
  const pathway = useSelector((state) => state);
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  const pathwayCourseId =
    (pathway.Pathways.data &&
      pathway.Pathways.data.pathways
        .map((pathway) => pathway.courses)
        .flat()
        .map((course) => course.id)) ||
    [];

  const otherCourses =
    data &&
    data.allCourses.filter(
      (item) =>
        // {
        // console.log("item", item);
        //   if (pathwayCourseId && !pathwayCourseId.includes(item.id)) {
        //     return item.course_type === "json";
        //   }
        // }
        pathwayCourseId &&
        !pathwayCourseId.includes(item.id) &&
        item.course_type === "json"
    );

  return (
    <React.Fragment>
      <Container className={classes.pathwayContainer} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Card align="left" elevation={0}>
              <Typography
                variant="h5"
                align={isActive ? "center" : "left"}
                sx={{ pb: "16px" }}
              >
                Miscellaneous Courses
              </Typography>
              <Typography variant="body1" align={isActive ? "center" : "left"}>
                Do you want to delve into Android, Game Development, Web Dev
                Basics or just some fun projects? Check out these courses for a
                sneak peak into these exciting fields.
              </Typography>
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
                  <Link
                    className={classes.pathwayLink}
                    to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                      courseId: item.id,
                      exerciseId: 0,
                      pathwayId: "miscellaneous",
                    })}
                  >
                    <Card
                      elevation={0}
                      className={classes.pathwayCard}
                      sx={{
                        background: "#EEF1F5",
                        m: "15px",
                        height: "190px",
                      }}
                    >
                      <Typography
                        align="center"
                        variant="subtitle1"
                        sx={{
                          p: "10px",
                          mt: "60px",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default MiscellaneousCourses;
