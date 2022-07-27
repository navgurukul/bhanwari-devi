import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { actions as courseActions } from "../Course/redux/action";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";
import { breakpoints } from "../../theme/constant";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import {
  Box,
  TextField,
  Container,
  Typography,
  Grid,
  Card,
} from "@mui/material";
import useStyles from "./styles";

function SearchCourse() {
  const { data } = useSelector(({ Course }) => Course);
  const pathway = useSelector((state) => state.Pathways);
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search).get("search");
  const [search, setSearch] = useState(query ? query : "");
  const history = useHistory();
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    history.push(`?search=${e.target.value}`);
    e.preventDefault();
    setSearch(e.target.value);
  };

  const pathwayCourseId =
    (pathway.data &&
      pathway.data.pathways
        .map((pathway) => pathway.courses)
        .flat()
        .map((course) => course?.id)) ||
    [];

  const otherCourses =
    data &&
    data?.allCourses?.filter((item) => {
      // if (search && item.course_type === "json") {
      if (pathwayCourseId && !pathwayCourseId.includes(item.id)) {
        return item.name.toLowerCase().includes(search.toLowerCase());
      }
      // }
    });

  let pathwayTrack =
    pathway.data &&
    pathway.data.pathways.map((pathway) => {
      return {
        ...pathway,
        courses: pathway?.courses?.filter((course) => {
          return course.name.toLowerCase().includes(search.toLowerCase());
        }),
      };
    });

  let flag = false;

  return (
    <Container maxWidth="lg" sx={{ mb: 5 }}>
      <Typography
        className={classes.course}
        variant="h5"
        sx={{ textAlign: "center", mt: 5 }}
      >
        Search Courses...
      </Typography>
      <Container maxWidth="sm">
        <TextField
          id="outlined-basic"
          label="Search for course..."
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
      </Container>
      <Box className={classes.box} sx={{ mt: 5 }}>
        {search ? (
          <>
            {pathwayTrack &&
              pathwayTrack.map((pathway, index) => {
                if (pathway?.courses?.length == 0) {
                  if (!flag) {
                    flag = false;
                  }
                  return (pathwayTrack = []);
                } else {
                  return (
                    <>
                      <Typography className={classes.course} variant="h5">
                        {pathway.name}
                      </Typography>
                      <Grid container spacing={3} align="center">
                        {pathway?.courses?.length > 0 &&
                          pathway.courses.map((item, index) => (
                            <Grid xs={12} md={3} className={classes.courseCard}>
                              {(flag = true)}
                              <Link
                                className={classes.pathwayLink}
                                to={interpolatePath(
                                  PATHS.PATHWAY_COURSE_CONTENT,
                                  {
                                    courseId: item.id,
                                    exerciseId: 0,
                                    pathwayId: pathway.id,
                                  }
                                )}
                              >
                                <Card
                                  className={classes.pathwayCard}
                                  elevation={0}
                                  sx={{ ml: 3, p: "16px" }}
                                >
                                  <img
                                    className={classes.courseImage}
                                    src={item.logo}
                                    alt="course"
                                  />
                                  <div
                                    className={classes.courseTitleNumber}
                                    disableGutters
                                  >
                                    <Typography
                                      align={isActive ? "center" : "left"}
                                      variant="body2"
                                      className={classes.courseName}
                                      sx={{
                                        mr: "10px",
                                        padding: isActive
                                          ? "5px"
                                          : "5px 0 5px 13px",
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
                                </Card>
                              </Link>
                            </Grid>
                          ))}
                      </Grid>
                    </>
                  );
                }
              })}

            {otherCourses && otherCourses.length > 0 && (
              <>
                <Typography variant="h5" sx={{ pb: "16px" }}>
                  Miscellaneous Courses
                </Typography>
                <Grid sx={{ mt: 2 }} container spacing={3} align="center">
                  {otherCourses.map((item, index) => (
                    <>
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
                    </>
                  ))}
                </Grid>
              </>
            )}
            {!flag && otherCourses && otherCourses.length == 0 && (
              <Typography
                className={classes.course}
                variant="h5"
                sx={{ textAlign: "center", mt: "100px" }}
              >
                No courses found. Try another search.
              </Typography>
            )}
          </>
        ) : null}
      </Box>
    </Container>
  );
}

export default SearchCourse;
