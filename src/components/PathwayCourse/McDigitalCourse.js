import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useHistory } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";
import useMediaQuery from "@mui/material/useMediaQuery";

const McDigitalCourse = ({
  pathwayCourseData,
  completedPortion,
  pathwayId,
}) => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles({ isActive });
  // console.log(classes.progressBar,"done")
  const shouldDisplayCourseCard = (course) => {
    return course.course_type === null || !Array.isArray(course.course_type);
  };

  return (
    <Box className={classes.box}>
      <Typography
        className={classes.course}
        ml={2}
        variant="h6"
        sx={{ textAlign: isActive && "center" }}
      >
        Mandatory Courses
      </Typography>

      <Grid container spacing={3} align="center">
        {pathwayCourseData.length > 0 ? (
          pathwayCourseData.map((item, index) =>
            item.isMandatory === "true" && shouldDisplayCourseCard(item) ? (
              <Grid
                item
                key={index}
                xs={12}
                md={3}
                className={classes.courseCard}
              >
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
                    sx={{
                      ml: 3,
                      p: "16px",
                      mb: isActive ? "0px" : "16px",
                    }}
                  >
                    <img
                      className={classes.courseImage}
                      src={item.logo}
                      alt="course"
                    />
                    <CardContent
                      sx={{
                        height: isActive ? "60px" : "70px",
                        p: isActive ? "0px" : "0px 8px 0px 0px",
                      }}
                    >
                      <div className={classes.courseTitleNumber}>
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
                    </CardContent>
                    <CardActions
                      sx={{
                        height: "8px",
                        padding: "8px 8px 8px 0px",
                      }}
                    >
                      <LinearProgress
                        className={classes.progressBar}
                        variant="determinate"
                        value={parseInt(completedPortion[item.id]) || 0}
                      />
                    </CardActions>
                  </Card>
                </Link>
              </Grid>
            ) : null
          )
        ) : (
          <Typography>No mandatory courses available.</Typography>
        )}
      </Grid>

      <Typography
        className={classes.course}
        ml={2}
        variant="h6"
        sx={{ textAlign: isActive && "center" }}
      >
        Optional Courses
      </Typography>

      <Grid container spacing={3}>
        {pathwayCourseData.length > 0 ? (
          pathwayCourseData.map((item, index) =>
            item.isMandatory === "false" && shouldDisplayCourseCard(item) ? (
              <Grid
                item
                key={index}
                xs={12}
                md={3}
                className={classes.courseCard}
              >
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
                    sx={{
                      ml: 3,
                      p: "16px",
                      mb: isActive ? "0px" : "16px",
                    }}
                  >
                    <img
                      className={classes.courseImage}
                      src={item.logo}
                      alt="course"
                    />
                    <CardContent
                      sx={{
                        height: isActive ? "60px" : "70px",
                        p: isActive ? "0px" : "0px 8px 0px 0px",
                      }}
                    >
                      <div className={classes.courseTitleNumber}>
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
                    </CardContent>
                    <CardActions
                      sx={{
                        height: "8px",
                        padding: "8px 8px 8px 0px",
                      }}
                    >
                      <LinearProgress
                        className={classes.progressBar}
                        variant="determinate"
                        value={parseInt(completedPortion[item.id]) || 0}
                      />
                    </CardActions>
                  </Card>
                </Link>
              </Grid>
            ) : null
          )
        ) : (
          <Typography>No optional courses available.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default McDigitalCourse;
