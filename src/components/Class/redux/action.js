export const types = {
  GET_CLASSES_INTENT: "GET_CLASSES_INTENT",
  GET_CLASSES_INTENT_RESOLVED: "GET_CLASSES_INTENT_RESOLVED",
  GET_CLASSES_INTENT_REJECTED: "GET_CLASSES_INTENT_REJECTED",
  GET_DELETE_CLASSES: "GET_DELETE_CLASSES",
  GET_UPDATED_ENROLLED_CLASSES: "GET_UPDATED_ENROLLED_CLASSES",
  GET_UPDATED_DROP_OUT_CLASSES: "GET_UPDATED_DROP_OUT_CLASSES",
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
  deleteClass(id) {
    return {
      type: types.GET_DELETE_CLASSES,
      id,
    };
  },
  enrolledClass(data, index) {
    let item = [...data][index];
    item.enrolled = true;
    return {
      type: types.GET_UPDATED_ENROLLED_CLASSES,
      data,
    };
  },
  dropOutClass(data, index) {
    let item = [...data][index];
    item.enrolled = false;
    return {
      type: types.GET_UPDATED_DROP_OUT_CLASSES,
      data,
    };
  },
};
