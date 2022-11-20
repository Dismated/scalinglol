import { createSlice } from "@reduxjs/toolkit";

interface ObjType {
  [key: string]: number;
}

const obj: ObjType[] = new Array(18);
obj.fill({
  Q: 0,
  W: 0,
  E: 0,
  R: 0,
});

const lvlUpSlice = createSlice({
  name: "lvlUp",
  initialState: obj,
  reducers: {
    setLvlUp(state, action) {
      return action.payload;
    },
  },
});
export const { setLvlUp } = lvlUpSlice.actions;

export default lvlUpSlice.reducer;
