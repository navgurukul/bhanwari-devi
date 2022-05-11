import React, { useEffect, useState } from "react";
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
import { PATHS, interpolatePath, versionCode } from "../../constant";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.css";
// const {languageMap} = require("../../pages/CourseContent/languageMap");

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
import languageMap from "../../pages/CourseContent/languageMap";

const Exercise = ({
  course,
  exerciseId,
  setExerciseId,
  classes,
  history,
  params,
}) => {
  const start = exerciseId > 6 ? exerciseId - 6 : 0;
  const courseLength =
    course && course.length && exerciseId < 7
      ? course.slice(start, 7)
      : course.slice(start, exerciseId + 1);
  return (
    <>
      {courseLength.map((exercise, index) => {
        return (
          <NavigationComponent
            params={params}
            history={history}
            index={index + start}
            exerciseId={exerciseId}
            setExerciseId={setExerciseId}
            classes={classes}
          />
        );
      })}
    </>
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
  console.log("exerciseId", exerciseId);
  console.log("index", index);
  return (
    <>
      <img
        onClick={() => {
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

function PathwayExercise() {
  const history = useHistory();
  const user = useSelector(({ User }) => User);
  const [course, setCourse] = useState([]);
  const [exerciseId, setExerciseId] = useState(0);
  const classes = useStyles();
  const params = useParams();
  const courseId = params.courseId;
  const courseLength = course && course.length ? course.length : 0;
  const [availableLang, setAvailableLang] = useState(["en"]);

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
        setCourse(res.data.course.exercises);
        setAvailableLang(res.data.course.lang_available);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const LangDropDown = () => {
    return availableLang?.length === 1 ? (
      <MenuItem value={availableLang[0]}>{Lang[availableLang[0]]}</MenuItem>
    ) : (
      <Select
        disableUnderline
        value={language}
        IconComponent={() => null}
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
        variant="standard"
      >
        {availableLang.map((lang) => {
          return <MenuItem value={lang}>{Lang[lang]}</MenuItem>;
        })}
      </Select>
    );
  };

  // const Lang = {
  //   en: "English",
  //   mr: "Marathi",
  //   hi: "Hindi",
  // };

  const Lang = languageMap;

  console.log("courseId", courseId);

  const previousClickHandler = () => {
    if (exerciseId > 0) {
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

  const [language, setLanguage] = useState("en");
  return (
    <>
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
                <ArrowBackIosIcon
                  opacity={`${exerciseId !== 0 ? 1 : 0}`}
                  sx={{ marginRight: 3 }}
                  onClick={previousClickHandler}
                />
                <div className="gridtopofcourse7">
                  {exerciseId >
                  (
                    <Exercise
                      course={course}
                      params={params}
                      history={history}
                      exerciseId={exerciseId + 1}
                      setExerciseId={setExerciseId}
                      classes={classes}
                    />
                  )}
                  <Exercise
                    course={course}
                    params={params}
                    history={history}
                    exerciseId={exerciseId}
                    setExerciseId={setExerciseId}
                    classes={classes}
                  />
                </div>

                <ArrowForwardIosIcon
                  opacity={`${exerciseId < courseLength - 1 ? 1 : 0}`}
                  sx={{ marginLeft: 3 }}
                  onClick={nextClickHandler}
                />
              </Toolbar>
              <LangDropDown />
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

              <LangDropDown />
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
    </>
  );
}

export default PathwayExercise;
