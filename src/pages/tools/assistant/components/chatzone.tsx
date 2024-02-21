import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import { PauseCircleOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  pushBotModeCtlMessage,
  pushBotModelCtlMessage,
  pushNormalBotMessage,
  pushNormalUserMessage,
  thinkingNormalBotMessageDone,
} from "../redux/msglistSlice";
import WrapMessage, { WrapMessageProps } from "./message";
import { CMD_BotModeCtl } from "./modeCtl";
import { CMD_BotModelCtl, OPT_EAMGPT } from "./modelCtl";
import { generateFixBotAnswer } from "./botMessage";
import { triggerScrollbottomSign } from "../redux/scrollbottomSlice";
import { AskGPT } from "@/services/eam/openai";

const { TextArea } = Input;
const welcome = `
Welcome to the AI Assistant, no model is currently selected, so it cannot help you yet, please use the following command to select a model: "${CMD_BotModelCtl}".\n
For now, no matter what you ask, the AI assistant will only recite to you the content of a certain chapter of the Tao Te Ching. Have fun using it. ^_^`;

interface ChatZoneProps {
  isFullscreen: boolean;
}

const ChatZone: React.FC<ChatZoneProps> = (props) => {
  const { isFullscreen } = props;

  const dispatch = useDispatch();
  const msglist = useSelector((state: any) => state.msglist.value) as any[];
  const botmodel = useSelector((state: any) => state.botmodel.value);
  const scrollbottom = useSelector((state: any) => state.scrollbottom.value);

  const [text, setText] = useState<string>("");
  const [progressing, setProgressing] = useState<boolean>(false);
  const [inputzoneHeight, setInputzoneHeight] = useState<number>(36);
  const dialogzoneRef = useRef<HTMLDivElement>(null);
  const inputzoneRef = useRef<HTMLDivElement>(null);

  // console.log("chatzone", msglist);
  useEffect(() => {
    if (isFullscreen || msglist.length > 0) {
      return;
    }

    // 欢迎信息
    dispatch(
      pushNormalBotMessage({
        content: welcome,
        isThinking: false,
        isTyping: true,
      })
    );
  }, []);

  useEffect(() => {
    if (!inputzoneRef.current) {
      return;
    }

    // 监听输入框高度变化
    const resizeObserver = new ResizeObserver(() => {
      if (!inputzoneRef.current) {
        return;
      }

      const curZHeight = inputzoneRef.current.offsetHeight;
      setInputzoneHeight(curZHeight);
    });
    resizeObserver.observe(inputzoneRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!dialogzoneRef.current) {
      return;
    }

    dialogzoneRef.current.scroll({
      top: dialogzoneRef.current.scrollHeight,
      behavior: "instant",
    });
  }, [scrollbottom]);

  const clsname = useEmotionCss(() => {
    return {
      border: "1px solid #f0f0f0",
      height: isFullscreen ? "calc(100% - 10px)" : "400px",
      borderRadius: "3px",

      ".dialog-zone": {
        height: isFullscreen
          ? `calc(100% - 9px - ${inputzoneHeight}px)`
          : `calc(400px - 9px - ${inputzoneHeight}px)`,
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
        padding: "2px 0 2px",
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
          marginRight: "2px",

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

      ".input-zone-fullscreen": {
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
          marginBottom: "1px",

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
    };
  });

  const handleSubmit = () => {
    if (progressing) {
      return;
    }

    const askquestion = text.trim();
    setText("");
    setProgressing(true);

    if (askquestion === CMD_BotModeCtl) {
      dispatch(
        pushBotModeCtlMessage({
          choice: "",
          isChoosing: true,
          isDone: false,
        })
      );

      setProgressing(false);
    } else if (askquestion === CMD_BotModelCtl) {
      dispatch(
        pushBotModelCtlMessage({
          choice: "",
          isChoosing: true,
          isDone: false,
        })
      );

      setProgressing(false);
    } else {
      // 普通问题
      dispatch(pushNormalUserMessage({ content: askquestion }));
      dispatch(
        pushNormalBotMessage({
          content: "",
          isThinking: true,
          isTyping: false,
        })
      );
      // todo 访问gpt接口
      if (botmodel === OPT_EAMGPT) {
        AskGPT(askquestion)
          .then((answer) => {
            dispatch(thinkingNormalBotMessageDone(answer));
          })
          .finally(() => {
            setProgressing(false);
          });
      } else {
        // 默认

        setTimeout(() => {
          dispatch(generateFixBotAnswer());
          setProgressing(false);
        }, 1500);
      }
    }

    dispatch(triggerScrollbottomSign());
  };

  return (
    <div className={clsname}>
      <div ref={dialogzoneRef} className="dialog-zone">
        {msglist.map((msgprops: WrapMessageProps, index: number) => (
          <WrapMessage key={index} id={index} {...msgprops} />
        ))}
      </div>
      <div className="input-zone" ref={inputzoneRef}>
        <TextArea
          autoSize={{ minRows: 1, maxRows: 3 }}
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
  );
};

export default ChatZone;
