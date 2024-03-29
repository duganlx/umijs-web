import { InfoCircleOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Popconfirm, Tooltip, message } from "antd";
import { CMD_MODEL_CTRL } from "../msgs/model";
import { CMD_PATTERN_CTRL } from "../msgs/pattern";
import { CMD_AUTH_EAM_CTRL } from "../msgs/authEam";
import { useDispatch, useSelector } from "react-redux";
import {
  PINGEAM_EXCEPTION,
  PINGEAM_NOAUTH,
  PINGEAM_NOJWT,
  PINGEAM_NORMAL,
} from "@/services/eam/uc";
import { ceHistoryMsgs } from "../../rslices/ai/hmsgs";

const STATUS_COLOR_NORMAL = "green";
const STATUS_COLOR_EXCEPTION = "red";
const STATUS_COLOR_NOAUTH = "#d4b106";
const STATUS_COLOR_NOJWT = "#d4380d";
const STATUS_COLOR_UNKNOWN = "black";

function generateStatusColor(botmodel: string, pingEam: number) {
  if (botmodel === "none") {
    return STATUS_COLOR_UNKNOWN;
  } else if (botmodel === "eamGpt") {
    switch (pingEam) {
      case PINGEAM_NORMAL:
        return STATUS_COLOR_NORMAL;
      case PINGEAM_EXCEPTION:
        return STATUS_COLOR_EXCEPTION;
      case PINGEAM_NOAUTH:
        return STATUS_COLOR_NOAUTH;
      case PINGEAM_NOJWT:
        return STATUS_COLOR_NOJWT;
      default:
    }
  }

  return STATUS_COLOR_UNKNOWN;
}

interface OpbarProps {
  openFullscreen?: () => void;
}

const Opbar: React.FC<OpbarProps> = (props) => {
  const { openFullscreen } = props;

  const dispatch = useDispatch();
  const bmodel = useSelector((s: any) => s.aimodel.value) as string;
  const bpattern = useSelector((s: any) => s.aipattern.value) as string;
  const pingEam = useSelector((s: any) => s.pingEam.value) as number;

  const isInvalid = bmodel === "none";

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
          color: generateStatusColor(bmodel, pingEam),
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

      <Popconfirm
        title={`Is clear chat history?`}
        className="opitem"
        onConfirm={() => {
          dispatch(ceHistoryMsgs());
          message.success("clear chat history successfully");
        }}
        okText="yes"
        cancelText="no"
      >
        clear
      </Popconfirm>
      {openFullscreen === undefined ? null : (
        <div
          className="opitem"
          onClick={() => {
            openFullscreen();
          }}
        >
          full-screen
        </div>
      )}
      <div className="status">
        <div className="title">
          status
          <Tooltip
            className="help"
            color="white"
            autoAdjustOverflow={true}
            overlayInnerStyle={{
              width: "50vw",
              maxWidth: "550px",
            }}
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
                  <code style={{ fontWeight: "bold" }}>{CMD_MODEL_CTRL}</code>:
                  Switching models
                </p>
                <p>
                  <code style={{ fontWeight: "bold" }}>{CMD_PATTERN_CTRL}</code>
                  : Switching modes
                </p>
                <hr />
                <p>In addition, there are the following commands for EAM:</p>
                <p>
                  <code style={{ fontWeight: "bold" }}>
                    {CMD_AUTH_EAM_CTRL}
                  </code>
                  : Input EAM login credentials
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                model
              </div>
              <hr />
              <p>Color Description</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "20px",
                    height: "18px",
                    backgroundColor: STATUS_COLOR_NORMAL,
                    marginRight: "5px",
                  }}
                />
                Normal
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "20px",
                    height: "18px",
                    backgroundColor: STATUS_COLOR_EXCEPTION,
                    marginRight: "5px",
                  }}
                />
                Exception
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "20px",
                    height: "18px",
                    backgroundColor: STATUS_COLOR_NOAUTH,
                    marginRight: "5px",
                  }}
                />
                Not exist login credentials
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "20px",
                    height: "18px",
                    backgroundColor: STATUS_COLOR_NOJWT,
                    marginRight: "5px",
                  }}
                />
                Not exist jwt
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "20px",
                    height: "18px",
                    backgroundColor: STATUS_COLOR_UNKNOWN,
                    marginRight: "5px",
                  }}
                />
                Unknown
              </div>
            </div>
          }
        >
          {bmodel}
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
          {bpattern}
        </Tooltip>
      </div>
    </div>
  );
};

export default Opbar;
