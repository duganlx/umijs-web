import {
  ArrowUpOutlined,
  RobotOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Select, Input } from "antd";
import React from "react";

const { TextArea } = Input;

interface DialogMessageProps {
  mtype: "Q" | "A";
  content: string;
}

const DialogMessage: React.FC<DialogMessageProps> = (props) => {
  const { mtype, content } = props;
  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      alignItems: "center",

      ".dialog-content": {
        border: "1px solid rgb(204, 204, 204)",
        borderRadius: "8px",
        padding: "7px 10px",
        backgroundColor: "rgb(240, 240, 240)",
        fontSize: "14px",
      },
    };
  });

  const isQuestion = mtype == "Q";

  return (
    <div className={clsname}>
      <div
        style={{
          marginRight: "5px",
          fontSize: "16px",
        }}
      >
        {isQuestion ? <SmileOutlined /> : <RobotOutlined />}
      </div>
      <div className="dialog-content">{content}</div>
    </div>
  );
};

interface AiAssistantViewProps {
  layoutsize: [number, number];
}

const AiAssistantView: React.FC<AiAssistantViewProps> = (props) => {
  const { layoutsize } = props;
  const [hwins, wwins] = layoutsize;

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      flexDirection: "column",
      marginTop: "5px",

      ".operbar": {
        display: "flex",
        justifyItems: "center",
        marginBottom: "5px",

        ".title": {
          marginRight: "5px",
        },

        ".ant-select": {
          width: "125px",
          marginRight: "20px",
        },
      },
      ".chat-zone": {
        border: "1px solid #f0f0f0",
        height: "400px",

        ".dialog-zone": {
          height: "calc(400px - 78px)",
          padding: "5px 13px",
        },

        ".input-zone": {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          border: "1px solid #d9d9d9",
          borderRadius: "6px",
          margin: "0 5px",

          textarea: {
            "&::-webkit-scrollbar": {
              width: "5px",
              backgroundColor: "white",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d9d9d9",
              borderRadius: "5px",
            },
          },

          "textarea:focus": {
            boxShadow: "none",
          },

          ".btn-zone": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            marginLeft: "6px",
            marginRight: "5px",
            marginBottom: "5px",

            ".btn": {
              width: "30px",
              height: "30px",
              borderRadius: "6px",
              color: "white",
              backgroundColor: "black",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
        },
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="operbar">
        <div className="title">mode:</div>
        <Select
          size="small"
          onChange={(value: string) => {
            console.log(value);
          }}
          options={[
            { value: "translation", label: "Translation" },
            { value: "FE", label: "Frontend" },
            { value: "BE", label: "Backend" },
            { value: "DA", label: "Data Analysis" },
          ]}
        />
        <div className="title">model:</div>
        <Select
          size="small"
          onChange={(value: string) => {
            console.log(value);
          }}
          options={[
            { value: "gpt35", label: "gpt-3.5" },
            { value: "gpt40", label: "gpt-4" },
          ]}
        />
      </div>
      <div className="chat-zone">
        <div className="dialog-zone">
          <DialogMessage mtype="Q" content="xxxxdf" />
        </div>
        <div className="input-zone">
          <TextArea
            rows={3}
            style={{
              border: 0,
              resize: "none",
              backgroundColor: "yellow",
            }}
          />
          <div className="btn-zone">
            <div className="btn">
              <ArrowUpOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantView;
