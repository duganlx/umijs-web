/**
 * 需求明确：
 * 1. 不需要查询历史数据
 * 2. 支持 "模式切换" "模型切换" 使用机器人对话的方式进行更新
 * 3. 全屏展示时只需要进行对话功能
 */
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
  PauseCircleOutlined,
  RobotOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import {
  Button,
  Input,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
  Tooltip,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

const { TextArea } = Input;

interface DialogMessageProps {
  who: "bot" | "user"; // 角色
  mode?: "normal" | "special"; // 模式, special 用于指令模式
  msg?: string; // 消息
  isDotMode?: boolean; // "..." 思考状态
  isTypingMode?: boolean; // 打字状态
  specialMsg?: JSX.Element; // 在 mode=special 时生效

  onTypingDone?: () => void; // 打字完成时调用
}

const DialogMessage: React.FC<DialogMessageProps> = (props) => {
  const {
    who,
    mode = "normal",
    msg = "",
    isTypingMode = false,
    isDotMode = false,
    specialMsg = <></>,
    onTypingDone,
  } = props;

  const [dots, setDots] = useState<string>(".");
  const [rendermsg, setRendermsg] = useState<string>(isTypingMode ? "" : msg);

  useEffect(() => {
    if (!isDotMode) {
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
  }, [isDotMode]);

  useEffect(() => {
    if (isDotMode) {
      return;
    }
    if (msg.length === rendermsg.length) {
      return;
    }

    const interval = setInterval(() => {
      setRendermsg((prevContent) => {
        const nextchar = msg[prevContent.length];

        if (nextchar !== undefined) {
          return prevContent + nextchar;
        }

        return prevContent;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [msg]);

  useEffect(() => {
    if (isDotMode) {
      return;
    }
    if (rendermsg.length !== msg.length) {
      return;
    }

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
        {who == "bot" ? <RobotOutlined /> : <SmileOutlined />}
      </div>
      {mode == "normal" ? (
        <div className="dialog-content">
          {isDotMode ? (
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
      ) : (
        <div className="dialog-content">{specialMsg}</div>
      )}
    </div>
  );
};

interface QADialogMessageProps {
  question: string;
  answer: string;
  loading: boolean; // 是否处于加载状态
  history: boolean; // 是否是历史对话
  onlyAnswer?: boolean; // 是否只有回复

  beHistory: () => void;
}
const QADialogMessage: React.FC<QADialogMessageProps> = (props) => {
  const {
    question,
    answer,
    loading,
    history,
    onlyAnswer = false,
    beHistory,
  } = props;

  const [dots, setDots] = useState<string>(".");
  const [rendAnswer, setRendAnswer] = useState<string>(
    history ? answer : answer[0]
  );

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

  useEffect(() => {
    if (loading) {
      return;
    }
    if (rendAnswer.length === answer.length) {
      return;
    }

    const interval = setInterval(() => {
      setRendAnswer((prevContent) => {
        const nextchar = answer[prevContent.length];

        if (nextchar !== undefined) {
          return prevContent + nextchar;
        }

        return prevContent;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [answer]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (rendAnswer.length !== answer.length) {
      return;
    }

    beHistory();
  }, [rendAnswer]);

  const clsname = useEmotionCss(() => {
    return {
      ".msg": {
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
        },
      },
    };
  });

  return (
    <div className={clsname}>
      {onlyAnswer ? null : <DialogMessage who="user" msg={question} />}
      {question == "show model" ? (
        <DialogMessage
          who="bot"
          mode="special"
          specialMsg={
            <>
              <p>The models that currently exist are as follows:</p>
              <div style={{ margin: "5px 2px 8px 5px" }}>
                <Radio.Group
                  onChange={(e: RadioChangeEvent) => {
                    console.log(e.target.value);
                  }}
                >
                  <Space direction="vertical">
                    <Radio value="eam_gpt3.5">EAM GPT-3.5</Radio>
                    <Radio value="eam_gpt4.0">EAM GPT-4.0</Radio>
                  </Space>
                </Radio.Group>
              </div>
              <div
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => {
                  console.log("--x");
                }}
              >
                Check
              </div>
            </>
          }
        />
      ) : (
        <DialogMessage who="bot" msg={rendAnswer} isTypingMode={false} />
      )}
    </div>
  );
};

type QAItem = {
  question: string;
  answer: string;
  history: boolean;
  onlyAnswer: boolean;
};

type QAAItem = {
  cmd: string;
};

interface AiAssistantViewProps {
  layoutsize: [number, number];
}

const AiAssistantView: React.FC<AiAssistantViewProps> = (props) => {
  const { layoutsize } = props;
  const [hwins, wwins] = layoutsize;

  const [text, setText] = useState<string>("");
  const [QAlist, setQAlist] = useState<QAItem[]>([]);
  const [scrollbottomSign, setScrollbottomSign] = useState<boolean>(false);
  const [progressing, setProgressing] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const dialogzoneRef = useRef<HTMLDivElement>(null);
  const mdialogzoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const greeting: QAItem = {
      question: "",
      answer: "Hello, may I help you?",
      history: false,
      onlyAnswer: true,
    };

    const modelopt: QAItem = {
      question: "show model",
      answer: "Hello, may I help you?",
      history: false,
      onlyAnswer: false,
    };

    setQAlist([greeting, modelopt]);
    setScrollbottomSign(!scrollbottomSign);
  }, []);

  useEffect(() => {
    if (!dialogzoneRef.current) {
      return;
    }

    dialogzoneRef.current.scroll({
      top: dialogzoneRef.current.scrollHeight,
      behavior: "instant",
    });
  }, [scrollbottomSign]);

  useEffect(() => {
    if (!mdialogzoneRef.current) {
      return;
    }

    mdialogzoneRef.current.scroll({
      top: mdialogzoneRef.current.scrollHeight,
      behavior: "instant",
    });
  }, [scrollbottomSign, mdialogzoneRef.current]);

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      flexDirection: "column",
      marginTop: "5px",

      ".operbar": {
        display: "flex",
        marginBottom: "5px",
        alignItems: "center",

        ".help": {
          userSelect: "none",
          marginRight: "8px",
          cursor: "pointer",
          textDecorationLine: "underline",
          textDecorationStyle: "wavy",
        },

        ".title": {
          marginRight: "5px",
        },

        ".ant-select": {
          width: "125px",
          marginRight: "20px",
        },

        ".opitem": {
          cursor: "pointer",
          userSelect: "none",
          marginRight: "8px",
        },

        ".opitem:hover": {
          textDecoration: "underline",
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

          "&::-webkit-scrollbar": {
            width: "5px",
            backgroundColor: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#d9d9d9",
            borderRadius: "5px",
          },
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
              color: progressing ? "black" : "white",
              backgroundColor: progressing ? "white" : "black",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },

            ".btn:hover": {
              cursor: progressing ? "not-allowed" : "pointer",
            },

            ".progressingbtn": {
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
          },
        },
      },
    };
  });

  const fsclsname = useEmotionCss(() => {
    return {
      top: "5vh",
      margin: "0px 6vw",

      ".ant-modal-content": {
        width: "86vw",
        height: "90vh",

        padding: "8px 10px",

        ".ant-modal-header > .ant-modal-title": {
          fontSize: "18px",
        },

        ".ant-modal-close": {
          top: "10px",
        },
      },

      ".ant-modal-body": {
        height: "calc(100% - 40px)",
        border: "1px solid #f0f0f0",
      },

      ".modalcontent": {
        width: "100%",
        height: "100%",

        ".chat-zone": {
          border: "1px solid #f0f0f0",
          height: "100%",

          ".dialog-zone": {
            height: "calc(100% - 85px)",
            padding: "5px 13px",
            overflow: "auto",
            marginBottom: "5px",

            "&::-webkit-scrollbar": {
              width: "5px",
              backgroundColor: "white",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d9d9d9",
              borderRadius: "5px",
            },
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
                color: progressing ? "black" : "white",
                backgroundColor: progressing ? "white" : "black",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },

              ".btn:hover": {
                cursor: progressing ? "not-allowed" : "pointer",
              },

              ".progressingbtn": {
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
            },
          },
        },
      },
    };
  });

  const handleSubmit = () => {
    if (progressing) {
      return;
    }

    const askquestion = text.trim();
    if (askquestion == "show model") {
      const nqaitem: QAItem = {
        question: askquestion,
        answer: "",
        history: false,
        onlyAnswer: false,
      };

      const latestQAlist = [...QAlist, nqaitem];
      setQAlist(latestQAlist);
    }

    const nqaitem: QAItem = {
      question: text,
      answer: "",
      history: false,
      onlyAnswer: false,
    };
    console.log(nqaitem);
    // const latestQAlist = [...QAlist, nqaitem];
    // setQAlist(latestQAlist);
    setText("");
    // setScrollbottomSign(!scrollbottomSign);
    // setProgressing(true);

    // SendChatMsg({
    //   msg: askquestion,
    //   agentId: "1559730848930992128_1699580365106",
    //   model: "gpt-4-1106-preview",
    // })
    //   .then((res: any) => {
    //     if (res.code !== 0) {
    //       latestQAlist[latestQAlist.length - 1].answer = "<p></p>";
    //       setQAlist([...latestQAlist]);
    //       return;
    //     }

    //     latestQAlist[latestQAlist.length - 1].answer = res.data.msg;
    //     setQAlist([...latestQAlist]);
    //   })
    //   .finally(() => {
    //     setProgressing(false);
    //   });
  };

  return (
    <>
      <div className={clsname}>
        <div className="operbar">
          <Tooltip
            className="help"
            color="white"
            title={
              <div style={{ color: "black" }}>
                <p>show model: 显示可用的模型</p>
              </div>
            }
          >
            instruction
          </Tooltip>
          <div className="title">opers:</div>
          <div
            className="opitem"
            onClick={() => {
              setFullscreen(true);
              setScrollbottomSign(!scrollbottomSign);
            }}
          >
            full-screen
          </div>
        </div>
        <div className="chat-zone">
          <div ref={dialogzoneRef} className="dialog-zone">
            {/* {QAlist.map((item, i) => {
              return (
                <QADialogMessage
                  key={item.question + item.answer}
                  question={item.question}
                  answer={item.answer}
                  loading={item.answer.length == 0}
                  history={item.history}
                  onlyAnswer={item.onlyAnswer}
                  beHistory={() => {
                    const nQAlist = [...QAlist];
                    nQAlist[i].history = true;
                    setQAlist(nQAlist);
                  }}
                />
              );
            })} */}
            <DialogMessage
              who="bot"
              msg={"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
              isTypingMode={true}
            />
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
              disabled={progressing}
            />
            <div className="btn-zone">
              <div
                className="btn"
                onClick={() => {
                  handleSubmit();
                }}
              >
                {progressing ? <PauseCircleOutlined /> : <ArrowUpOutlined />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className={fsclsname}
        title={"AI Assistant"}
        open={fullscreen}
        onCancel={() => {
          setFullscreen(false);
        }}
        footer={null}
        destroyOnClose={true}
      >
        <div className="modalcontent">
          <div className="chat-zone">
            <div ref={mdialogzoneRef} className="dialog-zone">
              {/* {QAlist.map((item, i) => {
                return (
                  <QADialogMessage
                    key={item.question + item.answer}
                    question={item.question}
                    answer={item.answer}
                    loading={item.answer.length == 0}
                    history={item.history}
                    beHistory={() => {
                      const nQAlist = [...QAlist];
                      nQAlist[i].history = true;
                      setQAlist(nQAlist);
                    }}
                  />
                );
              })} */}
              <DialogMessage
                who={"bot"}
                msg={"xxx"}
                isDotMode={false}
                isTypingMode={false}
                onTypingDone={() => {
                  console.log("--1");
                }}
              />
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
                disabled={progressing}
              />
              <div className="btn-zone">
                <div
                  className="btn"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  {progressing ? <PauseCircleOutlined /> : <ArrowUpOutlined />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AiAssistantView;
