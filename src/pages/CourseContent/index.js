import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash/get";

import { actions as courseActions } from "../../components/Course/redux/action";
import ExerciseContent from "../../components/Course/Content/ExerciseContent";
import GoForwardArrow from "../../components/Course/Content/GoForwardArrow";
import ExerciseList from "../../components/Course/Content/ExerciseList";
import GoBackArrow from "../../components/Course/Content/GoBackArrow";
import Loader from "../../components/common/Loader";
import "./styles.scss";

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

function CourseContent(props) {
  const dispatch = useDispatch();
  const {
    courseContent: { loading, data },
    selectedExercise,
  } = useSelector(({ Course }) => Course);

  // get the course id, and pass it in the component.
  const courseName = get(props, "location.search");
  const params = new URLSearchParams(courseName);
  const courseTitle = params.get("name");

  const courseId = get(props, "match.params.courseId");

  useEffect(() => {
    dispatch(courseActions.getCourseContent({ courseId: courseId }));
  }, [dispatch, courseId]);

  useEffect(() => {
    const firstExercise = get(data, "exerciseList[0]");
    if (firstExercise) {
      const selectedExerciseInfo = { exercise: firstExercise, index: 0 };
      dispatch(courseActions.updateSelectedExercise(selectedExerciseInfo));
    }
  }, [dispatch, data]);

  if (loading) {
    return <Loader pageLoader={true} />;
  }

  return (
    <div className="ng-course-content">
      <div className="content">
        <h1>{courseTitle}</h1>
        <h2>{get(selectedExercise, "exercise.name")}</h2>
        <ExerciseContent content={get(selectedExercise, "exercise.content")} />
        <EditOnGithub
          link={`${get(selectedExercise, "exercise.githubLink")}`}
        />
        <div className="arrow-row">
          <GoBackArrow />
          <GoForwardArrow />
        </div>
      </div>
      <ExerciseList list={get(data, "exerciseList")} />
    </div>
  );
}

export default CourseContent;
