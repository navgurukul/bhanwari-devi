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

  const pathwayCourses = useSelector(
    (state) => state?.Pathways?.pathwayCourse?.data?.courses
  );
  const [nextPathwayIndex, setNextPathwayIndex] = React.useState();
  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: params.pathwayId }));
  }, [dispatch, params.pathwayId]);

  useEffect(() => {
    const currentIndex = pathwayCourses?.findIndex(
      (course) => course.id == courseID
    );
    if (currentIndex !== -1) {
      setNextPathwayIndex(currentIndex + 1);
    }
  }, [pathwayCourses]);

  return (
    <div>
      {pathwayCourses && pathwayCourses[nextPathwayIndex] ? (
        <CourseCompletionPage
          data={pathwayCourses}
          nextPathwayIndex={nextPathwayIndex}
          setSuccessfulExerciseCompletion={setSuccessfulExerciseCompletion}
        />
      ) : (
        <LastCoursePage />
      )}
    </div>
  );
}

export default CompletionComponent;
