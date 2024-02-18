import { useEmotionCss } from "@ant-design/use-emotion-css";
import Operbar from "./components/operbar";
import ChatZone from "./components/chatzone";
import { useSelector, useDispatch } from "react-redux";
import store from "./store";
import { Provider } from "react-redux";

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
    <Provider store={store}>
      <div className={clsname}>
        <Operbar />
        <ChatZone />
      </div>
    </Provider>
  );
};

export default AssistantView;
