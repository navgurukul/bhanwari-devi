// import React from "react";
// import PropTypes from "prop-types";

// import CourseCard from "../CourseCard";
// import "./styles.scss";

// const CourseList = ({ list, title }) => {
//   if (list && list.length) {
//     return (
//       <div className="ng-course-list">
//         <h2>{title}</h2>
//         <div className="cards">
//           {list.map((course, index) => {
// return (
//   <CourseCard
//     key={`${course.id}-${index}`}
//     course={course}
//     index={index}
//   />
// );
//           })}
//         </div>
//       </div>
//     );
//   }
//   return "";
// };

// CourseList.propTypes = {
//   list: PropTypes.array,
//   title: PropTypes.string.isRequired,
// };

// export default CourseList;

import React from "react";
import PropTypes from "prop-types";

import CourseCard from "../CourseCard";
import "./styles.scss";

const CourseList = ({ list, otherCourses, title }) => {
  if (list && list.length) {
    return (
      <div>
        <h2 className="class-title">{title}</h2>
        <div className="cards">
          {list.map((pathway, index) => {
            if (pathway.courses.length == 0) return null;
            return (
              <>
                <div className="ng-course-list">
                  <h3>{pathway.name}</h3>
                  <div className="cards">
                    {pathway.courses.map((course, index) => {
                      return (
                        <>
                          <CourseCard
                            key={`${course.id}-${index}`}
                            course={course}
                            index={index}
                          />
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
          {otherCourses.length > 0 ? (
            <div className="ng-course-list">
              <h3>Miscellaneous Courses</h3>
              <div className="cards">
                {otherCourses.map((course, index) => {
                  return (
                    <CourseCard
                      key={`${course.id}-${index}`}
                      course={course}
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
  return "";
};

CourseList.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default CourseList;
