import { ArrowUpOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAnswerLMsg,
  setAuthEamLMsg,
  setModelLMsg,
  setPatternLMsg,
} from "../../rslices/ai/lmsg";
import { addAskHMsg } from "../../rslices/ai/hmsgs";
import { generateAnswer } from "../msgs/ask";
import { CMD_MODEL_CTRL } from "../msgs/model";
import { CMD_PATTERN_CTRL } from "../msgs/pattern";
import { CMD_AUTH_EAM_CTRL } from "../msgs/authEam";
import { triggerScrollbottomSign } from "../../rslices/ai/toBttm";
import { AskGPT } from "@/services/eam/openai";
import { getEamAuth } from "@/services/eam/utils";

const InputZone: React.FC = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>("");
  const progressing = useSelector((s: any) => s.ailmsg.value) !== null;

  const bmodel = useSelector((s: any) => s.aimodel.value);
  const bpattern = useSelector((s: any) => s.aipattern.value) as string;

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

    const ask = text.trim();
    setText("");

    if (ask.length === 0) return;

    switch (ask) {
      case CMD_MODEL_CTRL:
        dispatch(setModelLMsg({ choice: bmodel, isDone: false }));
        break;
      case CMD_PATTERN_CTRL:
        dispatch(setPatternLMsg({ choice: bpattern, isDone: false }));
        break;
      case CMD_AUTH_EAM_CTRL:
        const auth = getEamAuth();
        let lcappid = "";
        let lcappsec = "";
        if (auth !== null) {
          lcappid = auth.appid;
          lcappsec = auth.appsecret;
        }
        dispatch(setAuthEamLMsg({ appid: lcappid, appsecret: lcappsec }));
        break;
      default:
        // normal Q&A
        dispatch(addAskHMsg({ content: ask }));
        dispatch(
          setAnswerLMsg({ content: "", isThinking: true, isTyping: false })
        );
        dispatch(triggerScrollbottomSign());

        if (bmodel === "eamGpt") {
          AskGPT(ask).then((answer) => {
            dispatch(
              setAnswerLMsg({
                content: answer,
                isThinking: false,
                isTyping: true,
              })
            );
          });
        } else {
          setTimeout(() => {
            dispatch(
              setAnswerLMsg({
                content: generateAnswer(),
                isThinking: false,
                isTyping: true,
              })
            );
          }, 2000);
        }
        break;
    }
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
