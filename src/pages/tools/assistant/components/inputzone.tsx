import { PauseCircleOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import TextArea from "antd/es/input/TextArea";
import { LegacyRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CMD_BotModeCtl } from "./modeCtl";
import { AskGPT } from "@/services/eam/openai";
import { PINGEAM_NOAUTH } from "@/services/eam/uc";
import {
  pushBotModeCtlMessage,
  pushBotModelCtlMessage,
  pushNormalUserMessage,
} from "../../stores-redux/assistant/dialogListSlice";
import { triggerScrollbottomSign } from "../../stores-redux/assistant/scrollbottomSlice";
import { generateMdBoxAnswer, generateFixBotAnswer } from "./botMessage";
import { CMD_EamLoginCtl } from "./eamLoginCtl";
import { CMD_BotModelCtl, OPT_EAMGPT } from "./modelCtl";
import {
  botCmdEamLoginDoing,
  v2_botThinking,
  v2_botThinkingDone,
} from "../../stores-redux/assistant/latestmsgSlice";

interface InputZoneProps {}

const InputZone: React.FC<InputZoneProps> = (props) => {
  console.log("3 InputZone");
  const {} = props;
  const dispatch = useDispatch();
  const botmodel = useSelector((state: any) => state.aibotmodel.value);
  const pingEam = useSelector((state: any) => state.pingEam.value);

  const [text, setText] = useState<string>("");
  const [progressing, setProgressing] = useState<boolean>(false);

  const clsname = useEmotionCss(() => {
    return {
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
    } else if (askquestion === CMD_EamLoginCtl) {
      // dispatch(
      //   pushEamLoginCtlMessage({
      //     appid: "",
      //     appsecret: "",
      //     isBot: false,
      //     isFirst: true,
      //     isValid: false,
      //     isCancel: false,
      //     isDone: false,
      //   })
      // );
      dispatch(
        botCmdEamLoginDoing({
          appid: "",
          appsecret: "",
          isBot: false,
          isFirst: true,
          isValid: false,
          isCancel: false,
          isDone: false,
        })
      );
      setProgressing(false);
    } else {
      // 普通问题
      dispatch(pushNormalUserMessage({ content: askquestion }));
      // dispatch(
      //   pushNormalBotMessage({
      //     content: "",
      //     isThinking: true,
      //     isTyping: false,
      //   })
      // );
      dispatch(v2_botThinking());

      if (botmodel === OPT_EAMGPT) {
        if (pingEam === PINGEAM_NOAUTH) {
          const content = `Sorry, you are not able to use the model because you are not logged in to EAM yet, please enter the command "${CMD_EamLoginCtl}" to log in.`;
          // dispatch(thinkingNormalBotMessageDone(content));
          dispatch(v2_botThinkingDone(content));
          setProgressing(false);
        } else {
          AskGPT(askquestion)
            .then((answer) => {
              // dispatch(thinkingNormalBotMessageDone(answer));
              dispatch(v2_botThinkingDone(answer));
            })
            .finally(() => {
              setProgressing(false);
            });
        }
      } else {
        if (askquestion === "md") {
          setTimeout(() => {
            dispatch(generateMdBoxAnswer());
            setProgressing(false);
          }, 1500);
        } else {
          // 默认: 输出道德经
          setTimeout(() => {
            dispatch(generateFixBotAnswer());
            setProgressing(false);
          }, 1500);
        }
      }
    }

    dispatch(triggerScrollbottomSign());
  };

  return (
    <div className={clsname}>
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
  );
};

export default InputZone;
