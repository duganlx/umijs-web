// pattern slice
import { createSlice } from "@reduxjs/toolkit";

const patternSlice = createSlice({
  name: "pattern",
  initialState: {
    value: "normal",
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default patternSlice.reducer;

const { update } = patternSlice.actions;

const updateBotPattern = (opt: string) => {
  return update(opt);
};

export { updateBotPattern };
