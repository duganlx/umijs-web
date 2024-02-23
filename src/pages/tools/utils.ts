import { WrapMessageProps } from "./assistant/components/message";

const KEY_AiChatLog = "assistant_chatlogs";

export function setAiChatLogs(chatlogs: WrapMessageProps[]) {
  const str = JSON.stringify(chatlogs);
  localStorage.setItem(KEY_AiChatLog, str);
}

export function getAiChatLogs(): WrapMessageProps[] {
  const str = localStorage.getItem(KEY_AiChatLog);
  if (str === null) {
    return [];
  }

  const chatlogs = JSON.parse(str) as WrapMessageProps[];
  return chatlogs;
}

export function clearAiChatLogs() {
  localStorage.removeItem(KEY_AiChatLog);
}
