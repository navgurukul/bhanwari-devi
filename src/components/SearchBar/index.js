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
import { useSearchQuery } from "../../common/search";
import {
  Box,
  TextField,
  Container,
  Typography,
  Grid,
  Card,
} from "@mui/material";
import useStyles from "./styles";
import { Popover, InputAdornment } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchPopup from "./SearchPopup";
import { getObjectState, saveObjectState } from "../../common/storage";

function SearchCourse(props) {
  const { data } = useSelector(({ Course }) => Course);
  const pathway = useSelector((state) => state.Pathways);
  const dispatch = useDispatch();
  // const query = new URLSearchParams(useLocation().search).get("search");
  // const query = useSearchQuery();
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(true);
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
    if (!e.target.value) {
      history.replace("");
    } else {
      history.replace(`/search-course/?search=${e.target.value}`);
    }
    setSearch(e.target.value);
  };
  const [recentSearch, setrecentSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recent"));
    if (data !== null) {
      setrecentSearch(data);
    }
  }, [setrecentSearch]);

  console.log();
  const pathwayCourseIds =
    pathway.data?.pathways
      .map((pathway) => pathway.courses || [])
      .flat()
      .map((course) => course.id) || [];

  const otherCourseResults = data?.allCourses.filter((item) => {
    return (
      // item.course_type === "json" &&
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

  const handleDataBar = (name) => {
    if (!recentSearch.includes(name)) {
      localStorage.setItem("recent", JSON.stringify([...recentSearch, name]));
    }
  };
  const rojgar = pathwayTrackResults?.map((item) => {
    return item.courses?.length;
  });

  let sum = rojgar?.reduce((total, item) => {
    return total + item;
  }, 0);

  return (
    <>
      <Container>
        <TextField
          id="standard-search"
          placeholder="Search Course"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{ margin: "40px 0px 0px 0px" }}
          inputRef={(input) => {
            if (input != null) {
              input.focus();
            }
          }}
          variant="standard"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "600",
            fontSize: "18px",
            marginBottom: "16px",
            marginTop: "32px",
          }}
        >
          {sum} result found
        </Typography>
      </Container>
      <Container>
        {/* <Typography>{recentSearch}</Typography> */}
        <Box className={classes.box}>
          {search ? (
            <>
              <Grid container spacing={3} align="center">
                {pathwayTrackResults?.map((pathway, index) => {
                  return (
                    <>
                      <Typography variant="h5" sx={{ ml: "10px", mt: "32px" }}>
                        {pathway.name}
                      </Typography>
                      <Grid
                        container
                        spacing={3}
                        align="center"
                        sx={{ marginTop: "16px" }}
                      >
                        {/* {console.log(pathway.courses[0].name)} */}
                        {pathway.courses.map((item, index) => (
                          <Grid
                            key={index}
                            xs={12}
                            md={3}
                            className={classes.courseCard}
                          >
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
                                onClick={() => handleDataBar(item.name)}
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
                    <Typography variant="h5" sx={{ pb: "16px", mt: 8 }}>
                      Miscellaneous Courses
                    </Typography>
                    <Grid sx={{ mt: 2 }} container spacing={3} align="center">
                      {otherCourseResults?.map((item, index) => (
                        <>
                          <Grid key={index} xs={12} sm={6} md={3}>
                            <Link
                              className={classes.pathwayLink}
                              to={interpolatePath(
                                PATHS.PATHWAY_COURSE_CONTENT,
                                {
                                  courseId: item.id,
                                  exerciseId: 0,
                                  pathwayId: "miscellaneous",
                                }
                              )}
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
              </Grid>
              {!hasSearchResults && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItem: "center",
                    }}
                  >
                    <img src={require("./assist/NoCourses.svg")} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      justifyContent: "center",
                      marginTop: "32px",
                    }}
                  >
                    Whoops. The results for taken away!
                    <br />
                    Please try a new search
                  </Typography>
                </>
              )}
            </>
          ) : null}
        </Box>
      </Container>
    </>
  );
}

export default SearchCourse;
