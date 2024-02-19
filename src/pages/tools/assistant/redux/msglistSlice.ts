import { createSlice } from "@reduxjs/toolkit";
import { WrapMessageProps } from "../components/message";
import { NormalBotMessageProps } from "../components/botMessage";
import { BotModeCtlProps, CMD_BotModeCtl } from "../components/modeCtl";
import { NormalUserMessageProps } from "../components/userMessage";
import { BotModelCtlProps, CMD_BotModelCtl } from "../components/modelCtl";

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

const { push, typingDone, thinkingDone, choosingDone, cmdBotDone } =
  msglistSlice.actions;

const pushNormalUserMessage = (props: NormalUserMessageProps) => {
  const entity: WrapMessageProps = {
    mode: "normal",
    normalprops: {
      role: "user",
      userprops: props,
    },
  };

  return push(entity);
};

const pushNormalBotMessage = (props: NormalBotMessageProps) => {
  const entity: WrapMessageProps = {
    mode: "normal",
    normalprops: {
      role: "bot",
      botprops: props,
    },
  };

  return push(entity);
};

const typingNormalBotMessageDone = (index: number) => {
  return typingDone(index);
};

// 前提: 思考的信息有且仅有一个，并且必定是数组中的最后一个元素
const thinkingNormalBotMessageDone = (content: string) => {
  return thinkingDone(content);
};

const pushBotModeCtlMessage = (props: BotModeCtlProps) => {
  const entity: WrapMessageProps = {
    mode: "special",
    specialprops: {
      cmd: "mode",
      modectlprops: props,
    },
  };

  return push(entity);
};

const choosingBotModeCtlMessageDone = (index: number, choice: string) => {
  const payload = { index, choice, cmd: CMD_BotModeCtl };

  return choosingDone(payload);
};

const typingBotModeCtlMessageDone = (index: number) => {
  const payload = { index, cmd: CMD_BotModeCtl };
  return cmdBotDone(payload);
};

const pushBotModelCtlMessage = (props: BotModelCtlProps) => {
  const entity: WrapMessageProps = {
    mode: "special",
    specialprops: {
      cmd: "model",
      modelctlprops: props,
    },
  };

  return push(entity);
};

const choosingBotModelCtlMessageDone = (index: number, choice: string) => {
  const payload = { index, choice, cmd: CMD_BotModelCtl };

  return choosingDone(payload);
};

const typingBotModelCtlMessageDone = (index: number) => {
  const payload = { index, cmd: CMD_BotModelCtl };
  return cmdBotDone(payload);
};

export {
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
