export const types = {
  GET_COURSES_INTENT: 'GET_COURSES_INTENT',
  GET_COURSES_INTENT_RESOLVED: 'GET_COURSES_INTENT_RESOLVED',
  GET_COURSES_INTENT_REJECTED: 'GET_COURSES_INTENT_RESOLVED'
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
}
