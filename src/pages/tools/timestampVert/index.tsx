import { useEmotionCss } from "@ant-design/use-emotion-css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  Select,
  message,
} from "antd";

function renderCurTimestamp(tstype: "sec" | "ms", current: dayjs.Dayjs) {
  switch (tstype) {
    case "sec":
      return current.unix();
    case "ms":
      return current.valueOf();
    default:
      return 0;
  }
}

const TimestampVertView: React.FC = () => {
  // now
  const [current, setCurrent] = useState<dayjs.Dayjs>(dayjs());
  const [currentctl, setCurrentctl] = useState<boolean>(true);
  const [intervalid, setIntervalid] = useState<NodeJS.Timeout | undefined>();

  // timestamp to time
  const [ts2ttype, setTs2ttype] = useState<"sec" | "ms">("sec");
  const [ts2t, setTs2t] = useState<number>(dayjs().unix());
  const [ts2tbtn, setTs2tbtn] = useState<boolean>(false);
  const [ts2tres, setTs2tres] = useState<string>("");

  // time to timestamp
  const [t2tstype, setT2tstype] = useState<"sec" | "ms">("sec");
  const [t2ts, setT2ts] = useState<dayjs.Dayjs>(dayjs());
  const [t2tsbtn, setT2tsbtn] = useState<boolean>(false);
  const [t2tsres, setT2tsres] = useState<number | undefined>();

  useEffect(() => {
    if (!currentctl && intervalid !== undefined) {
      clearInterval(intervalid);
      setIntervalid(undefined);
      return;
    }

    const id = setInterval(() => {
      setCurrent(dayjs());
    }, 1000);

    setIntervalid(id);

    return () => {
      clearInterval(id);
    };
  }, [currentctl]);

  useEffect(() => {
    let dtstr = "";

    switch (ts2ttype) {
      case "sec":
        dtstr = dayjs(ts2t * 1000).format("YYYY-MM-DD HH:mm:ss");
        break;
      case "ms":
        dtstr = dayjs(ts2t).format("YYYY-MM-DD HH:mm:ss");
        break;
      default:
    }

    setTs2tres(dtstr);
  }, [ts2tbtn]);

  useEffect(() => {
    let dst = 0;
    switch (t2tstype) {
      case "sec":
        dst = t2ts.unix();
        break;
      case "ms":
        dst = t2ts.startOf("s").valueOf();
        break;
      default:
    }

    setT2tsres(dst);
  }, [t2tsbtn]);

  const clsname = useEmotionCss(() => {
    return {
      ".row": {
        display: "flex",
        alignItems: "center",
        margin: "5px 0",
      },

      ".ctl": {
        cursor: "pointer",
        userSelect: "none",
        color: currentctl ? "green" : "red",
      },

      ".ctl:hover": {
        textDecoration: "underline",
      },

      ".curtime:hover": {
        cursor: "pointer",
        textDecoration: "underline",
      },

      ".item-name": {
        marginRight: "5px",
      },
    };
  });

  const renderCurtime = renderCurTimestamp(ts2ttype, current);

  return (
    <div className={clsname}>
      <div className="row">
        <div className="item-name">now:</div>
        <div
          style={{ width: "120px" }}
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

        <div className="item-name">stl:</div>
        <div
          className="ctl"
          onClick={() => {
            setCurrentctl(!currentctl);
          }}
        >
          {currentctl ? "start" : "stop"}
        </div>
      </div>
      <div className="row">
        <div className="item-name">timestamp:</div>
        <Input
          style={{ width: "150px", marginRight: "5px" }}
          size="small"
          placeholder="timestamp"
          onChange={(e) => {
            setTs2t(+e.target.value);
          }}
          value={ts2t}
        />
        <Select
          style={{ width: "70px", marginRight: "5px" }}
          size="small"
          bordered={true}
          options={[
            { value: "sec", label: "sec" },
            { value: "ms", label: "ms" },
          ]}
          value={ts2ttype}
          onChange={(v) => {
            setTs2ttype(v);
          }}
        />
        <Button
          style={{ marginRight: "5px" }}
          size="small"
          onClick={() => {
            setTs2tbtn(!ts2tbtn);
          }}
        >
          {"convert >"}
        </Button>
        <Input style={{ width: "150px" }} size="small" value={ts2tres} />
      </div>
      <div className="row">
        <div className="item-name">time:</div>
        <DatePicker
          style={{ marginRight: "5px" }}
          size="small"
          showTime
          allowClear={false}
          onOk={(value: DatePickerProps["value"]) => {
            if (!value) {
              return;
            }
            setT2ts(value);
          }}
          value={t2ts}
        />
        <Button
          style={{ marginRight: "5px" }}
          size="small"
          onClick={() => {
            setT2tsbtn(!t2tsbtn);
          }}
        >
          {"convert >"}
        </Button>
        <Input
          size="small"
          style={{ width: "150px", marginRight: "5px" }}
          value={t2tsres}
        />
        <Select
          style={{ width: "70px" }}
          size="small"
          bordered={true}
          options={[
            { value: "sec", label: "sec" },
            { value: "ms", label: "ms" },
          ]}
          value={t2tstype}
          onChange={(v) => {
            setT2tstype(v);
          }}
        />
      </div>
    </div>
  );
};

export default TimestampVertView;
