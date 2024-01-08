import { useEmotionCss } from "@ant-design/use-emotion-css";
import React, { useEffect, useState } from "react";
import TimestampConversionView from "./components/timestampConversion";
import DraftView from "./components/draft";
import { debounce } from "lodash";
import AiAssistantView from "./components/aiassistant";

interface CardViewProps {
  title: string;
  children?: React.ReactNode;
}

const CardView: React.FC<CardViewProps> = (props) => {
  const { title, children } = props;
  const clsname = useEmotionCss(() => {
    return {
      ".view": {
        margin: "10px 5px",
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
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "3px 2px",
        minWidth: "600px",
      }}
    >
      <CardView title="Timestamp Conversion">
        <TimestampConversionView />
      </CardView>
      <CardView title="Draft">
        <DraftView layoutsize={layoutsize} />
      </CardView>
      <CardView title="AI Assistant">
        <AiAssistantView layoutsize={layoutsize} />
      </CardView>
      <CardView title="Jottings">todo</CardView>
    </div>
  );
};

export default ToolsView;
