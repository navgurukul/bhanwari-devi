import React from "react";
import "./styles.scss";

let storedExerciseUrl = window.localStorage.getItem("lastExerciseUrl");
const storedExerciseName = window.localStorage.getItem("exerciseName");

function ContinueExercise() {
  if (!(storedExerciseUrl && storedExerciseName)) return null;

  return (
    <div className="stored-exercise">
      <h2>Hello, There</h2>
      Continue where you left off..
      <span>
        <a className="exercise-url" href={storedExerciseUrl}>
          {storedExerciseName}
        </a>
      </span>
    </div>
  );
}

export default ContinueExercise;
