import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
} from "@mui/material";
import { METHODS } from "../../../services/api";
import axios from "axios";
import { useSelector } from "react-redux";
import useStyles from "../styles";
import { PATHS, interpolatePath } from "../../../constant";
import { Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DOMPurify from "dompurify";
import CheckIcon from "@mui/icons-material/Check";
import get from "lodash/get";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";

toast.configure();

function UnsafeHTML(props) {
  const { html, Container, ...otherProps } = props;
  const sanitizedHTML = DOMPurify.sanitize(html);
  return (
    <Container
      {...otherProps}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}

function C4CApathway() {
  const user = useSelector(({ User }) => User);
  const [pathway, setPathway] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    if (localStorage.getItem("studentAuth") === null) history.push("/login");

    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/c4ca`,
      headers: {
        accept: "application/json",
        Authorization: localStorage.getItem("studentAuthToken"),
      },
    })
      .then((response) => {
        if (pathway?.length < 1) setPathway(response?.data);
      })
      .catch((err) => {});
  }, []);

  const filterCourses = pathway?.modules?.filter((item) => {
    return item.courses.length > 0;
  });

  const [unlockedCourses, setUnlockedCourses] = useState([]);

  // Function to check if a course is unlocked

  // Effect to automatically unlock courses when their percentage reaches 100
  useEffect(() => {
    filterCourses &&
      filterCourses.forEach((item, index) => {
        const lastCourseIndex = item.courses.length - 1;
        item.courses.forEach((course, courseindex) => {
          if (course.completed_portion === 100) {
            if (courseindex < lastCourseIndex) {
              const nextCourse = item.courses[courseindex + 1];
              if (!isCourseUnlocked(nextCourse.id)) {
                // Automatically unlock the next course
                setUnlockedCourses([...unlockedCourses, nextCourse.id]);
              }
            }
          }
          if (item.completed_portion === 100) {
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
  }, [unlockedCourses, filterCourses]);

  const isCourseUnlocked = (courseId) => {
    return unlockedCourses.includes(courseId);
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
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
      {pathway?.outcomes?.length > 0 && (
        <Box className={classes.Box1}>
          <Typography
            variant="h6"
            sx={{ mt: 8, ml: 2, textAlign: isActive && "center" }}
          >
            Learning Outcomes
          </Typography>
          <Grid container spacing={0} align="center">
            {pathway?.outcomes.map((content, index) => {
              if (content.component === "text") {
                return (
                  <Grid item key={index} xs={12} md={4}>
                    <Card sx={{ margin: "10px" }} align="left" elevation={0}>
                      <Box className={classes.flex}>
                        <CheckIcon color="primary" />
                        <UnsafeHTML
                          Container={Typography}
                          variant="body1"
                          html={DOMPurify.sanitize(get(content, "value"))}
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </Card>
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      )}
      {filterCourses?.map((item, index) => (
        <Box key={item.id} marginTop={8}>
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
                        pathwayId: "c4caPathway",
                      })
                    }
                  >
                    <Card
                      className={classes.pathwayCard}
                      elevation={0}
                      sx={{
                        ml: 3,
                        // p: "16px",
                        mb: { xs: "0px", sm: "16px" },
                      }}
                      onClick={() => {
                        !(
                          isCourseUnlocked(course.id) ||
                          (index === 0 && courseindex === 0)
                        ) &&
                          toast.success(
                            "Complete your previous course to unlock this course",
                            {
                              position: toast.POSITION.BOTTOM_RIGHT,
                              autoClose: 2500,
                            }
                          );
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
                          (index === 0 && courseindex === 0) ? null : (
                            <LockIcon
                              color="grey"
                              fontSize="medium"
                              style={{ marginTop: "6px" }}
                            />
                          )}
                          <Typography variant="body1" marginLeft="8px">
                            {course.name}
                          </Typography>
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
