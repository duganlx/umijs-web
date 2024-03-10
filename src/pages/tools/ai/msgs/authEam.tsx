import { useEmotionCss } from "@ant-design/use-emotion-css";
import { COMMON_MESSAGE_PROPS } from "../components/cmsg";
import Basic from "./basic";
import { useEffect, useState } from "react";
import { Login } from "@/services/eam/uc";
import { RobotOutlined } from "@ant-design/icons";
import { Input } from "antd";

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

  const [renderAppid, setRenderAppid] = useState<string>(appid);
  const [renderAppsecret, setRenderAppsecret] = useState<string>(appsecret);

  /**
   * todo
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
   * 2.2 输入无效的 appid 和 appsecret: 显示无效
   *  {isValid*: false}
   * 2.3 输入正确的 appid 和 appsecret: 显示正确
   *  {isValid*: true}
   * 2.4 取消输入: 显示取消
   *  {isCancel*: true}
   *
   * 带 * 表示组件内部管理
   */
  const [isFirst, setIsFirst] = useState<boolean>(!oIsDone);
  const [isInputing, setIsInputing] = useState<boolean>(!oIsDone);
  const [isCancel, setIsCancel] = useState<boolean>(oIsDone && !oIsValid);
  const [isValid, setIsValid] = useState<boolean>(oIsValid);
  const [isDone, setIsDone] = useState<boolean>(oIsDone);

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
        display: isDone ? "none" : "flex",
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
    if (!isDone) {
      return;
    }

    setRenderAppid("******");
    setRenderAppsecret("******");
  }, [isDone]);

  const renderReplyMsg = () => {
    if (isFirst || isInputing) {
      return <></>;
    }

    if (isDone && isValid) {
      return (
        <Basic
          avater="b"
          content="Ok, login credentials verified successfully."
          isTyping={true}
        />
      );
    } else if (isDone && !isValid) {
      return (
        <Basic
          avater="b"
          content="Okay, the login credentials entry operation has been canceled."
          isTyping={true}
        />
      );
    } else {
      // isDone=f isValid=f
      <Basic
        avater="b"
        content="Sorry, the login credentials you entered are invalid."
        isTyping={true}
      />;
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
                  disabled={isDone}
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
                  disabled={isDone}
                />
              </div>
            </div>
          </div>
          <div className="opbar">
            <div
              className="opbar-item"
              onClick={() => {
                setIsInputing(false);
                setIsFirst(false);
                // Login(renderAppid, renderAppsecret)
                //   .then((reply) => {
                //     if (reply.code !== 0) {
                //       // fail
                //       return;
                //     }

                //     // success
                //   })
                //   .catch(() => {
                //     // dispatch(
                //     //   submitEamLoginInvalidAuth(
                //     //     id,
                //     //     renderAppid,
                //     //     renderAppsecret
                //     //   )
                //     // );
                //   });
              }}
            >
              Check
            </div>
            <div
              className="opbar-item"
              onClick={() => {
                setIsInputing(false);
                setIsFirst(false);
                // dispatch(cancelEamLogin(id, isFirst));
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
