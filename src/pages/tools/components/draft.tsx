import { InfoCircleOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Modal, Popconfirm, Tooltip, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";

function downloadTxt(content: string, filename: string) {
  const ele = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  ele.href = URL.createObjectURL(file);
  ele.download = `${filename}.txt`;
  document.body.appendChild(ele);
  ele.click();
}

function winsColor(
  selfid: string,
  activeid: string,
  wcmap: Record<string, string>
) {
  if (selfid === activeid) {
    return "#f759ab";
  }

  const content = wcmap[selfid];
  if (content.length > 0) {
    return "#b37feb";
  }

  return "black";
}

const DEFAULT_CONTENT = {
  win1: "",
  win2: "",
  win3: "",
};

interface MemorandumViewProps {
  layoutsize: [number, number];
}

const DraftView: React.FC<MemorandumViewProps> = (props) => {
  const { layoutsize } = props;
  const [hwins, wwins] = layoutsize;

  const [wcmap, setWcmap] = useState<Record<string, string>>(DEFAULT_CONTENT);
  const [actvieContent, setActiveContent] = useState<string>("");
  const [preActivewin, setPreActivewin] = useState<string>();
  const [actviewin, setActivewin] = useState<string>("win1");
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const modalref = useRef<HTMLDivElement>(null);

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

          ".help": {
            marginLeft: "2px",
          },
        },

        ".opfile": {
          cursor: "pointer",
          userSelect: "none",
          marginRight: "8px",
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

  const fsclsname = useEmotionCss(() => {
    return {
      top: "5vh",
      margin: "0px 6vw",

      ".modalcontent": {
        width: "100%",
        height: "100%",
      },

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
        border: "1px solid #f0f0f0",
      },
    };
  });

  const mcheight =
    modalref.current == null ? "100%" : modalref.current.offsetHeight + "px";
  const mcwidth =
    modalref.current == null ? "100%" : modalref.current.offsetWidth + "px";

  return (
    <>
      <div className={clsname}>
        <div className="operbar">
          <div className="title">opers:</div>
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
          <div
            className="opfile"
            onClick={() => {
              setFullscreen(true);
            }}
          >
            full-screen
          </div>
          <div className="title" style={{ marginLeft: "25px" }}>
            wins
            <Tooltip
              className="help"
              title={
                <div style={{ color: "black" }}>
                  <p>Color Description</p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "18px",
                        backgroundColor: "black",
                        marginRight: "5px",
                      }}
                    />
                    Unused
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "18px",
                        backgroundColor: "#f759ab",
                        marginRight: "5px",
                      }}
                    />
                    Displaying
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "18px",
                        backgroundColor: "#b37feb",
                        marginRight: "5px",
                      }}
                    />
                    In use
                  </div>
                </div>
              }
              color="white"
            >
              <InfoCircleOutlined />
            </Tooltip>
            :
          </div>
          <div
            className="winszone"
            style={{ color: winsColor("win1", actviewin, wcmap) }}
            onClick={() => {
              setPreActivewin(actviewin);
              setActivewin("win1");
            }}
          >
            win1
          </div>
          <div
            className="winszone"
            style={{ color: winsColor("win2", actviewin, wcmap) }}
            onClick={() => {
              setPreActivewin(actviewin);
              setActivewin("win2");
            }}
          >
            win2
          </div>
          <div
            className="winszone"
            style={{ color: winsColor("win3", actviewin, wcmap) }}
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
      <Modal
        className={fsclsname}
        title={actviewin}
        open={fullscreen}
        onCancel={() => {
          setFullscreen(false);
        }}
        footer={null}
        destroyOnClose={true}
      >
        <div className="modalcontent" ref={modalref}>
          <MonacoEditor
            width={mcwidth}
            height={mcheight}
            theme="vs"
            value={actvieContent}
            onChange={(newcontent: any) => {
              setActiveContent(newcontent);
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default DraftView;
