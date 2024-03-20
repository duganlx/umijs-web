import { useEmotionCss } from "@ant-design/use-emotion-css";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const TrialView: React.FC = () => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const glRef = React.useRef<HTMLDivElement>(null);
  const [vheight, setVheight] = useState<number>(0);
  const [hasScroll, setHasScroll] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (!divRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!divRef.current || !glRef.current) return;

      const ele = divRef.current;
      const glele = glRef.current;

      const lh = ele.offsetHeight;
      const lhs = glele.offsetHeight > ele.offsetHeight;
      setVheight(lh);
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

  const clsname = useEmotionCss(() => {
    return {
      height: "100vh",
      width: hasScroll ? "calc(100vw - 17px)" : "100vw",
      backgroundColor: "#fff7e6",

      ".card": {
        backgroundColor: "#ffd8bf",
      },
    };
  });

  const layout: ReactGridLayout.Layout[] = [
    { i: "1", x: 0, y: 0, w: 60, h: 20 },
    { i: "2", x: 60, y: 0, w: 60, h: 20 },
    // { i: "3", x: 0, y: 18, w: 60, h: 18 },
    // { i: "4", x: 60, y: 18, w: 60, h: 18 },
  ];

  // console.log(hasScroll, "has scroll");
  // console.log(vheight, "vheight");
  console.log(fullscreen, "fs");

  return (
    <div className={clsname} ref={divRef}>
      <div ref={glRef}>
        <ResponsiveGridLayout
          className="layout"
          margin={[3, 3]}
          rowHeight={28}
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
              <div className="card" key={item.i}>
                xx
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default TrialView;
