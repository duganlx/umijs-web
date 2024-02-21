import { createSlice } from "@reduxjs/toolkit";

const botmodeSlice = createSlice({
  name: "botmode",
  initialState: {
    value: "normal",
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default botmodeSlice.reducer;

const { update } = botmodeSlice.actions;

const updateBotmode = (opt: string) => {
  return update(opt);
};

export { updateBotmode };
