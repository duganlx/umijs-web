import { RobotOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import NormalUserMessage from "./userMessage";
import { Radio, RadioChangeEvent, Space } from "antd";
import NormalBotMessage from "./botMessage";
import { InnerProps } from "./message";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBotmode } from "../../stores-redux/assistant/botmodeSlice";
import {
  choosingBotModeCtlMessageDone,
  typingBotModeCtlMessageDone,
} from "../../stores-redux/assistant/msglistSlice";

export const CMD_BotModeCtl = "chgmode";

export interface BotModeCtlProps {
  choice: "" | "normal" | "translator" | "webdeveloper";

  isChoosing: boolean;
  isDone: boolean;
}

const BotModeCtl: React.FC<BotModeCtlProps & InnerProps> = (props) => {
  const { id, choice, isChoosing, isDone } = props;
  const botmode = useSelector((state: any) => state.aibotmode.value) as string;
  const dispatch = useDispatch();

  const [checkmode, setCheckmode] = useState<string>(choice);

  useEffect(() => {
    if (choice == "") {
      setCheckmode(botmode);
    }
  }, [choice]);

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

      ".radio-zone": {
        margin: "5px 2px 5px 5px",
      },

      ".checkbtn": {
        width: "39px",
        cursor: "pointer",
        userSelect: "none",
        display: isChoosing ? "block" : "none",
      },

      ".checkbtn:hover": {
        textDecoration: "underline",
      },
    };
  });

  return (
    <>
      <NormalUserMessage content={CMD_BotModeCtl} />

      <div className={clsname}>
        <div className="avater">
          <RobotOutlined />
        </div>
        <div className="dialog-content">
          <p>The modes that AI Assistant has are as follows:</p>
          <div className="radio-zone">
            <Radio.Group
              value={checkmode}
              onChange={(e: RadioChangeEvent) => {
                setCheckmode(e.target.value);
              }}
              disabled={!isChoosing}
            >
              <Space direction="vertical">
                <Radio value="normal">Normal</Radio>
                <Radio value="translator">Translator</Radio>
                <Radio value="webdeveloper">Web developer</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div
            className="checkbtn"
            onClick={() => {
              dispatch(choosingBotModeCtlMessageDone(id, checkmode));
              dispatch(updateBotmode(checkmode));
            }}
          >
            Check
          </div>
        </div>
      </div>

      {isChoosing ? null : (
        <NormalBotMessage
          content="Ok, The mode switch is successful."
          isThinking={false}
          isTyping={!isDone}
          onTypingDone={() => {
            dispatch(typingBotModeCtlMessageDone(id));
          }}
        />
      )}
    </>
  );
};

export default BotModeCtl;
