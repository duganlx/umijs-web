import { RobotOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkEmoji from "remark-emoji";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface NormalBotMessageProps {
  content: string;

  isThinking: boolean;
  isTyping: boolean;

  onTypingDone?: () => void;
}

interface innerProps {
  id: number;
}

const NormalBotMessage: React.FC<NormalBotMessageProps & innerProps> = (
  props
) => {
  const { id, content, isThinking, isTyping, onTypingDone } = props;

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
    if (isThinking) {
      return;
    }
    if (rendermsg.length !== content.length) {
      return;
    }

    // todo 控制打字参数直接直接设置
    if (onTypingDone) {
      onTypingDone();
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
      },
    };
  });

  const mdclsname = useEmotionCss(() => {
    return {
      lineHeight: 1.5,

      ol: {
        listStyle: "decimal",
        marginLeft: "30px",
      },
      ul: {
        listStyle: "disc",
      },
      "ul.contains-task-list": {
        listStyle: "none",
        paddingInlineStart: "30px",
      },
      pre: {
        margin: "5px 0",
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath, remarkEmoji]}
            rehypePlugins={[rehypeRaw, rehypeKatex as any]}
            className={mdclsname}
            components={{
              code({ inline, className, children, ...props1 }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props1}
                    style={atomOneLight}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props1} className={className}>
                    {children}
                  </code>
                );
              },
              a({ children, href }) {
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                );
              },
            }}
          >
            {rendermsg}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default NormalBotMessage;
