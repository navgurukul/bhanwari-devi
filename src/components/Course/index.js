import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash/get";

import { actions as courseActions } from "./redux/action";
import CourseList from "./CourseList";
import Loader from "../common/Loader";
import "./styles.scss";

function Course() {
  const dispatch = useDispatch();
  const { loading, data } = useSelector(({ Course }) => Course);

  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, [dispatch]);

  if (loading) {
    return <Loader pageLoader={true} />;
  }

  return (
    <div className="ng-course">
      <CourseList
        list={get(data, "enrolledCourses")}
        title="Aap in courses mein enrolled hai"
      />
      <CourseList
        list={get(data, "allCourses")}
        title="Aap yeh courses mein enroll kar skte hai"
      />
    </div>
  );
}

export default Course;
