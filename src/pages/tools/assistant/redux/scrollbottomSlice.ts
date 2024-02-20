import { createSlice } from "@reduxjs/toolkit";

const scrollbottomSlice = createSlice({
  name: "scrollbottom",
  initialState: {
    value: false,
  },
  reducers: {
    trigger: (state) => {
      state.value = !state.value;
    },
  },
});

export default scrollbottomSlice.reducer;

const triggerScrollbottomSign = () => {
  return scrollbottomSlice.actions.trigger();
};

export { triggerScrollbottomSign };
