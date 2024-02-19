import { configureStore } from "@reduxjs/toolkit";
import msglistReducer from "./redux/msglistSlice";
import botmodeSlice from "./redux/botmodeSlice";
import botmodelSlice from "./redux/botmodelSlice";

export default configureStore({
  reducer: {
    msglist: msglistReducer,
    botmode: botmodeSlice,
    botmodel: botmodelSlice,
  },
});
