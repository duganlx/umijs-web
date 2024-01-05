import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Popconfirm, Upload, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import MonacoEditor from "react-monaco-editor";

function downloadTxt(content: string, filename: string) {
  const ele = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  ele.href = URL.createObjectURL(file);
  ele.download = `${filename}.txt`;
  document.body.appendChild(ele);
  ele.click();
}

interface MemorandumViewProps {
  layoutsize: [number, number];
}

const MemorandumView: React.FC<MemorandumViewProps> = (props) => {
  const { layoutsize } = props;
  const [hwins, wwins] = layoutsize;
  const [content, setContent] = useState<string>("");

  const clsname = useEmotionCss(() => {
    return {
      ".operbar": {
        display: "flex",
        marginBottom: "5px",

        ".title": {
          marginRight: "5px",
        },

        ".opfile": {
          cursor: "pointer",
          userSelect: "none",
          marginRight: "5px",
        },

        ".opfile:hover": {
          textDecoration: "underline",
        },
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="operbar">
        <div className="title">oper:</div>
        <div
          className="opfile"
          onClick={() => {
            if (content.length == 0) {
              message.info("content is empty");
              return;
            }

            // todo filename
            const dt = dayjs().format("YYYYMMDDHHmmss");
            const filename = `xxx_${dt}`;
            downloadTxt(content, filename);
          }}
        >
          download
        </div>
        <div>
          <label className="opfile" htmlFor="uploadfile">
            upload
          </label>
          <input
            id="uploadfile"
            style={{ display: "none" }}
            type="file"
            onChange={(e) => {
              if (!e.target.files || e.target.files.length == 0) {
                return;
              }

              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onload = (eve) => {
                const upcontent = String(eve.target?.result || "");
                setContent(upcontent);
              };
              reader.readAsText(file);
            }}
          />
        </div>
        <Popconfirm
          title="clear content"
          className="opfile"
          onConfirm={() => {
            setContent("");
            message.success("clear content finished");
          }}
        >
          clear
        </Popconfirm>
      </div>
      <MonacoEditor
        width={`${wwins - 35}px`}
        height="300px"
        theme="vs"
        value={content}
        onChange={(newcontent: any) => {
          setContent(newcontent);
        }}
      />
    </div>
  );
};

export default MemorandumView;
