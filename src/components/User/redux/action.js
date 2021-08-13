export const types = {
  ON_USER_SIGN_INTENT: "ON_USER_SIGN_INTENT",
  ON_USER_SIGN_INTENT_RESOLVED: "ON_USER_SIGN_INTENT_RESOLVED",
  ON_USER_SIGN_INTENT_REJECTED: "ON_USER_SIGN_INTENT_REJECTED",

  ON_LOGOUT_INTENT: "ON_LOGOUT_INTENT",
};

export const actions = {
  onUserSignin(data) {
    return {
      type: types.ON_USER_SIGN_INTENT,
      data,
    };
  },
  onUserUpdate(data) {
    return {
      type: types.ON_USER_UPDATE,
      data,
    };
  },
  onUserSigninResolved(data) {
    return {
      type: types.ON_USER_SIGN_INTENT_RESOLVED,
      data,
    };
  },
  onUserSigninRejected(error) {
    return {
      type: types.ON_USER_SIGN_INTENT_REJECTED,
      error,
    };
  },

  logout() {
    return {
      type: types.ON_LOGOUT_INTENT,
    };
  },
};
