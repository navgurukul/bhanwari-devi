import React from "react";

import "./styles.scss";

let storedExercise = window.localStorage.getItem("last-exercise");
const storedExerciseName = window.localStorage.getItem("exerciseName");

function ContinueExercise() {
  const [show, setShow] = React.useState(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      {show ? (
        <div className="stored-exercise-card">
          <div className="container">
            <i className="zmdi zmdi-close close" onClick={handleClose}></i>
            <a href={storedExercise}>{storedExerciseName}</a>
            <h3> Last-Exercise Do you want to Continue ? </h3>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ContinueExercise;
