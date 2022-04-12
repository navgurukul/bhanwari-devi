import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { PATHS } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash/get";

import { actions as courseActions } from "../../components/Course/redux/action";
import GoForwardArrow from "../../components/Course/Content/GoForwardArrow";
import Exercise from "../../components/Course/Content/Exercise";
import ExerciseList from "../../components/Course/Content/ExerciseList";
import GoBackArrow from "../../components/Course/Content/GoBackArrow";
import Loader from "../../components/common/Loader";
import axios from "axios";
import { METHODS } from "../../services/api";
import "./styles.scss";
import languageMap from "./languageMap";
const getExerciseIdFromUrl = () => {
  let exerciseId;

  if (window.location.href.includes("exercise")) {
    exerciseId = window.location.href.split("/").pop();
  }
  return exerciseId;
};

function CourseContent(props) {
  const [changeLanguage, setChangeLanguage] = useState("en");
  const [courseLang, setCourseLang] = useState([]);
  const history = useHistory();
  let { path, url } = useRouteMatch();
  let fullUrl = window.location.href;

  const dispatch = useDispatch();
  const {
    courseContent: { loading, data },
    selectedExercise,
  } = useSelector(({ Course }) => Course);

  // api call for course

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/courses`,
    }).then((res) => {
      setCourseLang(res.data);
    });
  }, []);

  useEffect(() => {
    const exerciseId = get(selectedExercise, "exercise.id");
    window.localStorage.setItem(
      "lastExerciseUrl",
      `${fullUrl}/exercise/${exerciseId}`
    );
    const exercise = get(selectedExercise, "exercise.name");
    window.localStorage.setItem("exerciseName", exercise);
  }, [selectedExercise]);

  // get the course id, and pass it in the component.
  const courseName = get(props, "location.search");
  const params = new URLSearchParams(courseName);
  const courseTitle = params.get("name");
  const courseId = get(props, "match.params.courseId");

  useEffect(() => {
    const getLocalStorageValue = localStorage.getItem("changeLanguage");

    getLocalStorageValue === undefined
      ? setChangeLanguage("en")
      : setChangeLanguage(getLocalStorageValue);
    dispatch(
      courseActions.getCourseContent({
        courseId: courseId,
        lang: changeLanguage,
      })
    );
  }, [dispatch, courseId, changeLanguage]);

  const onLangChange = (e) => {
    setChangeLanguage(e.target.value);
    localStorage.setItem("changeLanguage", e.target.value);
  };

  const setSelectedExercise = (exerciseInfo, doNotUpdateHistory) => {
    dispatch(courseActions.updateSelectedExercise(exerciseInfo));
    if (!doNotUpdateHistory) {
      history.push(`${url}/exercise/${exerciseInfo.exercise.id}`);
    }
  };

  useEffect(() => {
    let exerciseIdFromParams = getExerciseIdFromUrl();
    const firstExercise = get(data, "exerciseList[0]");
    let defaultExercise = firstExercise,
      defaultExerciseIndex = 0;

    // exercises loaded
    if (firstExercise) {
      if (exerciseIdFromParams) {
        const exerciseFromParamsIndex = data.exerciseList.findIndex(
          (exercise) => {
            return exercise.id === exerciseIdFromParams;
          }
        );
        if (exerciseFromParamsIndex !== -1) {
          defaultExercise = data.exerciseList[exerciseFromParamsIndex];
          defaultExerciseIndex = exerciseFromParamsIndex;
        }
      }
      const selectedExerciseInfo = {
        exercise: defaultExercise,
        index: defaultExerciseIndex,
      };

      setSelectedExercise(selectedExerciseInfo);
    }
  }, [data]);

  useEffect(() => {
    const pathWithoutParams = fullUrl.split("?")[0];
    if (pathWithoutParams.includes("exercise")) {
      const routeExerciseId = pathWithoutParams.split("/").pop();
      if (
        get(selectedExercise, "exercise.id") !== routeExerciseId &&
        routeExerciseId &&
        data
      ) {
        const newSelectedExerciseIndex = data.exerciseList.findIndex(
          (exercise) => exercise.id === routeExerciseId
        );
        setSelectedExercise(
          {
            exercise: data.exerciseList[newSelectedExerciseIndex],
            index: newSelectedExerciseIndex,
          },
          true
        );
      }
    }
  }, [fullUrl]);

  if (loading) {
    return <Loader pageLoader={true} />;
  }

  return (
    <div className="ng-course-content">
      <div className="content">
        <div className="lang">
          {courseLang.map((item) => {
            if (item.hasOwnProperty("lang_available")) {
              if (item.id === courseId) {
                return (
                  <select
                    className="language-select"
                    id="lang"
                    required
                    value={changeLanguage}
                    aria-required
                    onChange={onLangChange}
                  >
                    {item.lang_available.map((language, index) => {
                      return (
                        <option key={index} value={language}>
                          {languageMap[language]}
                        </option>
                      );
                    })}
                  </select>
                );
              }
            }
          })}
        </div>
        <h1>{courseTitle}</h1>
        <Switch>
          <Route path={`${path}${PATHS.EXERCISE}`}>
            <Exercise data={data} selectedExercise={selectedExercise} />
          </Route>
        </Switch>
        <div className="arrow-row">
          <GoBackArrow setSelectedExercise={setSelectedExercise} />
          <GoForwardArrow setSelectedExercise={setSelectedExercise} />
        </div>
      </div>
      <ExerciseList
        setSelectedExercise={setSelectedExercise}
        list={get(data, "exerciseList")}
      />
    </div>
  );
}

export default CourseContent;
