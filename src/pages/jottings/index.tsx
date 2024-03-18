import { useEmotionCss } from "@ant-design/use-emotion-css";
import LZonView from "./components/lzone";
import CZoneView from "./components/czone";
import { useEffect, useState } from "react";
import { pullFromGithub } from "@/services/github/api";
import { message } from "antd";

interface CatalogItem {
  title: string;
  tags: string[];
  folderPath: string;
  lastModified: string;
}

const JottingsView: React.FC = () => {
  const owner = "duganlx";
  const repo = "jottings";
  const path = "catalog.json";
  const [catalogs, setCatalogs] = useState<CatalogItem[]>([]);

  useEffect(() => {
    pullFromGithub({ owner, repo, path }).then((r) => {
      if (r.length === 0) {
        message.info("pull catalog from github failed.");
        return;
      }

      const cls = JSON.parse(r) as CatalogItem[];
      console.log(cls);
      setCatalogs(cls);
    });
  }, []);

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      flexDirection: "row",
      height: "300px",

      ".list-zone": {
        height: "100%",
        border: "1px solid #fff1b8",
        width: "400px",
        marginRight: "5px",
      },

      ".content-zone": {
        height: "100%",
        width: "calc(100% - 405px)",
        border: "1px solid #f4ffb8",
      },
    };
  });

  return (
    <>
      <div className={clsname}>
        <div className="list-zone">
          <LZonView />
        </div>
        <div className="content-zone">
          <CZoneView />
        </div>
      </div>
    </>
  );
};

export default JottingsView;
