import { useEmotionCss } from "@ant-design/use-emotion-css";
import React, { useEffect, useState } from "react";
import DraftView from "./draft";
import { debounce } from "lodash";
import AiAssistantView from "./components/aiassistant";
import TimestampVertView from "./timestampVert";
import AssistantView from "./assistant";
import { PingEam } from "@/services/eam/uc";
import { Provider, useDispatch } from "react-redux";
import store, { updatePingEam } from "./store";
import { AskGPT } from "@/services/eam/openai";

interface CardViewProps {
  title: string;
  children?: React.ReactNode;
}

const CardView: React.FC<CardViewProps> = (props) => {
  const { title, children } = props;
  const clsname = useEmotionCss(() => {
    return {
      ".view": {
        margin: "10px 8vw",
        padding: "10px 3px 3px 10px",
        borderRadius: "5px",
        backgroundColor: "white",
        // backgroundColor: "rgba(246, 255, 237, 0.5)",
        border: "1px solid #b7eb8f",

        ".title": {
          display: "flex",
          flexDirection: "row",
          fontWeight: "bold",
          alignItems: "center",

          ".titlebar": {
            width: "4px",
            height: "20px",
            backgroundColor: "#389e0d",
            marginRight: "5px",
          },
        },

        ".content": {
          margin: "5px 3px 3px 5px",
        },
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="view">
        <div className="title">
          <div className="titlebar" />
          <div>{title}</div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

const ContextLayer: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    PingEam()
      .then((pong) => {
        dispatch(updatePingEam(pong));
      })
      .catch(() => {
        dispatch(updatePingEam(false));
      });
  }, []);

  return <>{children}</>;
};

const ToolsView: React.FC = () => {
  const [layoutsize, setLayoutsize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const debounceRender = debounce(function (height: number, width: number) {
      setLayoutsize([height, width]);
    }, 10);

    const resize = () => {
      debounceRender(window.innerHeight - 40, window.innerWidth - 10);
    };

    window.addEventListener("resize", resize);
    setLayoutsize([window.innerHeight - 40, window.innerWidth - 10]);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <Provider store={store}>
      <ContextLayer>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "3px 2px",
            minWidth: "600px",
          }}
        >
          <CardView title="Timestamp Conversion">
            <TimestampVertView />
          </CardView>
          <CardView title="Draft">
            <DraftView />
          </CardView>
          <CardView title="AI Assistant">
            <AssistantView layoutsize={layoutsize} />
          </CardView>
          <CardView title="AI Assistant (old)">
            <AiAssistantView layoutsize={layoutsize} />
          </CardView>
          <CardView title="Jottings">todo</CardView>
        </div>
      </ContextLayer>
    </Provider>
  );
};

export default ToolsView;
