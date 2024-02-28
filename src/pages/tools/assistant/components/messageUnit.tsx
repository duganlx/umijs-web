import { CopyOutlined, RobotOutlined, SmileOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import MdZone from "./mdzone";
import copy from "copy-to-clipboard";

interface BotUnitMessageProps {
  content: string;

  isThinking: boolean;
  isTyping: boolean;

  onTypingDone?: () => void;
  scrollbottomSign?: () => void;
}

const BotUnitMessage: React.FC<BotUnitMessageProps> = (props) => {
  const { content, isThinking, isTyping } = props;
  const { onTypingDone, scrollbottomSign } = props;

  const [dots, setDots] = useState<string>(".");
  const [rendermsg, setRendermsg] = useState<string>(isTyping ? "" : content);

  useEffect(() => {
    if (!isThinking) {
      return;
    }

    const interval = setInterval(() => {
      setDots((prevDots) => {
        return prevDots.length < 3 ? prevDots + "." : ".";
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isThinking]);

  useEffect(() => {
    if (isThinking) {
      return;
    }
    if (content.length === rendermsg.length) {
      return;
    }

    const interval = setInterval(() => {
      setRendermsg((prevContent) => {
        const nextchar = content[prevContent.length];

        if (nextchar !== undefined) {
          return prevContent + nextchar;
        }

        return prevContent;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [content]);

  useEffect(() => {
    // typing
    if (isThinking) {
      return;
    }
    if (rendermsg.length !== content.length) {
      return;
    }

    if (isTyping && onTypingDone) {
      onTypingDone();
    }
  }, [rendermsg]);

  useEffect(() => {
    if (scrollbottomSign) {
      scrollbottomSign();
    }
  }, [rendermsg]);

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "8px",
      marginTop: "8px",

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

        ".func-layer": {
          position: "relative",

          ".dialog-opbar": {
            display: "none",
          },
        },
      },

      ".dialog-content:hover": {
        ".dialog-opbar": {
          display: "block",
          position: "absolute",
          left: "-5px",
          top: "-15px",
          fontSize: "14px",

          ".dialog-copy:hover": {
            cursor: "pointer",
            color: "#4096ff",
          },
        },
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="avater">
        <RobotOutlined />
      </div>
      <div className="dialog-content">
        {isThinking ? (
          dots
        ) : (
          <div className="func-layer">
            <MdZone content={rendermsg} />
            <div className="dialog-opbar">
              <div
                className="dialog-copy"
                onClick={() => {
                  if (copy(content)) {
                    message.success("copy successful");
                  } else {
                    message.error("copy failed");
                  }
                }}
              >
                <CopyOutlined />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface UserUnitMessageProps {
  content: string;
}

const UserUnitMessage: React.FC<UserUnitMessageProps> = (props) => {
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

export { BotUnitMessage, UserUnitMessage };
