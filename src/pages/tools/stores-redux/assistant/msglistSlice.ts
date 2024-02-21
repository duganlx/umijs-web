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

const msglistSlice = createSlice({
  name: "msglist",
  initialState: () => {
    const msglist: WrapMessageProps[] = [];

    return {
      value: msglist,
    };
  },
  reducers: {
    clear: (state) => {
      state.value = [];
    },
    push: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    typingDone: (state, action) => {
      const index = action.payload as number;
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
};
