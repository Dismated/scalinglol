import { createSlice } from "@reduxjs/toolkit";

const attackSwitchSlice = createSlice({
  name: "attackSwitchWidth",
  initialState: "timer",
  reducers: {
    setAttackSwitch(state, action) {
      return action.payload;
    },
  },
});
export const { setAttackSwitch } = attackSwitchSlice.actions;

export default attackSwitchSlice.reducer;
