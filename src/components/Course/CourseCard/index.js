import React from "react";
import PropTypes from "prop-types";

import { PATHS } from "../../../constant.js";
import { COURSE_CARD_COLORS } from "../constant";
import "./styles.scss";

function CourseCard(props) {
  const { course, index } = props;

  const randomBackgroundColor = COURSE_CARD_COLORS[index % 7];
  return (
    <a
      className="ng-course-card"
      href={`${PATHS.COURSE}/${course.id}?name=${course.name}`}
      key={index}
    >
      <div
        className="upper-section"
        style={{ background: randomBackgroundColor }}
      >
        <img src={course.logo} alt={""} className="logo" />
      </div>
      <div className="bottom-section">
        <div className="title">{course.name}</div>
      </div>
    </a>
  );
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseCard;
