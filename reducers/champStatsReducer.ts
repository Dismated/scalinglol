import { createSlice } from "@reduxjs/toolkit";

import { Champion } from "../types/types";
import stats from "../champStats/champStats.json";

const initialState = stats.Alistar as Champion;

const champStatsSlice = createSlice({
  name: "champStats",
  initialState,
  reducers: {
    setChampStats(state, action) {
      return action.payload;
    },
  },
});
export const { setChampStats } = champStatsSlice.actions;

export default champStatsSlice.reducer;
