// history messages slice
import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "ai_history_messages";

const historyMsgsSlice = createSlice({
  name: "historyMsgs",
  initialState: () => {
    return {
      value: [],
    };
  },
  reducers: {},
});
