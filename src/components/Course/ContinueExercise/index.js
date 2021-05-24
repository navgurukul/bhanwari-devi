import React from "react";
import "./styles.scss";

let storedExerciseUrl = window.localStorage.getItem("lastExerciseUrl");
const storedExerciseName = window.localStorage.getItem("exerciseName");

function ContinueExercise() {
  return storedExerciseUrl && storedExerciseName ? (
    <div className="stored-exercise">
      <span>
        Continue where you left off..
        <a className="exercise-url" href={storedExerciseUrl}>
          {storedExerciseName}
        </a>
      </span>
    </div>
  ) : null;
}

// }

export default ContinueExercise;
