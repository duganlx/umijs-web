import { useEmotionCss } from "@ant-design/use-emotion-css";
import React from "react";
import TimestampConversionView from "./components/timestampConversion";

interface CardViewProps {
  title: string;
  children: React.ReactNode;
}

const CardView: React.FC<CardViewProps> = (props) => {
  const { title, children } = props;
  const clsname = useEmotionCss(() => {
    return {
      ".view": {
        padding: "10px 3px 3px 10px",
        backgroundColor: "rgba(246, 255, 237, 0.5)",
        borderRadius: "5px",

        ".title": {
          display: "flex",
          flexDirection: "row",
          fontWeight: "bold",
          alignItems: "center",

          ".titlebar": {
            width: "4px",
            height: "16px",
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
  return (
    <>
      <CardView title="Timestamp conversion">
        <TimestampConversionView />
      </CardView>
    </>
  );
};

export default ToolsView;
