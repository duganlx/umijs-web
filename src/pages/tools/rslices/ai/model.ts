// model slice
import { createSlice } from "@reduxjs/toolkit";

const botmodelSlice = createSlice({
  name: "botModel",
  initialState: {
    value: "none",
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default botmodelSlice.reducer;

const { update } = botmodelSlice.actions;

const updateBotModel = (opt: string) => {
  return update(opt);
};

export { updateBotModel };
