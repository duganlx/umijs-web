import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useState } from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import Opbar from "./components/opbar";
// import { triggerScrollbottomSign } from "../stores-redux/assistant/scrollbottomSlice";

interface AiViewProps {
  layoutsize: [number, number];
}

const AiView: React.FC<AiViewProps> = (props) => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  // const dispatch = useDispatch();

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

  console.log("0 AiView");
  return (
    <>
      <div className={clsname}>
        <Opbar />
        {/* <Operbar setFullscreen={setFullscreen} />
        <ChatZone isFullscreen={false} /> */}
      </div>
      <Modal
        className={fsclsname}
        title={<Opbar />}
        // open={fullscreen}
        open={false}
        onCancel={() => {
          // dispatch(triggerScrollbottomSign());
          // setFullscreen(false);
        }}
        footer={null}
      >
        {/* <ChatZone isFullscreen={true} /> */}
      </Modal>
    </>
  );
};

export default AiView;