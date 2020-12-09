import { types } from "./action";

const initialState = {
  loading: false,
  error: false,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CREATE_CLASS_INTENT:
      return {
        ...state,
        loading: true,
        error: false,
        data: null,
      };
    case types.GET_CREATE_CLASS_INTENT_RESOLVED:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.data,
      };

    case types.GET_CREATE_CLASS_INTENT_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
      };

    default:
      return state;
  }
};
