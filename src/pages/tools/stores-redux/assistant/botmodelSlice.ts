import { createSlice } from "@reduxjs/toolkit";

const botmodelSlice = createSlice({
  name: "botmodel",
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

const updateBotmodel = (opt: string) => {
  return update(opt);
};

export { updateBotmodel };
