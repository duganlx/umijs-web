import { createSlice } from "@reduxjs/toolkit";
import { WrapMessageProps } from "../../assistant/components/message";
import {
  BotModeCtlProps,
  CMD_BotModeCtl,
} from "../../assistant/components/modeCtl";
import { NormalBotMessageProps } from "../../assistant/components/botMessage";
import {
  CMD_BotModelCtl,
  BotModelCtlProps,
} from "../../assistant/components/modelCtl";
import { NormalUserMessageProps } from "../../assistant/components/userMessage";
import {
  CMD_EamLoginCtl,
  EamLoginCtlProps,
} from "../../assistant/components/eamLoginCtl";
import { clearAiChatLogs, getAiChatLogs, setAiChatLogs } from "../../utils";

const msglistSlice = createSlice({
  name: "msglist",
  initialState: () => {
    const historyChatLogs = getAiChatLogs();
    const msglist: WrapMessageProps[] = historyChatLogs;

    return {
      value: msglist,
    };
  },
  reducers: {
    clear: (state) => {
      clearAiChatLogs();
      state.value = [];
    },
    push: (state, action) => {
      const latestMsglist = [...state.value, action.payload];
      setAiChatLogs(latestMsglist);
      state.value = latestMsglist;
    },
    typingDone: (state, action) => {
      const index = action.payload as number;
      if (index >= state.value.length) {
        return;
      }

      const prev = state.value[index];

      const { normalprops } = prev;
      if (normalprops === undefined) return;
      const { botprops } = normalprops;
      if (botprops === undefined) return;

      const latest = {
        ...prev,
        normalprops: {
          ...normalprops,
          botprops: {
            ...botprops,
            isTyping: false,
          },
        },
      } as WrapMessageProps;

      const latestMsglist: WrapMessageProps[] = [];
      state.value.forEach((item, i) => {
        if (i === index) {
          latestMsglist.push(latest);
          return;
        }
        latestMsglist.push(item);
      });

      setAiChatLogs(latestMsglist);
      state.value = latestMsglist;
    },
    thinkingDone: (state, action) => {
      const content = action.payload;
      const index = state.value.length - 1;
      const prev = state.value[index];

      const { normalprops } = prev;
      if (normalprops === undefined) return;
      const { botprops } = normalprops;
      if (botprops === undefined) return;

      const latest = {
        ...prev,
        normalprops: {
          ...normalprops,
          botprops: {
            ...botprops,
            content: content,
            isThinking: false,
            isTyping: true,
          },
        },
      } as WrapMessageProps;

      const latestMsglist: WrapMessageProps[] = [];
      state.value.forEach((item, i) => {
        if (i === index) {
          latestMsglist.push(latest);
          return;
        }
        latestMsglist.push(item);
      });

      setAiChatLogs(latestMsglist);
      state.value = latestMsglist;
    },
    choosingDone: (state, action) => {
      const { index, choice, cmd } = action.payload;
      const prev = state.value[index];
      const { specialprops } = prev;
      if (specialprops === undefined) return;

      let latest = {} as WrapMessageProps;

      if (cmd === CMD_BotModeCtl) {
        const { modectlprops } = specialprops;
        if (modectlprops === undefined) return;

        latest = {
          ...prev,
          specialprops: {
            ...specialprops,
            modectlprops: {
              ...modectlprops,
              choice: choice,
              isChoosing: false,
              isDone: false,
            },
          },
        };
      } else if (cmd === CMD_BotModelCtl) {
        const { modelctlprops } = specialprops;
        if (modelctlprops === undefined) return;

        latest = {
          ...prev,
          specialprops: {
            ...specialprops,
            modelctlprops: {
              ...modelctlprops,
              choice: choice,
              isChoosing: false,
              isDone: false,
            },
          },
        };
      } else {
        return;
      }

      const latestMsglist: WrapMessageProps[] = [];
      state.value.forEach((item, i) => {
        if (i === index) {
          latestMsglist.push(latest);
          return;
        }
        latestMsglist.push(item);
      });

      setAiChatLogs(latestMsglist);
      state.value = latestMsglist;
    },
    cmdBotDone: (state, action) => {
      const { index, cmd } = action.payload;
      const prev = state.value[index];
      const { specialprops } = prev;
      if (specialprops === undefined) return;

      let latest = {} as WrapMessageProps;

      if (cmd === CMD_BotModeCtl) {
        const { modectlprops } = specialprops;
        if (modectlprops === undefined) return;

        latest = {
          ...prev,
          specialprops: {
            ...specialprops,
            modectlprops: {
              ...modectlprops,
              isChoosing: false,
              isDone: true,
            },
          },
        };
      } else if (cmd === CMD_BotModelCtl) {
        const { modelctlprops } = specialprops;
        if (modelctlprops === undefined) return;

        latest = {
          ...prev,
          specialprops: {
            ...specialprops,
            modelctlprops: {
              ...modelctlprops,
              isChoosing: false,
              isDone: true,
            },
          },
        };
      } else if (cmd === CMD_EamLoginCtl) {
        const { logineamprops } = specialprops;
        if (logineamprops === undefined) return;

        latest = {
          ...prev,
          specialprops: {
            ...specialprops,
            logineamprops: {
              ...logineamprops,
              isDone: true,
            },
          },
        };
      } else {
        return;
      }

      const latestMsglist: WrapMessageProps[] = [];
      state.value.forEach((item, i) => {
        if (i === index) {
          latestMsglist.push(latest);
          return;
        }
        latestMsglist.push(item);
      });

      setAiChatLogs(latestMsglist);
      state.value = latestMsglist;
    },
    eamLoginAuth: (state, action) => {
      const {
        index,
        appid,
        appsecret,
        isValid,
        isCancel,
        isFirst = false,
      } = action.payload;
      const prev = state.value[index];
      const { specialprops } = prev;
      if (specialprops === undefined) return;
      const { logineamprops } = specialprops;
      if (logineamprops === undefined) return;

      const latest: WrapMessageProps = {
        ...prev,
        specialprops: {
          ...specialprops,
          logineamprops: {
            ...logineamprops,
            isFirst: isFirst,
            isValid: isValid,
            isCancel: isCancel,
            appid: appid,
            appsecret: appsecret,
          },
        },
      };

      const latestMsglist: WrapMessageProps[] = [];
      state.value.forEach((item, i) => {
        if (i === index) {
          latestMsglist.push(latest);
          return;
        }
        latestMsglist.push(item);
      });

      setAiChatLogs(latestMsglist);
      state.value = latestMsglist;
    },
  },
});

