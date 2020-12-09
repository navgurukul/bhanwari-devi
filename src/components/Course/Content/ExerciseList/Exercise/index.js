import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import CollapseArrow from "./CollapseArrow";
import "./styles.scss";

//TODO: move to independent file
const ExerciseLogo = ({ selected }) => {
  return (
    <div className="logo">
      <svg
        className={selected ? "selected" : ""}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="presentation"
      >
        <g>
          <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path>
        </g>
      </svg>
    </div>
  );
};

const SubExerciseLogo = ({ selected }) => {
  return (
    <div className="logo child-exercise-logo">
      <svg
        className={selected ? "selected" : ""}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="presentation"
      >
        <g>
          <path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"></path>
        </g>
      </svg>
    </div>
  );
};

//TODO: move to independent component file
const ExerciseTitle = (props) => {
  const { isChildExercise, selected, exercise } = props;

  return (
    <div
      className={`content ${isChildExercise && "child-exercise"}`}
      onClick={props.onClick}
    >
      {isChildExercise ? (
        <SubExerciseLogo selected={selected} />
      ) : (
        <ExerciseLogo selected={selected} />
      )}
      <div className="title">{exercise.name}</div>
    </div>
  );
};

function Exercise(props) {
  const { exercise, selectedExercise, index, onClick } = props;
  const haveChildExercises = exercise.childExercises;
  const selected = selectedExercise.index === index;
  // here by kids, we mean subexercises
  const isSelectedAndHaveKids = selected && haveChildExercises;
  const [showChildExercise, setShowChildExercise] = useState(
    isSelectedAndHaveKids
  );

  useEffect(() => {
    setShowChildExercise(isSelectedAndHaveKids);
  }, [isSelectedAndHaveKids]);

  const handleExerciseClick = (index, subExerciseIndex) => {
    if (onClick) {
      onClick({ index, subExerciseIndex: subExerciseIndex });
    }
  };

  const handleMainExerciseClick = () => {
    handleExerciseClick(index);
    if (haveChildExercises) {
      setShowChildExercise(!showChildExercise);
    }
  };

  const containerClasses =
    selected && !haveChildExercises ? "ng-exercise-selected" : "";
  return (
    <div
      className={`ng-exercise  ${containerClasses} ${
        showChildExercise && "ng-exercise-child"
      }`}
      key={index}
    >
      <ExerciseTitle
        selected={selected}
        exercise={exercise}
        onClick={handleMainExerciseClick}
      />
      <CollapseArrow
        haveChildExercises={haveChildExercises}
        onClick={() => setShowChildExercise(!showChildExercise)}
        showChildExercise={showChildExercise}
      />
      {showChildExercise &&
        exercise.childExercises.map((childExercise, subExerciseIndex) => {
          return (
            <ExerciseTitle
              isChildExercise={haveChildExercises}
              exercise={childExercise}
              selected={subExerciseIndex === selectedExercise.subExerciseIndex}
              onClick={() => handleExerciseClick(index, subExerciseIndex)}
              key={subExerciseIndex}
            />
          );
        })}
    </div>
  );
}

Exercise.propTypes = {
  exercise: PropTypes.object.isRequired,
};

export default Exercise;
