import { configureStore } from "@reduxjs/toolkit";

import attackSwitchReducer from "../reducers/attackSwitchReducer";
import lvlUpReducer from "../reducers/lvlUpReducer";
import matchLengthReducer from "../reducers/matchLengthReducer";
import primaryColorReducer from "../reducers/primaryColorReducer";
import skillTimeReducer from "../reducers/skillTimeReducer";
import spellsReducer from "../reducers/spellsReducer";
import windowWidthReducer from "../reducers/windowWidthReducer";

const store = configureStore({
  reducer: {
    windowWidth: windowWidthReducer,
    matchLength: matchLengthReducer,
    skillTime: skillTimeReducer,
    attackSwitch: attackSwitchReducer,
    lvlUp: lvlUpReducer,
    spells: spellsReducer,
    primaryColor: primaryColorReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
