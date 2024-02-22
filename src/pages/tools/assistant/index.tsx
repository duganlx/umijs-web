import { useEmotionCss } from "@ant-design/use-emotion-css";
import Operbar from "./components/operbar";
import ChatZone from "./components/chatzone";
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
      top: "1vh",
      margin: "0px 6vw",
      height: "99vh",

      ".ant-modal-mask": {
        height: "100vh",
      },

      ".ant-modal-content": {
        width: "86vw",
        height: "98vh",

        padding: "8px 10px",

        ".ant-modal-header": {
          marginBottom: "0px",

          ".ant-modal-title": {
            fontSize: "16px",
            fontWeight: "normal",
          },
        },

        ".ant-modal-close": {
          top: "8px",
        },
      },

      ".ant-modal-body": {
        height: "calc(100% - 24px)",
        // border: "1px solid #f0f0f0",
      },
    };
  });

  return (
    <>
      <div className={clsname}>
        <Operbar setFullscreen={setFullscreen} />
        <ChatZone isFullscreen={false} />
      </div>
      <Modal
        className={fsclsname}
        title={<Operbar />}
        open={fullscreen}
        onCancel={() => {
          setFullscreen(false);
        }}
        footer={null}
      >
        <ChatZone isFullscreen={true} />
      </Modal>
    </>
  );
};

export default AssistantView;
