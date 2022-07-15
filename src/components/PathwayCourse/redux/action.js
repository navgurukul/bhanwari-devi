export const types = {
  GET_PATHWAY_INTENT: "GET_PATHWAY_INTENT",
  GET_PATHWAY_INTENT_RESOLVED: "GET_PATHWAY_INTENT_RESOLVED",
  GET_PATHWAY_INTENT_REJECTED: "GET_PATHWAY_INTENT_REJECTED",

  GET_PATHWAY_COURSE_INTENT: "GET_PATHWAY_COURSE_INTENT",
  GET_PATHWAY_COURSE_INTENT_RESOLVED: "GET_PATHWAY_COURSE_INTENT_RESOLVED",
  GET_PATHWAY_COURSE_INTENT_REJECTED: "GET_PATHWAY_COURSE_INTENT_REJECTED",

  // GET_UPCOMING_BATCHES_INTENT: "GET_UPCOMING_BATCHES_INTENT",
  // GET_UPCOMING_BATCHES_INTENT_RESOLVED: "GET_UPCOMING_BATCHES_INTENT_RESOLVED",
  // GET_UPCOMING_BATCHES_INTENT_REJECTED: "GET_UPCOMING_BATCHES_INTENT_REJECTED",

  // GET_UPCOMING_ENROLLED_CLASSES_INTENT: "GET_UPCOMING_ENROLLED_CLASSES_INTENT",
  // GET_UPCOMING_ENROLLED_CLASSES_INTENT_RESOLVED:
  //   "GET_UPCOMING_ENROLLED_CLASSES_INTENT_RESOLVED",
  // GET_UPCOMING_ENROLLED_CLASSES_INTENT_REJECTED:
  //   "GET_UPCOMING_ENROLLED_CLASSES_INTENT_REJECTED",
};

export const actions = {
  getPathways(data) {
    return {
      type: types.GET_PATHWAY_INTENT,
      data,
    };
  },
  getPathwaysResolved(data) {
    return {
      type: types.GET_PATHWAY_INTENT_RESOLVED,
      data,
    };
  },
  getPathwaysRejected(error) {
    return {
      type: types.GET_PATHWAY_INTENT_REJECTED,
      error,
    };
  },

  getPathwaysCourse(data) {
    return {
      type: types.GET_PATHWAY_COURSE_INTENT,
      data,
    };
  },
  getPathwaysCourseResolved(data) {
    return {
      type: types.GET_PATHWAY_COURSE_INTENT_RESOLVED,
      data,
    };
  },
  getPathwaysCourseRejected(error) {
    return {
      type: types.GET_PATHWAY_COURSE_INTENT_REJECTED,
      error,
    };
  },

  // getUpcomingBatches(data) {
  //   return {
  //     type: types.GET_UPCOMING_BATCHES_INTENT,
  //     data,
  //   };
  // },
  // getUpcomingBatchesResolved(data) {
  //   return {
  //     type: types.GET_UPCOMING_BATCHES_INTENT_RESOLVED,
  //     data,
  //   };
  // },
  // getUpcomingBatchesRejected(error) {
  //   return {
  //     type: types.GET_UPCOMING_BATCHES_INTENT_REJECTED,
  //     error,
  //   };
  // },

  // getupcomingEnrolledClasses(data) {
  //   return {
  //     type: types.GET_UPCOMING_ENROLLED_CLASSES_INTENT,
  //     data,
  //   };
  // },
  // getupcomingEnrolledClassesResolved(data) {
  //   return {
  //     type: types.GET_UPCOMING_ENROLLED_CLASSES_INTENT_RESOLVED,
  //     data,
  //   };
  // },
  // getupcomingEnrolledClassesRejected(error) {
  //   return {
  //     type: types.GET_UPCOMING_ENROLLED_CLASSES_INTENT_REJECTED,
  //     error,
  //   };
  // },
};
