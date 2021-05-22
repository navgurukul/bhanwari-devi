import React, { useEffect } from "react";
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
import "./styles.scss";

const getExerciseIdFromUrl = () => {
  let exerciseId;

  if (window.location.href.includes("exercise")) {
    exerciseId = window.location.href.split("/").pop();
  }
  return exerciseId;
};

function CourseContent(props) {
  const history = useHistory();
  let { url, path } = useRouteMatch();

  const dispatch = useDispatch();
  const {
    courseContent: { loading, data },
    selectedExercise,
  } = useSelector(({ Course }) => Course);

  useEffect(() => {
    const exerciseId = get(selectedExercise, "exercise.id");
    let url = window.location.href;
    window.localStorage.setItem(
      "lastExerciseUrl",
      `${url}/exercise/${exerciseId}`
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
    dispatch(courseActions.getCourseContent({ courseId: courseId }));
  }, [dispatch, courseId]);

  useEffect(() => {
    let exerciseIdFromParams = getExerciseIdFromUrl();
    const firstExercise = get(data, "exerciseList[0]");
    let defaultExercise = firstExercise,
      defaultExerciseIndex = 0;

    // exercises loaded
    if (firstExercise) {
      // set default exercise if the exercise id present in the url and is valid
      // TBD: Ideally, when navigating to a course content page, the first exercise should be pre-computed and the url should be course/:courseId/exercise/:exerciseId so we can always use the exerciseId from the params to set the default exercise.
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

      dispatch(courseActions.updateSelectedExercise(selectedExerciseInfo));
    }
  }, [dispatch, data]);

  useEffect(() => {
    const exerciseId = get(selectedExercise, "exercise.id");
    if (exerciseId) {
      history.push(`${url}/exercise/${exerciseId}`);
    }
  }, [selectedExercise, history, url]);

  if (loading) {
    return <Loader pageLoader={true} />;
  }

  return (
    <div className="ng-course-content">
      <div className="content">
        <h1>{courseTitle}</h1>
        <Switch>
          <Route path={`${path}${PATHS.EXERCISE}`}>
            <Exercise data={data} selectedExercise={selectedExercise} />
          </Route>
        </Switch>
        <div className="arrow-row">
          <GoBackArrow />
          <GoForwardArrow />
        </div>
      </div>
      <ExerciseList list={get(data, "exerciseList")} />
    </div>
  );
}

export default CourseContent;
