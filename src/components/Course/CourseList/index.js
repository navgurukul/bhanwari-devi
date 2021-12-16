// import React from "react";
// import PropTypes from "prop-types";

// import CourseCard from "../CourseCard";
// import "./styles.scss";

// const CourseList = ({ list, title }) => {
//   console.log("list", list);
//   if (list && list.length) {
//     return (
//       <div className="ng-course-list">
//         <h2>{title}</h2>
//         <div className="cards">
//           {list.map((course, index) => {
// console.log("my course", course);
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
  console.log("list", list);
  if (list && list.length) {
    return (
      <div>
        <h2 className="class-title">{title}</h2>
        <div className="cards">
          {list.map((pathway, index) => (
            <>
              <div className="ng-course-list">
                <h3>{pathway.name}</h3>
                <div className="cards">
                  {pathway.courses.map((course, index) => {
                    console.log("course", course.name);
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
          ))}
          <div className="ng-course-list">
            <h3>Miscellaneous Courses</h3>
            <div className="cards">
              {otherCourses.map((course, index) => {
                console.log("my course", course);
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
