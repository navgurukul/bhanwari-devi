export const types = {
  GET_CREATE_CLASS_INTENT: 'GET_CREATE_CLASS_INTENT',
  GET_CREATE_CLASS_INTENT_RESOLVED: 'GET_CREATE_CLASS_INTENT_RESOLVED',
  GET_CREATE_CLASS_INTENT_REJECTED: 'GET_CREATE_CLASS_INTENT_RESOLVED'
}

export const actions = {
  getCreateClass(data) {
    return {
      type: types.GET_CREATE_CLASS_INTENT,
      data,
    }
  },
  getCreateClassResolved(data) {
    return {
      type: types.GET_CREATE_CLASS_INTENT_RESOLVED,
      data,
    }
  },
  getCreateClassRejected(error) {
    return {
      type: types.GET_CREATE_CLASS_INTENT_REJECTED,
      error,
    }
  },
}
