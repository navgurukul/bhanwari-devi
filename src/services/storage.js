import { AUTH_KEY } from "../constant.js";
import { types } from "../components/User/redux/action";

export function getUserInitialState() {
  try {
    const state = localStorage.getItem(AUTH_KEY);
    if (state) {
      try {
        let parsedState = JSON.parse(state);
        return {
          User: parsedState,
        };
      } catch (e) {
        return {};
      }
    } else return {};
  } catch (error) {
    //console.error('Error accessing localStorage:', error);
    return {};
  }
}

export const userStateMiddleware = (store) => (next) => (action) => {
  try {
    if (
      action.type === types.ON_USER_SIGN_INTENT_RESOLVED ||
      action.type === types.ON_USER_REFRESH_DATA_SUCCESS
    ) {
      let result = next(action);
      const authState = store.getState().User;
      localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
      return result;
    } else if (action.type === types.ON_LOGOUT_INTENT) {
      let result = next(action);
      localStorage.removeItem(AUTH_KEY);
      localStorage.clear()
      return result;
    } else return next(action);
  } catch (error) {
    //console.error('Error accessing localStorage:', error);
    return {};
  }
};
