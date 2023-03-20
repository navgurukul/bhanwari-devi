import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { actions as courseActions } from "../../Course/redux/action";
import { actions as pathwayActions } from "../../PathwayCourse/redux/action";
import SearchBar from "..";
import { breakpoints } from "../../../theme/constant";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../../constant";
import { useSearchQuery } from "../../../common/search";
import {
  Box,
  TextField,
  Container,
  Typography,
  Grid,
  Card,
} from "@mui/material";
import useStyles from "../styles";
import Tooltip from "@mui/material/Tooltip";
import SearchPopup from "../SearchPopup";

function SearchCourse(props) {
  //   console.log("props", props);

  const { data } = useSelector(({ Course }) => Course);
  const pathway = useSelector((state) => state.Pathways);
  const dispatch = useDispatch();
  // const query = new URLSearchParams(useLocation().search).get("search");
  // const query = useSearchQuery();
  const [search, setSearch] = useState("");
  useSearchQuery(setSearch);
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

  const pathwayCourseIds =
    pathway.data?.pathways
      .map((pathway) => pathway.courses || [])
      .flat()
      .map((course) => course.id) || [];

  const otherCourseResults = data?.allCourses.filter((item) => {
    return (
      item.course_type === "json" &&
      !pathwayCourseIds.includes(item.id) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const pathwayTrackResults = pathway.data?.pathways
    .map((pathway) => {
      return {
        ...pathway,
        courses: pathway.courses?.filter((course) => {
          return course.name.toLowerCase().includes(search.toLowerCase());
        }),
      };
    })
    .filter((pathway) => pathway.courses?.length > 0);

  const hasSearchResults =
    pathwayTrackResults?.length > 0 || otherCourseResults?.length > 0;

  return (
    <>
      <Container>
        <Box className={classes.box} sx={{ mt: 5 }}>
          {search ? (
            <>
              {pathwayTrackResults?.map((pathway, index) => {
                return (
                  <>
                    <Typography className={classes.course} variant="h5">
                      {pathway.name}
                    </Typography>
                    <Grid container spacing={3} align="center">
                      {pathway.courses.map((item, index) => (
                        <Grid xs={12} md={3} className={classes.courseCard}>
                          <Link
                            className={classes.pathwayLink}
                            to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                              courseId: item.id,
                              exerciseId: 0,
                              pathwayId: pathway.id,
                            })}
                            onClick={handleSearchPopover}
                          >
                            <Card
                              className={classes.pathwayCard}
                              elevation={0}
                              sx={{ ml: 3, p: "16px" }}
                              onClick={() => {
                                setCountries(item.name);
                              }}
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
                                  //   sx={{ mt: "16px" }}
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
              })}

              {otherCourseResults?.length > 0 && (
                <>
                  <Typography
                    variant="h5"
                    //   align={isActive ? "center" : "left"}
                    sx={{ pb: "16px" }}
                  >
                    Miscellaneous Courses
                  </Typography>
                  <Grid sx={{ mt: 2 }} container spacing={3} align="center">
                    {otherCourseResults?.map((item, index) => (
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
              {!hasSearchResults && (
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
        <SearchCourse handleSearchChange={handleSearchChange} />
      </Container>
    </>
  );
}

export default SearchCourse;
