import { createSlice } from "@reduxjs/toolkit";
import { WrapMessageProps } from "../../assistant/components/message";
import { EamLoginCtlProps } from "../../assistant/components/eamLoginCtl";

const latestMsgSlice = createSlice({
  name: "latestmsg",
  initialState: () => {
    return {
      value: null,
    };
  },
  reducers: {
    clear: (state) => {
      state.value = null;
    },
    update: (state, action) => {
      if (action === null) {
        return;
      }
      state.value = action.payload;
    },
  },
});

export default latestMsgSlice.reducer;

const { update, clear } = latestMsgSlice.actions;

const botThinking = () => {
  const entity: WrapMessageProps = {
    mode: "normal",
    normalprops: {
      role: "bot",
      botprops: {
        content: "",
        isThinking: true,
        isTyping: false,
      },
    },
  };

  return update(entity);
};

const botThinkingDone = (content: string) => {
  const entity: WrapMessageProps = {
    mode: "normal",
    normalprops: {
      role: "bot",
      botprops: {
        content: content,
        isThinking: false,
        isTyping: true,
      },
    },
  };

  return update(entity);
};

const botTypingDone = () => {
  return clear();
};

const botCmdEamLoginDoing = (props: EamLoginCtlProps) => {
  const entity: WrapMessageProps = {
    mode: "special",
    specialprops: {
      cmd: "logineam",
      logineamprops: props,
    },
  };

  return update(entity);
};

const botCmdEamLoginDone = () => {
  return clear();
};

export {
  botThinking,
  botThinkingDone,
  botTypingDone,
  //
  botCmdEamLoginDoing,
  botCmdEamLoginDone,
};
