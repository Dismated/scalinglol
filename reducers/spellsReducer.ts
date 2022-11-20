import { createSlice } from "@reduxjs/toolkit";

const spellsSlice = createSlice({
  name: "spells",
  initialState: [{ name: "", section: "", count: 1 }],
  reducers: {
    setSpells(state, action) {
      return action.payload;
    },
  },
});
export const { setSpells } = spellsSlice.actions;

export default spellsSlice.reducer;
