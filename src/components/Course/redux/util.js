import get from "lodash/get";

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
  const exerciseList = exercises.map((exercise) => {
    let childExercises = null;
    if (exercise.childExercises) {
      childExercises = exercise.childExercises.map((childExercise) => {
        if (typeof childExercise.content === "string") {
          childExercise.content = [
            { type: "markdown", value: exercise.content },
          ];
        }
        return {
          content: childExercise.content,
          githubLink: childExercise.github_link,
          id: childExercise.id,
          name: childExercise.name,
          slug: childExercise.slug,
        };
      });
    }
    if (typeof exercise.content === "string") {
      exercise.content = [{ type: "markdown", value: exercise.content }];
    }
    return {
      content: exercise.content,
      githubLink: exercise.github_link,
      id: exercise.id,
      name: exercise.name,
      slug: exercise.slug,
      childExercises: childExercises,
    };
  });

  return {
    exerciseList,
  };
};
