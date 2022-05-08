export const types = {
  ON_USER_SIGN_INTENT: "ON_USER_SIGN_INTENT",
  ON_USER_SIGN_INTENT_RESOLVED: "ON_USER_SIGN_INTENT_RESOLVED",
  ON_USER_SIGN_INTENT_REJECTED: "ON_USER_SIGN_INTENT_REJECTED",
  ON_USER_UPDATE: "ON_USER_UPDATE",
  POLL_FOR_SERVER_USER_UPDATE: "POLL_FOR_SERVER_USER_UPDATE",
  ON_SERVER_USER_UPDATE: "ON_SERVER_USER_UPDATE",

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
  pollForServerUserUpdate(data) {
    return {
      type: types.POLL_FOR_SERVER_USER_UPDATE,
      data,
    };
  },
  onServerUserUpdate(data) {
    return {
      type: types.ON_SERVER_USER_UPDATE,
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
  }
};
