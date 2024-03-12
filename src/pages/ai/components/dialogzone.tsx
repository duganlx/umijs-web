import { useEmotionCss } from "@ant-design/use-emotion-css";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChatMessage, { ChatMessageProps } from "./cmsg";

const History: React.FC = () => {
  const val = useSelector((s: any) => s.aihmsgs.value);
  const msgs = val as ChatMessageProps[];

  console.log("History", msgs);

  return (
    <>
      {msgs.map((props, i) => (
        <ChatMessage {...props} key={i} />
      ))}
    </>
  );
};

const Latest: React.FC = () => {
  const val = useSelector((s: any) => s.ailmsg.value);
  const props = val as ChatMessageProps | null;

  console.log("Latest", props);
  if (props === null) return <></>;

  return <ChatMessage {...props} />;
};

const DialogZone: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const toBttm = useSelector((s: any) => s.ai2bttm.value);

  useEffect(() => {
    if (!divRef.current) {
      return;
    }

    divRef.current.scroll({
      top: divRef.current.scrollHeight,
      behavior: "instant",
    });
  }, [toBttm]);

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
      <History />
      <Latest />
    </div>
  );
};

export default DialogZone;
