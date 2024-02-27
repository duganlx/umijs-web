import { useDispatch, useSelector } from "react-redux";
import WrapMessage, { WrapMessageProps } from "./message";
import React, { RefObject, useEffect, useRef } from "react";
import { v2_botThinkingDone } from "../../stores-redux/assistant/latestmsgSlice";
import { CMD_BotModelCtl } from "./modelCtl";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { CMD_BotModeCtl } from "./modeCtl";

interface HistoryDialogZoneProps {}

const HistoryDialogZone: React.FC<HistoryDialogZoneProps> = (props) => {
  const msglist = useSelector((state: any) => state.aimsglist.value) as any[];

  console.log("3 HistoryDialogZone", msglist.length);
  return (
    <>
      {msglist.map((msgprops: WrapMessageProps, index: number) => (
        <WrapMessage key={index} id={index} {...msgprops} />
      ))}
    </>
  );
};

interface LatestDialogZoneProps {}

const LatestDialogZone: React.FC<LatestDialogZoneProps> = (props) => {
  const dispatch = useDispatch();
  const latestmsg = useSelector(
    (state: any) => state.latestmsg.value
  ) as WrapMessageProps | null;
  const msglist = useSelector((state: any) => state.aimsglist.value) as any[];

  useEffect(() => {
    if (msglist.length > 0) {
      return;
    }

    const welcome = `Welcome to the AI Assistant, You can use the command "${CMD_BotModelCtl}" to select a model, or use "${CMD_BotModeCtl}" to select a mode. Have fun using it.`;

    dispatch(v2_botThinkingDone(welcome));
  }, []);

  console.log("3 LatestDialogZone", latestmsg);
  if (latestmsg === null) {
    return <></>;
  }

  return <WrapMessage {...latestmsg} id={msglist.length} />;
};

interface DialogZoneProps {}

const DialogZone: React.FC<DialogZoneProps> = (props) => {
  console.log("2 DialogZone");
  const scrollbottom = useSelector((state: any) => state.aiscrollbottom.value);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) {
      return;
    }

    divRef.current.scroll({
      top: divRef.current.scrollHeight,
      behavior: "instant",
    });
  }, [scrollbottom]);

  const clsName = useEmotionCss(() => {
    return {
      height: "100%",
      width: "100%",
      padding: "5px 13px",
      overflow: "auto",

      "&::-webkit-scrollbar": {
        width: "5px",
        backgroundColor: "white",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#d9d9d9",
        borderRadius: "5px",
      },
    };
  });

  return (
    <div className={clsName} ref={divRef}>
      <HistoryDialogZone />
      <LatestDialogZone />
    </div>
  );
};

export default DialogZone;
