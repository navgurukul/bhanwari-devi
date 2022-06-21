import { types } from "./action";

const initialState = {
  loading: false,
  error: false,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PATHWAY_INTENT:
      return {
        ...state,
        loading: true,
        error: false,
        data: null,
      };
    case types.GET_PATHWAY_INTENT_RESOLVED:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.data,
      };
    case types.GET_PATHWAY_INTENT_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
      };

    //PATHWAY_COURSE

    case types.GET_PATHWAY_COURSE_INTENT:
      return {
        ...state,
        pathwayCourse: {
          loading: true,
          error: false,
          data: null,
        },
      };
    case types.GET_PATHWAY_COURSE_INTENT_RESOLVED:
      return {
        ...state,
        pathwayCourse: {
          loading: false,
          error: false,
          data: action.data,
        },
      };
    case types.GET_PATHWAY_COURSE_INTENT_REJECTED:
      return {
        ...state,
        pathwayCourse: {
          loading: false,
          error: action.error,
          data: null,
        },
      };

    //UPCOMING_BATCHES

    case types.GET_UPCOMING_BATCHES_INTENT:
      return {
        ...state,
        upcomingBatches: {
          loading: true,
          error: false,
          data: [],
        },
      };
    case types.GET_UPCOMING_BATCHES_INTENT_RESOLVED:
      return {
        ...state,
        upcomingBatches: {
          loading: false,
          error: false,
          data: action.data,
        },
      };
    case types.GET_UPCOMING_BATCHES_INTENT_REJECTED:
      return {
        ...state,
        upcomingBatches: {
          loading: false,
          error: action.error,
          data: null,
        },
      };

    //UPCOMING_ENROLLED_CLASSES

    case types.GET_UPCOMING_ENROLLED_CLASSES_INTENT:
      return {
        ...state,
        upcomingEnrolledClasses: {
          loading: true,
          error: false,
          data: null,
        },
      };
    case types.GET_UPCOMING_ENROLLED_CLASSES_INTENT_RESOLVED:
      return {
        ...state,
        upcomingEnrolledClasses: {
          loading: false,
          error: false,
          data: action.data,
        },
      };
    case types.GET_UPCOMING_ENROLLED_CLASSES_INTENT_REJECTED:
      return {
        ...state,
        upcomingEnrolledClasses: {
          loading: false,
          error: action.error,
          data: null,
        },
      };

    //ENROLLED_BATCHES

    case types.GET_ENROLLED_BATCHES_INTENT:
      return {
        ...state,
        enrolledBatches: {
          loading: true,
          error: false,
          data: null,
        },
      };
    case types.GET_ENROLLED_BATCHES_INTENT_RESOLVED:
      return {
        ...state,
        enrolledBatches: {
          loading: false,
          error: false,
          data: action.data,
        },
      };
    case types.GET_ENROLLED_BATCHES_INTENT_REJECTED:
      return {
        ...state,
        enrolledBatches: {
          loading: false,
          error: action.error,
          data: null,
        },
      };

    default:
      return state;
  }
};
