import React, { useEffect, useState, useRef } from "react";
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
import { METHODS } from "../../services/api";
import axios from "axios";
import { ElectricScooterSharp } from "@mui/icons-material";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function SearchCourse(props) {
  const { data } = useSelector(({ Course }) => Course);
  const pathway = useSelector((state) => state.Pathways);
  const dispatch = useDispatch();
  // const query = new URLSearchParams(useLocation().search).get("search");
  // const query = useSearchQuery();
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(true);

  console.log(search);
  const user = useSelector(({ User }) => User);
  const prevSearch = usePrevious(search);
  console.log(prevSearch);

  useSearchQuery(setSearch);
  const history = useHistory();
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [updated, setUpdated] = useState();

  useEffect(() => {
    setUpdated(search);
  }, [search]);

  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    if (e.key == "Enter") {
      if (e.target.value == "") {
        history.replace(`/search-course/?search=${prevSearch}`);
      } else {
        history.replace(`/search-course/?search=${e.target.value}`);
      }
      e.preventDefault();
    }
  };
  const [recentSearch, setrecentSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recent"));
    if (data !== null) {
      setrecentSearch(data);
    }
  }, [setrecentSearch]);

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

  const item = pathwayTrackResults?.map((item) => {
    return item.course;
  });

  let sum = rojgar?.reduce((total, item) => {
    return total + item;
  }, 0);

  let misscount = otherCourseResults?.length;

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
          value={updated}
          onKeyPress={handleSearchChange}
          onChange={(e) => {
            setUpdated(e.target.value);
          }}
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
          {sum + misscount} result found
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
                      <Typography
                        variant="h5"
                        sx={{ margin: "16px 0px 1px 6px" }}
                      >
                        {pathway.name}
                      </Typography>
                      <Grid container spacing={2} align="center">
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
                    <Typography variant="h5" sx={{ mt: 2, ml: "6px" }}>
                      Miscellaneous Courses
                    </Typography>
                    <Grid
                      sx={{ mt: 1, ml: "2px" }}
                      container
                      spacing={3}
                      align="center"
                    >
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
