import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Button, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const DocsPage = () => {
  const [timestamp, setTimestamp] = useState<number>(dayjs().unix());

  // useEffect(() => {
  //   console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
  // }, []);

  useEffect(() => {
    console.log(dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss"));
  }, [timestamp]);

  const clsname = useEmotionCss(() => {
    return {
      ".tsview": {
        ".title": {
          fontSize: "16px",
        },
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="tsview">
        <div className="title">时间戳</div>
        <div
          style={{
            display: "flex",
            width: "500px",
          }}
        >
          <Input
            size="small"
            placeholder="time stamp"
            onChange={(e) => {
              setTimestamp(+e.target.value);
            }}
          />
          <Select
            style={{ width: "150px" }}
            size="small"
            options={[
              { value: "sec", label: "秒" },
              { value: "millisec", label: "毫秒" },
            ]}
          />
          <Button size="small">xxx</Button>
          <Input size="small" />
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
