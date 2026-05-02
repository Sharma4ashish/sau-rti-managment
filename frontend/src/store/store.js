import { configureStore } from "@reduxjs/toolkit";
import rtiReducer from "../features/rtiSlice";

export const store = configureStore({
  reducer: {
    rti: rtiReducer,
  },
}); 