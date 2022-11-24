import { createSlice } from "@reduxjs/toolkit";

import { SpellProps } from "../types/types";

const initialState: SpellProps[] = [{ name: "", section: "basic", count: 1 }];

const spellsSlice = createSlice({
  name: "spells",
  initialState,
  reducers: {
    setSpells(state, action) {
      console.log(action.payload);

      return action.payload;
    },
  },
});
export const { setSpells } = spellsSlice.actions;

export default spellsSlice.reducer;
