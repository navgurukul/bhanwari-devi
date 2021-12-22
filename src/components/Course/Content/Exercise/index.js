import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import { actions as courseActions } from "../.././redux/action";
import { useLocation } from "react-router-dom";
import ExerciseContent from "../ExerciseContent";

const EditOnGithub = (props) => {
  return (
    <a
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      className="github-link"
    >
      Edit on Github
    </a>
  );
};

const CourseName = (props) => {
  const id = useLocation().pathname.split("/");

  return (
    <div>
      {props.data &&
        props.data.allCourses.map((course, index) => {
          return (
            <div key={index}>
              {id[2] == course.id && <h2>Course - {course.name}</h2>}
            </div>
          );
        })}
    </div>
  );
};

const Exercise = (props) => {
  // const [flag, setFlag] = useState(true);
  const { selectedExercise } = props;
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const { data } = useSelector(({ Course }) => Course);
  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, [dispatch]);

  return (
    <>
      {/* <span class="tooltip" title="Edit Content">
        <i
          class="fa fa-pencil"
          onClick={(e) => {
            setFlag(!flag);
          }}
        ></i>
      </span> */}

      <div align="center">
        <CourseName data={data} />
        <h2>{get(selectedExercise, "exercise.name")}</h2>
        <ExerciseContent
          // flag={flag}
          content={get(selectedExercise, "exercise.content")}
        />
      </div>
      <EditOnGithub link={`${get(selectedExercise, "exercise.githubLink")}`} />
    </>
  );
};

export default Exercise;
