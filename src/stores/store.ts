import { configureStore } from "@reduxjs/toolkit";
import automobileReducer from "../slices/automobileSlice";

const store = configureStore({
  reducer: {
    automobiles: automobileReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;

export default store;
