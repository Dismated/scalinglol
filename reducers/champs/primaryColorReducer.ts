import { createSlice } from "@reduxjs/toolkit";

const primaryColorSlice = createSlice({
  name: "primaryColor",
  initialState: "grey",
  reducers: {
    setPrimaryColor(state, action) {
      return action.payload;
    },
  },
});
export const { setPrimaryColor } = primaryColorSlice.actions;

export default primaryColorSlice.reducer;
