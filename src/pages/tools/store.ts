import { configureStore, createSlice } from "@reduxjs/toolkit";
import msglistSlice from "./stores-redux/assistant/msglistSlice";
import botmodeSlice from "./stores-redux/assistant/botmodeSlice";
import botmodelSlice from "./stores-redux/assistant/botmodelSlice";
import scrollbottomSlice from "./stores-redux/assistant/scrollbottomSlice";

const pingEamSlice = createSlice({
  name: "pingEam",
  initialState: {
    // 取值说明
    // 0: 服务正常
    // -1: 未知异常状态（包括：网络问题）
    // -2: 未提供登录凭证 appid & appsecret
    // -3: 未能生成JWT凭证 accessToken
    value: -1,
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
    // assistant
    aimsglist: msglistSlice,
    aibotmodel: botmodelSlice,
    aibotmode: botmodeSlice,
    aiscrollbottom: scrollbottomSlice,
  },
});
