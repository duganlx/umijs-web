// pattern slice
import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "ai_pattern";

const patternSlice = createSlice({
  name: "pattern",
  initialState: () => {
    let value = "normal";
    const lsval = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (lsval !== null) {
      value = lsval;
    }

    return {
      value: value,
    };
  },
  reducers: {
    update: (state, action) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, action.payload);
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
