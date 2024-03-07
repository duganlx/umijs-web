const REGISTERED_MESSAGE: Record<string, (conf: string) => JSX.Element> = {
  bot: (conf: string) => <>xxx</>,
  user: (conf: string) => <>xxx</>,
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
