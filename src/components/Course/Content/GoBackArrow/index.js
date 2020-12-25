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
  const isChildSelected =
    selectedExercise.subExerciseIndex === 0 ||
    selectedExercise.subExerciseIndex;
  const isFirstExerciseSelected = get(selectedExercise, "index") === 0;
  const isFirstChildSelected = get(selectedExercise, "subExerciseIndex") === 0;
  if (isFirstExerciseSelected && !isChildSelected) {
    return <div />;
  }

  const handleBackClick = () => {
    const { parentExercise, index, subExerciseIndex } = selectedExercise;
    if (isFirstChildSelected) {
      // selecting the parent exercise
      const selectedMainExercise = { exercise: parentExercise, index };
      console.log("first child select", selectedMainExercise);
      dispatch(courseActions.updateSelectedExercise(selectedMainExercise));
    } else if (subExerciseIndex) {
      const mainExercise = get(data, `exerciseList[${index}]`);
      const previousSubExerciseIndex = subExerciseIndex - 1;
      const selectedChildExercise =
        mainExercise.childExercises[previousSubExerciseIndex];
      const selectedExerciseInfo = {
        exercise: selectedChildExercise,
        parentExercise: mainExercise,
        index,
        subExerciseIndex: previousSubExerciseIndex,
      };
      dispatch(courseActions.updateSelectedExercise(selectedExerciseInfo));
    } else {
      const previousExerciseIndex = index - 1;
      const previousExercise = get(
        data,
        `exerciseList[${previousExerciseIndex}]`
      );
      let selectedMainExercise = {};
      // if previous exercise has child exercises than we will select the last child exercise to render.
      const childExercises = previousExercise.childExercises || [];
      if (childExercises.length) {
        const lastChildExerciseIndex = childExercises.length - 1;
        selectedMainExercise = {
          exercise: childExercises[lastChildExerciseIndex],
          parentExercise: previousExercise,
          index: previousExerciseIndex,
          subExerciseIndex: lastChildExerciseIndex,
        };
      } else {
        selectedMainExercise = {
          exercise: previousExercise,
          index: previousExerciseIndex,
        };
      }
      dispatch(courseActions.updateSelectedExercise(selectedMainExercise));
    }
  };

  return <Arrow left onClick={handleBackClick} />;
};

export default GoBackArrow;
