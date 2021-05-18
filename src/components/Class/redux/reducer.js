import { types } from "./action";
const initialState = {
  loading: false,
  error: false,
  data: null,
  allClasses: {
    loading: false,
    error: false,
    data: null,
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CLASSES_INTENT:
      return {
        ...state,
        allClasses: {
          loading: true,
          error: false,
          data: null,
        },
      };
    case types.GET_CLASSES_INTENT_RESOLVED:
      return {
        ...state,
        allClasses: {
          loading: false,
          error: false,
          data: action.data,
        },
      };
    case types.GET_CLASSES_INTENT_REJECTED:
      return {
        ...state,
        allClasses: {
          loading: false,
          error: action.error,
          data: null,
        },
      };
    case types.GET_DELETE_CLASSES:
      return {
        ...state,
        allClasses: {
          loading: false,
          error: false,
          data: state.allClasses.data.filter((item) => {
            return item.id !== action.id;
          }),
        },
      };
    case types.GET_UPDATED_ENROLLED_CLASSES:
      return {
        ...state,
        allClasses: {
          loading: false,
          error: false,
          data: action.data,
        },
      };
    case types.GET_UPDATED_DROP_OUT_CLASSES:
      return {
        ...state,
        allClasses: {
          loading: false,
          error: false,
          data: action.data,
        },
      };
    default:
      return state;
  }
};
