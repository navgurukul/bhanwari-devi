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
import { PATHS, interpolatePath, versionCode } from "../../constant";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.css";

import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

function PathwayExercise() {
  const history = useHistory();
  const user = useSelector(({ User }) => User);
  const [course, setCourse] = useState([]);
  const [exerciseId, setExerciseId] = useState(0);
  const classes = useStyles();
  const params = useParams();
  const courseId = params.courseId;
  const courseLength = course && course.length ? course.length : 0;
  const customSlider = useRef();
  useEffect(() => {
    const currentCourse = params.exerciseId;
    setExerciseId(parseInt(currentCourse));
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user.data?.token || "",
      },
    })
      .then((res) => {
        console.log("res", res.data.course.exercises[0]?.content);
        setCourse(res.data.course.exercises);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const previousClickHandler = () => {
    if (exerciseId > 0) {
      customSlider.current.slickPrev();

      history.push(
        interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
          courseId: params.courseId,
          exerciseId: exerciseId - 1,
          pathwayId: params.pathwayId,
        })
      );
      setExerciseId(exerciseId - 1);
    }
  };

  const nextClickHandler = () => {
    if (exerciseId < courseLength - 1) {
      customSlider.current.slickNext();

      history.push(
        interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
          courseId: params.courseId,
          exerciseId: exerciseId + 1,
          pathwayId: params.pathwayId,
        })
      );

      setExerciseId(exerciseId + 1);
    }
  };
  const NextClick = () => {
    return (
      <ArrowForwardIosIcon
        opacity={`${exerciseId < courseLength - 1 ? 1 : 0}`}
        sx={{ marginLeft: 3 }}
        style={{
          position: "relative",
          right: -282,
          top: -34,
        }}
        onClick={() => {
          nextClickHandler();
        }}
      />
    );
  };
  const PrevClick = () => {
    return (
      <ArrowBackIosIcon
        style={{
          position: "relative",
          left: -21,
          top: 36,
        }}
        opacity={`${exerciseId !== 0 ? 1 : 0}`}
        sx={{ marginRight: 3 }}
        onClick={() => {
          previousClickHandler();
        }}
      />
    );
  };
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
        <img
          onClick={() => {
            customSlider.current.slickGoTo(index);
            history.push(
              interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                courseId: params.courseId,
                exerciseId: index,
                pathwayId: params.pathwayId,
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
      </>
    );
  }

  const settings = {
    dots: false,
    nextArrow: <NextClick />,
    prevArrow: <PrevClick />,
    infinite: false,
    display: "flex",
    slideAlign: "center",
    slidesToShow: 7,
    slickNext: true,
    slidesToScroll: 0.5,
    useCSS: true,
    slide: "img",
    verticalWidth: "50%",
  };
  console.log("course", course);
  console.log("exerciseId", exerciseId);
  const [language, setLanguage] = useState("en");
  return (
    <>
      {/* <Container maxWidth="false"> */}
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
                  style={{ color: "#6D6D6D" }}
                  to={
                    params.pathwayId == "miscellaneous"
                      ? interpolatePath(PATHS.MISCELLANEOUS_COURSE)
                      : params.pathwayId == "residential"
                      ? interpolatePath(PATHS.RESIDENTIAL_COURSE)
                      : interpolatePath(PATHS.PATHWAY_COURSE, {
                          pathwayId: params.pathwayId,
                        })
                  }
                >
                  <CloseIcon />
                </Link>
              </Typography>
              <Toolbar>
                <Slider
                  ref={(slider) => (customSlider.current = slider)}
                  style={{
                    width: "20vw",
                    height: "80px",
                  }}
                  {...settings}
                >
                  {course &&
                    course.map((exercise, index) => {
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
                    })}
                </Slider>
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
                  style={{ color: "#6D6D6D" }}
                  to={
                    params.pathwayId == "miscellaneous"
                      ? interpolatePath(PATHS.MISCELLANEOUS_COURSE)
                      : params.pathwayId == "residential"
                      ? interpolatePath(PATHS.RESIDENTIAL_COURSE)
                      : interpolatePath(PATHS.PATHWAY_COURSE, {
                          pathwayId: params.pathwayId,
                        })
                  }
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
                            pathwayId: params.pathwayId,
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
      <ExerciseContent exerciseId={exerciseId} lang={language} />
      <Box>
        <Toolbar
          style={{
            width: "97%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed",
            bottom: 0,
            background: "#fff",
          }}
        >
          <Button
            variant="text"
            color="dark"
            style={{
              opacity: `${exerciseId !== 0 ? 1 : 0}`,
            }}
            disabled={exerciseId === 0}
            onClick={previousClickHandler}
            sx={{ flexGrow: 0 }}
            startIcon={<ArrowBackIosIcon />}
          >
            Back
          </Button>
          <Button
            style={{
              opacity: `${exerciseId < courseLength - 1 ? 1 : 0}`,
            }}
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
