// history messages slice
import { createSlice } from "@reduxjs/toolkit";
import { ChatMessageProps } from "../../ai/components/cmsg";
import { AskMessageProps } from "../../ai/msgs/ask";
import { AnswerMessageProps } from "../../ai/msgs/answer";
import { ModelMessageProps } from "../../ai/msgs/model";
import { PatternMessageProps } from "../../ai/msgs/pattern";
import { AuthEamMessageProps } from "../../ai/msgs/authEam";

const LOCAL_STORAGE_KEY = "ai_history_messages";

const historyMsgsSlice = createSlice({
  name: "historyMsgs",
  initialState: () => {
    const welcome = "Welcome to use the Ai Assistant. ^_^";
    const wconf: AnswerMessageProps = {
      content: welcome,
      isThinking: false,
      isTyping: false,
    };
    const wprops: ChatMessageProps = {
      messageType: "answer",
      conf: JSON.stringify(wconf),
    };

    let value: ChatMessageProps[] = [wprops];
    const lsval = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (lsval !== null) {
      const history = JSON.parse(lsval) as ChatMessageProps[];
      value = history;
    }

    return {
      value: value,
    };
  },
  reducers: {
    clear: (state) => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      state.value = [];
    },
    push: (state, action) => {
      const newHistoryMsg = [...state.value, action.payload];
      const lcjsonstr = JSON.stringify(newHistoryMsg);
      localStorage.setItem(LOCAL_STORAGE_KEY, lcjsonstr);
      state.value = newHistoryMsg;
    },
  },
});

export default historyMsgsSlice.reducer;

const { clear, push } = historyMsgsSlice.actions;

const ceHistoryMsgs = () => {
  return clear();
};

const addHistoryMsg = (props: ChatMessageProps) => {
  return push(props);
};

const addAskHMsg = (confobj: AskMessageProps) => {
  const conf = JSON.stringify(confobj);
  const props: ChatMessageProps = { messageType: "ask", conf };
  return push(props);
};

const addAnswerHMsg = (content: string) => {
  const confobj: AnswerMessageProps = {
    content: content,
    isThinking: false,
    isTyping: false,
  };
  const conf = JSON.stringify(confobj);
  const props: ChatMessageProps = { messageType: "answer", conf };
  return push(props);
};

const addModelHMsg = (choice: "" | "eamGpt") => {
  const confobj: ModelMessageProps = {
    choice: choice,
    isDone: true,
  };
  const conf = JSON.stringify(confobj);
  const props: ChatMessageProps = { messageType: "model", conf };
  return push(props);
};

const addPatternHMsg = (c: "" | "normal" | "translator" | "webdeveloper") => {
  const confobj: PatternMessageProps = {
    choice: c,
    isDone: true,
  };
  const conf = JSON.stringify(confobj);
  const props: ChatMessageProps = { messageType: "pattern", conf };
  return push(props);
};

const addAuthEamHMsg = (isValid: boolean) => {
  const confobj: AuthEamMessageProps = {
    isValid,
    isDone: true,
    appid: "*",
    appsecret: "*",
  };

  const conf = JSON.stringify(confobj);
  const props: ChatMessageProps = { messageType: "authEam", conf };
  return push(props);
};

export {
  ceHistoryMsgs,
  addHistoryMsg,
  addAskHMsg,
  addAnswerHMsg,
  addModelHMsg,
  addPatternHMsg,
  addAuthEamHMsg,
};
