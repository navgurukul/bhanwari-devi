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
