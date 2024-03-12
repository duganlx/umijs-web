import { useEmotionCss } from "@ant-design/use-emotion-css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkEmoji from "remark-emoji";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import copy from "copy-to-clipboard";
import { CopyOutlined, RobotOutlined, SmileOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useEffect, useState } from "react";

const MarkdownView: React.FC<{ content: string }> = (props) => {
  const { content } = props;

  const clsName = useEmotionCss(() => {
    return {
      ".codezone": {
        position: "relative",

        ".dialog-copy": {
          display: "none",
        },
      },

      ".codezone:hover": {
        ".dialog-copy": {
          display: "block",
          position: "absolute",
          top: "0",
          right: "3px",
        },

        ".dialog-copy:hover": {
          cursor: "pointer",
          color: "#4096ff",
        },
      },
    };
  });

  const mdclsname = useEmotionCss(() => {
    return {
      lineHeight: 1.5,

      "h1, h2, h3, h4, h5": {
        marginTop: "8px",
      },

      ol: {
        listStyle: "decimal",
        marginLeft: "30px",
      },
      ul: {
        listStyle: "disc",
        marginLeft: "30px",
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
    <div className={clsName}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkEmoji]}
        rehypePlugins={[rehypeRaw, rehypeKatex as any]}
        className={mdclsname}
        components={{
          code({ inline, className, children, ...props1 }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div className="codezone">
                <SyntaxHighlighter
                  {...props1}
                  style={atomOneLight}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
                <div
                  className="dialog-copy"
                  onClick={() => {
                    if (copy(String(children).replace(/\n$/, ""))) {
                      message.success("copy successful");
                    } else {
                      message.error("copy failed");
                    }
                  }}
                >
                  <CopyOutlined />
                </div>
              </div>
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
        {content}
      </ReactMarkdown>
    </div>
  );
};

interface BasicProps {
  avater: "b" | "u";
  content: string;
  isThinking?: boolean;
  isTyping?: boolean;
  isShowCopyBtn?: boolean;

  onTypingDone?: () => void;
  onScrollBottom?: () => void;
}

const Basic: React.FC<BasicProps> = (props) => {
  const {
    avater,
    content,
    isThinking = false,
    isTyping = false,
    isShowCopyBtn = false,
  } = props;
  const { onTypingDone, onScrollBottom } = props;

  const [dots, setDots] = useState<string>(".");
  const [rendermsg, setRendermsg] = useState<string>(isTyping ? "" : content);

  useEffect(() => {
    // thinking mode
    if (!isThinking) return;

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
    // typing mode
    if (isThinking || content.length === rendermsg.length) {
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
    if (isThinking) return;
    if (onScrollBottom) onScrollBottom();

    if (rendermsg.length !== content.length) {
      return;
    }
    if (isTyping && onTypingDone) onTypingDone();
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
            position: "absolute",
            left: "-5px",
            top: "-15px",
            fontSize: "14px",
          },
        },
      },

      ".dialog-content:hover": {
        ".dialog-opbar": {
          display: isShowCopyBtn ? "block" : "none",

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
        {avater === "b" ? <RobotOutlined /> : null}
        {avater === "u" ? <SmileOutlined /> : null}
      </div>
      <div className="dialog-content">
        {isThinking ? (
          dots
        ) : (
          <div className="func-layer">
            <MarkdownView content={rendermsg} />
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

export default Basic;
