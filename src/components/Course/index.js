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
import axios from "axios";
import { METHODS } from "../../services/api";

function Course() {
  const dispatch = useDispatch();
  const { loading, data } = useSelector(({ Course }) => Course);
  const query = new URLSearchParams(useLocation().search).get("search");
  const [search, setSearch] = useState(query ? query : "");
  const history = useHistory();
  const user = useSelector(({ User }) => User);
  const [pathwaysCourses, setPathwaysCourses] = useState([]);

  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, [dispatch]);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways?courseType=json`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      console.log("res", res.data.pathways);
      setPathwaysCourses(res.data.pathways);
    });
  }, []);

  if (loading) {
    return <Loader pageLoader={true} />;
  }

  const handleSearchChange = (e) => {
    history.push(`?search=${e.target.value}`);
    e.preventDefault();
    setSearch(e.target.value);
  };

  let dataJSON;
  let filteredCourse;
  if (data) {
    dataJSON = data.allCourses.filter((c) => {
      return c.course_type === "json";
    });
    dataJSON.allCourses = dataJSON;
    filteredCourse = dataJSON.allCourses.filter((names) => {
      if (names.course_type === "json") {
        return names.name.toLowerCase().includes(search.toLowerCase());
      }
    });
  }

  const pathwayCourseId = [];
  pathwaysCourses.filter((pathway) => {
    pathway.courses.filter((course) => {
      pathwayCourseId.push(course.id);
      return course.id;
    });
  });

  let otherCourses =
    filteredCourse &&
    filteredCourse.filter((item) => !pathwayCourseId.includes(item.id));

  return (
    <div>
      <SearchBox onChange={handleSearchChange} value={search} />
      <ContinueExercise />
      {/* {search.length > 0 ? (
        <h1 className="ng-course">
          <CourseList
            list={filteredCourse}
            title="Aap inn courses ko search kiya hai"
          />
        </h1>
      ) : (
        <h1 className="ng-course">
          <CourseList
            list={get(dataJSON, "enrolledCourses")}
            title="Aap in courses mein enrolled hai"
          />
          <CourseList
            list={get(dataJSON, "allCourses")}
            title="Aap yeh courses mein enroll kar sakte hai"
          />
        </h1>
      )} */}
      <h1 className="ng-course">
        <CourseList
          list={pathwaysCourses}
          otherCourses={otherCourses}
          title="Aap inn courses ko search kiya hai"
        />
      </h1>
    </div>
  );
}

export default Course;
