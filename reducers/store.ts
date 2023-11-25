import { configureStore } from '@reduxjs/toolkit';

import attackSwitchReducer from './champs/attackSwitchReducer';
import champStatsReducer from './champs/champStatsReducer';
import lvlUpReducer from './champs/lvlUpReducer';
import matchLengthReducer from './champs/matchLengthReducer';
import nodeSideReducer from './champs/nodeSideReducer';
import primaryColorReducer from './champs/primaryColorReducer';
import skillTimeReducer from './champs/skillTimeReducer';
import spellsReducer from './champs/spellsReducer';
import windowWidthReducer from './champs/windowWidthReducer';

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
