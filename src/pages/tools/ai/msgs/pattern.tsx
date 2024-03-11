import { useDispatch } from "react-redux";
import { COMMON_MESSAGE_PROPS } from "../components/cmsg";
import Basic from "./basic";
import { RobotOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useEffect, useState } from "react";
import { Radio, RadioChangeEvent, Space } from "antd";
import { ceLatestMsg } from "../../rslices/ai/lmsg";
import { addPatternHMsg } from "../../rslices/ai/hmsgs";
import { triggerScrollbottomSign } from "../../rslices/ai/toBttm";
import { updateBotPattern } from "../../rslices/ai/pattern";

export const CMD_PATTERN_CTRL = "chgpattern";

export interface PatternMessageProps {
  choice: "" | "normal" | "translator" | "webdeveloper";

  isDone: boolean;
}

const PatternMessage: React.FC<COMMON_MESSAGE_PROPS> = (props) => {
  const { conf } = props;
  const confobj = JSON.parse(conf) as PatternMessageProps;
  const { choice, isDone } = confobj;

  const dispatch = useDispatch();

  const [checkpattern, setCheckpattern] = useState<string>(choice);
  const [isChoosing, setIsChoosing] = useState<boolean>(!isDone);

  useEffect(() => {
    dispatch(triggerScrollbottomSign());
  }, []);

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
      <Basic avater="u" content={CMD_PATTERN_CTRL} />

      <div className={clsname}>
        <div className="avater">
          <RobotOutlined />
        </div>
        <div className="dialog-content">
          <p>The modes that AI Assistant has are as follows:</p>
          <div className="radio-zone">
            <Radio.Group
              value={checkpattern}
              onChange={(e: RadioChangeEvent) => {
                setCheckpattern(e.target.value);
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
            let val = checkpattern;
            const c = val as "" | "normal" | "translator" | "webdeveloper";
            dispatch(addPatternHMsg(c));
            dispatch(updateBotPattern(c));
            dispatch(ceLatestMsg());
          }}
          onScrollBottom={() => {
            dispatch(triggerScrollbottomSign());
          }}
        />
      )}
    </>
  );
};

export default PatternMessage;
