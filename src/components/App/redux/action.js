export const types = {
  RESET_APP: "RESET_APP",
};

export const actions = {
  clearAppState() {
    return {
      type: types.RESET_APP,
    };
  },
};
