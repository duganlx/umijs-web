import { useEmotionCss } from "@ant-design/use-emotion-css";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { useEffect, useState } from "react";

function calcExtraOffset(val: number) {
  if (val >= 1) {
    return 1e-1 * 3;
  } else if (val >= 1e-1) {
    return 1e-2 * 3;
  } else if (val >= 1e-2) {
    return 1e-3 * 3;
  } else {
    return 1e-3 * 6;
  }
}

const calcArrayMaxValue = (nums: number[], fixNum: number) => {
  let max = -100000000;
  nums.forEach((num) => {
    if (num === undefined) return;

    if (num > max) max = num;
  });

  max = +max.toFixed(fixNum);

  return max;
};

const calcArrayMinValue = (nums: number[], fixNum: number) => {
  let min = 100000000;
  nums.forEach((num) => {
    if (num === undefined) return;

    if (num < min) min = num;
  });

  min = +min.toFixed(fixNum);

  return min;
};

function calcYAxisInterval(datas: number[], mid: number) {
  let min = calcArrayMinValue(datas, 0);
  let max = calcArrayMaxValue(datas, 0);
  const intervalNumHalf = 3;

  const p1 = (max - mid) / intervalNumHalf;
  const p2 = (mid - min) / intervalNumHalf;

  let maxInterval = p1 > p2 ? p1 : p2;
  maxInterval = +maxInterval.toFixed(2);
  maxInterval = maxInterval + calcExtraOffset(maxInterval);

  min = mid - maxInterval * intervalNumHalf;
  max = mid + maxInterval * intervalNumHalf;

  return { min, max, interval: maxInterval };
}

