import { useEmotionCss } from "@ant-design/use-emotion-css";
import styles from "./index.less";

const TrialView: React.FC = () => {
  const clsname = useEmotionCss(() => {
    return {
      height: "300px",
      width: "300px",
      backgroundColor: "#ff9c6e",

      ".view": {
        backgroundColor: "yellow",
        width: "100%",
        display: "-webkit-box",
        wordBreak: "break-all",
        textOverflow: "ellipsis",
        overflow: "hidden",
        "-webkit-line-clamp": "2",
        "-webkit-box-orient": "vertical",
      },
    };
  });

  return (
    <div className={clsname}>
      <span className="view">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </span>
    </div>
  );
};

export default TrialView;
