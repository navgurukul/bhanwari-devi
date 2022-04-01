export const types = {
  GET_PATHWAY_INTENT: "GET_PATHWAY_INTENT",
  GET_PATHWAY_INTENT_RESOLVED: "GET_PATHWAY_INTENT_RESOLVED",
  GET_PATHWAY_INTENT_REJECTED: "GET_PATHWAY_INTENT_REJECTED",
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
};
