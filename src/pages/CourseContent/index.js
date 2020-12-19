import React, { useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { PATHS } from '../../constant';
import { useSelector, useDispatch } from "react-redux";
import get from "lodash/get";

import { actions as courseActions } from "../../components/Course/redux/action";
import GoForwardArrow from "../../components/Course/Content/GoForwardArrow";
import Exercise from '../../components/Course/Content/Exercise';
import ExerciseList from "../../components/Course/Content/ExerciseList";
import GoBackArrow from "../../components/Course/Content/GoBackArrow";
import Loader from "../../components/common/Loader";
import "./styles.scss";

const getExerciseIdFromUrl = () => {
  let exerciseId;
  if (window.location.href.includes('exercise')) {
    exerciseId = window.location.href.split('/').pop();
  }
  return exerciseId;
}

function CourseContent(props) {
  const history = useHistory();
  let { url, path } = useRouteMatch();
  const dispatch = useDispatch();
  const {
    courseContent: { loading, data },
    selectedExercise,
  } = useSelector(({ Course }) => Course);
  
  // get the course id, and pass it in the component.
  const courseId = get(props, "match.params.courseId");

  useEffect(() => {
    dispatch(courseActions.getCourseContent({ courseId: courseId }));
  }, [dispatch, courseId]);

  useEffect(() => {
    let defaultExercise, defaultExerciseIndex;
    let exerciseIdFromParams = getExerciseIdFromUrl();
    const firstExercise = get(data, 'exerciseList[0]');

    // exercises loaded
    if (firstExercise) {
        if (exerciseIdFromParams) {
            const exerciseFromParams = data.exerciseList.find((exercise) => {
                return exercise.id === exerciseIdFromParams;
            });
            if (exerciseFromParams) {
                defaultExercise = exerciseFromParams;
                defaultExerciseIndex = data.exerciseList.findIndex((exercise) => {
                    return exercise.id === exerciseIdFromParams;
                });
            }
        }

        // exerciseId not params or exerciseId in params not there in exercise list (eg: invalid exercise id in url)
        if (!defaultExercise) {
            defaultExercise = firstExercise;
            defaultExerciseIndex = 0;
        }
        const selectedExerciseInfo = { exercise: defaultExercise, index: defaultExerciseIndex };
        dispatch(courseActions.updateSelectedExercise(selectedExerciseInfo));
    }
  }, [dispatch, data]);


  useEffect(() => {
    const exerciseId = get(selectedExercise, 'exercise.id');
    if (exerciseId) {
      history.push(`${url}/exercise/${exerciseId}`);
    }
  }, [selectedExercise])

  if (loading) {
    return <Loader pageLoader={true} />;
  }

  return (
    <div className="ng-course-content">
      <div className="content">
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
