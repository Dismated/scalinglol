import { createSlice } from "@reduxjs/toolkit";

import { LvlsType } from "../types/types";

const emptyLvls: LvlsType[] = new Array(18).fill({
  Q: 0,
  W: 0,
  E: 0,
  R: 0,
});

const lvlUpSlice = createSlice({
  name: "lvlUp",
  initialState: emptyLvls,
  reducers: {
    setLvlUp(state, action) {
      return action.payload;
    },
  },
});
export const { setLvlUp } = lvlUpSlice.actions;

export default lvlUpSlice.reducer;
