import { createSlice } from "@reduxjs/toolkit";

const itemTimeSlice = createSlice({
  name: "itemTime",
  initialState: [690, 1140, 1420, 1780, 2140, 2450],
  reducers: {
    setItemTime(state, action) {
      return action.payload;
    },
  },
});
export const { setItemTime } = itemTimeSlice.actions;

export default itemTimeSlice.reducer;
