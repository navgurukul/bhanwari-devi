import React from "react";

import CourseComponent from "../../components/Course";
import ContinueExercise from "../../components/Course/ContinueExercise";
import "./styles.scss";

function Course() {
  return (
    <div className="ng-course-container">
      <h2>Hello, There</h2>
      <ContinueExercise />
      <CourseComponent />
    </div>
  );
}

export default Course;
