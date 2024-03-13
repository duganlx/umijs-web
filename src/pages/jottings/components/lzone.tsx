import { useEmotionCss } from "@ant-design/use-emotion-css";
import React from "react";

interface ArticleProps {
  title: string;
  tags: string[];
}

const Article: React.FC<ArticleProps> = (props) => {
  const { title, tags } = props;

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      flexDirection: "row",

      ".article-tags": {
        display: "flex",
        flexDirection: "row",
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="article-title">{title}</div>
      <div className="article-tags">
        {tags.map((tag) => (
          <div className="article-tags-item">{tag}</div>
        ))}
      </div>
    </div>
  );
};

const LZonView: React.FC = () => {
  const clsname = useEmotionCss(() => {
    return {
      padding: "2px 3px",
      ".lzone-title": {
        fontSize: "16px",
        fontWeight: "normal",
      },

      ".lzone-tag-zone": {
        padding: "4px 3px",
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="lzone-title">&gt;&nbsp;Articles</div>
      <div className="lzone-tag-zone">
        <Article title="aka" tags={["dfk", "gdk"]} />
      </div>
    </div>
  );
};

export default LZonView;
