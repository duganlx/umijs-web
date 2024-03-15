import { useEmotionCss } from "@ant-design/use-emotion-css";
import OZoneView from "./components/ozone";
import LZonView from "./components/lzone";
import CZoneView from "./components/czone";

const JottingsView: React.FC = () => {
  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      flexDirection: "row",
      height: "300px",

      ".content-zone": {
        height: "100%",
        backgroundColor: "#f4ffb8",
        width: "calc(100% - 560px)",
      },

      ".list-zone": {
        height: "100%",
        // backgroundColor: "#fff1b8",
        border: "1px solid #fff1b8",
        width: "400px",
      },

      ".oper-zone": {
        height: "100%",
        // backgroundColor: "#ffccc7",
        border: "1px solid #ffccc7",
        width: "160px",
      },
    };
  });

  return (
    <>
      <div className={clsname}>
        <div className="content-zone">
          <CZoneView />
        </div>
        <div className="list-zone">
          <LZonView />
        </div>
        <div className="oper-zone">
          <OZoneView />
        </div>
      </div>
    </>
  );
};

export default JottingsView;