export default msglistSlice.reducer;

const clearMsglist = () => {
  return msglistSlice.actions.clear();
};

const pushNormalUserMessage = (props: NormalUserMessageProps) => {
  const entity: WrapMessageProps = {
    mode: "normal",
    normalprops: {
      role: "user",
      userprops: props,
    },
  };

  return msglistSlice.actions.push(entity);
};

const pushNormalBotMessage = (props: NormalBotMessageProps) => {
  const entity: WrapMessageProps = {
    mode: "normal",
    normalprops: {
      role: "bot",
      botprops: props,
    },
  };

  return msglistSlice.actions.push(entity);
};

const typingNormalBotMessageDone = (index: number) => {
  return msglistSlice.actions.typingDone(index);
};

// 前提: 思考的信息有且仅有一个，并且必定是数组中的最后一个元素
const thinkingNormalBotMessageDone = (content: string) => {
  return msglistSlice.actions.thinkingDone(content);
};

const pushBotModeCtlMessage = (props: BotModeCtlProps) => {
  const entity: WrapMessageProps = {
    mode: "special",
    specialprops: {
      cmd: "mode",
      modectlprops: props,
    },
  };

  return msglistSlice.actions.push(entity);
};

const choosingBotModeCtlMessageDone = (index: number, choice: string) => {
  const payload = { index, choice, cmd: CMD_BotModeCtl };

  return msglistSlice.actions.choosingDone(payload);
};

const typingBotModeCtlMessageDone = (index: number) => {
  const payload = { index, cmd: CMD_BotModeCtl };
  return msglistSlice.actions.cmdBotDone(payload);
};

const pushBotModelCtlMessage = (props: BotModelCtlProps) => {
  const entity: WrapMessageProps = {
    mode: "special",
    specialprops: {
      cmd: "model",
      modelctlprops: props,
    },
  };

  return msglistSlice.actions.push(entity);
};

const choosingBotModelCtlMessageDone = (index: number, choice: string) => {
  const payload = { index, choice, cmd: CMD_BotModelCtl };

  return msglistSlice.actions.choosingDone(payload);
};

const typingBotModelCtlMessageDone = (index: number) => {
  const payload = { index, cmd: CMD_BotModelCtl };
  return msglistSlice.actions.cmdBotDone(payload);
};

const pushEamLoginCtlMessage = (props: EamLoginCtlProps) => {
  const entity: WrapMessageProps = {
    mode: "special",
    specialprops: {
      cmd: "logineam",
      logineamprops: props,
    },
  };

  return msglistSlice.actions.push(entity);
};

const submitEamLoginValidAuth = (
  index: number,
  appid: string,
  appsecret: string
) => {
  const payload = { index, appid, appsecret, isValid: true, isCancel: false };
  return msglistSlice.actions.eamLoginAuth(payload);
};

const submitEamLoginInvalidAuth = (
  index: number,
  appid: string,
  appsecret: string
) => {
  const payload = { index, appid, appsecret, isValid: false, isCancel: false };
  return msglistSlice.actions.eamLoginAuth(payload);
};

const cancelEamLogin = (index: number, isFirst: boolean) => {
  const payload = {
    index,
    appid: "",
    appsecret: "",
    isFirst: isFirst,
    isValid: false,
    isCancel: true,
  };
  return msglistSlice.actions.eamLoginAuth(payload);
};

const eamLoginCtlDone = (index: number) => {
  const payload = { index, cmd: CMD_EamLoginCtl };
  return msglistSlice.actions.cmdBotDone(payload);
};

export {
  clearMsglist,
  // normalUserMessage
  pushNormalUserMessage,
  // normalBotMessage
  pushNormalBotMessage,
  typingNormalBotMessageDone,
  thinkingNormalBotMessageDone,
  // botModeCtl
  pushBotModeCtlMessage,
  choosingBotModeCtlMessageDone,
  typingBotModeCtlMessageDone,
  // botModelCtl
  pushBotModelCtlMessage,
  choosingBotModelCtlMessageDone,
  typingBotModelCtlMessageDone,
  // eamLoginCtl
  pushEamLoginCtlMessage,
  submitEamLoginValidAuth,
  submitEamLoginInvalidAuth,
  cancelEamLogin,
  eamLoginCtlDone,
};