import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { pushNormalBotMessage } from "../redux/msglistSlice";

interface OperbarProps {}

const Operbar: React.FC<OperbarProps> = (props) => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [scrollbottomSign, setScrollbottomSign] = useState<boolean>(false);

  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();

  // console.log("operbar", count);

  const msglist = useSelector((state: any) => state.msglist.value);
  // const dispatch = useDispatch();

  console.log("operbar", msglist);

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      marginBottom: "5px",
      alignItems: "center",

      ".help": {
        userSelect: "none",
        marginRight: "8px",
        cursor: "pointer",
        textDecorationLine: "underline",
        textDecorationStyle: "wavy",
      },

      ".title": {
        marginRight: "5px",
      },

      ".ant-select": {
        width: "125px",
        marginRight: "20px",
      },

      ".opitem": {
        cursor: "pointer",
        userSelect: "none",
        marginRight: "8px",
      },

      ".opitem:hover": {
        textDecoration: "underline",
      },
    };
  });

  return (
    <div className={clsname}>
      <Tooltip
        className="help"
        color="white"
        title={
          <div style={{ color: "black" }}>
            <p>show model: 显示可用的模型</p>
          </div>
        }
      >
        instruction
      </Tooltip>

      <div className="title">opers:</div>

      <div
        className="opitem"
        onClick={() => {
          setFullscreen(true);
          setScrollbottomSign(!scrollbottomSign);
        }}
      >
        full-screen
      </div>
    </div>
  );
};

export default Operbar;
