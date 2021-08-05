import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash/get";

import { actions as courseActions } from "../../redux/action";
import Exercise from "./Exercise";
import "./styles.scss";

function ExerciseList(props) {
  const { list = [] } = props;

  const dispatch = useDispatch();
  const {
    courseContent: { data },
    selectedExercise,
  } = useSelector(({ Course }) => Course);

  const handleExerciseChange = useCallback(
    (clickedExerciseInfo) => {
      const { index, subExerciseIndex } = clickedExerciseInfo;
      const mainExercise = get(data, `exerciseList[${index}]`);
      // if child exercise was clicked, also handling fir
      if (subExerciseIndex === 0 || subExerciseIndex) {
        const selectedChildExercise =
          mainExercise.childExercises[subExerciseIndex];
        const selectedExerciseInfo = {
          exercise: selectedChildExercise,
          parentExercise: mainExercise,
          index,
          subExerciseIndex,
        };
        dispatch(courseActions.updateSelectedExercise(selectedExerciseInfo));
      } else {
        const selectedMainExercise = { exercise: mainExercise, index };
        dispatch(courseActions.updateSelectedExercise(selectedMainExercise));
      }
    },
    [data, dispatch]
  );

  return (
    <div className="ng-exercise-list">
      {/* <div className='enroll'>
        ENROLL IN COURSE
      </div> */}
      {list.map((exercise, index) => {
        return (
          <Exercise
            exercise={exercise}
            index={index}
            selectedExercise={selectedExercise}
            onClick={handleExerciseChange}
            key={index}
          />
        );
      })}
    </div>
  );
}

ExerciseList.propTypes = {
  list: PropTypes.array,
};

export default ExerciseList;
