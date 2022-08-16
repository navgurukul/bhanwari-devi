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

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
import CompletionComponent from "./CourseCompletion/CompletionComponent";

const Exercise = ({
  course,
  exerciseId,
  setExerciseId,
  classes,
  history,
  params,
  progressTrackId,
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
            exercise={exercise}
            params={params}
            history={history}
            index={index + start}
            exerciseId={exerciseId}
            setExerciseId={setExerciseId}
            classes={classes}
            progressTrackId={progressTrackId}
          />
        );
      })}
    </>
  );
};

function ExerciseImage({
  selected,
  contentType,
  setExerciseId,
  onClick,
  index,
  progressTrackId,
}) {
  const classes = useStyles();

  const contentTypeMap = {
    assessment: selected
      ? index <= progressTrackId
        ? "assessmentRevisit"
        : "assessmentSelected"
      : index <= progressTrackId
      ? "assessmentCompleted"
      : "assessment",
    class_topic: selected
      ? index <= progressTrackId
        ? "classTypeRevisit"
        : "classTypeSelected"
      : index <= progressTrackId
      ? "classTypeCompleted"
      : "classtype",
    exercise: selected
      ? index <= progressTrackId
        ? "contentTypeRevist"
        : "contentTypeSelected"
      : index <= progressTrackId
      ? "ContentTypeCompleted"
      : "contenttype",
  };
  return (
    <img
      onClick={() => {
        onClick();
        setExerciseId(index);
      }}
      src={require("./asset/" + contentTypeMap[contentType] + ".svg")}
      loading="lazy"
      className={classes.contentImg}
    />
  );
}

function NavigationComponent({
  index,
  exerciseId,
  setExerciseId,
  history,
  params,
  exercise,
  progressTrackId,
}) {
  return (
    <>
      <ExerciseImage
        onClick={() => {
          history.push(
            interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
              courseId: params.courseId,
              exerciseId: index,
              pathwayId: params.pathwayId,
            })
          );
        }}
        index={index}
        selected={exerciseId == index}
        contentType={exercise.content_type}
        setExerciseId={setExerciseId}
        progressTrackId={progressTrackId}
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
  const [progressTrackId, setProgressTrackId] = useState(-1);
  const [successfulExerciseCompletion, setSuccessfulExerciseCompletion] =
    useState(false);
  const currentCourse = params.courseId;

  useEffect(() => {
    setExerciseId(parseInt(params.exerciseId));
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
  }, [currentCourse]);
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/progressTracking/learningTrackStatus`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user.data?.token || "",
      },
    }).then((res) => {
      const data = res.data.data;
      const filteredData = data.filter((item) => {
        if (
          params.pathwayId == item.pathway_id &&
          params.courseId == item.course_id
        ) {
          return item;
        }
      });

      setProgressTrackId(
        filteredData[0] ? filteredData[0]?.course_index - 1 : -1
      );
    });
  }, [exerciseId]);

  const LangDropDown = () => {
    return availableLang?.length === 1 ? (
      <MenuItem
        style={{
          position: "relative",
          right: "-30px",
        }}
        value={availableLang[0]}
      >
        {Lang[availableLang[0]]}
      </MenuItem>
    ) : (
      <Select
        style={{
          position: "relative",
          right: "-30px",
        }}
        disableUnderline
        value={language}
        IconComponent={() => (
          <KeyboardArrowDownIcon
            style={{
              marginLeft: "-20px",
            }}
          />
        )}
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
        variant="standard"
      >
        {availableLang.map((lang) => {
          return (
            <MenuItem
              style={{ borderRadius: "8px" }}
              sx={{ width: 120, margin: "6px 16px 6px 16px" }}
              value={lang}
            >
              {Lang[lang]}
            </MenuItem>
          );
        })}
      </Select>
    );
  };

  const Lang = languageMap;

  const previousClickHandler = () => {
    if (exerciseId > 0) {
      setSuccessfulExerciseCompletion(false);
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
      console.log(progressTrackId);
      if (parseInt(params.exerciseId) >= progressTrackId) {
        axios({
          method: METHODS.POST,
          url: `${process.env.REACT_APP_MERAKI_URL}/progressTracking/learningTrackStatus`,
          headers: {
            "version-code": versionCode,
            accept: "application/json",
            Authorization: user.data?.token || "",
          },
          data: {
            pathway_id: params.pathwayId,
            course_id: params.courseId,
            course_index: parseInt(params.exerciseId) + 1,
          },
        });
      }
      setExerciseId(exerciseId + 1);
    } else {
      if (parseInt(params.exerciseId) >= progressTrackId) {
        console.log("last exercise");

        axios({
          method: METHODS.POST,
          url: `${process.env.REACT_APP_MERAKI_URL}/progressTracking/learningTrackStatus`,
          headers: {
            "version-code": versionCode,
            accept: "application/json",
            Authorization: user.data?.token || "",
          },
          data: {
            pathway_id: params.pathwayId,
            course_id: params.courseId,
            course_index: parseInt(params.exerciseId) + 1,
          },
        })
          .then((res) => {
            setExerciseId(exerciseId + 1);
            setSuccessfulExerciseCompletion(true);
          })
          .catch((err) => {});
      }
    }
  };
  const nextArrowClickHandler = () => {
    if (exerciseId < courseLength - 1) {
      history.push(
        interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
          courseId: params.courseId,
          exerciseId: exerciseId + 1,
          pathwayId: params.pathwayId,
        })
      );
      console.log(progressTrackId);

      setExerciseId(exerciseId + 1);
    }
  };
  const [language, setLanguage] = useState("en");

  // to avoid duplication
  function languageSelectMenu() {
    const langMenu = availableLang.map((lang) => (
      <MenuItem value={lang}>{Lang[lang]}</MenuItem>
    ));
    return availableLang.length === 1 ? (
      langMenu
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
        {langMenu}
      </Select>
    );
  }

  return (
    <>
      <AppBar fullWidth position="sticky" color="background" elevation={2}>
        <Container maxWidth>
          <div className="hideInMobile">
            <Toolbar
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                pt={1}
                style={{
                  position: "relative",
                  left: "-30px",
                }}
              >
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
                  sx={{ marginRight: "20px" }}
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
                      progressTrackId={progressTrackId}
                    />
                  )}
                  <Exercise
                    course={course}
                    params={params}
                    history={history}
                    exerciseId={exerciseId}
                    setExerciseId={setExerciseId}
                    classes={classes}
                    progressTrackId={progressTrackId}
                  />
                </div>

                <ArrowForwardIosIcon
                  opacity={`${exerciseId < courseLength - 1 ? 1 : 0}`}
                  sx={{ marginLeft: 3 }}
                  onClick={nextArrowClickHandler}
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
                          <ExerciseImage
                            selected={exerciseId == index}
                            contentType={exercise.content_type}
                            index={index}
                            setExerciseId={setExerciseId}
                            progressTrackId={progressTrackId}
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
      {successfulExerciseCompletion ? (
        <CompletionComponent
          setSuccessfulExerciseCompletion={setSuccessfulExerciseCompletion}
        />
      ) : (
        <ExerciseContent
          contentList={course}
          exerciseId={exerciseId}
          lang={language}
        />
      )}
      <Box>
        <Toolbar className={classes.bottomRow}>
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
              opacity: `${exerciseId < courseLength ? 1 : 0}`,
              position: "relative",
              right: "-10px",
            }}
            endIcon={<ArrowForwardIosIcon />}
            disabled={!(exerciseId < courseLength)}
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
