import { configureStore } from "@reduxjs/toolkit";
import msglistSlice from "./stores-redux/assistant/dialogListSlice";
import botmodeSlice from "./stores-redux/assistant/botmodeSlice";
import botmodelSlice from "./stores-redux/assistant/botmodelSlice";
import scrollbottomSlice from "./stores-redux/assistant/scrollbottomSlice";
import pingEamSlice from "./stores-redux/pingEamSlice";
import latestmsgSlice from "./stores-redux/assistant/latestmsgSlice";

export default configureStore({
  reducer: {
    pingEam: pingEamSlice,
    // assistant
    aimsglist: msglistSlice,
    latestmsg: latestmsgSlice,
    aibotmodel: botmodelSlice,
    aibotmode: botmodeSlice,
    aiscrollbottom: scrollbottomSlice,
  },
});
