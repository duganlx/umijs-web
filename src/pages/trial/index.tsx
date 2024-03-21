import { useEmotionCss } from "@ant-design/use-emotion-css";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout";

const rowHeight = 28;

function analyzeRowByCol(layout: ReactGridLayout.Layout[]) {
  // n: 总行数 h: 总行高 px
  const colMap: Record<string, { n: number; h: number }> = {};
  const colset = new Set<string>();
  layout.forEach((item) => {
    const { x, w, h } = item;
    const key = `${x}:${x + w}`;
    colset.add(key);
    if (colMap[key] === undefined) {
      colMap[key] = { n: 0, h: 0 };
    }

    colMap[key].n += 1;
    colMap[key].h += h * rowHeight;
  });

  let valid = true;
  const cols = Array.from(colset);

  for (let i = 0; i < cols.length; i++) {
    for (let j = i + 1; j < cols.length; j++) {
      const [bi, ei] = cols[i].split(":");
      const [bj, ej] = cols[j].split(":");

      if (!(ei <= bj || ej <= bi)) {
        valid = false;
      }
    }
  }

  return { valid, colMap };
}

function calcRowExpByCol(
  vh: number,
  cMap: Record<string, { n: number; h: number }>
) {
  const rMap: Record<string, number> = {};

  let tooMuch = false;
  Object.keys(cMap).forEach((col) => {
    const { n, h } = cMap[col];

    if (vh - h < 0) {
      tooMuch = true;
    }
    const remaingRowNum = (vh - h) / rowHeight;
    console.log(remaingRowNum, col, "calc row expand by col");
    const rowExp = remaingRowNum / n;

    rMap[col] = rowExp;
  });

  if (tooMuch) {
    Object.keys(cMap).forEach((col) => {
      rMap[col] = 0;
    });
  }

  return rMap;
}

function generateFsLayout(
  ori: ReactGridLayout.Layout[],
  rMap: Record<string, number>
) {
  return ori.map((item) => {
    const { i, x, y, w, h } = item;
    const key = `${x}:${x + w}`;
    const exp = rMap[key];
    const lh = exp + h;

    return { i, x, y, w, h: lh };
  });
}

function renderGLayout(ori: ReactGridLayout.Layout[], fs: boolean, vh: number) {
  const report = analyzeRowByCol(ori);
  console.log(report.valid, report.colMap, "analyze row number by col");
  if (fs) {
    if (report.valid) {
      const rMap = calcRowExpByCol(vh, report.colMap);
      console.log(rMap, "calc row expand by col");
      const layout = generateFsLayout(ori, rMap);
      return layout;
    }
  }

  return ori;
}

const ResponsiveGridLayout = WidthProvider(Responsive);

const ORI_LAYOUT: ReactGridLayout.Layout[] = [
  { i: "1", x: 0, y: 0, w: 60, h: 20 },
  { i: "2", x: 60, y: 0, w: 60, h: 30 },
  { i: "3", x: 0, y: 20, w: 60, h: 10 },
  // { i: "4", x: 60, y: 20, w: 60, h: 20 },
  // { i: "5", x: 0, y: 20, w: 60, h: 20 },
  // { i: "6", x: 60, y: 20, w: 60, h: 20 },
];

const TrialView: React.FC = () => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const glRef = React.useRef<HTMLDivElement>(null);
  const [vheight, setVheight] = useState<number>(0);
  const [hasScroll, setHasScroll] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [layout, setLayout] = useState<ReactGridLayout.Layout[]>(ORI_LAYOUT);

  useEffect(() => {
    if (!divRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!divRef.current || !glRef.current) return;

      const ele = divRef.current;
      const glele = glRef.current;

      const lhs = glele.offsetHeight > ele.offsetHeight;
      setVheight(ele.offsetHeight);
      setHasScroll(lhs);
    });

    resizeObserver.observe(divRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!divRef.current) return;

    const handleFullscreenChange = () => {
      const isFs = document.fullscreenElement !== null;
      setFullscreen(isFs);
    };

    const handleKeydown = (event: any) => {
      if (!divRef.current) return;

      // F11键的keyCode为122
      if (event.keyCode === 122) {
        event.preventDefault();
        divRef.current.requestFullscreen();
      }
    };

    addEventListener("fullscreenchange", handleFullscreenChange);
    addEventListener("keydown", handleKeydown);

    return () => {
      removeEventListener("fullscreenchange", handleFullscreenChange);
      removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    const nlo = renderGLayout(ORI_LAYOUT, fullscreen, vheight);
    setLayout(nlo);
  }, [fullscreen, vheight]);

  const clsname = useEmotionCss(() => {
    return {
      height: "100vh",
      width: hasScroll ? "calc(100vw - 17px - 1px)" : "100vw",
      backgroundColor: "#fff7e6",
      overflow: fullscreen ? "auto" : "",

      ".glview": {
        width: "calc(100% - 1px)",
      },

      ".card-wrap": {
        padding: "1px",
      },
      ".card": {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffd8bf",
        padding: "3px",
      },
    };
  });

  return (
    <div className={clsname} ref={divRef}>
      <div className="glview" ref={glRef}>
        <ResponsiveGridLayout
          className="layout"
          margin={[0, 0]}
          rowHeight={rowHeight}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 120, md: 120, sm: 120, xs: 120, xxs: 120 }}
          onBreakpointChange={(bp) => {
            // console.log(bp, "onBreakpointChange");
          }}
          onLayoutChange={(lo) => {
            // console.log(lo, "onLayoutChange");
          }}
          layouts={{ lg: layout }}
        >
          {layout.map((item) => {
            return (
              <div className="card-wrap" key={item.i}>
                <div className="card">xx-{item.i}</div>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default TrialView;
