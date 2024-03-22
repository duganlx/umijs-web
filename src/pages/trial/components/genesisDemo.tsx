import { GetData } from "@/services/eam/genesis";
import React, { useEffect } from "react";

const KLineDsDemo: React.FC = () => {
  useEffect(() => {
    GetData({
      service_name: "KLineDs",
      data_name: "*",
      last_good: true,
      start: 0,
      length: 260,
      universe: ["600800.SH"],
      auction: true,
    }).then((res) => {
      console.log(res, "KLineDs");
    });
  }, []);

  return <></>;
};

const GenesisDemo: React.FC = () => {
  useEffect(() => {
    const header = {
      "X-Gsf-Host": "192.168.35.14:58005",
    };
    const req = { service_name: "IndexDs", data_name: "sz50_weight" };

    GetData(req, header).then((res) => {
      console.log(res, "IndexDs");
    });
  }, []);

  return <>{/* <KLineDsDemo /> */}</>;
};

export default GenesisDemo;
