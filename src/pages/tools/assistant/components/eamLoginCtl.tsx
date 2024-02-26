import { useEmotionCss } from "@ant-design/use-emotion-css";
import NormalUserMessage from "./userMessage";
import { RobotOutlined } from "@ant-design/icons";
import NormalBotMessage from "./botMessage";
import { InnerProps } from "./message";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { Login, PINGEAM_NORMAL } from "@/services/eam/uc";
import { useDispatch } from "react-redux";
import {
  cancelEamLogin,
  eamLoginCtlDone,
  pushEamLoginCtlMessage,
  submitEamLoginInvalidAuth,
  submitEamLoginValidAuth,
} from "../../stores-redux/assistant/msglistSlice";
import {
  getSecretPair,
  setAccessToken,
  setSecretPair,
} from "@/services/eam/utils";
import { updatePingEam } from "../../stores-redux/pingEamSlice";
import {
  botCmdEamLoginDoing,
  botCmdEamLoginDone,
} from "../../stores-redux/assistant/latestmsgSlice";

const { TextArea } = Input;

export const CMD_EamLoginCtl = "logineam";

export interface EamLoginCtlProps {
  appid: string;
  appsecret: string;

  isBot: boolean;
  /**
   * 一共有以下几种状态
   * 1. 初始状态
   *  {isFirst: true, isValid: false, isDone: false}
   * 2. 输入无效的appid和appsecret
   *  {isFirst: false, isValid: false, isDone: false}
   * 3. 输入正确的appid和appsecret
   *  {isFirst: false, isValid: true, isDone: false}
   * 4. check/cancel点击操作完成
   *  {isFirst: false, isValid: true/false, isDone: true}
   */
  isFirst: boolean;
  isValid: boolean;
  isCancel: boolean;
  isDone: boolean;
}

const EamLoginCtl: React.FC<EamLoginCtlProps & InnerProps> = (props) => {
  const { id, appid, appsecret, isBot, isFirst, isValid, isCancel, isDone } =
    props;
  const dispatch = useDispatch();

  const [renderAppid, setRenderAppid] = useState<string>(appid);
  const [renderAppsecret, setRenderAppsecret] = useState<string>(appsecret);
  const [isInput, setIsInput] = useState<boolean>(false);

  useEffect(() => {
    if (appid !== "" || appsecret !== "") {
      return;
    }

    const appPair = getSecretPair();
    if (appPair === null) {
      return;
    }

    setRenderAppid(appPair.appid);
    setRenderAppsecret(appPair.appsecret);
  }, [appid, appsecret]);

  useEffect(() => {
    if (!isDone) {
      return;
    }

    setRenderAppid("******");
    setRenderAppsecret("******");
  }, [isDone]);

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

  return (
    <>
      {isBot ? null : <NormalUserMessage content={CMD_EamLoginCtl} />}

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
                    setIsInput(true);
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
                    setIsInput(true);
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
                setIsInput(false);
                Login(renderAppid, renderAppsecret)
                  .then((reply) => {
                    if (reply.code !== 0) {
                      // dispatch(
                      //   submitEamLoginInvalidAuth(
                      //     id,
                      //     renderAppid,
                      //     renderAppsecret
                      //   )
                      // );
                      dispatch(
                        botCmdEamLoginDoing({
                          appid: renderAppid,
                          appsecret: renderAppsecret,
                          isValid: false,
                          isCancel: false,
                          isBot: isBot,
                          isFirst: isFirst,
                          isDone: isDone,
                        })
                      );
                      return;
                    }

                    // success
                    // dispatch(
                    //   submitEamLoginValidAuth(id, renderAppid, renderAppsecret)
                    // );
                    dispatch(
                      botCmdEamLoginDoing({
                        appid: renderAppid,
                        appsecret: renderAppsecret,
                        isValid: true,
                        isCancel: false,
                        isBot: isBot,
                        isFirst: isFirst,
                        isDone: isDone,
                      })
                    );
                    dispatch(updatePingEam(PINGEAM_NORMAL));
                    setSecretPair(renderAppid, renderAppsecret);
                    setAccessToken(reply.data.accessToken);
                  })
                  .catch(() => {
                    // dispatch(
                    //   submitEamLoginInvalidAuth(
                    //     id,
                    //     renderAppid,
                    //     renderAppsecret
                    //   )
                    // );
                    dispatch(
                      botCmdEamLoginDoing({
                        appid: renderAppid,
                        appsecret: renderAppsecret,
                        isValid: false,
                        isCancel: false,
                        isBot: isBot,
                        isFirst: isFirst,
                        isDone: isDone,
                      })
                    );
                  });
              }}
            >
              Check
            </div>
            <div
              className="opbar-item"
              onClick={() => {
                setIsInput(false);
                dispatch(cancelEamLogin(id, isFirst));
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>

      {isFirst || isInput ? null : (
        <NormalBotMessage
          content={
            isValid
              ? "Ok, login credentials verified successfully"
              : "Sorry, the login credentials you entered are invalid"
          }
          isThinking={false}
          isTyping={!isDone}
          onTypingDone={() => {
            if (isValid || isCancel) {
              // dispatch(eamLoginCtlDone(id));
              dispatch(botCmdEamLoginDone());
            }
          }}
        />
      )}
      {isCancel ? (
        <NormalBotMessage
          content="Okay, the login credentials entry operation has been canceled"
          isThinking={false}
          isTyping={!isDone}
          onTypingDone={() => {
            if (isValid || isCancel) {
              // dispatch(eamLoginCtlDone(id));
              dispatch(botCmdEamLoginDone());
              dispatch(
                pushEamLoginCtlMessage({
                  appid: renderAppid,
                  appsecret: renderAppsecret,
                  isBot: isBot,
                  isFirst: isFirst,
                  isValid: isValid,
                  isCancel: isCancel,
                  isDone: isDone,
                })
              );
            }
          }}
        />
      ) : null}
    </>
  );
};

export default EamLoginCtl;
