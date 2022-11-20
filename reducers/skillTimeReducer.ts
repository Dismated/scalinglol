import { createSlice } from "@reduxjs/toolkit";

const skillTimeSlice = createSlice({
  name: "skillTime",
  initialState: [
    0, 135, 162, 215, 285, 348, 451, 552, 633, 730, 846, 1090, 1240, 1410, 1560,
    1780, 2070, 2280,
  ],
  reducers: {
    setSkillTime(state, action) {
      return action.payload;
    },
  },
});
export const { setSkillTime } = skillTimeSlice.actions;

export default skillTimeSlice.reducer;
