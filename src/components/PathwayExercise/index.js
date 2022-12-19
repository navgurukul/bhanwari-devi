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
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  useMediaQuery,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CompletionComponent from "./CourseCompletion/CompletionComponent";
import ExerciseImage from "./ExerciseImage/ExerciseImage.js";
import { breakpoints } from "../../theme/constant";

const languageMap = {
  hi: "Hindi",
  en: "English",
  te: "Telugu",
  ta: "Tamil",
  mr: "Marathi",
};

const Exercise = ({
  course,
  exerciseId,
  setExerciseId,
  classes,
  history,
  params,
  progressTrackId,
  setSuccessfulExerciseCompletion,
}) => {
  const courseLength = course;
  const imageRef = React.useRef();

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.scrollIntoView({
        block: "center",
      });
    }
  }, [imageRef.current]);

  return (
    <>
      {courseLength?.map((exercise, index) => {
        return (
          <NavigationComponent
            key={index}
            exercise={exercise}
            params={params}
            history={history}
            index={index}
            imageRef={exerciseId === index ? imageRef : null}
            exerciseId={exerciseId}
            setExerciseId={setExerciseId}
            classes={classes}
            progressTrackId={progressTrackId}
            setSuccessfulExerciseCompletion={setSuccessfulExerciseCompletion}
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
  history,
  params,
  exercise,
  progressTrackId,
  imageRef,
  setSuccessfulExerciseCompletion,
}) {
  return (
    <>
      <ExerciseImage
        id={exercise.id}
        exerciseName={
          exercise.name || exercise.sub_title || exercise.content_type || "N/A"
        }
        onClick={() => {
          history.push(
            interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
              courseId: params.courseId,
              exerciseId: index,
              pathwayId: params.pathwayId,
            })
          );
        }}
        setSuccessfulExerciseCompletion={setSuccessfulExerciseCompletion}
        index={index}
        imageRef={imageRef}
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
  const [showArrow, setShowArrow] = useState({ left: false, right: true });
  const currentCourse = params.courseId;
  const scrollRef = React.useRef();
  // console.log(showArrow);
  const editor = user.data.user.rolesList.indexOf("admin") > -1;

  const onScroll = () => {
    const scrollY = scrollRef.current.scrollLeft; //Don't get confused by what's scrolling - It's not the window
    const scrollTop = scrollRef.current.scrollTop;
    const maxScrollLeft =
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    // console.log(
    //   `onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop} maxWidth: ${
    //     maxScrollLeft - 2
    //   }`
    // );
    if (!showArrow.left) {
      if (scrollY > 0) {
        setShowArrow((prev) => {
          return { ...prev, left: true };
        });
      }
    } else if (showArrow.left) {
      if (scrollY === 0) {
        setShowArrow((prev) => {
          return { ...prev, left: false };
        });
      }
    }
    console.log("testing");
    if (showArrow.right) {
      if (Math.ceil(scrollY) >= maxScrollLeft - 2) {
        setShowArrow((prev) => {
          return { ...prev, right: false };
        });
      }
    } else if (!showArrow.right) {
      if (Math.ceil(scrollY) < maxScrollLeft - 2) {
        setShowArrow((prev) => {
          return { ...prev, right: true };
        });
      } else if (Math.ceil(scrollY) === maxScrollLeft) {
        setShowArrow((prev) => {
          return { ...prev, right: true };
        });
      }
    }
  };

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
    if (Number.isInteger(parseInt(params.pathwayId))) {
      axios({
        method: METHODS.GET,
        url: `${process.env.REACT_APP_MERAKI_URL}/progressTracking/${courseId}/completedCourseContentIds`,
        headers: {
          "version-code": versionCode,
          accept: "application/json",
          Authorization: user.data?.token || "",
        },
      }).then((res) => {
        const data = res.data;

        setProgressTrackId(data);
      });
    }
  }, [exerciseId]);

  useEffect(() => {
    if (courseLength > 0 && courseLength < 7) {
      setShowArrow((prev) => {
        return { ...prev, right: false };
      });
    } else if (exerciseId === courseLength) {
      setShowArrow((prev) => {
        return { ...prev, right: false };
      });
    } else {
      setShowArrow((prev) => {
        return { ...prev, right: true };
      });
    }
  }, [courseLength, exerciseId]);

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
      if (Number.isInteger(parseInt(params.pathwayId))) {
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
            exercise_id: course[exerciseId].id,
          },
        });
      }
      setExerciseId(exerciseId + 1);
    } else {
      setExerciseId(exerciseId + 1);
      setSuccessfulExerciseCompletion(true);
      if (Number.isInteger(parseInt(params.pathwayId))) {
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
            exercise_id: course[exerciseId].id,
          },
        })
          .then((res) => {})
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
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");

  return (
    <>
      <AppBar
        fullWidth
        // position="sticky"
        color="background"
        elevation={2}
        className={classes.mainHeader}
      >
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
                  opacity={!showArrow.left && 0}
                  sx={{ marginRight: "20px", cursor: "pointer" }}
                  onClick={() => {
                    scrollRef.current.scrollBy({
                      right: 0,
                      left: -60,
                      behavior: "smooth",
                    });
                  }}
                />
                <div
                  onScroll={onScroll}
                  ref={scrollRef}
                  className={
                    courseLength < 7
                      ? classes.scrollData
                      : classes.scrollContainer
                  }
                >
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
                      setSuccessfulExerciseCompletion={
                        setSuccessfulExerciseCompletion
                      }
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
                    setSuccessfulExerciseCompletion={
                      setSuccessfulExerciseCompletion
                    }
                  />
                </div>

                <ArrowForwardIosIcon
                  opacity={!showArrow.right && 0}
                  sx={{ marginLeft: 3, cursor: "pointer" }}
                  onClick={() => {
                    scrollRef.current.scrollBy({
                      right: 0,
                      left: 60,
                      behavior: "smooth",
                    });
                  }}
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
                            id={exercise.id}
                            selected={exerciseId == index}
                            contentType={exercise.content_type}
                            exerciseName={
                              exercise.name ||
                              exercise.sub_title ||
                              exercise.content_type ||
                              "N/A"
                            }
                            setSuccessfulExerciseCompletion={
                              setSuccessfulExerciseCompletion
                            }
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
      {editor && (
        <AppBar
          fullWidth
          // position="stick"
          sx={{ bgcolor: "info.light" }}
          className={
            isActive ? classes.editingHeaderMobile : classes.editingHeader
          }
          elevation={2}
        >
          <Box>
            <Container maxWidth>
              <Toolbar sx={{ alignItems: "center" }}>
                <Box sx={{ flexGrow: 1 }} />
                <ModeEditOutlineOutlinedIcon
                  className={classes.edit}
                  sx={{ mr: "11px" }}
                />
                <Typography className={classes.edit}>
                  Want to update the content?
                </Typography>
                <Button
                  sx={{ color: "#000000", ml: "24px" }}
                  className={classes.edit}
                  onClick={() => {
                    history.push(
                      interpolatePath(PATHS.PATHWAY_COURSE_CONTENT_EDIT, {
                        courseId: params.courseId,
                        exerciseId: params.exerciseId,
                        pathwayId: params.pathwayId,
                      })
                    );
                  }}
                >
                  Start Editing
                </Button>
                <Box sx={{ flexGrow: 1 }} />
              </Toolbar>
            </Container>
          </Box>
        </AppBar>
      )}
      {successfulExerciseCompletion ? (
        <CompletionComponent
          setSuccessfulExerciseCompletion={setSuccessfulExerciseCompletion}
        />
      ) : (
        <Box sx={{ marginTop: "120px" }}>
          {/* <Box sx={{ marginTop: "50px" }}> */}
          <ExerciseContent
            contentList={course}
            exerciseId={exerciseId}
            lang={language}
            setExerciseId={setExerciseId}
            setProgressTrackId={setProgressTrackId}
            progressTrackId={progressTrackId}
          />
        </Box>
      )}
      <Box>
        <Toolbar
          className={classes.bottomRow}
          sx={{ width: !isActive ? "100%" : "100%" }}
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
              opacity: `${exerciseId < courseLength ? 1 : 0}`,
              position: "relative",
              // right: "-10px",
              marginRight: !isActive && !isActiveIpad ? "40px" : "",
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
