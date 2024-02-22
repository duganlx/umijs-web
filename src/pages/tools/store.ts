import { configureStore, createSlice } from "@reduxjs/toolkit";
import msglistSlice from "./stores-redux/assistant/msglistSlice";
import botmodeSlice from "./stores-redux/assistant/botmodeSlice";
import botmodelSlice from "./stores-redux/assistant/botmodelSlice";
import scrollbottomSlice from "./stores-redux/assistant/scrollbottomSlice";
import pingEamSlice from "./stores-redux/pingEamSlice";

export default configureStore({
  reducer: {
    pingEam: pingEamSlice,
    // assistant
    aimsglist: msglistSlice,
    aibotmodel: botmodelSlice,
    aibotmode: botmodeSlice,
    aiscrollbottom: scrollbottomSlice,
  },
});
