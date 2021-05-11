import React from "react";
import "./styles.scss";
import GitHubStudy from "../../../pages/GitHubPack/index";

let storedExerciseUrl = window.localStorage.getItem("lastExerciseUrl");
const storedExerciseName = window.localStorage.getItem("exerciseName");

function ContinueExercise() {
  if (!(storedExerciseUrl && storedExerciseName)) return null;

  return (
    <div className="stored-exercise">
      <span>
        Continue where you left off..
        <a className="exercise-url" href={storedExerciseUrl}>
          {storedExerciseName}
        </a>
      </span>
      <GitHubStudy sty={"exercise-url"} />
    </div>
  );
}

export default ContinueExercise;
