// latest message slice
import { createSlice } from "@reduxjs/toolkit";
import { ChatMessageProps } from "../../ai/components/cmsg";
import { AnswerMessageProps } from "../../ai/msgs/answer";
import { ModelMessageProps } from "../../ai/msgs/model";
import { PatternMessageProps } from "../../ai/msgs/pattern";
import { AuthEamMessageProps } from "../../ai/msgs/authEam";

const latestMsgSlice = createSlice({
  name: "latestMsg",
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

const setLatestMsg = (props: ChatMessageProps) => {
  return update(props);
};

const setAnswerLMsg = (confobj: AnswerMessageProps) => {
  const conf = JSON.stringify(confobj);
  const props: ChatMessageProps = { messageType: "answer", conf };
  return update(props);
};

const setModelLMsg = (confobj: ModelMessageProps) => {
  const conf = JSON.stringify(confobj);
  const props: ChatMessageProps = { messageType: "model", conf };
  return update(props);
};

const setPatternLMsg = (confobj: PatternMessageProps) => {
  const conf = JSON.stringify(confobj);
  const props: ChatMessageProps = { messageType: "pattern", conf };
  return update(props);
};

const setAuthEamLMsg = (confobj: AuthEamMessageProps) => {
  const conf = JSON.stringify(confobj);
  const props: ChatMessageProps = { messageType: "authEam", conf };
  return update(props);
};

const ceLatestMsg = () => {
  return clear();
};

export {
  ceLatestMsg,
  setLatestMsg,
  setAnswerLMsg,
  setModelLMsg,
  setPatternLMsg,
  setAuthEamLMsg,
};
