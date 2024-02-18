import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { PauseCircleOutlined, ArrowUpOutlined } from "@ant-design/icons";
import NormalBotMessage from "./botMessage";
import NormalUserMessage from "./userMessage";
import BotModeCtl from "./modeCtl";
import BotModelCtl from "./modelCtl";
import { useSelector, useDispatch } from "react-redux";
import { pushNormalBotMessage } from "../redux/msglistSlice";

const { TextArea } = Input;

interface ChatZoneProps {}

const ChatZone: React.FC<ChatZoneProps> = (props) => {
  const [text, setText] = useState<string>("");
  const [progressing, setProgressing] = useState<boolean>(false);

  const msglist = useSelector((state: any) => state.msglist.value);
  const dispatch = useDispatch();

  console.log("chatzone", msglist);
  useEffect(() => {
    console.log("--1");
    dispatch(
      pushNormalBotMessage({ mode: "normal", normalprops: { role: "bot" } })
    );
    dispatch(pushNormalBotMessage({ mode: "special" }));
  }, []);

  const clsname = useEmotionCss(() => {
    return {
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
    };
  });

  return (
    <div className={clsname}>
      <div className="dialog-zone">
        <NormalBotMessage
          content="chgmode"
          isThinking={false}
          isTyping={false}
        />
        <NormalBotMessage content="" isThinking={true} isTyping={false} />
        <NormalBotMessage
          content="知人者智，自知者明。胜人者有力，自胜者强。知足者富，强行者有志，不失其所者久，死而不亡者寿。"
          isThinking={false}
          isTyping={true}
        />
        <NormalUserMessage content="我是谁？我从哪里来？我要哪儿去？" />
        <BotModeCtl isFinish={false} />
        <BotModelCtl isFinish={false} />
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
                // handleSubmit();
              }
            }
          }}
          disabled={progressing}
        />
        <div className="btn-zone">
          <div
            className="btn"
            onClick={() => {
              // handleSubmit();
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
