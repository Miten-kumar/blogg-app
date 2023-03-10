import { configureStore } from "@reduxjs/toolkit";
import Slicereducer from "../Features/Slice";
export const store = configureStore({
  reducer: {
    allCart: Slicereducer,
  },
});
