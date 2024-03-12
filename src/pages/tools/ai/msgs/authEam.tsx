import { useEmotionCss } from "@ant-design/use-emotion-css";
import { COMMON_MESSAGE_PROPS } from "../components/cmsg";
import Basic from "./basic";
import { useEffect, useState } from "react";
import { Login, PINGEAM_NORMAL } from "@/services/eam/uc";
import { RobotOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { ceLatestMsg } from "../../rslices/ai/lmsg";
import { addAuthEamHMsg } from "../../rslices/ai/hmsgs";
import { triggerScrollbottomSign } from "../../rslices/ai/toBttm";
import { setEamAuth, setEamToken } from "@/services/eam/utils";
import { updatePingEam } from "../../rslices/pingEam";

const { TextArea } = Input;

export const CMD_AUTH_EAM_CTRL = "logineam";

export interface AuthEamMessageProps {
  appid: string;
  appsecret: string;

  isValid?: boolean;
  isDone?: boolean;
}

const AuthEamMessage: React.FC<COMMON_MESSAGE_PROPS> = (props) => {
  const { conf } = props;
  const confobj = JSON.parse(conf) as AuthEamMessageProps;
  const {
    appid,
    appsecret,
    isValid: oIsValid = false,
    isDone: oIsDone = false,
  } = confobj;

  const dispatch = useDispatch();

  const [renderAppid, setRenderAppid] = useState<string>(appid);
  const [renderAppsecret, setRenderAppsecret] = useState<string>(appsecret);

  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isInputing, setIsInputing] = useState<boolean>(true);
  const [isCancel, setIsCancel] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(oIsValid);

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

      ".login-input-zone": {
        marginBottom: "4px",

        ".item": {
          marginTop: "3px",

          ".label": {
            marginBottom: "3px",
            fontStyle: "oblique",
          },
        },
      },
      ".opbar": {
        display: oIsDone ? "none" : "flex",
        flexDirection: "row",

        ".opbar-item": {
          marginRight: "10px",
          cursor: "pointer",
          userSelect: "none",
        },
        ".opbar-item:hover": {
          textDecoration: "underline",
        },
      },
    };
  });

  useEffect(() => {
    dispatch(triggerScrollbottomSign());
  }, []);

  useEffect(() => {
    if (!oIsDone) {
      return;
    }

    setRenderAppid("******");
    setRenderAppsecret("******");
  }, [oIsDone]);

  const renderReplyMsg = () => {
    /**
     * 状态说明
     * 1. 历史状态 -> isDone: true : 无动画效果
     * 1.1 输入正确的 appid 和 appsecret: 显示正确
     *  {isValid: true, isDone: true}
     * 1.2 取消输入: 显示取消
     *  {isValid: false, isDone: true}
     *
     * 2. 输入状态 -> isDone: false : 有动画效果
     * 2.1 初始状态: 不显示 reply
     *  {isFirst*: true}
     * 2.2 输入中状态: 不显示 reply
     *  {isInputing*: true}
     * 2.3 取消输入: 显示取消
     *  {isCancel*: true}
     * 2.4 输入正确的 appid 和 appsecret: 显示正确
     *  {isValid*: true}
     * 2.5 输入无效的 appid 和 appsecret: 显示无效
     *  {isValid*: false}
     *
     * 带 * 表示组件内部管理
     */
    if (oIsDone) {
      // 1
      if (oIsValid) {
        // 1.1
        return (
          <Basic
            avater="b"
            content="Ok, login credentials verified successfully."
          />
        );
      } else {
        // 1.2
        return (
          <Basic
            avater="b"
            content="Okay, the login credentials entry operation has been canceled."
          />
        );
      }
    } else {
      // 2
      if (isFirst || isInputing) {
        // 2.1, 2.2
        return <></>;
      }

      if (isCancel) {
        // 2.3
        return (
          <Basic
            key="2.3"
            avater="b"
            content="Okay, the login credentials entry operation has been canceled."
            isTyping={true}
            onTypingDone={() => {
              dispatch(addAuthEamHMsg(false));
              dispatch(ceLatestMsg());
            }}
            onScrollBottom={() => {
              dispatch(triggerScrollbottomSign());
            }}
          />
        );
      }

      if (isValid) {
        // 2.4
        return (
          <Basic
            key="2.4"
            avater="b"
            content="Ok, login credentials verified successfully."
            isTyping={true}
            onTypingDone={() => {
              dispatch(updatePingEam(PINGEAM_NORMAL));
              dispatch(addAuthEamHMsg(true));
              dispatch(ceLatestMsg());
            }}
            onScrollBottom={() => {
              dispatch(triggerScrollbottomSign());
            }}
          />
        );
      } else {
        // 2.5
        return (
          <Basic
            key="2.5"
            avater="b"
            content="Sorry, the login credentials you entered are invalid."
            isTyping={true}
            onScrollBottom={() => {
              dispatch(triggerScrollbottomSign());
            }}
          />
        );
      }
    }
  };

  return (
    <>
      <Basic avater="u" content={CMD_AUTH_EAM_CTRL} />

      <div className={clsname}>
        <div className="avater">
          <RobotOutlined />
        </div>
        <div className="dialog-content">
          <p>Please enter appid and appsecret:</p>
          <div className="login-input-zone">
            <div className="item">
              <div className="label">appid</div>
              <div className="appid-input">
                <Input
                  size="small"
                  value={renderAppid}
                  onChange={(e) => {
                    setRenderAppid(e.target.value);
                    setIsInputing(true);
                  }}
                  disabled={oIsDone}
                />
              </div>
            </div>
            <div className="item">
              <div className="label">appsecret</div>
              <div className="appsecret-input">
                <TextArea
                  autoSize={{ minRows: 2, maxRows: 2 }}
                  allowClear
                  size="small"
                  value={renderAppsecret}
                  onChange={(e) => {
                    setRenderAppsecret(e.target.value);
                    setIsInputing(true);
                  }}
                  disabled={oIsDone}
                />
              </div>
            </div>
          </div>
          <div className="opbar">
            <div
              className="opbar-item"
              onClick={() => {
                Login(renderAppid, renderAppsecret)
                  .then((reply) => {
                    // console.log(reply, "Login Eam");
                    if (reply.code !== 0) {
                      setIsValid(false);
                      return;
                    }

                    const token = reply.data.accessToken;
                    setEamToken(token);
                    setEamAuth(renderAppid, renderAppsecret);
                    setIsValid(true);
                  })
                  .catch(() => {
                    setIsValid(false);
                  })
                  .finally(() => {
                    if (isFirst) {
                      setIsFirst(false);
                    }
                    setIsInputing(false);
                  });
              }}
            >
              Check
            </div>
            <div
              className="opbar-item"
              onClick={() => {
                setIsInputing(false);
                setIsFirst(false);
                setIsCancel(true);
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>

      {renderReplyMsg()}
    </>
  );
};

export default AuthEamMessage;
