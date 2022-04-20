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
  const pathway = useSelector((state) => state.Pathways);
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  const pathwayCourseId = [];
  pathway.data &&
    pathway.data.pathways.filter((pathway) => {
      pathway.courses.filter((course) => {
        pathwayCourseId.push(course.id);
        return course.id;
      });
    });

  let otherCourses =
    data &&
    data.allCourses.filter(
      (item) => pathwayCourseId && !pathwayCourseId.includes(item.id)
    );

  return (
    <React.Fragment>
      <Container sx={{ mt: 10 }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Card align="left" elevation={0}>
              <CardContent>
                <Typography variant="h5" align={isActive ? "center" : "left"}>
                  Miscellaneous Courses
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
                  {console.log("item", item)}
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
                          verticalAlign: "middle",
                          lineHeight: "170px",
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
