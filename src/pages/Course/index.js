import React from "react";

import CourseComponent from "../../components/Course";
import "./styles.scss";

function Course() {
  return (
    <div className="layout">
      <div className="ng-course-container">
        <CourseComponent />
      </div>
    </div>
  );
}

export default Course;
