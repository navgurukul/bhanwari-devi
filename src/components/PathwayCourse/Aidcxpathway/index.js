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

function Aidcxpathway() {
  const user = useSelector(({ User }) => User);
  const [pathway, setPathway] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    if (localStorage.getItem("studentAuth") === null) history.push("/login");

    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/aidcx`,
      headers: {
        accept: "application/json",
        Authorization: localStorage.getItem("studentAuthToken"),
      },
    })
      .then((response) => {
        console.log(response, "RESPONSE");
        console.log(response?.data?.data?.courses, "courses");
        setAllCourses(response?.data?.data?.courses);
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
  // useEffect(() => {
  //   filterCourses &&
  //     filterCourses.forEach((item, index) => {
  //       const lastCourseIndex = item.courses.length - 1;
  //       item.courses.forEach((course, courseindex) => {
  //         if (course.completed_portion === 100) {
  //           if (courseindex < lastCourseIndex) {
  //             const nextCourse = item.courses[courseindex + 1];
  //             if (!isCourseUnlocked(nextCourse.id)) {
  //               // Automatically unlock the next course
  //               setUnlockedCourses([...unlockedCourses, nextCourse.id]);
  //             }
  //           }
  //         }
  //         if (item.completed_portion === 100) {
  //           if (index < filterCourses.length - 1) {
  //             const nextItem = filterCourses[index + 1];
  //             const firstCourseOfNextItem = nextItem.courses[0];

  //             if (!isCourseUnlocked(firstCourseOfNextItem.id)) {
  //               setUnlockedCourses([
  //                 ...unlockedCourses,
  //                 firstCourseOfNextItem.id,
  //               ]);
  //             }
  //           }
  //         }
  //       });
  //     });
  // }, [unlockedCourses, filterCourses]);

  const isCourseUnlocked = (courseId) => {
    return unlockedCourses.includes(courseId);
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Grid container mb="48px">
        <Grid item md={6} sx={{ ml: 2 }}>
          <Typography variant="h6" sx={{ mt: 8 }}>
            Learning AIDCX-pathway
          </Typography>
          <Typography variant="h4" mt={1}>
            {pathway?.name}
          </Typography>
          <Typography variant="body1" mb="16px" mt={1}>
            {pathway?.description}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Grid container spacing={3} alignItems="center">
          {allCourses.map((course, index) => {
            return (
              <Grid
                item
                xs={12}
                md={3}
                key={course.id}
                className={classes.courseCard}
              >
                <Link
                  className={classes.pathwayLink}
                  to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                    pathwayId: pathway.id,
                    courseId: course.id,
                    exerciseId: 0,
                  })}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    className={classes.pathwayCard}
                    elevation={0}
                    sx={{
                      // Fixed card dimensions and border
                      p: 2,
                      width: "150px",
                      height: "250px",
                      border: "0.1px solid lightgrey", 
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Top Box that grows to push CardContent & CardActions down */}
                    <Box
                      sx={{
                        flexGrow: 1, 
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        className={classes.courseImage}
                        src={course.logo}
                        alt="course"
                        style={{
                          // Center the image
                          display: "block",
                          margin: "0 auto",
                          width: "150px",
                          height: "150px",
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        {/* Always display the index number */}
                        <Typography
                          variant="body2"
                          className={classes.courseName}
                          sx={{ mr: 1, px: 0.5, py: 0.5, fontWeight: "bold", textAlign: "center" }}
                        >
                          {index + 1}
                        </Typography>
                        <Typography variant="body1">{course.name}</Typography>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ p: 0 }}>
                      <LinearProgress
                        className={classes.progressBar}
                        variant="determinate"
                        value={course.completed_portion || 0}
                        sx={{ width: "100%", m:"10px 0px" }}
                      />
                    </CardActions>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}
export default Aidcxpathway;
