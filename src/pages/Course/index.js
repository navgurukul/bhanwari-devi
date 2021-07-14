import React from "react";

import CourseComponent from "../../components/Course";
import Footer from "../../components/Footer";
import "./styles.scss";

function Course() {
  return (
    <div className="layout">
      <div className="ng-course-container">
        <CourseComponent />
      </div>
      <Footer />
    </div>
  );
}

export default Course;
