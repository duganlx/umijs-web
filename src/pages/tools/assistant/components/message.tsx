import { NormalBotMessageProps } from "./botMessage";
import { BotModeCtlProps } from "./modeCtl";
import { BotModelCtlProps } from "./modelCtl";
import { NormalUserMessageProps } from "./userMessage";

interface NormalMessageProps {
  role: "bot" | "user";

  botprops?: NormalBotMessageProps;
  userprops?: NormalUserMessageProps;
}

export interface SpecialMessageProps {
  cmd: "mode" | "model";

  modectlprops?: BotModeCtlProps;
  modelctlprops?: BotModelCtlProps;
}

export interface MessageProps {
  mode: "normal" | "special";

  normalprops?: NormalMessageProps;
  specialprops?: SpecialMessageProps;
}

const Message: React.FC<MessageProps> = (props) => {
  return <></>;
};
