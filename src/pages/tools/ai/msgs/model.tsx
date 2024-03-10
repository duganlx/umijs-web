import { useEmotionCss } from "@ant-design/use-emotion-css";
import { COMMON_MESSAGE_PROPS } from "../components/cmsg";
import Basic from "./basic";
import { RobotOutlined } from "@ant-design/icons";
import { Radio, RadioChangeEvent, Space } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addModelHMsg } from "../../rslices/ai/hmsgs";
import { ceLatestMsg } from "../../rslices/ai/lmsg";

export const CMD_MODEL_CTRL = "chgmodel";

export interface ModelMessageProps {
  choice: "" | "eamGpt";

  isDone: boolean;
}

const ModelMessage: React.FC<COMMON_MESSAGE_PROPS> = (props) => {
  const { conf } = props;
  const confobj = JSON.parse(conf);
  const { choice, isDone } = confobj;

  const dispatch = useDispatch();

  const [checkmodel, setCheckmodel] = useState<string>(choice);
  const [isChoosing, setIsChoosing] = useState<boolean>(!isDone);

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
      <Basic avater="u" content={CMD_MODEL_CTRL} />

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
                {/* disabled={pingEam === PINGEAM_EXCEPTION} */}
                <Radio value="eamGpt">EAM GPT</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div
            className="checkbtn"
            onClick={() => {
              setIsChoosing(false);
            }}
          >
            Check
          </div>
        </div>
      </div>

      {isChoosing ? null : (
        <Basic
          avater="b"
          content="Ok, The model switch is successful."
          isThinking={false}
          isTyping={!isDone}
          onTypingDone={() => {
            const cm = checkmodel as "" | "eamGpt";
            dispatch(addModelHMsg(cm));
            dispatch(ceLatestMsg());
          }}
        />
      )}
    </>
  );
};

export default ModelMessage;
