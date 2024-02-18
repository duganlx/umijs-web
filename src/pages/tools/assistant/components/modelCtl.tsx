import { useEmotionCss } from "@ant-design/use-emotion-css";
import NormalUserMessage from "./userMessage";
import { RobotOutlined } from "@ant-design/icons";
import { Radio, RadioChangeEvent, Space } from "antd";
import NormalBotMessage from "./botMessage";

export interface BotModelCtlProps {
  isFinish: boolean;
}

const BotModelCtl: React.FC<BotModelCtlProps> = (props) => {
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
      <NormalUserMessage content={"chgmodel"} />

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
                <Radio value="eam_gpt3.5">EAM GPT-3.5</Radio>
                <Radio value="eam_gpt4.0">EAM GPT-4.0</Radio>
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
        content="Ok, The model switch is successful."
        isThinking={false}
        isTyping={true}
      />
    </>
  );
};

export default BotModelCtl;
