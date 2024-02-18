import { createSlice } from "@reduxjs/toolkit";
import { MessageProps } from "../components/message";

const msglistSlice = createSlice({
  name: "msglist",
  initialState: () => {
    const msglist: MessageProps[] = [];

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

const pushNormalBotMessage = (req: MessageProps) => {
  const entity: MessageProps = {
    mode: "normal",
    normalprops: {
      role: "bot",
      botprops: {
        content: "",
        isThinking: false,
        isTyping: false,

        onTypingDone: () => {},
      },
    },
  };

  return push(entity);
};

const pushNormalUserMessage = (content: string) => {
  const entity: MessageProps = {
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
