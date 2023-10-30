import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actions as pathwayActions } from "../../PathwayCourse/redux/action";
import { useDispatch } from "react-redux";
import CourseCompletionPage from "./CourseCompletionPage";
import LastCoursePage from "./LastCoursePage";
import axios from "axios";
import { METHODS } from "../../../services/api";

function CompletionComponent({ setSuccessfulExerciseCompletion }) {
  const params = useParams();
  const courseID = params.courseId;
  const user = useSelector(({ User }) => User);
  const [pathway, setPathway] = useState([]);

  const dispatch = useDispatch();

  const pathwayCourses = useSelector(
    (state) => state?.Pathways?.pathwayCourse?.data?.courses
  );
  const [nextPathwayIndex, setNextPathwayIndex] = React.useState();
  const [pathwayModuleIndex, setPathwayModuleIndex] = useState();
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

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/c4ca`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token,
      },
    })
      .then((response) => {
        setPathway(response?.data);
      })
      .catch((err) => {});
  }, [setPathway]);

  const filterCourses = pathway?.modules?.filter((item) => {
    return item.courses.length > 0;
  });

  const pathwayModule = filterCourses?.flatMap((item) => item.courses) || [];

  useEffect(() => {
    const currentIndex = pathwayModule?.findIndex(
      (course) => course.id == courseID
    );
    if (currentIndex !== -1) {
      console.log("currentIndex", pathwayModule[currentIndex]);
      if (pathwayModule[currentIndex].completed_portion === 100) {
        setPathwayModuleIndex(currentIndex + 1);
        console.log("currentIndex", currentIndex);
      }
    }
  }, [pathwayModule]);

  const C4CALastPage = pathwayModule.some((item) => item.id == courseID);
  console.log("C4CALastPage", C4CALastPage);

  const courseComplete = !C4CALastPage
    ? pathwayCourses && pathwayCourses[nextPathwayIndex]
    : pathwayModule && pathwayModule[pathwayModuleIndex];

  return (
    <div>
      {courseComplete ? (
        <CourseCompletionPage
          data={pathwayCourses}
          nextPathwayIndex={nextPathwayIndex}
          setSuccessfulExerciseCompletion={setSuccessfulExerciseCompletion}
          pathwayModule={pathwayModule}
          pathwayModuleIndex={pathwayModuleIndex}
          courseID={courseID}
          C4CALastPage={C4CALastPage}
        />
      ) : (
        <LastCoursePage
          pathwayModule={pathwayModule}
          courseID={courseID}
          C4CALastPage={C4CALastPage}
        />
      )}
    </div>
  );
}

export default CompletionComponent;
