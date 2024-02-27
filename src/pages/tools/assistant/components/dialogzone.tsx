import { useDispatch, useSelector } from "react-redux";
import WrapMessage, { WrapMessageProps } from "./message";
import React, { useEffect } from "react";
import { v2_botThinkingDone } from "../../stores-redux/assistant/latestmsgSlice";
import { CMD_BotModelCtl } from "./modelCtl";

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

const LatestDialogZone: React.FC = () => {
  const dispatch = useDispatch();
  const latestmsg = useSelector(
    (state: any) => state.latestmsg.value
  ) as WrapMessageProps | null;
  const msglist = useSelector((state: any) => state.aimsglist.value) as any[];

  useEffect(() => {
    if (msglist.length > 0) {
      return;
    }

    const welcome = `Welcome to the AI Assistant, no model is currently selected, so it cannot help you yet, please use the following command to select a model: "${CMD_BotModelCtl}".\n
    For now, no matter what you ask, the AI assistant will only recite to you the content of a certain chapter of the Tao Te Ching. Have fun using it. ^_^`;

    dispatch(v2_botThinkingDone(welcome));
  }, []);

  console.log("3 LatestDialogZone", latestmsg);
  if (latestmsg === null) {
    return <></>;
  }

  return <WrapMessage {...latestmsg} id={msglist.length} />;
};

const DialogZone: React.FC = () => {
  console.log("2 DialogZone");
  return (
    <>
      <HistoryDialogZone />
      <LatestDialogZone />
    </>
  );
};

export default DialogZone;
