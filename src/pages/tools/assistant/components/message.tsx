import NormalBotMessage, { NormalBotMessageProps } from "./botMessage";
import EamLoginCtl, { EamLoginCtlProps } from "./eamLoginCtl";
import InvalidMessage from "./invalidMessage";
import BotModeCtl, { BotModeCtlProps } from "./modeCtl";
import BotModelCtl, { BotModelCtlProps } from "./modelCtl";
import NormalUserMessage, { NormalUserMessageProps } from "./userMessage";

interface NormalMessageProps {
  role: "bot" | "user";

  botprops?: NormalBotMessageProps;
  userprops?: NormalUserMessageProps;
}

export interface SpecialMessageProps {
  cmd: "mode" | "model" | "logineam";

  modectlprops?: BotModeCtlProps;
  modelctlprops?: BotModelCtlProps;
  logineamprops?: EamLoginCtlProps;
}

export interface WrapMessageProps {
  mode: "normal" | "special";

  normalprops?: NormalMessageProps;
  specialprops?: SpecialMessageProps;
}

export interface InnerProps {
  id: number;
}

const WrapMessage: React.FC<WrapMessageProps & InnerProps> = (props) => {
  const { mode, normalprops, specialprops, id } = props;

  if (mode == "normal") {
    if (normalprops === undefined) {
      return <InvalidMessage />;
    }

    const { role, botprops, userprops } = normalprops;
    if (role === "bot") {
      if (botprops === undefined) {
        return <InvalidMessage />;
      }

      // 普通的机器人消息
      return <NormalBotMessage {...botprops} id={id} />;
    } else if (role === "user") {
      if (userprops === undefined) {
        return <InvalidMessage />;
      }

      // 普通的用户消息
      return <NormalUserMessage {...userprops} />;
    } else {
      return <InvalidMessage />;
    }
  } else if (mode == "special") {
    if (specialprops === undefined) {
      return <InvalidMessage />;
    }

    const { cmd, modectlprops, modelctlprops, logineamprops } = specialprops;
    if (cmd === "mode") {
      if (modectlprops === undefined) {
        return <InvalidMessage />;
      }

      // 模式切换
      return <BotModeCtl {...modectlprops} id={id} />;
    } else if (cmd === "model") {
      if (modelctlprops === undefined) {
        return <InvalidMessage />;
      }

      // 模型切换
      return <BotModelCtl {...modelctlprops} id={id} />;
    } else if (cmd === "logineam") {
      if (logineamprops === undefined) {
        return <InvalidMessage />;
      }

      return <EamLoginCtl {...logineamprops} id={id} />;
    } else {
      return <InvalidMessage />;
    }
  } else {
    return <InvalidMessage />;
  }
};

export default WrapMessage;
