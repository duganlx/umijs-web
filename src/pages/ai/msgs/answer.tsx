import { useDispatch } from "react-redux";
import { COMMON_MESSAGE_PROPS } from "../components/cmsg";
import Basic from "./basic";
import { ceLatestMsg } from "../../rslices/ai/lmsg";
import { addAnswerHMsg } from "../../rslices/ai/hmsgs";
import { triggerScrollbottomSign } from "../../rslices/ai/toBttm";

export interface AnswerMessageProps {
  content: string;

  isThinking: boolean;
  isTyping: boolean;
}

const AnswerMessage: React.FC<COMMON_MESSAGE_PROPS> = (props) => {
  const { conf } = props;
  const confobj = JSON.parse(conf) as AnswerMessageProps;
  const { content, isThinking, isTyping } = confobj;

  const dispatch = useDispatch();

  return (
    <Basic
      avater="b"
      content={content}
      isThinking={isThinking}
      isTyping={isTyping}
      isShowCopyBtn={true}
      onTypingDone={() => {
        // console.log("answer message onTypingDone");
        dispatch(ceLatestMsg());
        dispatch(addAnswerHMsg(content));
      }}
      onScrollBottom={() => {
        dispatch(triggerScrollbottomSign());
      }}
    />
  );
};

export default AnswerMessage;
