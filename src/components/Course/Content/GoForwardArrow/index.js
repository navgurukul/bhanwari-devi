import React from "react";
// import PropTypes from 'prop-types'
import { useSelector, useDispatch } from "react-redux";
import get from "lodash/get";

import { actions as courseActions } from "../../redux/action";
import Arrow from "../../../common/Arrow";

const GoBackArrow = () => {
  const dispatch = useDispatch();
  const {
    courseContent: { data },
    selectedExercise,
  } = useSelector(({ Course }) => Course);
  // comparision with 0 to check whether first sub exercise has been selected or not.
  const isLastExerciseSelected =
    get(selectedExercise, "index") === get(data, `exerciseList.length`) - 1;

  const hasSubExercises =
    get(selectedExercise, "parentExercise.childExercises.length") ||
    get(selectedExercise, "exercise.childExercises.length");
  const isChildSelected =
    selectedExercise.subExerciseIndex === 0 ||
    selectedExercise.subExerciseIndex;
  const isLastChild =
    isChildSelected &&
    selectedExercise.subExerciseIndex ===
      get(selectedExercise, "parentExercise.childExercises.length") - 1;
  if (
    (isLastExerciseSelected && !hasSubExercises) ||
    (isLastExerciseSelected && hasSubExercises && isLastChild)
  ) {
    return <div />;
  }

  const handleForwardClick = () => {
    const { exercise, index, subExerciseIndex } = selectedExercise;
    if ((subExerciseIndex === 0 || subExerciseIndex) && !isLastChild) {
      const mainExercise = get(data, `exerciseList[${index}]`);
      const nextSubExerciseIndex = subExerciseIndex + 1;
      const selectedChildExercise =
        mainExercise.childExercises[nextSubExerciseIndex];
      const selectedExerciseInfo = {
        exercise: selectedChildExercise,
        parentExercise: mainExercise,
        index,
        subExerciseIndex: nextSubExerciseIndex,
      };
      dispatch(courseActions.updateSelectedExercise(selectedExerciseInfo));
    } else if (!subExerciseIndex && exercise.childExercises) {
      const mainExercise = get(data, `exerciseList[${index}]`);
      const selectedChildExercise = mainExercise.childExercises[0];
      const selectedExerciseInfo = {
        exercise: selectedChildExercise,
        parentExercise: mainExercise,
        index,
        subExerciseIndex: 0,
      };
      dispatch(courseActions.updateSelectedExercise(selectedExerciseInfo));
    } else {
      const nextIndex = index + 1;
      const nextExercise = get(data, `exerciseList[${nextIndex}]`);
      const selectedMainExercise = { exercise: nextExercise, index: nextIndex };
      dispatch(courseActions.updateSelectedExercise(selectedMainExercise));
    }
  };

  return <Arrow onClick={handleForwardClick} />;
};

export default GoBackArrow;
