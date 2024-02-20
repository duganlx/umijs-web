import { configureStore, createSlice } from "@reduxjs/toolkit";

const pingEamSlice = createSlice({
  name: "pingEam",
  initialState: {
    value: false,
  },
  reducers: {
    updatePingEam: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updatePingEam } = pingEamSlice.actions;

export default configureStore({
  reducer: {
    pingEam: pingEamSlice.reducer,
  },
});
