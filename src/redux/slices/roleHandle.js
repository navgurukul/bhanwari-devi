import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "role",
  initialState: {
    value: "admin",
  },
  reducers: {
    setCurrentRole: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentRole } = counterSlice.actions;

export default counterSlice.reducer;
