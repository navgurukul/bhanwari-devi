import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as courseActions } from "../../Course/redux/action";
import { actions as pathwayActions } from "../../PathwayCourse/redux/action";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";

import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../../constant";
import { Container, Box, Grid, Card, Typography } from "@mui/material";
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
        .map((pathway) => pathway.courses || [])
        .flat()
        .map((course) => course.id)) ||
    [];

  const otherCourses =
    data &&
    data.allCourses.filter(
      (item) => pathwayCourseId && !pathwayCourseId.includes(item.id)
    );

  return (
    <React.Fragment>
      <Container className={classes.pathwayContainer} maxWidth="lg">
        <Grid container>
          <Grid xs={12}>
            <Card align="left" elevation={0}>
              <Typography
                variant="h4"
                align={isActive ? "center" : "left"}
                sx={{ pb: "16px" }}
              >
                Miscellaneous Courses
              </Typography>
              <Typography
                variant="body1"
                maxWidth={"sm"}
                align={isActive ? "center" : "left"}
              >
                Do you want to delve into Android, Game Development, Web Dev
                Basics or just some fun projects? Check out these courses for a
                sneak peak into these exciting fields.
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: isActive ? 5 : 10 }}>
          <Typography variant="h6" align={isActive ? "center" : "left"}>
            Courses
          </Typography>
          <Grid sx={{ mt: "16px" }} container spacing={2}>
            {otherCourses &&
              otherCourses.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
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
                        m: isActive ? "16px" : "15px",
                        height: "190px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        align="center"
                        variant="subtitle1"
                        sx={{
                          px: "10px",
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
