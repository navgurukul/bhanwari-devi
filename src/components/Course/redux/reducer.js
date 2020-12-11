import { types } from "./action";

const initialState = {
  loading: false,
  error: false,
  data: null,
  courseContent: {
    loading: false,
    error: false,
    data: null,
  },
  selectedExercise: {
    exercise: null,
    parentExercise: null, // reference to parent exercise in the list
    index: null, // reference to main exercise in the course exercise list
    subExerciseIndex: null, // reference to child exercise of an exercise
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COURSES_INTENT:
      return {
        ...state,
        loading: true,
        error: false,
        data: null,
      };
    case types.GET_COURSES_INTENT_RESOLVED:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.data,
      };

    case types.GET_COURSES_INTENT_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
      };

    case types.GET_COURSE_CONTENT_INTENT:
      return {
        ...state,
        courseContent: {
          loading: true,
          error: false,
          data: null,
        },
      };

    case types.GET_COURSE_CONTENT_INTENT_RESOLVED:
      return {
        ...state,
        courseContent: {
          loading: false,
          error: false,
          data: action.data,
        },
      };

    case types.GET_COURSE_CONTENT_INTENT_REJECTED:
      return {
        ...state,
        courseContent: {
          loading: false,
          error: action.error,
          data: null,
        },
      };

    case types.UPDATE_SELECTED_EXERCISE:
      return {
        ...state,
        selectedExercise: action.data,
      };

    default:
      return state;
  }
};
