import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CMD_BotModelCtl } from "./modelCtl";
import { pushNormalBotMessage } from "../../stores-redux/assistant/msglistSlice";
import InputZone from "./inputzone";
import DialogZone from "./dialogzone";

const welcome = `Welcome to the AI Assistant, no model is currently selected, so it cannot help you yet, please use the following command to select a model: "${CMD_BotModelCtl}".\n
For now, no matter what you ask, the AI assistant will only recite to you the content of a certain chapter of the Tao Te Ching. Have fun using it. ^_^`;

interface ChatZoneProps {
  isFullscreen: boolean;
}

const ChatZone: React.FC<ChatZoneProps> = (props) => {
  const { isFullscreen } = props;

  const dispatch = useDispatch();
  const msglist = useSelector((state: any) => state.aimsglist.value) as any[];
  const scrollbottom = useSelector((state: any) => state.aiscrollbottom.value);

  const [inputzoneHeight, setInputzoneHeight] = useState<number>(36);
  const dialogzoneRef = useRef<HTMLDivElement>(null);
  const inputzoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFullscreen || msglist.length > 0) {
      return;
    }

    // 欢迎信息
    dispatch(
      pushNormalBotMessage({
        content: welcome,
        isThinking: false,
        isTyping: true,
      })
    );
  }, []);

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

  useEffect(() => {
    if (!dialogzoneRef.current) {
      return;
    }

    dialogzoneRef.current.scroll({
      top: dialogzoneRef.current.scrollHeight,
      behavior: "instant",
    });
  }, [scrollbottom]);

  const clsname = useEmotionCss(() => {
    return {
      border: "1px solid #f0f0f0",
      height: isFullscreen ? "calc(100% - 10px)" : "400px",
      borderRadius: "3px",

      ".dialog-zone": {
        height: isFullscreen
          ? `calc(100% - 9px - ${inputzoneHeight}px)`
          : `calc(400px - 9px - ${inputzoneHeight}px)`,
        padding: "5px 13px",
        overflow: "auto",
        marginBottom: "5px",

        "&::-webkit-scrollbar": {
          width: "5px",
          backgroundColor: "white",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#d9d9d9",
          borderRadius: "5px",
        },
      },
    };
  });

  return (
    <div className={clsname}>
      <div ref={dialogzoneRef} className="dialog-zone">
        <DialogZone />
      </div>
      <div ref={inputzoneRef}>
        <InputZone />
      </div>
    </div>
  );
};

export default ChatZone;
