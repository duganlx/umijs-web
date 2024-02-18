import { useEmotionCss } from "@ant-design/use-emotion-css";
import Operbar from "./components/operbar";
import ChatZone from "./components/chatzone";

interface AssistantViewProps {
  layoutsize: [number, number];
}

const AssistantView: React.FC<AssistantViewProps> = (props) => {
  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      flexDirection: "column",
      marginTop: "5px",
    };
  });

  return (
    <div className={clsname}>
      <Operbar />
      <ChatZone />
    </div>
  );
};

export default AssistantView;
