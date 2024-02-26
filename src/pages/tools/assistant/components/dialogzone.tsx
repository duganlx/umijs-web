import { useSelector } from "react-redux";
import WrapMessage, { WrapMessageProps } from "./message";
import React from "react";

interface HistoryDialogZoneProps {}

const HistoryDialogZone: React.FC<HistoryDialogZoneProps> = (props) => {
  const msglist = useSelector((state: any) => state.aimsglist.value) as any[];

  return (
    <>
      {msglist.map((msgprops: WrapMessageProps, index: number) => (
        <WrapMessage key={index} id={index} {...msgprops} />
      ))}
    </>
  );
};

const LatestDialogZone: React.FC = () => {
  const latestmsg = useSelector(
    (state: any) => state.latestmsg.value
  ) as WrapMessageProps | null;
  const msglist = useSelector((state: any) => state.aimsglist.value) as any[];

  if (latestmsg === null) {
    return <></>;
  }

  return <WrapMessage {...latestmsg} id={msglist.length} />;
};

/**
 * HistoryDialogZone 显示历史聊天（直接展示），LatestDialogZone 展示带逐字打印动画效果
 */
const DialogZone: React.FC = () => {
  return (
    <>
      <HistoryDialogZone />
      <LatestDialogZone />
    </>
  );
};

export default DialogZone;
