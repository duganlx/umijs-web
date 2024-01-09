import { ListChat, SendChatMsg } from "@/services/eam/openai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkEmoji from "remark-emoji";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  ArrowUpOutlined,
  RobotOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Select, Input, message } from "antd";
import React, { useEffect, useState } from "react";

const { TextArea } = Input;

interface DialogMessageProps {
  question: string;
  answer: string;
  loading: boolean;
}

const DialogMessage: React.FC<DialogMessageProps> = (props) => {
  const { question, answer, loading } = props;

  const [dots, setDots] = useState<string>(".");
  const [rendAnswer, setRendAnswer] = useState<string>(answer);

  useEffect(() => {
    if (!loading) {
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
  }, [loading]);

  // useEffect(() => {
  //   if (loading) {
  //     return;
  //   }
  //   if (rendAnswer.length === answer.length) {
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     setRendAnswer((prevContent) => {
  //       const nextchar = answer[prevContent.length];

  //       if (nextchar !== undefined) {
  //         return prevContent + nextchar;
  //       }

  //       return prevContent;
  //     });
  //   }, 90);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [answer]);

  const clsname = useEmotionCss(() => {
    return {
      ".msg": {
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "8px",

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
        },
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
    };
  });

  return (
    <div className={clsname}>
      <div className="msg">
        <div className="avater">
          <SmileOutlined />
        </div>
        <div className="dialog-content">{question}</div>
      </div>
      <div className="msg">
        <div className="avater">
          <RobotOutlined />
        </div>
        <div className="dialog-content">
          {loading ? (
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
              {rendAnswer}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

interface AiAssistantViewProps {
  layoutsize: [number, number];
}

const AiAssistantView: React.FC<AiAssistantViewProps> = (props) => {
  const { layoutsize } = props;
  const [hwins, wwins] = layoutsize;

  const [mode, setMode] = useState<string>("translation");
  const [model, setModel] = useState<string>("gpt3.5");
  const [text, setText] = useState<string>("");
  const [QAlist, setQAlist] = useState<[string, string][]>([]);

  useEffect(() => {
    ListChat({
      agentId: ["1559730848930992128_1699580365106"],
      userId: "1559730848930992128",
    }).then((res) => {
      if (res.code !== 0) {
        message.error("listChat failed");
        return;
      }
      const qal = res.data.result
        .map((item) => {
          return [item.question, item.answer] as [string, string];
        })
        .reverse();

      setQAlist(qal);
    });

    // SendChatMsg({
    //   msg: "你好",
    //   agentId: "1559730848930992128_1699580365106",
    //   model: "gpt-4-1106-preview",
    // }).then((res: any) => {
    //   console.log(res);
    // });
  }, []);

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      flexDirection: "column",
      marginTop: "5px",

      ".operbar": {
        display: "flex",
        justifyItems: "center",
        marginBottom: "5px",

        ".title": {
          marginRight: "5px",
        },

        ".ant-select": {
          width: "125px",
          marginRight: "20px",
        },
      },
      ".chat-zone": {
        border: "1px solid #f0f0f0",
        height: "400px",

        ".dialog-zone": {
          height: "calc(400px - 85px)",
          padding: "5px 13px",
          overflow: "auto",
          marginBottom: "5px",
        },

        ".input-zone": {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          border: "1px solid #d9d9d9",
          borderRadius: "6px",
          margin: "0 5px",

          textarea: {
            "&::-webkit-scrollbar": {
              width: "5px",
              backgroundColor: "white",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d9d9d9",
              borderRadius: "5px",
            },
          },

          "textarea:focus": {
            boxShadow: "none",
          },

          ".btn-zone": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            marginLeft: "6px",
            marginRight: "5px",
            marginBottom: "5px",

            ".btn": {
              width: "30px",
              height: "30px",
              borderRadius: "6px",
              color: "white",
              backgroundColor: "black",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },

            ".btn:hover": {
              cursor: "pointer",
            },
          },
        },
      },
    };
  });

  const handleSubmit = () => {
    console.log("submit", text);
    setText("");
  };

  return (
    <div className={clsname}>
      <div className="operbar">
        <div className="title">mode:</div>
        <Select
          size="small"
          onChange={(value: string) => {
            setMode(value);
          }}
          options={[
            { value: "translation", label: "Translation" },
            { value: "FE", label: "Frontend" },
            { value: "BE", label: "Backend" },
            { value: "DA", label: "Data Analysis" },
          ]}
          value={mode}
        />
        <div className="title">model:</div>
        <Select
          size="small"
          onChange={(value: string) => {
            setModel(value);
          }}
          options={[
            { value: "gpt35", label: "gpt-3.5" },
            { value: "gpt40", label: "gpt-4" },
          ]}
          value={model}
        />
      </div>
      <div className="chat-zone">
        <div className="dialog-zone">
          {QAlist.map((item) => {
            return (
              <DialogMessage
                question={item[0]}
                answer={item[1]}
                loading={item[1].length == 0}
              />
            );
          })}
        </div>
        <div className="input-zone">
          <TextArea
            rows={3}
            value={text}
            style={{
              border: 0,
              resize: "none",
            }}
            onChange={(eve) => setText(eve.target.value)}
            onKeyDown={(eve) => {
              if (eve.key === "Enter") {
                if (eve.ctrlKey) {
                  setText((prevText) => prevText + "\n");
                } else {
                  eve.preventDefault();
                  handleSubmit();
                }
              }
            }}
          />
          <div className="btn-zone">
            <div
              className="btn"
              onClick={() => {
                handleSubmit();
              }}
            >
              <ArrowUpOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantView;
