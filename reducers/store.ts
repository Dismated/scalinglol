import { configureStore } from "@reduxjs/toolkit";

import attackSwitchReducer from "./attackSwitchReducer";
import champStatsReducer from "./champStatsReducer";
import lvlUpReducer from "./lvlUpReducer";
import matchLengthReducer from "./matchLengthReducer";
import nodeSideReducer from "./nodeSideReducer";
import primaryColorReducer from "./primaryColorReducer";
import skillTimeReducer from "./skillTimeReducer";
import spellsReducer from "./spellsReducer";
import windowWidthReducer from "./windowWidthReducer";

const store = configureStore({
  reducer: {
    windowWidth: windowWidthReducer,
    matchLength: matchLengthReducer,
    skillTime: skillTimeReducer,
    attackSwitch: attackSwitchReducer,
    lvlUp: lvlUpReducer,
    spells: spellsReducer,
    primaryColor: primaryColorReducer,
    champStats: champStatsReducer,
    nodeSide: nodeSideReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
