import { useEmotionCss } from "@ant-design/use-emotion-css";
import { CatalogItem } from "..";
import { BarsOutlined } from "@ant-design/icons";

interface CZoneViewProps {
  read: CatalogItem | undefined;
}

const CZoneView: React.FC<CZoneViewProps> = (props) => {
  const { read } = props;

  const empty = read === undefined;

  const clsname = useEmotionCss(() => {
    return {
      height: "100%",

      ".empty": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",

        ".icon": {
          fontSize: "64px",
          color: "#b7eb8f",
        },
      },
    };
  });

  return (
    <div className={clsname}>
      {empty ? (
        <div className="empty">
          <div className="icon">
            <BarsOutlined />
          </div>
          <div className="desc">请选择查看的文章</div>
        </div>
      ) : (
        <>xxx</>
      )}
    </div>
  );
};

export default CZoneView;
