import { Link, Outlet } from "umi";
import styles from "./index.less";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import classNames from "classnames";

export default function Layout() {
  const clsname = useEmotionCss(() => {
    return {
      ".page-nav-zone": {
        display: "flex",
        flexDirection: "row",
        padding: "8px 4px 8px 20px",
        fontSize: "14px",
        alignItems: "center",

        a: {
          color: "rgb(122, 130, 136)",
          fontWeight: "700",
        },

        "a:hover": {
          textDecoration: "underline",
        },

        ".homepage": {},

        ".spline": {
          width: "1px",
          height: "18px",
          backgroundColor: "#8c8c8c",
          margin: "auto 20px",
        },

        ".item": {
          marginRight: "20px",
        },
      },

      ".page-content-zone": {
        backgroundColor: "#f0f0f0",
        padding: "5px 20px",
      },
    };
  });

  return (
    <div className={classNames(styles.navs, clsname)}>
      <div className="page-nav-zone">
        <div className="homepage">
          <Link to="/">Homepage</Link>
        </div>
        <div className="spline" />
        <div className="item">
          <Link to="/tools">Tools</Link>
        </div>
        <div className="item">
          <Link to="/me">About Me</Link>
        </div>
      </div>
      <div className="page-content-zone">
        <Outlet />
      </div>
    </div>
  );
}
