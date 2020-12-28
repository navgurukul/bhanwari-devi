import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash/get";

import { actions as courseActions } from "./redux/action";
import CourseList from "./CourseList";
import SearchBox from "../common/SearchBox";
import Loader from "../common/Loader";
import "./styles.scss";

function Course() {
  const dispatch = useDispatch();
  const { loading, data } = useSelector(({ Course }) => Course);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, [dispatch]);

  if (loading) {
    return <Loader pageLoader={true} />;
  }

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  let filteredCourse;
  if (data) {
    filteredCourse = data.allCourses.filter((names) => {
      return names.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  return (
    <div>
      <SearchBox onChange={handleSearchChange} value={search} />
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
            title="Aap yeh courses mein enroll kar skte hai"
          />
        </h1>
      )}
    </div>
  );
}

export default Course;
