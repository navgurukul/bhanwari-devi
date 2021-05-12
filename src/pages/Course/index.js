import React from "react";
import { useSelector } from "react-redux";

import CourseComponent from "../../components/Course";
import ContinueExercise from "../../components/Course/ContinueExercise";
import GithubPack from "../GitHubPack/index";
import "./styles.scss";

function Course() {
  const user = useSelector(({ User }) => (User.data ? User.data.user : null));
  return (
    <div className="ng-course-container">
      <h2>Hello, There</h2>
      <ContinueExercise />
      {user ? <GithubPack userEmail={user.email} /> : null}
      <CourseComponent />
    </div>
  );
}

export default Course;
