import { types } from "./action";

const initialState = {
  loading: false,
  error: false,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ON_USER_SIGN_INTENT:
      return {
        ...state,
        loading: true,
        error: false,
        data: null,
      };
    case types.ON_USER_SIGN_INTENT_RESOLVED:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.data,
      };

    case types.ON_USER_SIGN_INTENT_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
      };

    case types.POLL_FOR_SERVER_USER_UPDATE:
      return {
        ...state,
        data: { ...state.data, waitingForUpdate: true },
      };

    case types.ON_SERVER_USER_UPDATE:
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};
