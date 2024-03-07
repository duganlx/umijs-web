import { PINGEAM_EXCEPTION } from "@/services/eam/uc";
import { createSlice } from "@reduxjs/toolkit";

const pingEamSlice = createSlice({
  name: "pingEam",
  initialState: {
    // 取值说明
    // 0: 服务正常
    // -1: 未知异常状态（包括：网络问题）
    // -2: 未提供登录凭证 appid & appsecret
    // -3: 未能生成JWT凭证 accessToken
    value: PINGEAM_EXCEPTION,
  },
  reducers: {
    updatePingEam: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default pingEamSlice.reducer;

export const { updatePingEam } = pingEamSlice.actions;
