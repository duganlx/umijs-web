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
  },
});

export default msglistSlice.reducer;

const { push } = msglistSlice.actions;

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

export { pushNormalBotMessage, pushNormalUserMessage };
