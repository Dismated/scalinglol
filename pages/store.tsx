import { configureStore } from "@reduxjs/toolkit";

import attackSwitchReducer from "../reducers/attackSwitchReducer";
import defenceSwitchReducer from "../reducers/defenceSwitchReducer";
import itemTimeReducer from "../reducers/itemTimeReducer";
import lvlUpReducer from "../reducers/lvlUpReducer";
import matchLengthReducer from "../reducers/matchLengthReducer";
import skillTimeReducer from "../reducers/skillTimeReducer";
import spellsReducer from "../reducers/spellsReducer";
import windowWidthReducer from "../reducers/windowWidthReducer";

const store = configureStore({
  reducer: {
    windowWidth: windowWidthReducer,
    matchLength: matchLengthReducer,
    skillTime: skillTimeReducer,
    itemTime: itemTimeReducer,
    attackSwitch: attackSwitchReducer,
    defenceSwitch: defenceSwitchReducer,
    lvlUp: lvlUpReducer,
    spells: spellsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
