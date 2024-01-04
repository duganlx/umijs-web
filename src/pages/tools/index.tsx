import { useEmotionCss } from "@ant-design/use-emotion-css";
import React, { useEffect, useState } from "react";
import TimestampConversionView from "./components/timestampConversion";
import MemorandumView from "./components/memorandum";
import { debounce } from "lodash";

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
        backgroundColor: "rgba(246, 255, 237, 0.5)",
        borderRadius: "5px",
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
    }, 300);

    window.addEventListener("resize", () => {
      debounceRender(window.innerHeight - 40, window.innerWidth);
    });

    setLayoutsize([window.innerHeight - 40, window.innerWidth]);
  }, []);

  return (
    <>
      <CardView title="Timestamp conversion">
        <TimestampConversionView />
      </CardView>
      <CardView title="Memorandum">
        <MemorandumView layoutsize={layoutsize} />
      </CardView>
    </>
  );
};

export default ToolsView;