const KLineChart: React.FC = () => {
  const isSim = false;
  const xData = ORI_DATA.map((item) => item["epoch_time"]);
  const preClose = ORI_DATA[0]["pre_close"];

  const [datas, setDatas] = useState<KLineItem[]>([]);

  useEffect(() => {
    // 仿真测试
    if (!isSim) {
      setDatas(ORI_DATA);
      return;
    }

    let tid: number = 0;

    if (!tid) {
      tid = setInterval(() => {
        setDatas((prevDatas) => {
          if (prevDatas.length >= ORI_DATA.length) {
            clearInterval(tid);
            return prevDatas;
          }

          const nextItem = ORI_DATA[prevDatas.length];

          return [...prevDatas, nextItem];
        });
      }, 50) as unknown as number;
    }

    return () => {
      if (tid) {
        clearInterval(tid);
        tid = 0;
      }
    };
  }, []);

  const showSplitLine = true;
  const showXLabel1h = false;
  const isSmallChart = false;
  const isBigChart = false;

  const gridLineColor = "rgba(255,0,0,0.4)";
  const markLineColor = "rgba(255,0,0,0.6)";

  // 图二（柱状图）数据格式化
  // == begin ==
  let barData = datas.map((item) => item["amount"]);
  let barChartMaxVal = calcArrayMaxValue(barData, 0);
  const barChartNumUnit = calcNumUnit(barChartMaxVal);
  let barChartUnit = barChartNumUnit.desc;
  barData = datas.map((item) => item["amount"] / barChartNumUnit.val);
  // == end ==

  // 图一（折线图）y 轴间隔
  // == begin ==
  let lineData = datas.map((item) => +item["close"] - preClose);
  // console.log(lineData, "line chart data");
  let lineRangeConf = calcYAxisInterval(lineData, 0);
  // console.log(lineRangeConf, "line chart y axis value range");
  // == end ==

  const option: EChartsOption = {
    color: ["#ffffff", "#ffe58f", "#eb2f96", "#fac858", "#73c0de"],
    grid: [
      {
        top: 17,
        left: 45,
        right: 50,
        bottom: isSmallChart ? "51px" : "20%",
      },
      {
        // top: '0vh',
        height: isSmallChart ? "30px" : "14%",
        left: 45,
        right: 50,
        bottom: "17px",
      },
    ],
    legend: {
      show: false,
      orient: "horizontal",
      top: "-5px",
      align: "right",
      // data: [{ name: 'close' }, { name: 'volume' }],
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: "all",
        },
      ],
      label: {
        backgroundColor: "#777",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "black",
      textStyle: {
        color: "white",
      },
      formatter: (params: Object, ticket: string) => {
        return "";
      },
    },
    xAxis: [
      {
        id: "xAxis1",
        type: "category",
        gridIndex: 0,
        triggerEvent: true,
        show: true,
        data: xData,
        boundaryGap: true,
        splitLine: {
          show: showSplitLine,
          alignWithLabel: true,
          lineStyle: {
            color: gridLineColor,
          },
          interval: (index: number, value: string) => {
            if (value === "09:16" || value === "15:00") return false;
            // value 格式 hh:ss
            const [_, ss] = value.split(":");

            if (showXLabel1h) {
              return +ss === 0;
            } else {
              return +ss % 30 === 0;
            }
          },
        },
        axisLine: {
          show: true,
          onZero: true,
          lineStyle: {
            color: markLineColor,
          },
        },
        axisPointer: {
          show: true,
          label: {
            show: false,
          },
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
        },
        axisLabel: {
          show: false,
          interval: (index: number, value: string) => {
            // value 格式 hh:ss
            const [_, ss] = value.split(":");
            // console.log(index, ss, +ss, 'gsfcard axisLabel');
            return +ss % 30 === 0;
          },
          showMinLabel: true,
          showMaxLabel: true,
        },
      },
      {
        id: "xAxis2",
        type: "category",
        triggerEvent: true,
        gridIndex: 1,
        data: xData,
        boundaryGap: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: gridLineColor,
          },
        },
        splitLine: {
          show: showSplitLine,
          alignWithLabel: true,
          interval: (index: number, value: string) => {
            if (value === "09:16" || value === "15:00") return false;
            // value 格式 hh:ss
            const [_, ss] = value.split(":");

            if (showXLabel1h) {
              return +ss === 0;
            } else {
              return +ss % 30 === 0;
            }
          },
          lineStyle: {
            color: gridLineColor,
          },
        },
        axisPointer: {
          show: true,
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
        },
        axisLabel: {
          interval: (index: number, value: string) => {
            // if (value === '11:30') return true;

            if (index === 0) return true;
            // value 格式 hh:ss
            const [_, ss] = value.split(":");

            if (showXLabel1h) {
              return +ss === 0;
            } else {
              return +ss % 30 === 0;
            }
          },
          showMinLabel: true,
          showMaxLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        // name: `钱`,
        gridIndex: 0,
        nameGap: 8,
        position: "left",
        alignTicks: true,
        splitLine: {
          show: showSplitLine,
          lineStyle: {
            color: gridLineColor,
          },
        },
        axisLabel: {
          hideOverlap: true,
          formatter: function (value: number) {
            return `${(value + preClose).toFixed(1)}`;
          },
          align: "right",
          color: (value: number, index: number) => {
            if (Math.abs(value) < 1e-4) {
              return "#bfbfbf";
            }

            if (value > 0) {
              return "red";
            } else {
              return "green";
            }
          },
        },
        nameTextStyle: {
          // color: 'black',
          width: 300,
          padding: [0, 60, 0, 0],
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: gridLineColor,
          },
        },
        axisPointer: {
          show: true,
          label: {
            formatter: (target: any) => {
              const val = target.value as number;
              return (val + preClose).toFixed(1);
            },
          },
        },
        // scale: true,
        min: lineRangeConf.min,
        max: lineRangeConf.max,
        interval: lineRangeConf.interval,
      },
      {
        type: "value",
        // name: `钱`,
        // nameLocation: 'middle',
        gridIndex: 0,
        nameGap: 8,
        position: "right",
        alignTicks: true,
        splitLine: {
          show: false,
          lineStyle: {
            color: gridLineColor,
          },
        },
        axisLabel: {
          hideOverlap: true,
          formatter: function (value: number) {
            const pnl = +((value / preClose) * 100).toFixed(1);

            if (Math.abs(pnl) < 0.0001) {
              return `0.0%`;
            }

            return `${pnl}%`;
          },
          align: "left",
          color: (value: number, index: number) => {
            if (Math.abs(value) < 1e-4) {
              return "#bfbfbf";
            }

            if (value > 0) {
              return "red";
            } else {
              return "green";
            }
          },
        },
        nameTextStyle: {
          // color: 'black',
          width: 300,
          padding: [0, 30, 0, 0],
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: gridLineColor,
          },
        },
        axisPointer: {
          show: true,
          label: {
            formatter: (target: any) => {
              const val = target.value as number;
              const pnl = (val / preClose) * 100;
              return `${pnl.toFixed(1)}%`;
            },
          },
        },
        // scale: true,
        min: lineRangeConf.min,
        max: lineRangeConf.max,
        interval: lineRangeConf.interval,
      },
      {
        type: "value",
        name: isSmallChart ? "" : `成交额`,
        gridIndex: 1,
        nameGap: 2,
        position: "left",
        alignTicks: true,
        axisLabel: {
          hideOverlap: true,
        },
        nameTextStyle: {
          // color: 'black',
          width: 300,
          padding: isBigChart ? [0, -40, 2, 0] : [0, -45, -10, 0],
        },
        boundaryGap: ["0%", "10%"],
        axisLine: {
          show: true,
          lineStyle: {
            color: gridLineColor,
          },
        },
        axisTick: { show: false },
        splitLine: { show: false },
        scale: true,
      },
      {
        type: "value",
        name: `${barChartUnit}`,
        nameLocation: "middle",
        nameRotate: 0,
        gridIndex: 1,
        nameGap: 2,
        position: "right",
        alignTicks: true,
        axisLabel: {
          hideOverlap: true,
        },
        nameTextStyle: {
          // color: 'black',
          width: 300,
          padding: [0, 0, 10, 3],
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: gridLineColor,
          },
        },
        axisTick: { show: false },
        splitLine: {
          show: false,
          lineStyle: {
            color: gridLineColor,
          },
        },
        scale: true,
      },
    ],
    series: [
      {
        name: "close",
        type: "line",
        gridIndex: 0,
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: lineData,
        showSymbol: false,
        markLine: {
          animation: false,
          silent: "true",
          symbol: "none",
          lineStyle: {
            color: markLineColor, // 标记线颜色
            type: "dashed", // 标记线类型
            width: 1,
          },
          label: {
            show: false,
          },
          data: [{ xAxis: "11:30" }],
        },
      },
      {
        name: "close",
        type: "line",
        gridIndex: 0,
        xAxisIndex: 0,
        yAxisIndex: 1,
        data: lineData,
        showSymbol: false,
        markLine: {
          animation: false,
          silent: "true",
          symbol: "none",
          lineStyle: {
            color: markLineColor, // 标记线颜色
            type: "dashed", // 标记线类型
            width: 1,
          },
          label: {
            show: false,
          },
          data: [{ xAxis: "11:30" }],
        },
      },
      {
        name: "amount",
        type: "bar",
        gridIndex: 1,
        xAxisIndex: 1,
        yAxisIndex: 2,
        data: barData,
        showSymbol: false,
        markLine: {
          animation: false,
          silent: "true",
          symbol: "none",
          lineStyle: {
            // 标记线样式
            color: markLineColor,
            type: "dashed",
            width: 1,
          },
          label: {
            show: false,
          },
          data: [{ xAxis: "11:30" }],
        },
      },
    ],
    animation: false,
  };

  const clsname = useEmotionCss(() => {
    return {
      width: "60vw",
      height: "450px",
      padding: "2px 1px 0 1px",
      backgroundColor: "black",

      ".title-zone": {
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        color: "white",
        cursor: "default",
        width: "100%",
        justifyContent: "space-between",
        whiteSpace: "nowrap",
        flexWrap: "nowrap",

        ".title-zone-left": {
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          flexWrap: "wrap",
          height: "16px",
          overflow: "hidden",
        },
        ".title-zone-right": {
          display: "flex",
          alignItems: "center",
        },

        ".card-name": {
          marginRight: "13px",
          color: "#ffc53d",
        },
        ".epoch-time": {
          marginRight: "4px",
          color: "#5cdbd3",
        },

        ".ct-item": {
          display: "flex",
          marginRight: "8px",
          alignItems: "center",
          flexShrink: 0,

          ".label": {
            marginRight: "4px",
          },

          ".value": {
            fontWeight: "normal",
          },
        },
      },

      ".content-zone": {
        padding: "2px 1px 0 1px",
        overflowWrap: "break-word",
        whiteSpace: "break-spaces",
        height: "calc(100% - 20px)",
      },
    };
  });

  const ctprops = renderCardTitleBar(datas);

  return (
    <div className={clsname}>
      <div className="title-zone">
        <div className="title-zone-left">
          <span className="card-name">{ctprops.title}</span>
          <span className="epoch-time">{ctprops.epochTime}</span>
          <span className="ct-item">
            <span className="label">价</span>
            <span className="value" style={{ color: ctprops.color }}>
              {ctprops.close}
            </span>
          </span>
          <span className="ct-item">
            <span className="label">涨跌</span>
            <span
              className="value"
              style={{ color: ctprops.color }}
            >{`${ctprops.pnl}(${ctprops.pnlPercentage}%)`}</span>
          </span>
          <span className="ct-item">
            <span className="label">均价</span>
            <span className="value" style={{ color: ctprops.color }}>
              {ctprops.avgPrice}
            </span>
          </span>
          <span className="ct-item">
            <span className="label">额</span>
            <span className="value">
              <span>{ctprops.totalAmount}</span>
              <span>{ctprops.totalAmountUnit}</span>
            </span>
          </span>
        </div>
        <span className="title-zone-right">{ctprops.date}</span>
      </div>
      <div className="content-zone">
        <ReactECharts
          option={option}
          theme="dark"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default KLineChart;

interface CardTitleProps {
  title: string; // 标题
  epochTime: string;
  close: number; // 价
  pnl: number; // 涨跌
  pnlPercentage: number; // 涨跌%
  avgPrice: number; // 均价
  totalVolume: number; // 成交量
  totalVolumeUnit: string; // 成交量(单位)
  totalAmount: number; // 成交金额
  totalAmountUnit: string; // 成交金额(单位)
  color: string; // 涨跌颜色
  date: string; // 日期
}

function renderCardTitleBar(datas: KLineItem[]): CardTitleProps {
  const props: CardTitleProps = {
    title: "上证50指数",
    epochTime: "",
    close: 0,
    pnl: 0,
    pnlPercentage: 0,
    avgPrice: 0,
    totalVolume: 0,
    totalVolumeUnit: "",
    totalAmount: 0,
    totalAmountUnit: "",
    color: "#bfbfbf",
    date: "2024/03/25",
  };

  if (datas.length === 0) return props;

  const lastbar = datas[datas.length - 1];
  props.epochTime = lastbar["epoch_time"];
  props.close = +lastbar["close"].toFixed(2);
  props.pnl = +lastbar["pnl"].toFixed(2);
  props.pnlPercentage = +lastbar["pnlPercentage"].toFixed(2);
  props.avgPrice = +lastbar["avgPrice"].toFixed(2);
  const totalVolumeNumUnit = calcNumUnit(lastbar["volume"]);
  props.totalVolume = +(lastbar["volume"] / totalVolumeNumUnit.val).toFixed(2);
  props.totalVolumeUnit = totalVolumeNumUnit.desc;
  const totalAmountNumUnit = calcNumUnit(lastbar["amount"]);
  props.totalAmount = +(lastbar["volume"] / totalAmountNumUnit.val).toFixed(2);
  props.totalAmountUnit = totalAmountNumUnit.desc;

  if (lastbar["pnl"] > 0) {
    props.color = "red";
  } else if (lastbar["pnl"] < 0) {
    props.color = "green";
  }

  return props;
}

const UNIT_Yuan_Wang = { val: 10000, desc: "万" };
const UNIT_Yuan_Yi = { val: 100000000, desc: "亿" };
const UNIT_Yuan_Yuan = { val: 1, desc: "元" };

function calcNumUnit(val: number) {
  if (val > UNIT_Yuan_Yi.val / 10) {
    return UNIT_Yuan_Yi;
  } else if (val > UNIT_Yuan_Wang.val / 10) {
    return UNIT_Yuan_Wang;
  }

  return UNIT_Yuan_Yuan;
}

interface KLineItem {
  epoch_time: string;
  close: number;
  pre_close: number;
  amount: number;
  volume: number;
  pnl: number;
  pnlPercentage: number;
  avgPrice: number;
}

// SZ50 20240324
const ORI_DATA: KLineItem[] = [
  {
    epoch_time: "09:16",
    close: 307.44017956,
    pre_close: 307.99021436,
    amount: 2098336739.6799989,
    volume: 225938528,
    pnl: -0.5500347999999917,
    pnlPercentage: -0.178588401304558,
    avgPrice: 9.287201958224667,
  },
  {
    epoch_time: "09:17",
    close: 308.5855928099999,
    pre_close: 307.99021436,
    amount: 2428638275.859998,
    volume: 258574912,
    pnl: 0.5953784499999415,
    pnlPercentage: 0.19331083334486188,
    avgPrice: 9.392397186081217,
  },
  {
    epoch_time: "09:18",
    close: 307.44474286999997,
    pre_close: 307.99021436,
    amount: 2488257354.7799993,
    volume: 264585869,
    pnl: -0.5454714900000113,
    pnlPercentage: -0.17710676007466342,
    avgPrice: 9.404347118704209,
  },
  {
    epoch_time: "09:19",
    close: 307.41159823,
    pre_close: 307.99021436,
    amount: 2324431371.6500006,
    volume: 241087039,
    pnl: -0.5786161300000003,
    pnlPercentage: -0.18786834874034986,
    avgPrice: 9.641461363047396,
  },
  {
    epoch_time: "09:20",
    close: 307.2555617699999,
    pre_close: 307.99021436,
    amount: 1826068868.2300005,
    volume: 183950239,
    pnl: -0.7346525900001097,
    pnlPercentage: -0.2385311466881257,
    avgPrice: 9.926971979797212,
  },
  {
    epoch_time: "09:21",
    close: 307.07637177,
    pre_close: 307.99021436,
    amount: 2215455706.100002,
    volume: 219929266,
    pnl: -0.9138425900000016,
    pnlPercentage: -0.29671156659927256,
    avgPrice: 10.073492020384418,
  },
  {
    epoch_time: "09:22",
    close: 307.06156761999995,
    pre_close: 307.99021436,
    amount: 2708927038.6799994,
    volume: 263441020,
    pnl: -0.9286467400000333,
    pnlPercentage: -0.3015182615232592,
    avgPrice: 10.282859665058993,
  },
  {
    epoch_time: "09:23",
    close: 307.04555414000004,
    pre_close: 307.99021436,
    amount: 3368995675.42,
    volume: 323519357,
    pnl: -0.9446602199999461,
    pnlPercentage: -0.3067176085327694,
    avgPrice: 10.413582997508245,
  },
  {
    epoch_time: "09:24",
    close: 307.02610294000004,
    pre_close: 307.99021436,
    amount: 4397588689.810006,
    volume: 412936131,
    pnl: -0.9641114199999379,
    pnlPercentage: -0.3130331338621728,
    avgPrice: 10.6495614204561,
  },
  {
    epoch_time: "09:25",
    close: 307.16875283999997,
    pre_close: 307.99021436,
    amount: 7272489293.870004,
    volume: 815325157,
    pnl: -0.8214615200000139,
    pnlPercentage: -0.2667167597214082,
    avgPrice: 8.919741076835194,
  },
  {
    epoch_time: "09:26",
    close: 307.18569540999994,
    pre_close: 307.99021436,
    amount: 1805404068.4550006,
    volume: 481908205,
    pnl: -0.8045189500000447,
    pnlPercentage: -0.2612157505301971,
    avgPrice: 3.7463650747656407,
  },
  {
    epoch_time: "09:27",
    close: 307.18569540999994,
    pre_close: 307.99021436,
    amount: 1947351.7449999999,
    volume: 332819101,
    pnl: -0.8045189500000447,
    pnlPercentage: -0.2612157505301971,
    avgPrice: 0.005851081681156275,
  },
  {
    epoch_time: "09:28",
    close: 307.18569540999994,
    pre_close: 307.99021436,
    amount: 1947351.7449999999,
    volume: 92001,
    pnl: -0.8045189500000447,
    pnlPercentage: -0.2612157505301971,
    avgPrice: 21.166636721339984,
  },
  {
    epoch_time: "09:29",
    close: 307.18569540999994,
    pre_close: 307.99021436,
    amount: 1947351.7449999999,
    volume: 92001,
    pnl: -0.8045189500000447,
    pnlPercentage: -0.2612157505301971,
    avgPrice: 21.166636721339984,
  },
  {
    epoch_time: "09:30",
    close: 307.19252767,
    pre_close: 307.99021436,
    amount: 1249475084.7450001,
    volume: 139366055,
    pnl: -0.7976866899999777,
    pnlPercentage: -0.2589974138163975,
    avgPrice: 8.965419052329494,
  },
  {
    epoch_time: "09:31",
    close: 307.5990596,
    pre_close: 307.99021436,
    amount: 27452064752.754993,
    volume: 2435442235,
    pnl: -0.39115476000000626,
    pnlPercentage: -0.12700233376337078,
    avgPrice: 11.271901405928848,
  },
  {
    epoch_time: "09:32",
    close: 307.4631130500001,
    pre_close: 307.99021436,
    amount: 18236731267.5,
    volume: 1553397792,
    pnl: -0.527101309999864,
    pnlPercentage: -0.17114222641624321,
    avgPrice: 11.739897765671602,
  },
  {
    epoch_time: "09:33",
    close: 307.57965957,
    pre_close: 307.99021436,
    amount: 15845892587,
    volume: 1327199977,
    pnl: -0.41055478999999195,
    pnlPercentage: -0.133301244928552,
    avgPrice: 11.939340613023534,
  },
  {
    epoch_time: "09:34",
    close: 307.57913099000007,
    pre_close: 307.99021436,
    amount: 14307276518,
    volume: 1215220782,
    pnl: -0.4110833699999148,
    pnlPercentage: -0.13347286726435037,
    avgPrice: 11.773396842714627,
  },
  {
    epoch_time: "09:35",
    close: 307.4068976699999,
    pre_close: 307.99021436,
    amount: 12422329633,
    volume: 1043450961,
    pnl: -0.5833166900000606,
    pnlPercentage: -0.18939455307441788,
    avgPrice: 11.905044029184616,
  },
  {
    epoch_time: "09:36",
    close: 306.8915352199999,
    pre_close: 307.99021436,
    amount: 12648805071,
    volume: 1023457165,
    pnl: -1.0986791400000584,
    pnlPercentage: -0.3567253402135151,
    avgPrice: 12.35890030727373,
  },
  {
    epoch_time: "09:37",
    close: 306.5251677400001,
    pre_close: 307.99021436,
    amount: 12391128992,
    volume: 1057682461,
    pnl: -1.465046619999896,
    pnlPercentage: -0.4756796000951691,
    avgPrice: 11.715358294099575,
  },
  {
    epoch_time: "09:38",
    close: 306.53784971,
    pre_close: 307.99021436,
    amount: 12249267391,
    volume: 1072645965,
    pnl: -1.4523646499999927,
    pnlPercentage: -0.4715619465436527,
    avgPrice: 11.419674142903245,
  },
  {
    epoch_time: "09:39",
    close: 306.63237320999997,
    pre_close: 307.99021436,
    amount: 10060065058,
    volume: 832321718,
    pnl: -1.357841150000013,
    pnlPercentage: -0.4408715234091365,
    avgPrice: 12.086750640333525,
  },
  {
    epoch_time: "09:40",
    close: 306.32338654999984,
    pre_close: 307.99021436,
    amount: 10140250676,
    volume: 831506393,
    pnl: -1.666827810000143,
    pnlPercentage: -0.5411950549999767,
    avgPrice: 12.195036335697782,
  },
  {
    epoch_time: "09:41",
    close: 306.2707259900001,
    pre_close: 307.99021436,
    amount: 10031898123,
    volume: 821507637,
    pnl: -1.7194883699999082,
    pnlPercentage: -0.5582931826496496,
    avgPrice: 12.211570131757643,
  },
  {
    epoch_time: "09:42",
    close: 306.46001863999993,
    pre_close: 307.99021436,
    amount: 8967917120,
    volume: 792004034,
    pnl: -1.5301957200000516,
    pnlPercentage: -0.49683257735307906,
    avgPrice: 11.323070003454047,
  },
  {
    epoch_time: "09:43",
    close: 306.11202501,
    pre_close: 307.99021436,
    amount: 9417074656,
    volume: 819708238,
    pnl: -1.878189349999957,
    pnlPercentage: -0.6098211119800689,
    avgPrice: 11.488325015467272,
  },
  {
    epoch_time: "09:44",
    close: 306.04639985999995,
    pre_close: 307.99021436,
    amount: 8975955297,
    volume: 736068797,
    pnl: -1.9438145000000304,
    pnlPercentage: -0.6311286558370877,
    avgPrice: 12.194451569721954,
  },
  {
    epoch_time: "09:45",
    close: 306.0065544799999,
    pre_close: 307.99021436,
    amount: 8959479084,
    volume: 708630070,
    pnl: -1.9836598800000615,
    pnlPercentage: -0.6440658785611397,
    avgPrice: 12.64337975948438,
  },
  {
    epoch_time: "09:46",
    close: 305.3961346799999,
    pre_close: 307.99021436,
    amount: 9534217041,
    volume: 791857936,
    pnl: -2.5940796800001067,
    pnlPercentage: -0.8422604222639296,
    avgPrice: 12.040312545405872,
  },
  {
    epoch_time: "09:47",
    close: 305.85589852999976,
    pre_close: 307.99021436,
    amount: 10196918691,
    volume: 889133922,
    pnl: -2.1343158300002187,
    pnlPercentage: -0.6929817021736562,
    avgPrice: 11.468372130109776,
  },
  {
    epoch_time: "09:48",
    close: 305.6712395999999,
    pre_close: 307.99021436,
    amount: 8428480298,
    volume: 752423306,
    pnl: -2.31897476000006,
    pnlPercentage: -0.7529378051243762,
    avgPrice: 11.201779943270392,
  },
  {
    epoch_time: "09:49",
    close: 305.6450764000001,
    pre_close: 307.99021436,
    amount: 8612313102,
    volume: 733161571,
    pnl: -2.3451379599998745,
    pnlPercentage: -0.7614326204723909,
    avgPrice: 11.746814675860854,
  },
  {
    epoch_time: "09:50",
    close: 305.5442099999999,
    pre_close: 307.99021436,
    amount: 7720175581,
    volume: 641650333,
    pnl: -2.4460043600000745,
    pnlPercentage: -0.7941824921557483,
    avgPrice: 12.03174873284138,
  },
  {
    epoch_time: "09:51",
    close: 305.3339765899999,
    pre_close: 307.99021436,
    amount: 9209000380,
    volume: 847997754,
    pnl: -2.656237770000075,
    pnlPercentage: -0.8624422615243543,
    avgPrice: 10.859699022268872,
  },
  {
    epoch_time: "09:52",
    close: 305.54671806999994,
    pre_close: 307.99021436,
    amount: 8669190808,
    volume: 786176211,
    pnl: -2.4434962900000414,
    pnlPercentage: -0.7933681578415119,
    avgPrice: 11.027032727145187,
  },
  {
    epoch_time: "09:53",
    close: 305.33856282999983,
    pre_close: 307.99021436,
    amount: 7414699585,
    volume: 649736313,
    pnl: -2.6516515300001515,
    pnlPercentage: -0.8609531752527433,
    avgPrice: 11.411859606190735,
  },
  {
    epoch_time: "09:54",
    close: 305.3283095199999,
    pre_close: 307.99021436,
    amount: 6356281718,
    volume: 529132079,
    pnl: -2.6619048400000906,
    pnlPercentage: -0.8642822777767512,
    avgPrice: 12.012656140623067,
  },
  {
    epoch_time: "09:55",
    close: 305.3225734800001,
    pre_close: 307.99021436,
    amount: 5563943238,
    volume: 459976657,
    pnl: -2.667640879999908,
    pnlPercentage: -0.866144687597703,
    avgPrice: 12.096142604906143,
  },
  {
    epoch_time: "09:56",
    close: 305.18158062,
    pre_close: 307.99021436,
    amount: 6486397425,
    volume: 539975022,
    pnl: -2.8086337400000048,
    pnlPercentage: -0.91192304464488,
    avgPrice: 12.012402723694874,
  },
  {
    epoch_time: "09:57",
    close: 305.3414155399998,
    pre_close: 307.99021436,
    amount: 7551634119,
    volume: 685349457,
    pnl: -2.648798820000195,
    pnlPercentage: -0.8600269412794015,
    avgPrice: 11.018662146543438,
  },
  {
    epoch_time: "09:58",
    close: 305.6357040499999,
    pre_close: 307.99021436,
    amount: 6534221159,
    volume: 581500012,
    pnl: -2.35451031000008,
    pnlPercentage: -0.7644756879346737,
    avgPrice: 11.23683753079613,
  },
  {
    epoch_time: "09:59",
    close: 305.4466502399999,
    pre_close: 307.99021436,
    amount: 6133028678,
    volume: 551684738,
    pnl: -2.5435641200000987,
    pnlPercentage: -0.8258587453129351,
    avgPrice: 11.11690836370391,
  },
  {
    epoch_time: "10:00",
    close: 305.2462260199998,
    pre_close: 307.99021436,
    amount: 7307811936,
    volume: 744619275,
    pnl: -2.7439883400001577,
    pnlPercentage: -0.8909336115441646,
    avgPrice: 9.814158968689066,
  },
  {
    epoch_time: "10:01",
    close: 305.77357946999985,
    pre_close: 307.99021436,
    amount: 8980507861,
    volume: 1028220352,
    pnl: -2.2166348900001367,
    pnlPercentage: -0.7197095188904878,
    avgPrice: 8.734030447395774,
  },
  {
    epoch_time: "10:02",
    close: 305.46955613999995,
    pre_close: 307.99021436,
    amount: 7287288232,
    volume: 729929645,
    pnl: -2.52065822000003,
    pnlPercentage: -0.8184215285014562,
    avgPrice: 9.983548800788876,
  },
  {
    epoch_time: "10:03",
    close: 305.73336243999995,
    pre_close: 307.99021436,
    amount: 6332632028,
    volume: 587593995,
    pnl: -2.256851920000031,
    pnlPercentage: -0.7327674110327642,
    avgPrice: 10.777223868668024,
  },
  {
    epoch_time: "10:04",
    close: 305.8132957800001,
    pre_close: 307.99021436,
    amount: 7651107351,
    volume: 696436443,
    pnl: -2.1769185799998922,
    pnlPercentage: -0.7068142033419766,
    avgPrice: 10.98608125393576,
  },
  {
    epoch_time: "10:05",
    close: 305.70152582,
    pre_close: 307.99021436,
    amount: 5308768389,
    volume: 464584783,
    pnl: -2.2886885400000097,
    pnlPercentage: -0.7431043043870322,
    avgPrice: 11.426909755242672,
  },
  {
    epoch_time: "10:06",
    close: 305.6300705200001,
    pre_close: 307.99021436,
    amount: 8695506946,
    volume: 920193283,
    pnl: -2.360143839999864,
    pnlPercentage: -0.7663048142306117,
    avgPrice: 9.449652705191502,
  },
  {
    epoch_time: "10:07",
    close: 305.62042299999996,
    pre_close: 307.99021436,
    amount: 7007656086,
    volume: 656849583,
    pnl: -2.369791360000022,
    pnlPercentage: -0.7694372254405613,
    avgPrice: 10.668585727030901,
  },
  {
    epoch_time: "10:08",
    close: 305.37532735,
    pre_close: 307.99021436,
    amount: 5601814344,
    volume: 508585535,
    pnl: -2.6148870099999613,
    pnlPercentage: -0.8490162635308662,
    avgPrice: 11.014497972302731,
  },
  {
    epoch_time: "10:09",
    close: 305.46351639999983,
    pre_close: 307.99021436,
    amount: 5534869592,
    volume: 516697281,
    pnl: -2.526697960000149,
    pnlPercentage: -0.8203825453515168,
    avgPrice: 10.712016098261605,
  },
  {
    epoch_time: "10:10",
    close: 305.53547973000013,
    pre_close: 307.99021436,
    amount: 6653114413,
    volume: 617956270,
    pnl: -2.454734629999848,
    pnlPercentage: -0.7970170854618708,
    avgPrice: 10.766319132905634,
  },
  {
    epoch_time: "10:11",
    close: 305.34112847,
    pre_close: 307.99021436,
    amount: 5144664035,
    volume: 482589165,
    pnl: -2.6490858899999807,
    pnlPercentage: -0.8601201487861365,
    avgPrice: 10.66054608789238,
  },
  {
    epoch_time: "10:12",
    close: 305.3674099999998,
    pre_close: 307.99021436,
    amount: 5058882517,
    volume: 445540947,
    pnl: -2.6228043600002025,
    pnlPercentage: -0.8515869133863041,
    avgPrice: 11.354472694515326,
  },
  {
    epoch_time: "10:13",
    close: 305.47639824999976,
    pre_close: 307.99021436,
    amount: 4008971839,
    volume: 357981312,
    pnl: -2.5138161100002208,
    pnlPercentage: -0.8161999936341813,
    avgPrice: 11.198829951771337,
  },
  {
    epoch_time: "10:14",
    close: 305.35173961999993,
    pre_close: 307.99021436,
    amount: 4739384301,
    volume: 417887586,
    pnl: -2.6384747400000492,
    pnlPercentage: -0.8566748607525598,
    avgPrice: 11.341290001852316,
  },
  {
    epoch_time: "10:15",
    close: 305.21580024,
    pre_close: 307.99021436,
    amount: 4025270197,
    volume: 365549934,
    pnl: -2.7744141199999603,
    pnlPercentage: -0.9008124254094141,
    avgPrice: 11.011546775439987,
  },
  {
    epoch_time: "10:16",
    close: 305.24965348999973,
    pre_close: 307.99021436,
    amount: 5738222483,
    volume: 559321373,
    pnl: -2.7405608700002517,
    pnlPercentage: -0.8898207612521358,
    avgPrice: 10.259258379886727,
  },
  {
    epoch_time: "10:17",
    close: 305.26997740999997,
    pre_close: 307.99021436,
    amount: 4698548280,
    volume: 420100899,
    pnl: -2.7202369500000145,
    pnlPercentage: -0.8832218762705235,
    avgPrice: 11.184332838097545,
  },
  {
    epoch_time: "10:18",
    close: 305.1809193099999,
    pre_close: 307.99021436,
    amount: 3835408373,
    volume: 338841344,
    pnl: -2.8092950500000597,
    pnlPercentage: -0.9121377625057825,
    avgPrice: 11.319186518750204,
  },
  {
    epoch_time: "10:19",
    close: 305.0929603599999,
    pre_close: 307.99021436,
    amount: 4227761206,
    volume: 373591455,
    pnl: -2.897254000000089,
    pnlPercentage: -0.9406967705193336,
    avgPrice: 11.316536150432027,
  },
  {
    epoch_time: "10:20",
    close: 305.10360418999977,
    pre_close: 307.99021436,
    amount: 4177730260,
    volume: 370587185,
    pnl: -2.8866101700002105,
    pnlPercentage: -0.9372408717590486,
    avgPrice: 11.273272334012306,
  },
  {
    epoch_time: "10:21",
    close: 305.07030014999987,
    pre_close: 307.99021436,
    amount: 4380541195,
    volume: 462123358,
    pnl: -2.9199142100001154,
    pnlPercentage: -0.9480542153157856,
    avgPrice: 9.479159880509654,
  },
  {
    epoch_time: "10:22",
    close: 305.04206823,
    pre_close: 307.99021436,
    amount: 4402379687,
    volume: 400189181,
    pnl: -2.948146129999998,
    pnlPercentage: -0.957220714341922,
    avgPrice: 11.000746386994406,
  },
  {
    epoch_time: "10:23",
    close: 305.0749796599999,
    pre_close: 307.99021436,
    amount: 3528158727,
    volume: 311767300,
    pnl: -2.9152347000000987,
    pnlPercentage: -0.9465348456144662,
    avgPrice: 11.316641376436849,
  },
  {
    epoch_time: "10:24",
    close: 305.0700040099999,
    pre_close: 307.99021436,
    amount: 3281523339,
    volume: 288172266,
    pnl: -2.9202103500001044,
    pnlPercentage: -0.9481503677213454,
    avgPrice: 11.387366954320303,
  },
  {
    epoch_time: "10:25",
    close: 305.0315639,
    pre_close: 307.99021436,
    amount: 4978401823,
    volume: 463710561,
    pnl: -2.958650460000001,
    pnlPercentage: -0.9606313194554073,
    avgPrice: 10.736011300376658,
  },
  {
    epoch_time: "10:26",
    close: 304.73438988,
    pre_close: 307.99021436,
    amount: 4769210183,
    volume: 429036736,
    pnl: -3.255824480000001,
    pnlPercentage: -1.057119456462463,
    avgPrice: 11.116088164068076,
  },
  {
    epoch_time: "10:27",
    close: 304.57000497999996,
    pre_close: 307.99021436,
    amount: 4493306912,
    volume: 390752579,
    pnl: -3.420209380000017,
    pnlPercentage: -1.1104928729983143,
    avgPrice: 11.499110059616523,
  },
  {
    epoch_time: "10:28",
    close: 304.7197213299999,
    pre_close: 307.99021436,
    amount: 4204184928,
    volume: 396735387,
    pnl: -3.2704930300000683,
    pnlPercentage: -1.0618821240136245,
    avgPrice: 10.596949669125431,
  },
  {
    epoch_time: "10:29",
    close: 304.70055010999994,
    pre_close: 307.99021436,
    amount: 3602041134,
    volume: 317022200,
    pnl: -3.289664250000044,
    pnlPercentage: -1.068106743857411,
    avgPrice: 11.362110079357219,
  },
  {
    epoch_time: "10:30",
    close: 304.6676458100001,
    pre_close: 307.99021436,
    amount: 3488362382,
    volume: 301801777,
    pnl: -3.3225685499998576,
    pnlPercentage: -1.0787902975762154,
    avgPrice: 11.558455409624708,
  },
  {
    epoch_time: "10:31",
    close: 304.65594423000016,
    pre_close: 307.99021436,
    amount: 4222638824,
    volume: 393991634,
    pnl: -3.3342701299998225,
    pnlPercentage: -1.0825896325727058,
    avgPrice: 10.717584993187952,
  },
  {
    epoch_time: "10:32",
    close: 304.74073790000017,
    pre_close: 307.99021436,
    amount: 6114380401,
    volume: 615270929,
    pnl: -3.249476459999812,
    pnlPercentage: -1.0550583455231521,
    avgPrice: 9.937704046797244,
  },
  {
    epoch_time: "10:33",
    close: 304.8339268400002,
    pre_close: 307.99021436,
    amount: 5971447970,
    volume: 560149779,
    pnl: -3.1562875199998075,
    pnlPercentage: -1.0248012348569424,
    avgPrice: 10.66044867617452,
  },
  {
    epoch_time: "10:34",
    close: 305.2380137700002,
    pre_close: 307.99021436,
    amount: 5983470435,
    volume: 536398128,
    pnl: -2.752200589999802,
    pnlPercentage: -0.8936000111947839,
    avgPrice: 11.154905512645637,
  },
  {
    epoch_time: "10:35",
    close: 305.22441707000013,
    pre_close: 307.99021436,
    amount: 3828058532,
    volume: 348258967,
    pnl: -2.7657972899998526,
    pnlPercentage: -0.898014664442226,
    avgPrice: 10.991988418779178,
  },
  {
    epoch_time: "10:36",
    close: 305.0648683300002,
    pre_close: 307.99021436,
    amount: 3354510303,
    volume: 291903537,
    pnl: -2.925346029999787,
    pnlPercentage: -0.9498178492711618,
    avgPrice: 11.491845345471097,
  },
  {
    epoch_time: "10:37",
    close: 304.8890855500002,
    pre_close: 307.99021436,
    amount: 3280720048,
    volume: 275622961,
    pnl: -3.101128809999807,
    pnlPercentage: -1.0068919937745169,
    avgPrice: 11.902927231087979,
  },
  {
    epoch_time: "10:38",
    close: 304.88853647000013,
    pre_close: 307.99021436,
    amount: 3412742588,
    volume: 281022798,
    pnl: -3.1016778899998485,
    pnlPercentage: -1.0070702721659885,
    avgPrice: 12.144006152838887,
  },
  {
    epoch_time: "10:39",
    close: 304.7920652900001,
    pre_close: 307.99021436,
    amount: 3270698707,
    volume: 270367096,
    pnl: -3.198149069999886,
    pnlPercentage: -1.0383930790286988,
    avgPrice: 12.097251312711514,
  },
  {
    epoch_time: "10:40",
    close: 304.8642000300003,
    pre_close: 307.99021436,
    amount: 3366733615,
    volume: 258269257,
    pnl: -3.126014329999691,
    pnlPercentage: -1.014971964773459,
    avgPrice: 13.03575057328639,
  },
  {
    epoch_time: "10:41",
    close: 304.84674351,
    pre_close: 307.99021436,
    amount: 2992689132,
    volume: 245976531,
    pnl: -3.1434708499999715,
    pnlPercentage: -1.0206398461496846,
    avgPrice: 12.166563695460848,
  },
  {
    epoch_time: "10:42",
    close: 304.3807818800001,
    pre_close: 307.99021436,
    amount: 4721644153,
    volume: 453609092,
    pnl: -3.609432479999896,
    pnlPercentage: -1.1719308964085906,
    avgPrice: 10.409059774754251,
  },
  {
    epoch_time: "10:43",
    close: 304.41560776000006,
    pre_close: 307.99021436,
    amount: 4368723352,
    volume: 442005388,
    pnl: -3.5746065999999246,
    pnlPercentage: -1.1606234332567689,
    avgPrice: 9.88386899935256,
  },
  {
    epoch_time: "10:44",
    close: 304.3767344900001,
    pre_close: 307.99021436,
    amount: 4290637160,
    volume: 385773416,
    pnl: -3.6134798699998782,
    pnlPercentage: -1.1732450258228666,
    avgPrice: 11.12216908175964,
  },
  {
    epoch_time: "10:45",
    close: 304.4093938899998,
    pre_close: 307.99021436,
    amount: 4005708027,
    volume: 350907117,
    pnl: -3.5808204700001625,
    pnlPercentage: -1.162640987617436,
    avgPrice: 11.415294341265811,
  },
  {
    epoch_time: "10:46",
    close: 304.39439821999997,
    pre_close: 307.99021436,
    amount: 3297763268,
    volume: 307973716,
    pnl: -3.595816140000011,
    pnlPercentage: -1.1675098663352257,
    avgPrice: 10.707937387747727,
  },
  {
    epoch_time: "10:47",
    close: 304.31483777000005,
    pre_close: 307.99021436,
    amount: 4221819788,
    volume: 406208034,
    pnl: -3.675376589999928,
    pnlPercentage: -1.193342001997466,
    avgPrice: 10.393245417691567,
  },
  {
    epoch_time: "10:48",
    close: 304.28927818,
    pre_close: 307.99021436,
    amount: 5072784520,
    volume: 518600456,
    pnl: -3.700936179999985,
    pnlPercentage: -1.2016408338461293,
    avgPrice: 9.781681564892414,
  },
  {
    epoch_time: "10:49",
    close: 304.35685337,
    pre_close: 307.99021436,
    amount: 4560193799,
    volume: 434454776,
    pnl: -3.6333609899999715,
    pnlPercentage: -1.1797001400028373,
    avgPrice: 10.496360152799886,
  },
  {
    epoch_time: "10:50",
    close: 304.30580586000013,
    pre_close: 307.99021436,
    amount: 4149231036,
    volume: 399424217,
    pnl: -3.684408499999847,
    pnlPercentage: -1.1962745334802238,
    avgPrice: 10.388030718728304,
  },
  {
    epoch_time: "10:51",
    close: 304.28002480999993,
    pre_close: 307.99021436,
    amount: 5070495620,
    volume: 529261809,
    pnl: -3.7101895500000523,
    pnlPercentage: -1.204645270210869,
    avgPrice: 9.580316459221413,
  },
  {
    epoch_time: "10:52",
    close: 304.2829004599999,
    pre_close: 307.99021436,
    amount: 6204909896,
    volume: 660955280,
    pnl: -3.707313900000088,
    pnlPercentage: -1.2037115879489413,
    avgPrice: 9.387790798796553,
  },
  {
    epoch_time: "10:53",
    close: 304.4737982400001,
    pre_close: 307.99021436,
    amount: 5785975013,
    volume: 548795314,
    pnl: -3.5164161199998603,
    pnlPercentage: -1.1417298199902004,
    avgPrice: 10.543047408382208,
  },
  {
    epoch_time: "10:54",
    close: 304.4094817999999,
    pre_close: 307.99021436,
    amount: 3527204537,
    volume: 347627484,
    pnl: -3.580732560000058,
    pnlPercentage: -1.162612444502753,
    avgPrice: 10.146506531687235,
  },
  {
    epoch_time: "10:55",
    close: 304.47371761,
    pre_close: 307.99021436,
    amount: 3490722119,
    volume: 329925291,
    pnl: -3.5164967499999875,
    pnlPercentage: -1.1417559993934345,
    avgPrice: 10.58034110819349,
  },
  {
    epoch_time: "10:56",
    close: 304.40516808000007,
    pre_close: 307.99021436,
    amount: 2862932834,
    volume: 249477989,
    pnl: -3.585046279999915,
    pnlPercentage: -1.1640130474436017,
    avgPrice: 11.475693088098446,
  },
  {
    epoch_time: "10:57",
    close: 304.34428688000014,
    pre_close: 307.99021436,
    amount: 2904778208,
    volume: 252549157,
    pnl: -3.645927479999841,
    pnlPercentage: -1.1837802988565849,
    avgPrice: 11.501832920392603,
  },
  {
    epoch_time: "10:58",
    close: 304.32616246999993,
    pre_close: 307.99021436,
    amount: 2950846903,
    volume: 254773013,
    pnl: -3.664051890000053,
    pnlPercentage: -1.189665034525178,
    avgPrice: 11.582258529870273,
  },
  {
    epoch_time: "10:59",
    close: 304.49367574,
    pre_close: 307.99021436,
    amount: 2458973826,
    volume: 219245875,
    pnl: -3.496538619999967,
    pnlPercentage: -1.135275881172304,
    avgPrice: 11.215599043767643,
  },
  {
    epoch_time: "11:00",
    close: 304.41418587000004,
    pre_close: 307.99021436,
    amount: 3235681280,
    volume: 268490455,
    pnl: -3.576028489999942,
    pnlPercentage: -1.1610851005220746,
    avgPrice: 12.051382906703331,
  },
  {
    epoch_time: "11:01",
    close: 304.3250699400001,
    pre_close: 307.99021436,
    amount: 2588682621,
    volume: 239723077,
    pnl: -3.6651444199998764,
    pnlPercentage: -1.1900197633278764,
    avgPrice: 10.798637550443257,
  },
  {
    epoch_time: "11:02",
    close: 304.30071931,
    pre_close: 307.99021436,
    amount: 2319032351,
    volume: 219607950,
    pnl: -3.689495050000005,
    pnlPercentage: -1.1979260632246858,
    avgPrice: 10.559874316936158,
  },
  {
    epoch_time: "11:03",
    close: 304.52534966,
    pre_close: 307.99021436,
    amount: 2663416472,
    volume: 254216526,
    pnl: -3.464864699999964,
    pnlPercentage: -1.1249918141717274,
    avgPrice: 10.476960384550294,
  },
  {
    epoch_time: "11:04",
    close: 304.41080337999995,
    pre_close: 307.99021436,
    amount: 2544638207,
    volume: 240962154,
    pnl: -3.579410980000034,
    pnlPercentage: -1.1621833464540487,
    avgPrice: 10.56032312443555,
  },
  {
    epoch_time: "11:05",
    close: 304.34690837999995,
    pre_close: 307.99021436,
    amount: 2503397798,
    volume: 223134531,
    pnl: -3.6433059800000365,
    pnlPercentage: -1.182929135450228,
    avgPrice: 11.21923077876279,
  },
  {
    epoch_time: "11:06",
    close: 304.55382358,
    pre_close: 307.99021436,
    amount: 2986986487,
    volume: 277151014,
    pnl: -3.436390779999954,
    pnlPercentage: -1.115746741220569,
    avgPrice: 10.777469091273106,
  },
  {
    epoch_time: "11:07",
    close: 304.69338388,
    pre_close: 307.99021436,
    amount: 3441714235,
    volume: 310480748,
    pnl: -3.296830479999983,
    pnlPercentage: -1.0704335158345124,
    avgPrice: 11.085113190335395,
  },
  {
    epoch_time: "11:08",
    close: 304.90865227999984,
    pre_close: 307.99021436,
    amount: 3272687805,
    volume: 269686951,
    pnl: -3.0815620800001398,
    pnlPercentage: -1.0005389575131751,
    avgPrice: 12.135135915419207,
  },
  {
    epoch_time: "11:09",
    close: 304.7558274499999,
    pre_close: 307.99021436,
    amount: 2982413389,
    volume: 242206911,
    pnl: -3.234386910000069,
    pnlPercentage: -1.050158985317462,
    avgPrice: 12.313494180188773,
  },
  {
    epoch_time: "11:10",
    close: 304.8321935400001,
    pre_close: 307.99021436,
    amount: 2404174237,
    volume: 193274032,
    pnl: -3.1580208199998765,
    pnlPercentage: -1.0253640124775365,
    avgPrice: 12.439199473005251,
  },
  {
    epoch_time: "11:11",
    close: 304.57972047000004,
    pre_close: 307.99021436,
    amount: 2819155211,
    volume: 219316374,
    pnl: -3.410493889999941,
    pnlPercentage: -1.1073383929054104,
    avgPrice: 12.854285157021609,
  },
  {
    epoch_time: "11:12",
    close: 304.56271246000006,
    pre_close: 307.99021436,
    amount: 3665985787,
    volume: 307059047,
    pnl: -3.4275018999999247,
    pnlPercentage: -1.1128606495249271,
    avgPrice: 11.939025483264787,
  },
  {
    epoch_time: "11:13",
    close: 304.64253676000004,
    pre_close: 307.99021436,
    amount: 2409268557,
    volume: 195394518,
    pnl: -3.3476775999999404,
    pnlPercentage: -1.0869428455564378,
    avgPrice: 12.33027713193059,
  },
  {
    epoch_time: "11:14",
    close: 304.39946565,
    pre_close: 307.99021436,
    amount: 3165436450,
    volume: 248858036,
    pnl: -3.590748709999957,
    pnlPercentage: -1.165864544580253,
    avgPrice: 12.719848235079699,
  },
  {
    epoch_time: "11:15",
    close: 304.32615669,
    pre_close: 307.99021436,
    amount: 2651911990,
    volume: 209810393,
    pnl: -3.664057669999977,
    pnlPercentage: -1.1896669112081537,
    avgPrice: 12.639564475721658,
  },
  {
    epoch_time: "11:16",
    close: 304.3926998000002,
    pre_close: 307.99021436,
    amount: 2789276411,
    volume: 226837439,
    pnl: -3.5975145599998086,
    pnlPercentage: -1.168061318920599,
    avgPrice: 12.296367051648824,
  },
  {
    epoch_time: "11:17",
    close: 304.6108178800002,
    pre_close: 307.99021436,
    amount: 2922943320,
    volume: 259140088,
    pnl: -3.379396479999798,
    pnlPercentage: -1.0972415104233524,
    avgPrice: 11.279394641557735,
  },
  {
    epoch_time: "11:18",
    close: 304.3204261200002,
    pre_close: 307.99021436,
    amount: 2894054510,
    volume: 256629287,
    pnl: -3.669788239999775,
    pnlPercentage: -1.1915275449986495,
    avgPrice: 11.27717940470294,
  },
  {
    epoch_time: "11:19",
    close: 304.3466669000001,
    pre_close: 307.99021436,
    amount: 2575545888,
    volume: 211870869,
    pnl: -3.6435474599998656,
    pnlPercentage: -1.1830075405386276,
    avgPrice: 12.156205806660472,
  },
  {
    epoch_time: "11:20",
    close: 304.34144568999994,
    pre_close: 307.99021436,
    amount: 3981495700,
    volume: 388386215,
    pnl: -3.648768670000038,
    pnlPercentage: -1.1847027924514197,
    avgPrice: 10.25138263467976,
  },
  {
    epoch_time: "11:21",
    close: 304.4207617600002,
    pre_close: 307.99021436,
    amount: 3044842971,
    volume: 259045635,
    pnl: -3.5694525999998064,
    pnlPercentage: -1.1589500034658862,
    avgPrice: 11.75407943469111,
  },
  {
    epoch_time: "11:22",
    close: 304.3672459800003,
    pre_close: 307.99021436,
    amount: 2678007414,
    volume: 225733344,
    pnl: -3.6229683799996906,
    pnlPercentage: -1.1763258087690187,
    avgPrice: 11.863588101543385,
  },
  {
    epoch_time: "11:23",
    close: 304.37466767,
    pre_close: 307.99021436,
    amount: 2138256963,
    volume: 180521367,
    pnl: -3.6155466899999738,
    pnlPercentage: -1.1739160925982817,
    avgPrice: 11.844896803822675,
  },
  {
    epoch_time: "11:24",
    close: 304.43345425,
    pre_close: 307.99021436,
    amount: 2310110405,
    volume: 193089776,
    pnl: -3.5567601099999706,
    pnlPercentage: -1.1548289342214524,
    avgPrice: 11.963918819813639,
  },
  {
    epoch_time: "11:25",
    close: 304.3290729800001,
    pre_close: 307.99021436,
    amount: 2561230647,
    volume: 220714687,
    pnl: -3.66114137999989,
    pnlPercentage: -1.1887200337217574,
    avgPrice: 11.604260150571674,
  },
  {
    epoch_time: "11:26",
    close: 304.44843818000004,
    pre_close: 307.99021436,
    amount: 2541422924,
    volume: 216800381,
    pnl: -3.5417761799999425,
    pnlPercentage: -1.1499638673130308,
    avgPrice: 11.722409860525106,
  },
  {
    epoch_time: "11:27",
    close: 304.3442358500001,
    pre_close: 307.99021436,
    amount: 2329267827,
    volume: 212198077,
    pnl: -3.6459785099999067,
    pnlPercentage: -1.1837968675648347,
    avgPrice: 10.976856434943093,
  },
  {
    epoch_time: "11:28",
    close: 304.33822451000003,
    pre_close: 307.99021436,
    amount: 2100492735,
    volume: 175439841,
    pnl: -3.65198984999995,
    pnlPercentage: -1.1857486633426784,
    avgPrice: 11.972723658590184,
  },
  {
    epoch_time: "11:29",
    close: 304.3540437600001,
    pre_close: 307.99021436,
    amount: 2191679835,
    volume: 194829224,
    pnl: -3.6361705999999003,
    pnlPercentage: -1.18061238002507,
    avgPrice: 11.249235561293412,
  },
  {
    epoch_time: "11:30",
    close: 304.32258047999994,
    pre_close: 307.99021436,
    amount: 2433908526,
    volume: 214933414,
    pnl: -3.6676338800000394,
    pnlPercentage: -1.1908280552423878,
    avgPrice: 11.3240118448963,
  },
  {
    epoch_time: "13:01",
    close: 304.1070505700001,
    pre_close: 307.99021436,
    amount: 9976576266,
    volume: 920078837,
    pnl: -3.8831637899998555,
    pnlPercentage: -1.2608075221055448,
    avgPrice: 10.84317545932208,
  },
  {
    epoch_time: "13:02",
    close: 304.33294494999996,
    pre_close: 307.99021436,
    amount: 3915907414,
    volume: 320845677,
    pnl: -3.6572694100000263,
    pnlPercentage: -1.1874628606625692,
    avgPrice: 12.204956135344782,
  },
  {
    epoch_time: "13:03",
    close: 304.76334208,
    pre_close: 307.99021436,
    amount: 3645092518,
    volume: 303054654,
    pnl: -3.226872280000009,
    pnlPercentage: -1.0477190928631974,
    avgPrice: 12.027838773926238,
  },
  {
    epoch_time: "13:04",
    close: 305.1421985500001,
    pre_close: 307.99021436,
    amount: 4697923294,
    volume: 423683882,
    pnl: -2.848015809999879,
    pnlPercentage: -0.9247098372648033,
    avgPrice: 11.088274757641123,
  },
  {
    epoch_time: "13:05",
    close: 305.1171589300001,
    pre_close: 307.99021436,
    amount: 3773712440,
    volume: 336471982,
    pnl: -2.8730554299999085,
    pnlPercentage: -0.9328398423209872,
    avgPrice: 11.215532471883499,
  },
  {
    epoch_time: "13:06",
    close: 305.58247938999995,
    pre_close: 307.99021436,
    amount: 3355696606,
    volume: 289741086,
    pnl: -2.4077349700000354,
    pnlPercentage: -0.7817569707541772,
    avgPrice: 11.581707835525956,
  },
  {
    epoch_time: "13:07",
    close: 305.6604159699999,
    pre_close: 307.99021436,
    amount: 3722878774,
    volume: 297027365,
    pnl: -2.3297983900000645,
    pnlPercentage: -0.7564520823628573,
    avgPrice: 12.533790528020878,
  },
  {
    epoch_time: "13:08",
    close: 305.7049329699999,
    pre_close: 307.99021436,
    amount: 3715530577,
    volume: 329177898,
    pnl: -2.2852813900000797,
    pnlPercentage: -0.7419980517072156,
    avgPrice: 11.287302700377532,
  },
  {
    epoch_time: "13:09",
    close: 305.59614543000004,
    pre_close: 307.99021436,
    amount: 3468184735,
    volume: 296576969,
    pnl: -2.3940689299999462,
    pnlPercentage: -0.7773198038044105,
    avgPrice: 11.6940460572311,
  },
  {
    epoch_time: "13:10",
    close: 305.58247221999994,
    pre_close: 307.99021436,
    amount: 3575820805,
    volume: 287825120,
    pnl: -2.407742140000039,
    pnlPercentage: -0.7817592987502175,
    avgPrice: 12.423588340725786,
  },
  {
    epoch_time: "13:11",
    close: 305.73877387000005,
    pre_close: 307.99021436,
    amount: 3351338108,
    volume: 281094653,
    pnl: -2.2514404899999363,
    pnlPercentage: -0.7310103974174642,
    avgPrice: 11.922454135048952,
  },
  {
    epoch_time: "13:12",
    close: 305.69913894999996,
    pre_close: 307.99021436,
    amount: 3462845430,
    volume: 284356368,
    pnl: -2.291075410000019,
    pnlPercentage: -0.7438792868016408,
    avgPrice: 12.17783675588373,
  },
  {
    epoch_time: "13:13",
    close: 305.6644149,
    pre_close: 307.99021436,
    amount: 3275664748,
    volume: 258316779,
    pnl: -2.3257994599999847,
    pnlPercentage: -0.7551536872146936,
    avgPrice: 12.680805175261186,
  },
  {
    epoch_time: "13:14",
    close: 305.70397473,
    pre_close: 307.99021436,
    amount: 3376835168,
    volume: 283286692,
    pnl: -2.2862396299999546,
    pnlPercentage: -0.7423091784752756,
    avgPrice: 11.920204031328094,
  },
  {
    epoch_time: "13:15",
    close: 305.65805171000017,
    pre_close: 307.99021436,
    amount: 3494448948,
    volume: 300882844,
    pnl: -2.332162649999816,
    pnlPercentage: -0.7572197236350608,
    avgPrice: 11.61398536900296,
  },
  {
    epoch_time: "13:16",
    close: 305.90988208999994,
    pre_close: 307.99021436,
    amount: 3278952664,
    volume: 269169800,
    pnl: -2.080332270000042,
    pnlPercentage: -0.6754540154215394,
    avgPrice: 12.181725676506057,
  },
  {
    epoch_time: "13:17",
    close: 305.95264002,
    pre_close: 307.99021436,
    amount: 3211513245,
    volume: 266445098,
    pnl: -2.037574339999992,
    pnlPercentage: -0.6615711295354099,
    avgPrice: 12.053189452935628,
  },
  {
    epoch_time: "13:18",
    close: 306.16052831,
    pre_close: 307.99021436,
    amount: 4139065396,
    volume: 347275033,
    pnl: -1.8296860499999639,
    pnlPercentage: -0.5940727869559237,
    avgPrice: 11.91869556600114,
  },
  {
    epoch_time: "13:19",
    close: 306.30452286999997,
    pre_close: 307.99021436,
    amount: 4268498033,
    volume: 343099857,
    pnl: -1.6856914900000106,
    pnlPercentage: -0.5473198210218633,
    avgPrice: 12.440978758554248,
  },
  {
    epoch_time: "13:20",
    close: 306.37038857999994,
    pre_close: 307.99021436,
    amount: 4011088680,
    volume: 328092252,
    pnl: -1.619825780000042,
    pnlPercentage: -0.5259341707872234,
    avgPrice: 12.225490408715899,
  },
  {
    epoch_time: "13:21",
    close: 306.3573530099999,
    pre_close: 307.99021436,
    amount: 3788950681,
    volume: 296844856,
    pnl: -1.6328613500000984,
    pnlPercentage: -0.5301666331812394,
    avgPrice: 12.764077276110859,
  },
  {
    epoch_time: "13:22",
    close: 306.48433470999987,
    pre_close: 307.99021436,
    amount: 4009690259,
    volume: 335102784,
    pnl: -1.5058796500001108,
    pnlPercentage: -0.48893749859205693,
    avgPrice: 11.965553407637461,
  },
  {
    epoch_time: "13:23",
    close: 306.34370883999986,
    pre_close: 307.99021436,
    amount: 4057588764,
    volume: 309284154,
    pnl: -1.6465055200001188,
    pnlPercentage: -0.5345966992560292,
    avgPrice: 13.119290825355378,
  },
  {
    epoch_time: "13:24",
    close: 305.8662886200001,
    pre_close: 307.99021436,
    amount: 3439064365,
    volume: 264608510,
    pnl: -2.1239257399998905,
    pnlPercentage: -0.689608189147628,
    avgPrice: 12.99680182243572,
  },
  {
    epoch_time: "13:25",
    close: 305.92334244,
    pre_close: 307.99021436,
    amount: 2953401611,
    volume: 210852316,
    pnl: -2.0668719199999828,
    pnlPercentage: -0.6710836330611758,
    avgPrice: 14.006967848529584,
  },
  {
    epoch_time: "13:26",
    close: 305.90101546000005,
    pre_close: 307.99021436,
    amount: 3718071648,
    volume: 254481673,
    pnl: -2.0891988999999285,
    pnlPercentage: -0.6783328828616431,
    avgPrice: 14.610370971586626,
  },
  {
    epoch_time: "13:27",
    close: 305.82540241000015,
    pre_close: 307.99021436,
    amount: 3744100866,
    volume: 299663878,
    pnl: -2.16481194999983,
    pnlPercentage: -0.7028833544267865,
    avgPrice: 12.49433495618047,
  },
  {
    epoch_time: "13:28",
    close: 305.72457410000015,
    pre_close: 307.99021436,
    amount: 2979530704,
    volume: 239635694,
    pnl: -2.2656402599998273,
    pnlPercentage: -0.7356208588340407,
    avgPrice: 12.433584722983714,
  },
  {
    epoch_time: "13:29",
    close: 305.8028890699999,
    pre_close: 307.99021436,
    amount: 3829700658,
    volume: 324912388,
    pnl: -2.1873252900001035,
    pnlPercentage: -0.7101931126433203,
    avgPrice: 11.786871782801953,
  },
  {
    epoch_time: "13:30",
    close: 305.92927498999984,
    pre_close: 307.99021436,
    amount: 3377518859,
    volume: 257184805,
    pnl: -2.060939370000142,
    pnlPercentage: -0.6691574192650096,
    avgPrice: 13.13265322576114,
  },
  {
    epoch_time: "13:31",
    close: 305.78832030999996,
    pre_close: 307.99021436,
    amount: 3216548511,
    volume: 252434783,
    pnl: -2.2018940500000213,
    pnlPercentage: -0.7149233798143695,
    avgPrice: 12.742097078594751,
  },
  {
    epoch_time: "13:32",
    close: 305.68652477,
    pre_close: 307.99021436,
    amount: 3173192515,
    volume: 260851624,
    pnl: -2.3036895899999763,
    pnlPercentage: -0.7479749299136085,
    avgPrice: 12.164741266859048,
  },
  {
    epoch_time: "13:33",
    close: 305.76941992999997,
    pre_close: 307.99021436,
    amount: 2555476598,
    volume: 193922519,
    pnl: -2.220794430000012,
    pnlPercentage: -0.7210600617992946,
    avgPrice: 13.177822829333193,
  },
  {
    epoch_time: "13:34",
    close: 305.77361923999996,
    pre_close: 307.99021436,
    amount: 2868764877,
    volume: 227939607,
    pnl: -2.2165951200000222,
    pnlPercentage: -0.7196966061425281,
    avgPrice: 12.585635795186748,
  },
  {
    epoch_time: "13:35",
    close: 305.7863513799999,
    pre_close: 307.99021436,
    amount: 2424136082,
    volume: 194219687,
    pnl: -2.2038629800000535,
    pnlPercentage: -0.7155626631124123,
    avgPrice: 12.481412772537318,
  },
  {
    epoch_time: "13:36",
    close: 305.66831846000014,
    pre_close: 307.99021436,
    amount: 2605810765,
    volume: 210437148,
    pnl: -2.321895899999845,
    pnlPercentage: -0.7538862573360339,
    avgPrice: 12.382845850961637,
  },
  {
    epoch_time: "13:37",
    close: 305.83852576,
    pre_close: 307.99021436,
    amount: 2750264238,
    volume: 229182566,
    pnl: -2.1516886,
    pnlPercentage: -0.6986223911273237,
    avgPrice: 12.000320469402546,
  },
  {
    epoch_time: "13:38",
    close: 305.69107355999995,
    pre_close: 307.99021436,
    amount: 2580547095,
    volume: 223875973,
    pnl: -2.299140800000032,
    pnlPercentage: -0.7464980031192336,
    avgPrice: 11.526681762316674,
  },
  {
    epoch_time: "13:39",
    close: 305.7097699899999,
    pre_close: 307.99021436,
    amount: 2381446578,
    volume: 189141625,
    pnl: -2.2804443700000547,
    pnlPercentage: -0.7404275407706717,
    avgPrice: 12.59081166295362,
  },
  {
    epoch_time: "13:40",
    close: 305.61752024,
    pre_close: 307.99021436,
    amount: 2272422024,
    volume: 200880538,
    pnl: -2.3726941200000056,
    pnlPercentage: -0.7703797099302134,
    avgPrice: 11.312305545497892,
  },
  {
    epoch_time: "13:41",
    close: 305.5463483,
    pre_close: 307.99021436,
    amount: 2580135016,
    volume: 213700964,
    pnl: -2.443866060000005,
    pnlPercentage: -0.7934882168507573,
    avgPrice: 12.073576869779586,
  },
  {
    epoch_time: "13:42",
    close: 305.63234695999995,
    pre_close: 307.99021436,
    amount: 2744265256,
    volume: 247905333,
    pnl: -2.357867400000032,
    pnlPercentage: -0.7655656868513327,
    avgPrice: 11.069811297685959,
  },
  {
    epoch_time: "13:43",
    close: 305.60155234999996,
    pre_close: 307.99021436,
    amount: 2325141240,
    volume: 221107504,
    pnl: -2.3886620100000187,
    pnlPercentage: -0.7755642545214103,
    avgPrice: 10.515885702368564,
  },
  {
    epoch_time: "13:44",
    close: 305.6183230800001,
    pre_close: 307.99021436,
    amount: 2162893476,
    volume: 184564845,
    pnl: -2.371891279999886,
    pnlPercentage: -0.7701190393106017,
    avgPrice: 11.718881111947402,
  },
  {
    epoch_time: "13:45",
    close: 305.61352404000024,
    pre_close: 307.99021436,
    amount: 2179406692,
    volume: 187682461,
    pnl: -2.3766903199997387,
    pnlPercentage: -0.7716772186864729,
    avgPrice: 11.61220222916834,
  },
  {
    epoch_time: "13:46",
    close: 305.76854024999994,
    pre_close: 307.99021436,
    amount: 2469701548,
    volume: 216698035,
    pnl: -2.2216741100000377,
    pnlPercentage: -0.7213456812634966,
    avgPrice: 11.396972510618289,
  },
  {
    epoch_time: "13:47",
    close: 306.10760599999986,
    pre_close: 307.99021436,
    amount: 3095356357,
    volume: 290726402,
    pnl: -1.8826083600001198,
    pnlPercentage: -0.6112559010721053,
    avgPrice: 10.646973703475338,
  },
  {
    epoch_time: "13:48",
    close: 306.0912370699999,
    pre_close: 307.99021436,
    amount: 2952315855,
    volume: 260046740,
    pnl: -1.8989772900000617,
    pnlPercentage: -0.616570657592519,
    avgPrice: 11.353020057086662,
  },
  {
    epoch_time: "13:49",
    close: 306.10861493999994,
    pre_close: 307.99021436,
    amount: 3106471576,
    volume: 292283358,
    pnl: -1.8815994200000432,
    pnlPercentage: -0.6109283127420095,
    avgPrice: 10.628287553751179,
  },
  {
    epoch_time: "13:50",
    close: 306.0794846299999,
    pre_close: 307.99021436,
    amount: 2886536842,
    volume: 259888748,
    pnl: -1.910729730000071,
    pnlPercentage: -0.6203865061007008,
    avgPrice: 11.106817298608096,
  },
  {
    epoch_time: "13:51",
    close: 306.0769957,
    pre_close: 307.99021436,
    amount: 2627996346,
    volume: 221321268,
    pnl: -1.913218659999984,
    pnlPercentage: -0.6211946259317425,
    avgPrice: 11.874124749728074,
  },
  {
    epoch_time: "13:52",
    close: 306.1296780399998,
    pre_close: 307.99021436,
    amount: 2588025530,
    volume: 221233858,
    pnl: -1.8605363200001648,
    pnlPercentage: -0.6040894266288066,
    avgPrice: 11.698144006510974,
  },
  {
    epoch_time: "13:53",
    close: 306.12617382999986,
    pre_close: 307.99021436,
    amount: 3350033574,
    volume: 294272931,
    pnl: -1.8640405300001248,
    pnlPercentage: -0.6052271932968978,
    avgPrice: 11.384103738715947,
  },
  {
    epoch_time: "13:54",
    close: 305.92562929999985,
    pre_close: 307.99021436,
    amount: 3451786040,
    volume: 282185232,
    pnl: -2.0645850600001268,
    pnlPercentage: -0.6703411224575184,
    avgPrice: 12.232341202037107,
  },
  {
    epoch_time: "13:55",
    close: 305.8312403599999,
    pre_close: 307.99021436,
    amount: 2930155602,
    volume: 247322051,
    pnl: -2.1589740000000575,
    pnlPercentage: -0.7009878558922322,
    avgPrice: 11.847530740394838,
  },
  {
    epoch_time: "13:56",
    close: 305.64118028,
    pre_close: 307.99021436,
    amount: 3225030942,
    volume: 269179744,
    pnl: -2.349034079999967,
    pnlPercentage: -0.7626976346898684,
    avgPrice: 11.980957014358406,
  },
  {
    epoch_time: "13:57",
    close: 305.51144941,
    pre_close: 307.99021436,
    amount: 2841840986,
    volume: 238219142,
    pnl: -2.47876494999997,
    pnlPercentage: -0.804819385301192,
    avgPrice: 11.929524059825553,
  },
  {
    epoch_time: "13:58",
    close: 305.49257048,
    pre_close: 307.99021436,
    amount: 2411616855,
    volume: 212753494,
    pnl: -2.4976438799999983,
    pnlPercentage: -0.810949102779146,
    avgPrice: 11.335263217815825,
  },
  {
    epoch_time: "13:59",
    close: 305.35789121000005,
    pre_close: 307.99021436,
    amount: 2893256477,
    volume: 267046723,
    pnl: -2.6323231499999338,
    pnlPercentage: -0.8546775278136298,
    avgPrice: 10.834270664313674,
  },
  {
    epoch_time: "14:00",
    close: 305.26730480000015,
    pre_close: 307.99021436,
    amount: 2742094865,
    volume: 234886859,
    pnl: -2.7229095599998345,
    pnlPercentage: -0.8840896343599747,
    avgPrice: 11.674109299575589,
  },
  {
    epoch_time: "14:01",
    close: 305.31579204000013,
    pre_close: 307.99021436,
    amount: 2977824432,
    volume: 273232365,
    pnl: -2.6744223199998487,
    pnlPercentage: -0.8683465237872112,
    avgPrice: 10.898505497326424,
  },
  {
    epoch_time: "14:02",
    close: 305.44088506000014,
    pre_close: 307.99021436,
    amount: 2898678959,
    volume: 253820035,
    pnl: -2.5493292999998403,
    pnlPercentage: -0.827730616473421,
    avgPrice: 11.420213376773034,
  },
  {
    epoch_time: "14:03",
    close: 305.30233647,
    pre_close: 307.99021436,
    amount: 3313908411,
    volume: 303627705,
    pnl: -2.6878778899999816,
    pnlPercentage: -0.8727153541502441,
    avgPrice: 10.914380856648112,
  },
  {
    epoch_time: "14:04",
    close: 305.60213715999987,
    pre_close: 307.99021436,
    amount: 2763390670,
    volume: 237041736,
    pnl: -2.3880772000001116,
    pnlPercentage: -0.7753743751120479,
    avgPrice: 11.657823287288108,
  },
  {
    epoch_time: "14:05",
    close: 305.6152095299999,
    pre_close: 307.99021436,
    amount: 2425061003,
    volume: 201876741,
    pnl: -2.37500483000008,
    pnlPercentage: -0.7711299642864655,
    avgPrice: 12.012582484675637,
  },
  {
    epoch_time: "14:06",
    close: 305.89907205999987,
    pre_close: 307.99021436,
    amount: 3066819728,
    volume: 285731014,
    pnl: -2.091142300000115,
    pnlPercentage: -0.6789638769353346,
    avgPrice: 10.733240627494501,
  },
  {
    epoch_time: "14:07",
    close: 305.96865618,
    pre_close: 307.99021436,
    amount: 2929502723,
    volume: 257003844,
    pnl: -2.0215581799999995,
    pnlPercentage: -0.6563709123683648,
    avgPrice: 11.39867278794476,
  },
  {
    epoch_time: "14:08",
    close: 306.12742268,
    pre_close: 307.99021436,
    amount: 3072522125,
    volume: 280097496,
    pnl: -1.8627916799999866,
    pnlPercentage: -0.6048217096347841,
    avgPrice: 10.969473732817661,
  },
  {
    epoch_time: "14:09",
    close: 306.0085289799998,
    pre_close: 307.99021436,
    amount: 3195112018,
    volume: 273050478,
    pnl: -1.9816853800001581,
    pnlPercentage: -0.643424786764113,
    avgPrice: 11.701543397408006,
  },
  {
    epoch_time: "14:10",
    close: 305.82534016999995,
    pre_close: 307.99021436,
    amount: 2865534440,
    volume: 243856123,
    pnl: -2.1648741900000346,
    pnlPercentage: -0.7029035628611235,
    avgPrice: 11.750922653682967,
  },
  {
    epoch_time: "14:11",
    close: 306.0086810099999,
    pre_close: 307.99021436,
    amount: 2358235380,
    volume: 199518155,
    pnl: -1.9815333500000634,
    pnlPercentage: -0.6433754248061585,
    avgPrice: 11.819653103748879,
  },
  {
    epoch_time: "14:12",
    close: 305.72605120999987,
    pre_close: 307.99021436,
    amount: 2512609115,
    volume: 213343249,
    pnl: -2.2641631500001154,
    pnlPercentage: -0.7351412624277742,
    avgPrice: 11.77730782097539,
  },
  {
    epoch_time: "14:13",
    close: 305.97342040999985,
    pre_close: 307.99021436,
    amount: 2442351541,
    volume: 201621386,
    pnl: -2.0167939500001353,
    pnlPercentage: -0.6548240352996282,
    avgPrice: 12.113553970906638,
  },
  {
    epoch_time: "14:14",
    close: 306.04113065,
    pre_close: 307.99021436,
    amount: 3362363439,
    volume: 283263801,
    pnl: -1.949083709999968,
    pnlPercentage: -0.632839492660553,
    avgPrice: 11.870078093741318,
  },
  {
    epoch_time: "14:15",
    close: 306.05996712,
    pre_close: 307.99021436,
    amount: 3084186663,
    volume: 268377606,
    pnl: -1.9302472399999715,
    pnlPercentage: -0.6267235613348965,
    avgPrice: 11.49196726570398,
  },
  {
    epoch_time: "14:16",
    close: 306.13597271,
    pre_close: 307.99021436,
    amount: 3258506633,
    volume: 280863010,
    pnl: -1.8542416500000058,
    pnlPercentage: -0.6020456376684247,
    avgPrice: 11.601764977880142,
  },
  {
    epoch_time: "14:17",
    close: 306.12856242,
    pre_close: 307.99021436,
    amount: 2478794598,
    volume: 214183867,
    pnl: -1.8616519400000016,
    pnlPercentage: -0.6044516524229437,
    avgPrice: 11.573208723512309,
  },
  {
    epoch_time: "14:18",
    close: 306.1059771400001,
    pre_close: 307.99021436,
    amount: 2502066042,
    volume: 230174764,
    pnl: -1.884237219999875,
    pnlPercentage: -0.611784768524315,
    avgPrice: 10.870288291030898,
  },
  {
    epoch_time: "14:19",
    close: 306.40997678,
    pre_close: 307.99021436,
    amount: 2808922960,
    volume: 231614974,
    pnl: -1.5802375799999595,
    pnlPercentage: -0.5130804507161635,
    avgPrice: 12.127553376579185,
  },
  {
    epoch_time: "14:20",
    close: 306.37302803999995,
    pre_close: 307.99021436,
    amount: 3086378640,
    volume: 270835869,
    pnl: -1.6171863200000303,
    pnlPercentage: -0.5250771760266892,
    avgPrice: 11.395752901547912,
  },
  {
    epoch_time: "14:21",
    close: 306.40827187,
    pre_close: 307.99021436,
    amount: 3145795077,
    volume: 286814402,
    pnl: -1.5819424899999603,
    pnlPercentage: -0.5136340105114101,
    avgPrice: 10.968051307967443,
  },
  {
    epoch_time: "14:22",
    close: 306.20022095,
    pre_close: 307.99021436,
    amount: 3247666721,
    volume: 294463616,
    pnl: -1.7899934099999655,
    pnlPercentage: -0.5811851567166015,
    avgPrice: 11.029093390607551,
  },
  {
    epoch_time: "14:23",
    close: 306.2825183300001,
    pre_close: 307.99021436,
    amount: 2717771622,
    volume: 243309110,
    pnl: -1.7076960299999087,
    pnlPercentage: -0.554464379184405,
    avgPrice: 11.170036428146895,
  },
  {
    epoch_time: "14:24",
    close: 306.18302654000007,
    pre_close: 307.99021436,
    amount: 3638970283,
    volume: 310575138,
    pnl: -1.8071878199999105,
    pnlPercentage: -0.5867679347394961,
    avgPrice: 11.71687568565131,
  },
  {
    epoch_time: "14:25",
    close: 306.1908202299999,
    pre_close: 307.99021436,
    amount: 3014444945,
    volume: 262967109,
    pnl: -1.7993941300001097,
    pnlPercentage: -0.5842374355104818,
    avgPrice: 11.463201449273262,
  },
  {
    epoch_time: "14:26",
    close: 306.25865044000005,
    pre_close: 307.99021436,
    amount: 2679237797,
    volume: 240318586,
    pnl: -1.7315639199999282,
    pnlPercentage: -0.5622139403351212,
    avgPrice: 11.148691583097115,
  },
  {
    epoch_time: "14:27",
    close: 306.3090886600001,
    pre_close: 307.99021436,
    amount: 2650356725,
    volume: 222029906,
    pnl: -1.6811256999998818,
    pnlPercentage: -0.545837374571545,
    avgPrice: 11.936935761257315,
  },
  {
    epoch_time: "14:28",
    close: 306.16639934000005,
    pre_close: 307.99021436,
    amount: 2624356798,
    volume: 228122007,
    pnl: -1.8238150199999268,
    pnlPercentage: -0.5921665478202942,
    avgPrice: 11.504180734303288,
  },
  {
    epoch_time: "14:29",
    close: 306.17229094,
    pre_close: 307.99021436,
    amount: 2659209598,
    volume: 224462466,
    pnl: -1.8179234199999996,
    pnlPercentage: -0.5902536299010719,
    avgPrice: 11.847012310735284,
  },
  {
    epoch_time: "14:30",
    close: 306.28448317999994,
    pre_close: 307.99021436,
    amount: 3054393229,
    volume: 266214331,
    pnl: -1.7057311800000434,
    pnlPercentage: -0.5538264206038312,
    avgPrice: 11.473436525849541,
  },
  {
    epoch_time: "14:31",
    close: 306.210708,
    pre_close: 307.99021436,
    amount: 2777518069,
    volume: 255522455,
    pnl: -1.7795063599999708,
    pnlPercentage: -0.5777801621709822,
    avgPrice: 10.869956885002534,
  },
  {
    epoch_time: "14:32",
    close: 306.09984339,
    pre_close: 307.99021436,
    amount: 2688983256,
    volume: 231373753,
    pnl: -1.8903709699999922,
    pnlPercentage: -0.6137763090714343,
    avgPrice: 11.621816308611288,
  },
  {
    epoch_time: "14:33",
    close: 306.14994443999996,
    pre_close: 307.99021436,
    amount: 2793456762,
    volume: 252566729,
    pnl: -1.8402699200000256,
    pnlPercentage: -0.5975092175652619,
    avgPrice: 11.060272162767726,
  },
  {
    epoch_time: "14:34",
    close: 305.86206287000005,
    pre_close: 307.99021436,
    amount: 4783336418,
    volume: 449235611,
    pnl: -2.1281514899999365,
    pnlPercentage: -0.6909802294927436,
    avgPrice: 10.647723156568725,
  },
  {
    epoch_time: "14:35",
    close: 305.67952621000006,
    pre_close: 307.99021436,
    amount: 4663898840,
    volume: 428186406,
    pnl: -2.310688149999919,
    pnlPercentage: -0.7502472618493794,
    avgPrice: 10.892216041066936,
  },
  {
    epoch_time: "14:36",
    close: 305.50768157,
    pre_close: 307.99021436,
    amount: 4757980358,
    volume: 435091363,
    pnl: -2.4825327899999934,
    pnlPercentage: -0.8060427488446931,
    avgPrice: 10.935589079942273,
  },
  {
    epoch_time: "14:37",
    close: 305.5363973600002,
    pre_close: 307.99021436,
    amount: 4216738390,
    volume: 343997724,
    pnl: -2.4538169999997876,
    pnlPercentage: -0.7967191441776156,
    avgPrice: 12.25804153867018,
  },
  {
    epoch_time: "14:38",
    close: 305.24393703000015,
    pre_close: 307.99021436,
    amount: 4385398150,
    volume: 382615752,
    pnl: -2.7462773299998275,
    pnlPercentage: -0.8916768137281816,
    avgPrice: 11.461624690245372,
  },
  {
    epoch_time: "14:39",
    close: 305.7204171300001,
    pre_close: 307.99021436,
    amount: 3913632652,
    volume: 323992760,
    pnl: -2.269797229999881,
    pnlPercentage: -0.7369705673008098,
    avgPrice: 12.07938304547299,
  },
  {
    epoch_time: "14:40",
    close: 305.72122635999995,
    pre_close: 307.99021436,
    amount: 3324374308,
    volume: 279352305,
    pnl: -2.2689880000000358,
    pnlPercentage: -0.7367078219400414,
    avgPrice: 11.90029310121497,
  },
  {
    epoch_time: "14:41",
    close: 305.7382621399999,
    pre_close: 307.99021436,
    amount: 3780049271,
    volume: 318047108,
    pnl: -2.251952220000078,
    pnlPercentage: -0.7311765488002941,
    avgPrice: 11.885186740952852,
  },
  {
    epoch_time: "14:42",
    close: 305.80987220000014,
    pre_close: 307.99021436,
    amount: 3451906953,
    volume: 301913686,
    pnl: -2.1803421599998387,
    pnlPercentage: -0.7079257906068781,
    avgPrice: 11.433423236732633,
  },
  {
    epoch_time: "14:43",
    close: 305.69713501999996,
    pre_close: 307.99021436,
    amount: 3336010484,
    volume: 294321174,
    pnl: -2.29307934000002,
    pnlPercentage: -0.7445299340970934,
    avgPrice: 11.334592203006094,
  },
  {
    epoch_time: "14:44",
    close: 305.9453646600001,
    pre_close: 307.99021436,
    amount: 3302837230,
    volume: 279659469,
    pnl: -2.0448496999998724,
    pnlPercentage: -0.6639333344564347,
    avgPrice: 11.81021061725609,
  },
  {
    epoch_time: "14:45",
    close: 306.0027825900001,
    pre_close: 307.99021436,
    amount: 4041934866,
    volume: 339665162,
    pnl: -1.987431769999887,
    pnlPercentage: -0.6452905570814127,
    avgPrice: 11.899762819950313,
  },
  {
    epoch_time: "14:46",
    close: 306.02764923,
    pre_close: 307.99021436,
    amount: 4090917139,
    volume: 367384603,
    pnl: -1.9625651299999731,
    pnlPercentage: -0.6372167161473485,
    avgPrice: 11.13524384417384,
  },
  {
    epoch_time: "14:47",
    close: 305.8650155800001,
    pre_close: 307.99021436,
    amount: 4083824225,
    volume: 359219361,
    pnl: -2.1251987799998915,
    pnlPercentage: -0.6900215269553422,
    avgPrice: 11.368608344581961,
  },
  {
    epoch_time: "14:48",
    close: 306.0696283800001,
    pre_close: 307.99021436,
    amount: 3826636267,
    volume: 332261797,
    pnl: -1.9205859799998848,
    pnlPercentage: -0.6235866889442665,
    avgPrice: 11.516931231790094,
  },
  {
    epoch_time: "14:49",
    close: 306.31873073000014,
    pre_close: 307.99021436,
    amount: 4088593897,
    volume: 351597201,
    pnl: -1.671483629999841,
    pnlPercentage: -0.5427067328983681,
    avgPrice: 11.628630391173107,
  },
  {
    epoch_time: "14:50",
    close: 306.27378885000013,
    pre_close: 307.99021436,
    amount: 4535624738,
    volume: 389167381,
    pnl: -1.7164255099998513,
    pnlPercentage: -0.5572987159889409,
    avgPrice: 11.654688854819515,
  },
  {
    epoch_time: "14:51",
    close: 306.21396188,
    pre_close: 307.99021436,
    amount: 5220535805,
    volume: 457706309,
    pnl: -1.7762524799999824,
    pnlPercentage: -0.5767236740592652,
    avgPrice: 11.405863765360508,
  },
  {
    epoch_time: "14:52",
    close: 306.14558248,
    pre_close: 307.99021436,
    amount: 5412273992,
    volume: 472845046,
    pnl: -1.8446318800000086,
    pnlPercentage: -0.5989254833414503,
    avgPrice: 11.446189481701792,
  },
  {
    epoch_time: "14:53",
    close: 306.1988341600001,
    pre_close: 307.99021436,
    amount: 5303992662,
    volume: 457682635,
    pnl: -1.7913801999998782,
    pnlPercentage: -0.5816354275158808,
    avgPrice: 11.588800309192417,
  },
  {
    epoch_time: "14:54",
    close: 306.2042093,
    pre_close: 307.99021436,
    amount: 5762181485,
    volume: 496575902,
    pnl: -1.7860050599999795,
    pnlPercentage: -0.5798901967425385,
    avgPrice: 11.603828260276714,
  },
  {
    epoch_time: "14:55",
    close: 306.29305215,
    pre_close: 307.99021436,
    amount: 6403181872,
    volume: 560233767,
    pnl: -1.6971622099999877,
    pnlPercentage: -0.5510441990914106,
    avgPrice: 11.429482207558546,
  },
  {
    epoch_time: "14:56",
    close: 306.39897499,
    pre_close: 307.99021436,
    amount: 7199172630,
    volume: 638401587,
    pnl: -1.5912393699999825,
    pnlPercentage: -0.5166525739483507,
    avgPrice: 11.276871449882533,
  },
  {
    epoch_time: "14:57",
    close: 306.1453240800001,
    pre_close: 307.99021436,
    amount: 7957433354,
    volume: 686406744,
    pnl: -1.8448902799999018,
    pnlPercentage: -0.5990093821109044,
    avgPrice: 11.592883408499844,
  },
  {
    epoch_time: "14:58",
    close: 306.31698014999995,
    pre_close: 307.99021436,
    amount: 155826027,
    volume: 15013301,
    pnl: -1.6732342100000324,
    pnlPercentage: -0.5432751210868836,
    avgPrice: 10.37919821896597,
  },
  {
    epoch_time: "14:59",
    close: 306.31698014999995,
    pre_close: 307.99021436,
    amount: 360256,
    volume: 112292675,
    pnl: -1.6732342100000324,
    pnlPercentage: -0.5432751210868836,
    avgPrice: 0.0032081878893703442,
  },
  {
    epoch_time: "15:00",
    close: 306.3651940600001,
    pre_close: 307.99021436,
    amount: 12859277322,
    volume: 1178517625,
    pnl: -1.6250202999999033,
    pnlPercentage: -0.5276207568401747,
    avgPrice: 10.911400092128448,
  },
];
