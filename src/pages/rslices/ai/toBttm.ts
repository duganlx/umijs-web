import { createSlice } from "@reduxjs/toolkit";

const tobottomSlice = createSlice({
  name: "toBttm",
  initialState: {
    value: false,
  },
  reducers: {
    trigger: (state) => {
      state.value = !state.value;
    },
  },
});

export default tobottomSlice.reducer;

const triggerScrollbottomSign = () => {
  return tobottomSlice.actions.trigger();
};

export { triggerScrollbottomSign };
