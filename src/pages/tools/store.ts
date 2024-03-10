import { configureStore } from "@reduxjs/toolkit";
// import botmodeSlice from "./stores-redux/assistant/botmodeSlice";
// import botmodelSlice from "./stores-redux/assistant/botmodelSlice";
import pingEam from "./rslices/pingEam";
import lmsg from "./rslices/ai/lmsg";
import hmsgs from "./rslices/ai/hmsgs";
import toBttm from "./rslices/ai/toBttm";

export default configureStore({
  reducer: {
    pingEam: pingEam,
    // AI
    ailmsg: lmsg,
    aihmsgs: hmsgs,
    ai2bttm: toBttm,
    // aibotmodel: botmodelSlice,
    // aibotmode: botmodeSlice,
  },
});
