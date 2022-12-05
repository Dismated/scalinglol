import { createSlice } from "@reduxjs/toolkit";

import updateLvls, { emptyLvls, lvlUpR } from "../helpers/UpdateLvls";

const lvlUpSlice = createSlice({
  name: "lvlUp",
  initialState: updateLvls("R", lvlUpR, emptyLvls),
  reducers: {
    setLvlUp(state, action) {
      return action.payload;
    },
  },
});
export const { setLvlUp } = lvlUpSlice.actions;

export default lvlUpSlice.reducer;
