export const types = {
  GET_CLASSES_INTENT: "GET_CLASSES_INTENT",
  GET_CLASSES_INTENT_RESOLVED: "GET_CLASSES_INTENT_RESOLVED",
  GET_CLASSES_INTENT_REJECTED: "GET_CLASSES_INTENT_REJECTED",
};

export const actions = {
  getClasses(data) {
    return {
      type: types.GET_CLASSES_INTENT,
      data,
    };
  },
  getClassesResolved(data) {
    return {
      type: types.GET_CLASSES_INTENT_RESOLVED,
      data,
    };
  },
  getClassesRejected(error) {
    return {
      type: types.GET_CLASSES_INTENT_REJECTED,
      error,
    };
  },
};
