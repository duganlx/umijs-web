import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useEffect, useRef, useState } from "react";
import InputZone from "./inputzone";
import DialogZone from "./dialogzone";

interface ChatZoneProps {
  isFullscreen: boolean;
}

const ChatZone: React.FC<ChatZoneProps> = (props) => {
  const { isFullscreen } = props;

  const [inputzoneHeight, setInputzoneHeight] = useState<number>(36);
  const dialogzoneRef = useRef<HTMLDivElement>(null);
  const inputzoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inputzoneRef.current) {
      return;
    }

    // 监听输入框高度变化
    const resizeObserver = new ResizeObserver(() => {
      if (!inputzoneRef.current) {
        return;
      }

      const curZHeight = inputzoneRef.current.offsetHeight;
      setInputzoneHeight(curZHeight);
    });
    resizeObserver.observe(inputzoneRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const clsname = useEmotionCss(() => {
    return {
      border: "1px solid #f0f0f0",
      height: isFullscreen ? "calc(100% - 10px)" : "400px",
      borderRadius: "3px",

      ".dialog-zone-wrap": {
        height: isFullscreen
          ? `calc(100% - 9px - ${inputzoneHeight}px)`
          : `calc(400px - 9px - ${inputzoneHeight}px)`,
        marginBottom: "5px",
      },
    };
  });

  console.log("1 ChatZone");
  return (
    <div className={clsname}>
      <div ref={dialogzoneRef} className="dialog-zone-wrap">
        <DialogZone />
      </div>
      <div ref={inputzoneRef}>
        <InputZone />
      </div>
    </div>
  );
};

export default ChatZone;
