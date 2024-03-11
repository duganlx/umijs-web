import { configureStore } from "@reduxjs/toolkit";
import pingEam from "./rslices/pingEam";
import lmsg from "./rslices/ai/lmsg";
import hmsgs from "./rslices/ai/hmsgs";
import toBttm from "./rslices/ai/toBttm";
import bmodel from "./rslices/ai/model";
import bpattern from "./rslices/ai/pattern";

export default configureStore({
  reducer: {
    pingEam: pingEam,
    // AI
    ailmsg: lmsg,
    aihmsgs: hmsgs,
    ai2bttm: toBttm,
    aimodel: bmodel,
    aipattern: bpattern,
  },
});
