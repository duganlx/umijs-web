import { useEmotionCss } from "@ant-design/use-emotion-css";
import LZoneView from "./components/lzone";
import CZoneView from "./components/czone";
import { useEffect, useState } from "react";
import { pullFromGithub } from "@/services/github/api";
import { message } from "antd";
import dayjs from "dayjs";

export interface CatalogItem {
  title: string;
  tags: string[];
  folderPath: string;
  lastModified: string;
}

function sortCatalogItem(cls: CatalogItem[]) {
  return cls.sort((a, b) => {
    const adateunix = dayjs(a.lastModified, "YYYY-MM-DD").unix();
    const bdateunix = dayjs(b.lastModified, "YYYY-MM-DD").unix();

    return bdateunix - adateunix;
  });
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

      let cls = JSON.parse(r) as CatalogItem[];
      cls = sortCatalogItem(cls);

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
          <LZoneView catalogs={catalogs} />
        </div>
        <div className="content-zone">
          <CZoneView />
        </div>
      </div>
    </>
  );
};

export default JottingsView;
