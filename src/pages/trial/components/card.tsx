import dayjs from "dayjs";
import React, { useEffect } from "react";

async function sleep(sec: number) {
  const end = dayjs().add(sec, "milliseconds");

  while (true) {
    if (dayjs().unix() > end.unix()) return;
  }
}

const TestCard: React.FC<{ conf: string; cid: string }> = (props) => {
  const { conf, cid } = props;

  useEffect(() => {
    if (conf === undefined) return;

    let tid: number = 0;

    if (!tid) {
      tid = setInterval(() => {
        const curTick = +dayjs().format("ss");
        console.log(curTick, "tick");
      }, 1000) as unknown as number;
    }

    return () => {
      console.log(tid, cid);
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
