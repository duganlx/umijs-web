import { RobotOutlined, SmileOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import NormalUserMessage from "./userMessage";
import { Radio, RadioChangeEvent, Space } from "antd";
import NormalBotMessage from "./botMessage";

export interface BotModeCtlProps {
  isFinish: boolean;
}

const BotModeCtl: React.FC<BotModeCtlProps> = (props) => {
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
      },

      ".checkbtn:hover": {
        textDecoration: "underline",
      },
    };
  });

  return (
    <>
      <NormalUserMessage content={"chgmode"} />

      <div className={clsname}>
        <div className="avater">
          <RobotOutlined />
        </div>
        <div className="dialog-content">
          <p>The modes that AI Assistant has are as follows:</p>
          <div className="radio-zone">
            <Radio.Group
              onChange={(e: RadioChangeEvent) => {
                console.log(e.target.value);
              }}
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
              console.log("--x");
            }}
          >
            Check
          </div>
        </div>
      </div>

      <NormalBotMessage
        content="Ok, The mode switch is successful."
        isThinking={false}
        isTyping={true}
      />
    </>
  );
};

export default BotModeCtl;
