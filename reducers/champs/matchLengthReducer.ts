import { createSlice } from "@reduxjs/toolkit";

const matchLengthSlice = createSlice({
  name: "matchLength",
  initialState: 2400,
  reducers: {
    setMatchLength(state, action) {
      return action.payload;
    },
  },
});
export const { setMatchLength } = matchLengthSlice.actions;

export default matchLengthSlice.reducer;
