import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import axios from "axios";
import "./style/index.scss";
import ExerciseContent from "./ExerciseContent";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { PATHS, interpolatePath } from "../../constant";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
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
  Select,
  MenuItem,
} from "@mui/material";
function NavigationComponent({
  index,
  exerciseId,
  setExerciseId,
  classes,
  history,
  params,
}) {
  return (
    <>
      {/* <Link to="/"> */}
      <img
        onClick={() => {
          history.push(
            interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
              courseId: params.courseId,
              exerciseId: index,
            })
          );
          setExerciseId(index);
        }}
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
function PathwayExercise() {
  const history = useHistory();
  const user = useSelector(({ User }) => User);
  const [course, setCourse] = useState([]);
  const [exerciseId, setExerciseId] = useState(0);
  const classes = useStyles();
  const params = useParams();
  const courseId = params.courseId;
  const courseLength = course && course.length;

  useEffect(() => {
    const currentCourse = params.exerciseId;
    setExerciseId(parseInt(currentCourse));
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
    if (exerciseId > 0) {
      history.push(
        interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
          courseId: params.courseId,
          exerciseId: exerciseId - 1,
        })
      );
      setExerciseId(exerciseId - 1);
    }
  };

  const nextClickHandler = () => {
    if (exerciseId < courseLength - 1) {
      history.push(
        interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
          courseId: params.courseId,
          exerciseId: exerciseId + 1,
        })
      );

      setExerciseId(exerciseId + 1);
    }
  };

  console.log("course", course);
  console.log("exerciseId", exerciseId);
  const [language, setLanguage] = useState("en");
  return (
    <>
      {/* <Container maxWidth="false"> */}
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <AppBar fullWidth position="sticky" color="background">
        <Container maxWidth>
          <div className="hideInMobile">
            <Toolbar
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="div">
                <Link
                  style={{
                    color: "black",
                  }}
                  to="/pathway/1"
                >
                  <CloseIcon />
                </Link>
              </Typography>
              <Toolbar>
                <ArrowBackIosIcon
                  opacity={`${exerciseId !== 0 ? 1 : 0}`}
                  sx={{ marginRight: 3 }}
                  onClick={previousClickHandler}
                />
                <div className="gridtopofcourse7">
                  {course &&
                    course.map((exercise, index) => {
                      if (exerciseId < 7 && index < 7) {
                        return (
                          <NavigationComponent
                            params={params}
                            history={history}
                            index={index}
                            exerciseId={exerciseId}
                            setExerciseId={setExerciseId}
                            classes={classes}
                          />
                        );
                      } else if (exerciseId >= 7 && index >= 7 && index < 14) {
                        return (
                          <NavigationComponent
                            params={params}
                            history={history}
                            index={index}
                            exerciseId={exerciseId}
                            setExerciseId={setExerciseId}
                            classes={classes}
                          />
                        );
                      } else if (
                        exerciseId >= 14 &&
                        index >= 14 &&
                        index < 21
                      ) {
                        return (
                          <NavigationComponent
                            params={params}
                            history={history}
                            index={index}
                            exerciseId={exerciseId}
                            setExerciseId={setExerciseId}
                            classes={classes}
                          />
                        );
                      }
                    })}
                </div>

                <ArrowForwardIosIcon
                  opacity={`${exerciseId < courseLength - 1 ? 1 : 0}`}
                  sx={{ marginLeft: 3 }}
                  onClick={nextClickHandler}
                />
              </Toolbar>
              <Select
                IconComponent={() => null}
                disableUnderline
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
                variant="standard"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hi">Hindi</MenuItem>
                <MenuItem value="mr">Marathi</MenuItem>
              </Select>
            </Toolbar>
          </div>
          <div className="VisibleInMobile">
            <div className="courseCloseAndEnglish">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  style={{
                    color: "black",
                  }}
                  to="/pathway/1"
                >
                  <CloseIcon />
                </Link>
              </Typography>

              <Select
                disableUnderline
                value={language}
                IconComponent={() => null}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
                variant="standard"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hi">Hindi</MenuItem>
                <MenuItem value="mr">Marathi</MenuItem>
              </Select>
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
                        <Link
                          to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                            courseId: params.courseId,
                            exerciseId: index,
                          })}
                          onClick={() => {
                            setExerciseId(index);
                          }}
                        >
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
                        </Link>
                      </>
                    );
                  })}
              </div>
            </Toolbar>
          </div>
        </Container>
      </AppBar>
      {/* </Box> */}
      <ExerciseContent exerciseId={exerciseId} lang={language} />
      <Box>
        <Toolbar
          style={{
            width: "95%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="text"
            color="primary"
            disabled={exerciseId === 0}
            onClick={previousClickHandler}
            sx={{ flexGrow: 0 }}
            startIcon={<ArrowBackIosIcon />}
          >
            Back
          </Button>
          <Button
            endIcon={<ArrowForwardIosIcon />}
            disabled={!(exerciseId < courseLength - 1)}
            variant="text"
            color="primary"
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

export default PathwayExercise;
