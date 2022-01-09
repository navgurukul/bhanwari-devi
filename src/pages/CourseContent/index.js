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

const getExerciseIdFromUrl = () => {
  let exerciseId;
  const pathWithoutParams = window.location.href.split("?")[0];

  if (pathWithoutParams.includes("exercise")) {
    exerciseId = window.location.href.split("/").pop();
  }
  return exerciseId;
};

const getSubExerciseIndex = (parent, childId) => {
  if (parent.childExercises) {
    return parent.childExercises.findIndex((c) => c.id === childId);
  } else {
    return -1;
  }
};

const getSelectedFromId = (exerciseList, exerciseId) => {
  if (!Array.isArray(exerciseList)) {
    return;
  }

  let index, subExerciseIndex;
  index = exerciseList.findIndex((e) => {
    subExerciseIndex = getSubExerciseIndex(e, exerciseId);
    return subExerciseIndex !== -1 || e.id === exerciseId;
  });

  if (subExerciseIndex === -1) {
    if (index === -1) {
      index = 0; // use default exercise
    }
    return {
      index,
      exercise: exerciseList[index]
    };
  } else {
    return {
      index,
      subExerciseIndex,
      exercise: exerciseList[index].childExercises[subExerciseIndex],
      parentExercise: exerciseList[index]
    };
  }
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

  const languageMap = {
    hi: "Hindi",
    en: "English",
    te: "Telugu",
    ta: "Tamil",
  };

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
    // const exerciseId = get(selectedExercise, "exercise.id");
    window.localStorage.setItem(
      "lastExerciseUrl",
      fullUrl
      //`${fullUrl}/exercise/${exerciseId}`
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

    // exercises loaded
    if (firstExercise) {
      if (exerciseIdFromParams) {
        setSelectedExercise(
          getSelectedFromId(data.exerciseList, exerciseIdFromParams)
        );
      }
    }
  }, [data]);

  useEffect(() => {
    const routeExerciseId = getExerciseIdFromUrl();

    if (
      routeExerciseId !== undefined &&
      data &&
      get(selectedExercise, "exercise.id") !== routeExerciseId
    ) {
      setSelectedExercise(
        getSelectedFromId(data.exerciseList, routeExerciseId),
        true
      );
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
