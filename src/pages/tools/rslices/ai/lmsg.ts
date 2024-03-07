// latest message slice
import { createSlice } from "@reduxjs/toolkit";

const latestMsgSlice = createSlice({
  name: "latestMsg",
  initialState: () => {
    return {
      value: null,
    };
  },
  reducers: {
    clear: (state) => {
      state.value = null;
    },
    update: (state, action) => {
      if (action === null) {
        return;
      }
      state.value = action.payload;
    },
  },
});

export default latestMsgSlice.reducer;
