import React from "react";

import "./styles.scss";

let storedExerciseUrl = window.localStorage.getItem("lastExerciseUrl");
const storedExerciseName = window.localStorage.getItem("exerciseName");

function ContinueExercise() {
  const [showExercise, setShowExercise] = React.useState(true);
  const handleClose = () => setShowExercise(false);

  if (!storedExerciseUrl && storedExerciseName) return null;

  return (
    <div>
      {showExercise ? (
        <div className="stored-exercise-card">
          <div className="container">
            <i className="zmdi zmdi-close close" onClick={handleClose}></i>
            <a href={storedExerciseUrl}>{storedExerciseName}</a>
            <h3> last-exercise do you want to continue? </h3>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ContinueExercise;
