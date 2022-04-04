import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import axios from "axios";
import "./style/index.scss";
// import { useParams } from "react-router-dom";
import ExerciseContent from "./ExerciseContent";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  CardMedia,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

function PathwayCourse() {
  const user = useSelector(({ User }) => User);
  const [course, setCourse] = useState();
  const [exerciseId, setExerciseId] = useState(0);
  const courseId = 370;
  const classes = useStyles();
  // const params = useParams();

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises`,
      headers: {
        "version-code": 40,
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      console.log("res", res.data.course.exercises[0].content);
      setCourse(res.data.course.exercises);
    });
  }, []);

  const previousClickHandler = () => {
    setExerciseId(exerciseId - 1);
  };

  const nextClickHandler = () => {
    setExerciseId(exerciseId + 1);
  };

  console.log("course", course);
  console.log("exerciseId", exerciseId);
  const courseLength = course && course.length;

  return (
    <>
      {/* <Container maxWidth="false"> */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="background">
          <Container maxWidth="false">
            <div className="hideInMobile">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <CloseIcon />
                </Typography>
                <Toolbar sx={{ flexGrow: 1, ml: { sm: 0, md: 13 } }}>
                  {exerciseId !== 0 && (
                    <ArrowBackIosIcon
                      sx={{ marginRight: 3 }}
                      onClick={previousClickHandler}
                    />
                  )}
                  <div className="gridtopofcourse7">
                    {course &&
                      course.map((exercise, index) => {
                        if (exerciseId < 7 && index < 7) {
                          return (
                            <>
                              {/* <Link to="/"> */}
                              <img
                                onClick={() => setExerciseId(index)}
                                src={
                                  exerciseId == index
                                    ? `${require("./asset/contentTypeSelectd.svg")}`
                                    : `${require("./asset/contenttype.svg")}`
                                }
                                loading="lazy"
                                className={classes.contentImg}
                              />
                              {/* </Link> */}
                            </>
                          );
                        } else if (
                          exerciseId >= 7 &&
                          index >= 7 &&
                          index < 14
                        ) {
                          return (
                            <>
                              {/* <Link to="/"> */}
                              <img
                                onClick={() => setExerciseId(index)}
                                src={
                                  exerciseId == index
                                    ? `${require("./asset/contentTypeSelectd.svg")}`
                                    : `${require("./asset/contenttype.svg")}`
                                }
                                loading="lazy"
                                className={classes.contentImg}
                              />
                              {/* </Link> */}
                            </>
                          );
                        } else if (
                          exerciseId >= 14 &&
                          index >= 14 &&
                          index < 21
                        ) {
                          return (
                            <>
                              {/* <Link to="/"> */}
                              <img
                                onClick={() => setExerciseId(index)}
                                src={
                                  exerciseId == index
                                    ? `${require("./asset/contentTypeSelectd.svg")}`
                                    : `${require("./asset/contenttype.svg")}`
                                }
                                loading="lazy"
                                className={classes.contentImg}
                              />
                              {/* </Link> */}
                            </>
                          );
                        }
                      })}
                  </div>
                  {exerciseId < courseLength - 1 && (
                    <ArrowForwardIosIcon
                      sx={{ marginLeft: 3 }}
                      onClick={nextClickHandler}
                    />
                  )}
                </Toolbar>
                <Button color="inherit">English</Button>
              </Toolbar>
            </div>
            <div className="VisibleInMobile">
              <div className="courseCloseAndEnglish">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <CloseIcon />
                </Typography>

                <Button color="inherit">English</Button>
              </div>
              <Toolbar>
                <div
                  style={{
                    display: "flex",
                    overflowY: "scroll",
                  }}
                >
                  {course &&
                    course.map((exercise, index) => {
                      return (
                        <>
                          {/* <Link to="/"> */}
                          <img
                            onClick={() => setExerciseId(index)}
                            src={
                              exerciseId == index
                                ? `${require("./asset/contentTypeSelectd.svg")}`
                                : `${require("./asset/contenttype.svg")}`
                            }
                            loading="lazy"
                            className={classes.contentImg}
                          />
                          {/* </Link> */}
                        </>
                      );
                    })}
                </div>
              </Toolbar>
            </div>
          </Container>
        </AppBar>
      </Box>
      <ExerciseContent exerciseId={exerciseId} />
      <Box>
        <Toolbar>
          <Button
            variant="text"
            color="primary"
            disabled={exerciseId === 0}
            onClick={previousClickHandler}
            sx={{ flexGrow: 0 }}
          >
            Back
          </Button>
          <Button
            variant="text"
            color="primary"
            sx={{ flexGrow: 1 }}
            onClick={nextClickHandler}
          >
            Next
          </Button>
        </Toolbar>
      </Box>
      {/* </Container> */}
    </>
  );
}

export default PathwayCourse;
