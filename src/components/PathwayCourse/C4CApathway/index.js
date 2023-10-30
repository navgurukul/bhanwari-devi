import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { METHODS } from "../../../services/api";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "../styles";
import { PATHS, interpolatePath } from "../../../constant";
import { Link, useHistory } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useMediaQuery } from "@mui/material";
import { breakpoints } from "../../../theme/constant";

function C4CApathway() {
  const user = useSelector(({ User }) => User);
  const [pathway, setPathway] = useState([]);
  const [completedPortion, setCompletedPortion] = useState({});
  const classes = useStyles();
  let completedAll = completedPortion?.total === 100;
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/c4ca`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token,
      },
    })
      .then((response) => {
        setPathway(response?.data);
      })
      .catch((err) => {});
  }, [setPathway]);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathway.id}/completePortion`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token,
      },
    })
      .then((response) => {
        setCompletedPortion((prevState) => ({
          ...prevState,
          total: response?.data?.total_completed_portion,
        }));

        response.data.pathway.map((item) => {
          setCompletedPortion((prevState) => ({
            ...prevState,
            [item.course_id]: item.completed_portion,
          }));
        });
      })
      .catch((err) => {});
  }, [pathway]);
  // console.log(completedPortion)

  const filterCourses = pathway?.modules?.filter((item) => {
    return item.courses.length > 0;
  });

  const [unlockedCourses, setUnlockedCourses] = useState([]);

  // Function to check if a course is unlocked

  // Effect to automatically unlock courses when their percentage reaches 100
  useEffect(() => {
    filterCourses &&
      filterCourses.forEach((item, index) => {
        const isLastCourse = item.courses.length - 1;
        item.courses.forEach((course, courseindex) => {
          if (parseInt(course.completed_portion) === 100) {
            if (courseindex < isLastCourse) {
              const nextCourse = item.courses[courseindex + 1];

              if (!isCourseUnlocked(nextCourse.id)) {
                // Automatically unlock the next course
                setUnlockedCourses([...unlockedCourses, nextCourse.id]);
              }
            }
          }
          if (item.completed_portion === 100) {
            console.log(
              item.completed_portion,
              item.name,
              "item.completed_portion"
            );
            if (index < filterCourses.length - 1) {
              const nextItem = filterCourses[index + 1];
              const firstCourseOfNextItem = nextItem.courses[0];

              if (!isCourseUnlocked(firstCourseOfNextItem.id)) {
                setUnlockedCourses([
                  ...unlockedCourses,
                  firstCourseOfNextItem.id,
                ]);
              }
            }
          }
        });
      });
  }, [completedPortion, unlockedCourses, filterCourses]);

  const isCourseUnlocked = (courseId) => {
    return unlockedCourses.includes(courseId);
  };

  return (
    <Container maxWidth="lg">
      <Grid container mb="48px">
        <Grid item md={6} sx={{ ml: 2 }}>
          <Typography variant="body1" sx={{ mt: 8 }}>
            Learning Outcomes
          </Typography>
          <Typography variant="h4" mt={1}>
            {pathway?.name}
          </Typography>
          <Typography variant="body1" mb="16px" mt={1}>
            {pathway?.description}
          </Typography>
        </Grid>
      </Grid>
      {filterCourses?.map((item, index) => (
        <Box key={item.id}>
          <Typography variant="h6" marginLeft="24px">
            {item.name}
          </Typography>
          <Grid container mb="16px">
            {item.courses &&
              item.courses?.map((course, courseindex) => (
                <Grid
                  item
                  md={3}
                  key={course.id}
                  className={classes.courseCard}
                >
                  <Link
                    className={classes.pathwayLink}
                    to={
                      (isCourseUnlocked(course.id) ||
                        (index === 0 && courseindex === 0)) &&
                      interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                        courseId: course.id,
                        exerciseId: 0,
                        pathwayId: pathway.id,
                      })
                    }
                  >
                    <Card
                      className={classes.pathwayCard}
                      elevation={0}
                      sx={{
                        ml: 3,
                        // p: "16px",
                        mb: isActive ? "0px" : "16px",
                      }}
                    >
                      <CardContent>
                        <img
                          className={classes.courseImage}
                          src={course.logo}
                          alt="course"
                        />
                        <Typography
                          component="div"
                          variant="body1"
                          display="flex"
                          mt={1}
                        >
                          {isCourseUnlocked(course.id) ||
                          (index === 0 && courseindex === 0) ? (
                            <LockOpenIcon
                              color="primary"
                              fontSize="small"
                              style={{ marginTop: "6px", marginRight: "8px" }}
                            />
                          ) : (
                            <LockIcon
                              color="black"
                              fontSize="small"
                              style={{ marginTop: "6px", marginRight: "8px" }}
                            />
                          )}
                          <Typography variant="body1">{course.name}</Typography>
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          height: "8px",
                          padding: "8px 16px 16px 16px",
                        }}
                      >
                        <LinearProgress
                          className={classes.progressBar}
                          variant="determinate"
                          value={parseInt(course.completed_portion) || 0}
                        />
                      </CardActions>
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
          {/* Conditionally render the Unlock button for the next module */}
        </Box>
      ))}
    </Container>
  );
}
export default C4CApathway;
