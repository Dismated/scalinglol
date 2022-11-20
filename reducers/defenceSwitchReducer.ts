import { createSlice } from "@reduxjs/toolkit";

const defenceSwitchSlice = createSlice({
  name: "defenceSwitchWidth",
  initialState: "timer",
  reducers: {
    setDefenceSwitch(state, action) {
      console.log(action.payload);
      return action.payload;
    },
  },
});
export const { setDefenceSwitch } = defenceSwitchSlice.actions;

export default defenceSwitchSlice.reducer;
