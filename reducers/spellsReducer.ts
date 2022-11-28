import { createSlice } from "@reduxjs/toolkit";

import { SpellProps } from "../types/types";

const initialState: SpellProps[] = [];

const spellsSlice = createSlice({
  name: "spells",
  initialState,
  reducers: {
    setSpells(state, action) {
      return action.payload;
    },
  },
});
export const { setSpells } = spellsSlice.actions;

export default spellsSlice.reducer;
