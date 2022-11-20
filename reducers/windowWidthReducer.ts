import { createSlice } from "@reduxjs/toolkit";

const windowWidthSlice = createSlice({
  name: "windowWidth",
  initialState: 0,
  reducers: {
    setWindowWidth(state, action) {
      if (action.payload) return action.payload.width;
      return 0;
    },
  },
});
export const { setWindowWidth } = windowWidthSlice.actions;

export default windowWidthSlice.reducer;
