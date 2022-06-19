import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actions as pathwayActions } from "../../PathwayCourse/redux/action";
import { useDispatch } from "react-redux";
import CourseCompletionPage from "./CourseCompletionPage";
import LastCoursePage from "./LastCoursePage";
function CompletionComponent({ setSuccessfulExerciseCompletion }) {
  const params = useParams();
  const courseID = params.courseId;

  const dispatch = useDispatch();

  const pathwayCourse = useSelector(
    (state) => state?.Pathways?.pathwayCourse?.data?.courses
  );
  const [nextPathwayIndex, setNextPathwayIndex] = React.useState();
  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: params.pathwayId }));
  }, [dispatch, params.pathwayId]);

  useEffect(() => {
    var index = pathwayCourse?.forEach((element, i) => {
      if (element.id == courseID) {
        setNextPathwayIndex(i + 1);
        return i + 1;
      }
    });
  }, [pathwayCourse]);

  return (
    <>
      {pathwayCourse && pathwayCourse[nextPathwayIndex] ? (
        <CourseCompletionPage
          data={pathwayCourse}
          nextPathwayIndex={nextPathwayIndex}
          setSuccessfulExerciseCompletion={setSuccessfulExerciseCompletion}
        />
      ) : (
        <LastCoursePage />
      )}
    </>
  );
}

export default CompletionComponent;
