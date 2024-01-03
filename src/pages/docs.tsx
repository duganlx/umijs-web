import { useEmotionCss } from "@ant-design/use-emotion-css";
import {
  Button,
  Input,
  Select,
  message,
  DatePicker,
  DatePickerProps,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { RangePickerProps } from "antd/es/date-picker";

function renderCurTimestamp(tstype: "sec" | "ms", curtime: dayjs.Dayjs) {
  switch (tstype) {
    case "sec":
      return curtime.unix();
    case "ms":
      return curtime.valueOf();
    default:
      return 0;
  }
}

const DocsPage = () => {
  // timestamp to time
  const [timestampType, setTimestampType] = useState<"sec" | "ms">("sec");
  const [timestamp, setTimestamp] = useState<number>(dayjs().unix());
  const [timestampBtn, setTimestampBtn] = useState<boolean>(false);
  const [timestampRes, setTimestampRes] = useState<string>("");

  // time to timestamp
  const [stime, setStime] = useState<dayjs.Dayjs>(dayjs());
  const [stimeBtn, setStimeBtn] = useState<boolean>(false);
  const [stimeRes, setStimeRes] = useState<number | undefined>();
  const [stimeResType, setStimeResType] = useState<"sec" | "ms">("sec");

  const [curtime, setCurtime] = useState<dayjs.Dayjs>(dayjs());
  const [curtimeCtl, setCurtimeCtl] = useState<boolean>(true);
  const [intervalid, setIntervalid] = useState<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (!curtimeCtl && intervalid !== undefined) {
      clearInterval(intervalid);
      setIntervalid(undefined);
      return;
    }

    const id = setInterval(() => {
      setCurtime(dayjs());
    }, 1000);

    setIntervalid(id);

    return () => {
      clearInterval(id);
    };
  }, [curtimeCtl]);

  useEffect(() => {
    let dtstr = "";

    switch (timestampType) {
      case "sec":
        dtstr = dayjs(timestamp * 1000).format("YYYY-MM-DD HH:mm:ss");
        break;
      case "ms":
        dtstr = dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
        break;
      default:
    }

    setTimestampRes(dtstr);
  }, [timestampBtn]);

  useEffect(() => {
    let dst = 0;
    switch (stimeResType) {
      case "sec":
        dst = stime.unix();
        break;
      case "ms":
        dst = stime.startOf("s").valueOf();
        break;
      default:
    }

    setStimeRes(dst);
  }, [stimeBtn]);

  const clsname = useEmotionCss(() => {
    return {
      ".tsview": {
        ".title": {
          fontSize: "16px",
        },

        ".ctl": {
          cursor: "pointer",
          userSelect: "none",
          color: curtimeCtl ? "green" : "red",
        },

        ".ctl:hover": {
          textDecoration: "underline",
        },

        ".curtime:hover": {
          cursor: "pointer",
          textDecoration: "underline",
        },
      },
    };
  });

  const renderCurtime = renderCurTimestamp(timestampType, curtime);

  return (
    <div className={clsname}>
      <div className="tsview">
        <div className="title">Timestamp conversion</div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "5px" }}>now:</div>
          <div
            style={{ marginRight: "5px", width: "120px" }}
            className="curtime"
            onClick={() => {
              if (copy(renderCurtime + "")) {
                message.success("copy success");
              } else {
                message.error("copy fail");
              }
            }}
          >
            {renderCurtime}
          </div>
          <div style={{ marginRight: "5px" }}>ctl:</div>
          <div
            className="ctl"
            onClick={() => {
              setCurtimeCtl(!curtimeCtl);
            }}
          >
            {curtimeCtl ? "start" : "stop"}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>timestamp:</div>
          <Input
            style={{ width: "150px" }}
            size="small"
            placeholder="time stamp"
            onChange={(e) => {
              setTimestamp(+e.target.value);
            }}
            value={timestamp}
          />
          <Select
            style={{ width: "70px" }}
            size="small"
            bordered={true}
            options={[
              { value: "sec", label: "sec" },
              { value: "ms", label: "ms" },
            ]}
            value={timestampType}
            onChange={(v) => {
              setTimestampType(v);
            }}
          />
          <Button
            size="small"
            onClick={() => {
              setTimestampBtn(!timestampBtn);
            }}
          >
            {"convert >"}
          </Button>
          <Input style={{ width: "150px" }} size="small" value={timestampRes} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>time:</div>
          <DatePicker
            size="small"
            showTime
            allowClear={false}
            onOk={(value: DatePickerProps["value"]) => {
              if (!value) {
                return;
              }
              setStime(value);
            }}
            value={stime}
          />
          <Button
            size="small"
            onClick={() => {
              setStimeBtn(!stimeBtn);
            }}
          >
            {"convert >"}
          </Button>
          <Input size="small" style={{ width: "150px" }} value={stimeRes} />
          <Select
            style={{ width: "70px" }}
            size="small"
            bordered={true}
            options={[
              { value: "sec", label: "sec" },
              { value: "ms", label: "ms" },
            ]}
            value={stimeResType}
            onChange={(v) => {
              setStimeResType(v);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
