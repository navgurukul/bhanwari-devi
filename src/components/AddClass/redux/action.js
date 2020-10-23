export const types = {
  GET_ADD_CLASS_INTENT: 'GET_ADD_CLASS_INTENT',
  GET_ADD_CLASS_INTENT_RESOLVED: 'GET_ADD_CLASS_INTENT_RESOLVED',
  GET_ADD_CLASS_INTENT_REJECTED: 'GET_ADD_CLASS_INTENT_RESOLVED'
}

export const actions = {
  getAddClass(data) {
    return {
      type: types.GET_ADD_CLASS_INTENT,
      data,
    }
  },
  getAddClassResolved(data) {
    return {
      type: types.GET_ADD_CLASS_INTENT_RESOLVED,
      data,
    }
  },
  getAddClassRejected(error) {
    return {
      type: types.GET_ADD_CLASS_INTENT_REJECTED,
      error,
    }
  },
}
