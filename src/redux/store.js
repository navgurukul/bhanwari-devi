import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./slices/roleHandle";

export default configureStore({
  reducer: {
    role: roleReducer,
  },
});
