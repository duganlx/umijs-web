import { createSlice } from "@reduxjs/toolkit";
import { WrapMessageProps } from "../components/message";
import { NormalBotMessageProps } from "../components/botMessage";

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
  },
});

export default msglistSlice.reducer;

const { push, typingDone } = msglistSlice.actions;

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

const pushNormalUserMessage = (content: string) => {
  const entity: WrapMessageProps = {
    mode: "normal",
    normalprops: {
      role: "user",
      userprops: {
        content: content,
      },
    },
  };

  return push(entity);
};

const typingNormalBotMessageDone = (index: number) => {
  return typingDone(index);
};

export {
  pushNormalBotMessage,
  pushNormalUserMessage,
  typingNormalBotMessageDone,
};
