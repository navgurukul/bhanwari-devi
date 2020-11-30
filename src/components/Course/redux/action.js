export const types = {
  GET_COURSES_INTENT: 'GET_COURSES_INTENT',
  GET_COURSES_INTENT_RESOLVED: 'GET_COURSES_INTENT_RESOLVED',
  GET_COURSES_INTENT_REJECTED: 'GET_COURSES_INTENT_REJECTED',

  GET_COURSE_CONTENT_INTENT: 'GET_COURSE_CONTENT_INTENT',
  GET_COURSE_CONTENT_INTENT_RESOLVED: 'GET_COURSE_CONTENT_INTENT_RESOLVED',
  GET_COURSE_CONTENT_INTENT_REJECTED: 'GET_COURSE_CONTENT_INTENT_REJECTED',
}

export const actions = {
  getCourses(data) {
    return {
      type: types.GET_COURSES_INTENT,
      data,
    }
  },
  getCoursesResolved(data) {
    return {
      type: types.GET_COURSES_INTENT_RESOLVED,
      data,
    }
  },
  getCoursesRejected(error) {
    return {
      type: types.GET_COURSES_INTENT_REJECTED,
      error,
    }
  },

  getCourseContent(data) {
    return {
      type: types.GET_COURSE_CONTENT_INTENT,
      data,
    }
  },
  getCourseContentResolved(data) {
    return {
      type: types.GET_COURSE_CONTENT_INTENT_RESOLVED,
      data,
    }
  },
  getCourseContentRejected(error) {
    return {
      type: types.GET_COURSE_CONTENT_INTENT_REJECTED,
      error,
    }
  },

}
