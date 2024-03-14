import { createSlice } from "@reduxjs/toolkit";
import { automobileData } from "../constants";

const automobileSlice = createSlice({
  name: "automobiles",
  initialState: {
    data: automobileData,
  },
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default automobileSlice.reducer;

export const { updateData } = automobileSlice.actions;
