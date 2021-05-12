import React from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import GitHubStudy from "../../../pages/GitHubPack/index";

let storedExerciseUrl = window.localStorage.getItem("lastExerciseUrl");
const storedExerciseName = window.localStorage.getItem("exerciseName");

function ContinueExercise() {
  const user = useSelector(({ User }) => User.data.user);
  const splitEmail = user.email.split("@");
  let gitHubStudy = null;

  if (splitEmail[1] === "navgurukul.org") {
    gitHubStudy = <GitHubStudy sty={"exercise-url"} userEmail={user.email} />;
  }
  if (!(storedExerciseUrl && storedExerciseName)) return null;

  return (
    <div className="stored-exercise">
      <span>
        Continue where you left off..
        <a className="exercise-url" href={storedExerciseUrl}>
          {storedExerciseName}
        </a>
      </span>
      {gitHubStudy}
    </div>
  );
}

export default ContinueExercise;
