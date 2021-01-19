import React from "react";

import "./styles.scss";

let storedExercise = window.localStorage.getItem("last-exercise");

function ContinueExercise() {
  return (
    <div className="stored-exercise-card">
      <div className="container">
        <a href={storedExercise}> Last-Exercise Do you want to Continue.? → </a>
      </div>
    </div>
  );
}

export default ContinueExercise;
