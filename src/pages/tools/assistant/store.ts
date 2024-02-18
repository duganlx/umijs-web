import { configureStore, createSlice } from "@reduxjs/toolkit";
import msglistReducer from "./redux/msglistSlice";

export default configureStore({
  reducer: {
    msglist: msglistReducer,
  },
});
