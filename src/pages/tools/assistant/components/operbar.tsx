import { InfoCircleOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CMD_BotModeCtl } from "./modeCtl";
import { CMD_BotModelCtl } from "./modelCtl";

interface OperbarProps {}

const Operbar: React.FC<OperbarProps> = (props) => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [scrollbottomSign, setScrollbottomSign] = useState<boolean>(false);

  const botmode = useSelector((state: any) => state.botmode.value) as string;
  const botmodel = useSelector((state: any) => state.botmodel.value) as string;
  const isInvalid = botmodel === "none";

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      marginBottom: "5px",
      alignItems: "center",

      ".title": {
        marginRight: "5px",

        ".help": {
          marginLeft: "2px",
          cursor: "pointer",
        },
      },

      ".ant-select": {
        width: "125px",
        marginRight: "20px",
      },

      ".opitem": {
        cursor: "pointer",
        userSelect: "none",
        marginRight: "8px",
      },

      ".opitem:hover": {
        textDecoration: "underline",
      },

      ".status": {
        marginLeft: "20px",
        display: "flex",

        ".model": {
          marginRight: "10px",
          color: isInvalid ? "red" : "black",
          cursor: "pointer",
        },

        ".mode": {
          cursor: "pointer",
          textDecorationLine: isInvalid ? "line-through" : "none",
        },
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="title">opers:</div>

      <div
        className="opitem"
        onClick={() => {
          setFullscreen(true);
          setScrollbottomSign(!scrollbottomSign);
        }}
      >
        full-screen
      </div>
      <div className="status">
        <div className="title">
          status
          <Tooltip
            className="help"
            color="white"
            title={
              <div style={{ color: "black" }}>
                <p>
                  The status of the AI assistant includes the used model and
                  mode. The term "model" refers to the AI model employed, while
                  "mode" pertains to the prompting cues provided during queries
                  to enhance the satisfaction of AI responses. To switch between
                  models and modes, simply enter the following commands in the
                  input box.
                </p>
                <p>
                  <code style={{ fontWeight: "bold" }}>{CMD_BotModelCtl}</code>:
                  Switching models
                </p>
                <p>
                  <code style={{ fontWeight: "bold" }}>{CMD_BotModeCtl}</code>:
                  Switching modes
                </p>
              </div>
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
          :
        </div>
        <Tooltip
          color="white"
          className="model"
          title={
            <div style={{ color: "black" }}>
              <p>model</p>
            </div>
          }
        >
          {botmodel}
        </Tooltip>
        <Tooltip
          color="white"
          className="mode"
          title={
            <div style={{ color: "black" }}>
              <p>mode</p>
            </div>
          }
        >
          {botmode}
        </Tooltip>
      </div>
    </div>
  );
};

export default Operbar;
