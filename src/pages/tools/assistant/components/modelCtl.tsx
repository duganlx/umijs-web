import { useEmotionCss } from "@ant-design/use-emotion-css";
import NormalUserMessage from "./userMessage";
import { RobotOutlined } from "@ant-design/icons";
import { Radio, RadioChangeEvent, Space } from "antd";
import NormalBotMessage from "./botMessage";
import { InnerProps } from "./message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateBotmodel } from "../../stores-redux/assistant/botmodelSlice";
import {
  choosingBotModelCtlMessageDone,
  typingBotModelCtlMessageDone,
} from "../../stores-redux/assistant/dialogListSlice";
import { PINGEAM_EXCEPTION } from "@/services/eam/uc";

export const CMD_BotModelCtl = "chgmodel";
export const OPT_NONE = "none";
export const OPT_EAMGPT = "eamGpt";

export interface BotModelCtlProps {
  choice: "" | "eamGpt";

  isHistory: boolean;
  isChoosing: boolean;
  isDone: boolean;
}

const BotModelCtl: React.FC<BotModelCtlProps & InnerProps> = (props) => {
  const { id, choice, isHistory, isChoosing, isDone } = props;
  const botmodel = useSelector(
    (state: any) => state.aibotmodel.value
  ) as string;
  const pingEam = useSelector((state: any) => state.pingEam.value);
  const dispatch = useDispatch();

  const [checkmodel, setCheckmodel] = useState<string>(choice);

  useEffect(() => {
    if (choice == "") {
      setCheckmodel(botmodel);
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
      <NormalUserMessage content={CMD_BotModelCtl} />

      <div className={clsname}>
        <div className="avater">
          <RobotOutlined />
        </div>
        <div className="dialog-content">
          <p>The modes that AI Assistant has are as follows:</p>
          <div className="radio-zone">
            <Radio.Group
              value={checkmodel}
              onChange={(e: RadioChangeEvent) => {
                setCheckmodel(e.target.value);
              }}
              disabled={!isChoosing}
            >
              <Space direction="vertical">
                <Radio value="none">None</Radio>
                <Radio value="eamGpt" disabled={pingEam === PINGEAM_EXCEPTION}>
                  EAM GPT
                </Radio>
              </Space>
            </Radio.Group>
          </div>
          <div
            className="checkbtn"
            onClick={() => {
              dispatch(choosingBotModelCtlMessageDone(id, checkmodel));
              dispatch(updateBotmodel(checkmodel));
            }}
          >
            Check
          </div>
        </div>
      </div>

      {isChoosing ? null : (
        <NormalBotMessage
          content="Ok, The model switch is successful."
          isHistory={isHistory}
          isThinking={false}
          isTyping={!isDone}
          onTypingDone={() => {
            dispatch(typingBotModelCtlMessageDone(id));
          }}
        />
      )}
    </>
  );
};

export default BotModelCtl;
