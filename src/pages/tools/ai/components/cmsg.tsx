import AnswerMessage from "../msgs/answer";
import AskMessage from "../msgs/ask";
import AuthEamMessage from "../msgs/authEam";
import ModelMessage from "../msgs/model";
import PatternMessage from "../msgs/pattern";

export interface COMMON_MESSAGE_PROPS {
  conf: string;
}

const REGISTERED_MESSAGE: Record<string, (conf: string) => JSX.Element> = {
  ask: (conf: string) => <AskMessage conf={conf} />,
  answer: (conf: string) => <AnswerMessage conf={conf} />,
  model: (conf: string) => <ModelMessage conf={conf} />,
  pattern: (conf: string) => <PatternMessage conf={conf} />,
  authEam: (conf: string) => <AuthEamMessage conf={conf} />,
};

export interface ChatMessageProps {
  messageType: string;
  conf: string;
}

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const { messageType, conf } = props;

  const messageFunc = REGISTERED_MESSAGE[messageType];

  if (messageFunc === undefined) {
    throw new Error(`chat message type exception: ${messageType}`);
  }

  return messageFunc(conf);
};

export default ChatMessage;
