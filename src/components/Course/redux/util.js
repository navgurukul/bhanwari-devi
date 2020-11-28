import get from 'lodash/get'

export const mapCourses = (courses) => {
  const enrolledCourses = courses.enrolledCourses.map((course) => {
    return {
      id: course.id,
      name: course.name,
      logo: course.logo,
      description: course.short_description,
    }
  })

  const allCourses  = courses.allCourses.map((course) => {
    return {
      id: course.id,
      name: course.name,
      logo: course.logo,
      description: course.short_description,
    }
  })

  return {
    enrolledCourses,
    allCourses
  }
} 

/**
 * 
 * @param {*} contentResponse 
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
  const { exercises = [] } = get(contentResponse, 'course', {})
  const exerciseList = exercises.map((exercise) => {
    return {
      content: exercise.content,
      githubLink: exercise.github_link,
      id: exercise.id,
      name: exercise.name,
      slug: exercise.slug,
    }
  } )
  return {
    exerciseList
  }
}


/**
 * 
 * @param {*} exerciseResponse 
 */
export const mapExerciseContent = (exerciseeResponse) => {
 return exerciseeResponse
}
