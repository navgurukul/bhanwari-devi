import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash/get";
import { useLocation } from "react-router-dom";

import { actions as courseActions } from "./redux/action";
import CourseList from "./CourseList";
import SearchBox from "../common/SearchBox";
import Loader from "../common/Loader";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import ContinueExercise from "../Course/ContinueExercise";

function Course() {
  const dispatch = useDispatch();
  const { loading, data } = useSelector(({ Course }) => Course);
  const query = new URLSearchParams(useLocation().search).get("search");
  const [search, setSearch] = useState(query ? query : "");
  const history = useHistory();

  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, [dispatch]);

  if (loading) {
    return <Loader pageLoader={true} />;
  }

  const handleSearchChange = (e) => {
    history.push(`?search=${e.target.value}`);
    e.preventDefault();
    setSearch(e.target.value);
  };

  let filteredCourse;
  if (data) {
    filteredCourse = data.allCourses.filter((names) => {
      if (names.course_type === null) {
        return names.name.toLowerCase().includes(search.toLowerCase());
      }
    });
  }

  return (
    <div>
      <SearchBox onChange={handleSearchChange} value={search} />
      <ContinueExercise />
      {search.length > 0 ? (
        <h1 className="ng-course">
          <CourseList
            list={filteredCourse}
            title="Aap inn courses ko search kiya hai"
          />
        </h1>
      ) : (
        <h1 className="ng-course">
          <CourseList
            list={get(data, "enrolledCourses")}
            title="Aap in courses mein enrolled hai"
          />
          <CourseList
            list={get(data, "allCourses")}
            title="Aap yeh courses mein enroll kar sakte hai"
          />
        </h1>
      )}
    </div>
  );
}

export default Course;
