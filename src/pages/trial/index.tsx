import { useEmotionCss } from "@ant-design/use-emotion-css";

const TrialView: React.FC = () => {
  console.log("--1");

  const clsname = useEmotionCss(() => {
    return {
      height: "300px",
      width: "300px",
      backgroundColor: "#ff9c6e",

      ".view": {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="view">xxxxxxxxxxxxx</div>
    </div>
  );
};

export default TrialView;
