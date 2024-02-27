import React from "react";
import UnitMessage from "./messageUnit";
import { useDispatch } from "react-redux";
import { pushNormalBotMessage } from "../../stores-redux/assistant/dialogListSlice";
import { botTypingDone } from "../../stores-redux/assistant/latestmsgSlice";
import { SmileOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";

interface BotSimpleMessageProps {
  content: string;

  isHistory: boolean;
  isThinking: boolean;
  isTyping: boolean;
}

const BotSimpleMessage: React.FC<BotSimpleMessageProps> = (props) => {
  const { content, isHistory, isThinking, isTyping } = props;
  const dispatch = useDispatch();

  return (
    <UnitMessage
      role="bot"
      botProps={{
        content,
        isHistory,
        isThinking,
        isTyping,
        onTypingDone: () => {
          dispatch(
            pushNormalBotMessage({
              content: content,
              isHistory: true,
              isThinking: false,
              isTyping: false,
            })
          );

          dispatch(botTypingDone());
        },
      }}
    />
  );
};

interface UserSimpleMessageProps {
  content: string;
}

const UserSimpleMessage: React.FC<UserSimpleMessageProps> = (props) => {
  const { content } = props;

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "8px",
      marginTop: "8px",
      lineHeight: 1.5,

      ".avater": {
        marginTop: "10px",
        marginRight: "5px",
        fontSize: "16px",
        height: "100%",
      },

      ".dialog-content": {
        border: "1px solid rgb(204, 204, 204)",
        borderRadius: "8px",
        padding: "7px 10px",
        backgroundColor: "rgb(240, 240, 240)",
        fontSize: "14px",
        minHeight: "37px",
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="avater">
        <SmileOutlined />
      </div>
      <div className="dialog-content">
        <pre>{content}</pre>
      </div>
    </div>
  );
};

export { BotSimpleMessage, UserSimpleMessage };
