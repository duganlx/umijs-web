import { FileTextOutlined } from "@ant-design/icons";
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
      flexDirection: "column",
      cursor: "pointer",
      alignItems: "baseline",
      border: "1px solid #f0f0f0",
      borderRadius: "3px",
      padding: "1px 2px",

      ".article-title": {
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "15px",
      },

      ".article-tags": {
        display: "flex",
        flexDirection: "row",

        ".article-tags-item": {
          fontSize: "13px",
          color: "#d46b08",
        },

        ".article-tags-item:before": {
          content: '""',
          marginLeft: "2px",
        },
      },

      "&:hover": {
        backgroundColor: "#b7eb8f",
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="article-title">{title}</div>
      <div className="article-tags">
        {tags.map((tag) => (
          <span className="article-tags-item">{tag}</span>
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
        alignItems: "center",

        ".title-icon": {
          fontSize: "15px",
          marginTop: "2px",
          marginRight: "3px",
        },

        ".title-icon:before": {
          content: '">"',
          marginRight: "4px",
        },
      },

      ".lzone-tag-zone": {
        padding: "4px 3px",
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="lzone-title">
        <span className="title-icon">
          <FileTextOutlined />
        </span>
        <span className="title-des">Articles</span>
      </div>
      <div className="lzone-tag-zone">
        <Article
          title="我是一个兵来自喜马拉雅山脉的一个巨大的且冰冷的山东"
          tags={["搞笑", "故事"]}
        />
      </div>
    </div>
  );
};

export default LZonView;
