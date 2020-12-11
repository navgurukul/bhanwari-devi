export const types = {
  GET_COURSES_INTENT: "GET_COURSES_INTENT",
  GET_COURSES_INTENT_RESOLVED: "GET_COURSES_INTENT_RESOLVED",
  GET_COURSES_INTENT_REJECTED: "GET_COURSES_INTENT_REJECTED",

  GET_COURSE_CONTENT_INTENT: "GET_COURSE_CONTENT_INTENT",
  GET_COURSE_CONTENT_INTENT_RESOLVED: "GET_COURSE_CONTENT_INTENT_RESOLVED",
  GET_COURSE_CONTENT_INTENT_REJECTED: "GET_COURSE_CONTENT_INTENT_REJECTED",

  UPDATE_SELECTED_EXERCISE: "UPDATE_SELECTED_EXERCISE",
};

export const actions = {
  getCourses(data) {
    return {
      type: types.GET_COURSES_INTENT,
      data,
    };
  },
  getCoursesResolved(data) {
    return {
      type: types.GET_COURSES_INTENT_RESOLVED,
      data,
    };
  },
  getCoursesRejected(error) {
    return {
      type: types.GET_COURSES_INTENT_REJECTED,
      error,
    };
  },

  getCourseContent(data) {
    return {
      type: types.GET_COURSE_CONTENT_INTENT,
      data,
    };
  },
  getCourseContentResolved(data) {
    return {
      type: types.GET_COURSE_CONTENT_INTENT_RESOLVED,
      data,
    };
  },
  getCourseContentRejected(error) {
    return {
      type: types.GET_COURSE_CONTENT_INTENT_REJECTED,
      error,
    };
  },

  /**
   *
   * @param {Object} data
   * @param {Object} data.exercise selected exercise which contain we are suppose to render
   * @param {Object} data.parentExercise if child exercise selected, keeping a reference on parent exercise
   * @param {Object} data.index Keeping a reference of selected main exericse index.
   * @param {Object} data.subExerciseIndex if currently child exercise has been clicked, rendered.
   * Keeping the reference of it's index
   */
  updateSelectedExercise(data) {
    return {
      type: types.UPDATE_SELECTED_EXERCISE,
      data,
    };
  },
};
