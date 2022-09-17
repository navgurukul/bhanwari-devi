import React, { useEffect, useState } from "react";
import { METHODS } from "../../../services/api";
import { useSelector } from "react-redux";
import { PATHS, interpolatePath, versionCode } from "../../../constant";
import axios from "axios";
import { useParams } from "react-router-dom";

function ContentEdit() {
  const user = useSelector(({ User }) => User);
  const params = useParams();
  const [course, setCourse] = useState([]);

  const courseId = params.courseId;
  const exerciseId = params.exerciseId;

  console.log("params", params);

  let name = "name";

  useEffect(() => {
    // setExerciseId(parseInt(params.exerciseId));
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user.data?.token || "",
      },
    })
      .then((res) => {
        console.log("res", res);
        setCourse(res.data.course.exercises[exerciseId].content);
        // setAvailableLang(res.data.course.lang_available);
      })
      .catch((err) => {
        console.log("error");
      });
  }, [courseId, exerciseId]);

  console.log("course", course);

  return (
    <>
      <input
        value={course && course[0]?.value}
        style={{ width: "500px", height: "30px" }}
      />
      <br />
      <br />
      {course &&
        course[1]?.value.map((item) => {
          console.log("item", item);
          return (
            <>
              <br />
              <br />
              <input
                value={item.value}
                style={{ width: "500px", height: "30px" }}
              />
            </>
          );
        })}
      {/* <input
        value={course && course[1]?.value[0]?.value}
        style={{ width: "500px", height: "30px" }}
      />
      <br />
      <br />
      <input
        value={course && course[1]?.value[1]?.value}
        style={{ width: "500px", height: "30px" }}
      />
      <br />
      <br />
      <input
        value={course && course[1]?.value[2]?.value}
        style={{ width: "500px", height: "30px" }}
      />
      <br />
      <br />
      <input
        value={course && course[1]?.value[3]?.value}
        style={{ width: "500px", height: "30px" }}
      />
      <br />
      <br />
      <h5>{course && course[2]?.component}</h5> */}
      {/* <br />
      <input
        value={course && course[2]?.value}
        style={{ width: "500px", height: "30px" }}
      /> */}
      <br />
      <br />
      <h5>Explanation</h5>
      <br />
      <h5>Correct</h5>
      {course &&
        course[3]?.value?.correct.map((item) => {
          return (
            <>
              <br />
              <br />
              <input
                value={item.value}
                style={{ width: "500px", height: "30px" }}
              />
            </>
          );
        })}
      <br />
      <h5>Incorrect</h5>
      {course &&
        course[3]?.value?.incorrect.map((item) => {
          return (
            <>
              <br />
              <br />
              <input
                value={item.value}
                style={{ width: "500px", height: "30px" }}
              />
            </>
          );
        })}
      <br />
      <br />
      <button>Submit</button>
    </>
  );
}

export default ContentEdit;
