import { GetData } from "@/services/eam/genesis";
import dayjs from "dayjs";
import React, { useEffect } from "react";

function sleep(sec: number) {
  const end = dayjs().add(sec, "milliseconds");

  while (true) {
    if (dayjs().unix() > end.unix()) return;
  }
}

const SZ_50 = [
  "600028.SH",
  "600030.SH",
  "600031.SH",
  "600036.SH",
  "600048.SH",
  "600050.SH",
  "600089.SH",
  "600104.SH",
  "600111.SH",
  "600150.SH",
  "600276.SH",
  "600309.SH",
  "600406.SH",
  "600436.SH",
  "600438.SH",
  "600519.SH",
  "600690.SH",
  "600809.SH",
  "600887.SH",
  "600893.SH",
  "600900.SH",
  "600905.SH",
  "601012.SH",
  "601088.SH",
  "601166.SH",
  "601225.SH",
  "601288.SH",
  "601318.SH",
  "601390.SH",
  "601398.SH",
  "601601.SH",
  "601628.SH",
  "601633.SH",
  "601668.SH",
  "601669.SH",
  "601728.SH",
  "601857.SH",
  "601888.SH",
  "601899.SH",
  "601919.SH",
  "601988.SH",
  "603259.SH",
  "603288.SH",
  "603501.SH",
  "603799.SH",
  "603986.SH",
  "688041.SH",
  "688111.SH",
  "688599.SH",
  "688981.SH",
];

const TestCard: React.FC<{ conf: string; cid: string }> = (props) => {
  const { conf, cid } = props;

  useEffect(() => {
    if (conf === undefined) return;

    let tid: number = 0;

    if (!tid) {
      tid = setInterval(() => {
        const curTick = +dayjs().format("ss");
        // console.log(curTick, cid);
        if (curTick < 1) {
          const req = {
            last_good: false,
            data_name: "*",
            service_name: "KLineDs",
            start: 0,
            length: 260,
            format: "json",
            universe: SZ_50, // SZ_50 上证50指数成分股
            auction: true,
          };
          GetData(req).then((res) => {
            console.log(res, cid);
            sleep(300);
          });
        }
      }, 500) as unknown as number;
    }

    return () => {
      if (tid) {
        clearInterval(tid);
        tid = 0;
      }
    };
  }, [conf]);

  return <>card</>;
};

const CardFactory: React.FC<{ ct: string; t: string; c: string }> = (p) => {
  const { ct, t, c } = p;

  switch (ct) {
    case "test":
      return <TestCard cid={t} conf={c} />;
    default:
      throw new Error(`未知卡片类型: ${ct}`);
  }
};

export default CardFactory;
