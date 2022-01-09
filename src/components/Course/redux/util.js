import get from "lodash/get";
import pick from "lodash/pick";

export const mapCourses = (courses) => {
  // TODO: handle later when we provide functionality of enrolling courses.
  // const {enrolledCourses = [], allCourses = []} = courses
  // const mappedEnrolledCourses = enrolledCourses.map((course) => {
  //   return {
  //     id: course.id,
  //     name: course.name,
  //     logo: course.logo,
  //     description: course.short_description,
  //   }
  // })

  const mappedAllCourses = courses.map((course) => {
    return {
      id: course.id,
      name: course.name,
      logo: course.logo,
      description: course.short_description,
      course_type: course.course_type,
    };
  });

  return {
    // enrolledCourses: mappedEnrolledCourses,
    allCourses: mappedAllCourses,
  };
};

/**
 *
 * @param {Object} contentResponse
 * @param {Object} contentResponse.course.exercises[0] Map exercises in course content
 * typical exercise object from backend.
 * {
 *   content: [{type: "python", value: {,…}},…]
 *   course_id: "116"
 *   github_link: "https://github.com/navgurukul/newton/tree/master/if-else/debugging-part1/debugging-question4.md"
 *   id: "2531"
 *   name: "Question 4    "
 *   parent_exercise_id: "2521"
 *   review_type: "manual"
 *   sequence_num: null
 *   slug: "if-else__debugging-part1/debugging-question4"
 *   solution: null
 *   submission_type: null
 * }
 */
export const mapCourseContent = (contentResponse) => {
  const { exercises = [] } = get(contentResponse, "course", {});
  const exerciseList = exercises.reduce((currentList, exercise) => {
    if (
      exercise.parent_exercise_id &&
      exercise.id !== exercise.parent_exercise_id &&
      exercises.find((p) => p.id === exercise.parent_exercise_id)
    ) {
      // child exercise of some other exercise in list, don't add to list
      return currentList;
    }
    const e = pick(exercise, ["content", "github_link", "id", "name", "slug"]);
    if (typeof e.content === "string") {
      e.content = [{ type: "markdown", value: e.content }];
    }
    if (exercise.parent_exercise_id != null) {
      e.childExercises = exercises.filter(
        (potentialSubEx) => potentialSubEx.parent_exercise_id === exercise.id
      );
    } else {
      e.childExercises = null;
    }
    return currentList.concat(e);
  }, []);
  
  return {
    exerciseList,
  };
};
