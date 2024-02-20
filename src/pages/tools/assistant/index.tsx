import { useEmotionCss } from "@ant-design/use-emotion-css";
import Operbar from "./components/operbar";
import ChatZone from "./components/chatzone";
import store from "./store";
import { Provider } from "react-redux";
import { useState } from "react";
import { Modal } from "antd";

interface AssistantViewProps {
  layoutsize: [number, number];
}

const AssistantView: React.FC<AssistantViewProps> = (props) => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      flexDirection: "column",
      marginTop: "5px",
    };
  });

  const fsclsname = useEmotionCss(() => {
    return {
      top: "5vh",
      margin: "0px 6vw",

      ".ant-modal-content": {
        width: "86vw",
        height: "90vh",

        padding: "8px 10px",

        ".ant-modal-header > .ant-modal-title": {
          fontSize: "18px",
        },

        ".ant-modal-close": {
          top: "10px",
        },
      },

      ".ant-modal-body": {
        height: "calc(100% - 40px)",
        // border: "1px solid #f0f0f0",
      },
    };
  });

  return (
    <Provider store={store}>
      <div className={clsname}>
        <Operbar setFullscreen={setFullscreen} />
        <ChatZone isFullscreen={false} />
      </div>
      <Modal
        className={fsclsname}
        title={"AI Assistant"}
        open={fullscreen}
        onCancel={() => {
          setFullscreen(false);
        }}
        footer={null}
      >
        <Operbar />
        <ChatZone isFullscreen={true} />
      </Modal>
    </Provider>
  );
};

export default AssistantView;
