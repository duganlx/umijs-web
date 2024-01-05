import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Popconfirm, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";

function downloadTxt(content: string, filename: string) {
  const ele = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  ele.href = URL.createObjectURL(file);
  ele.download = `${filename}.txt`;
  document.body.appendChild(ele);
  ele.click();
}

const DEFAULT_CONTENT = {
  win1: "",
  win2: "",
  win3: "",
};

interface MemorandumViewProps {
  layoutsize: [number, number];
}

const MemorandumView: React.FC<MemorandumViewProps> = (props) => {
  const { layoutsize } = props;
  const [hwins, wwins] = layoutsize;

  const [wcmap, setWcmap] = useState<Record<string, string>>(DEFAULT_CONTENT);
  const [actvieContent, setActiveContent] = useState<string>("");
  const [preActivewin, setPreActivewin] = useState<string>();
  const [actviewin, setActivewin] = useState<string>("win1");

  useEffect(() => {
    if (preActivewin === undefined) {
      return;
    }

    const lwcmap = { ...wcmap };
    lwcmap[preActivewin] = actvieContent;

    setActiveContent(lwcmap[actviewin]);
    setWcmap(lwcmap);
  }, [actviewin]);

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

        ".winszone": {
          cursor: "pointer",
          userSelect: "none",
          marginRight: "5px",
        },

        ".winszone:hover": {
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
            if (actvieContent.length == 0) {
              message.info("content is empty");
              return;
            }

            const dt = dayjs().format("YYYYMMDDHHmmss");
            const filename = `${actviewin}_${dt}`;
            downloadTxt(actvieContent, filename);
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
                setActiveContent(upcontent);
              };
              reader.readAsText(file);
            }}
          />
        </div>
        <Popconfirm
          title={`Is clear ${actviewin}'s content?`}
          className="opfile"
          onConfirm={() => {
            setActiveContent("");
            message.success("clear content finished");
          }}
          okText="yes"
          cancelText="no"
        >
          clear
        </Popconfirm>
        <div className="title" style={{ marginLeft: "25px" }}>
          wins:
        </div>
        <div
          className="winszone"
          style={{ color: actviewin == "win1" ? "#f759ab" : "black" }}
          onClick={() => {
            setPreActivewin(actviewin);
            setActivewin("win1");
          }}
        >
          win1
        </div>
        <div
          className="winszone"
          style={{ color: actviewin == "win2" ? "#f759ab" : "black" }}
          onClick={() => {
            setPreActivewin(actviewin);
            setActivewin("win2");
          }}
        >
          win2
        </div>
        <div
          className="winszone"
          style={{ color: actviewin == "win3" ? "#f759ab" : "black" }}
          onClick={() => {
            setPreActivewin(actviewin);
            setActivewin("win3");
          }}
        >
          win3
        </div>
      </div>
      <MonacoEditor
        width={`${wwins - 35}px`}
        height="300px"
        theme="vs"
        value={actvieContent}
        onChange={(newcontent: any) => {
          setActiveContent(newcontent);
        }}
      />
    </div>
  );
};

export default MemorandumView;
