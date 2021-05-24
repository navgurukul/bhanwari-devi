import React, { useEffect, useState } from "react";
import { getPathways } from "./utils";
import CourseList from "../../components/Course/CourseList";

const Pathways = () => {
  const [pathways, setPathways] = useState(null);

  useEffect(() => {
    getPathways().then((res) => setPathways(res.data));
  }, []);

  const renderCourses = (paths) => {
    return paths.map((p, i) => (
      <CourseList key={i} list={p["courses"]} title={p["name"]} />
    ));
  };

  return (
    <>
      {pathways ? (
        renderCourses(pathways["pathways"])
      ) : (
        <span>Loading ...</span>
      )}
    </>
  );
};

export default Pathways;
