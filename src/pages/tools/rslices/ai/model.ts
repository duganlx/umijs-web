// model slice
import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "ai_model";

const botmodelSlice = createSlice({
  name: "botModel",
  initialState: () => {
    let value = "none";
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

export default botmodelSlice.reducer;

const { update } = botmodelSlice.actions;

const updateBotModel = (opt: string) => {
  return update(opt);
};

export { updateBotModel };
