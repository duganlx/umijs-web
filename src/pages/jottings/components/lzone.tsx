import { FileTextOutlined, FilterOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Input, Tag } from "antd";
import React, { useState } from "react";

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

interface CheckTagProps {
  label: string;
  check: boolean;

  chgStatus: (val: boolean) => void;
}

const CheckTag: React.FC<CheckTagProps> = (props) => {
  const { label, check, chgStatus } = props;

  const clsname = useEmotionCss(() => {
    return {
      cursor: "pointer",
      color: "black",
      backgroundColor: check ? "#ffd666" : "#fafafa",
      border: check ? "1px solid #ffd666" : "1px solid #d9d9d9",
      userSelect: "none",
    };
  });

  return (
    <Tag className={clsname} onClick={() => chgStatus(!check)}>
      {label}
    </Tag>
  );
};

const defaultTags = [
  { label: "aka", check: false },
  { label: "bka", check: false },
  { label: "cke", check: false },
];

const LZonView: React.FC = () => {
  const [tags, setTags] = useState<any[]>(defaultTags);
  const [openFP, setOpenFP] = useState<boolean>(false);

  const clsname = useEmotionCss(() => {
    return {
      padding: "2px 3px",
      position: "relative",

      ".lzone-title": {
        fontSize: "16px",
        fontWeight: "normal",
        alignItems: "center",

        ".title-des:before": {
          content: '">"',
          marginRight: "4px",
        },

        ".title-des": {
          marginRight: "4px",
        },

        ".op-filter": {
          fontSize: "14px",
          cursor: "pointer",
          color: openFP ? "#a0d911" : "black",
        },

        ".op-filter:hover": {
          color: "#7cb305",
        },
      },

      ".lzone-tag-zone": {
        padding: "4px 3px",
      },

      ".filter-panel": {
        display: openFP ? "block" : "none",
        position: "absolute",
        top: "-252px",
        left: "-1px",
        width: "100%",
        height: "250px",
        backgroundColor: "white",
        border: "1px solid #95de64",
        borderRadius: "5px",
        padding: "2px 4px",
        zIndex: 100,

        ".item-title:before": {
          content: '">"',
          marginRight: "4px",
        },

        ".item-tag-zone, .item-input": {
          padding: "4px 3px",
        },
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="lzone-title">
        <span className="title-des">Articles</span>
        <span
          className="op-filter"
          onClick={() => {
            setOpenFP(!openFP);
          }}
        >
          <FilterOutlined />
        </span>
      </div>
      <div className="lzone-tag-zone">
        <Article
          title="我是一个兵来自喜马拉雅山脉的一个巨大的且冰冷的山东"
          tags={["搞笑", "故事"]}
        />
      </div>

      <div className="filter-panel">
        <div className="item">
          <div className="item-title">Keywords</div>
          <div className="item-input">
            <Input size="small" placeholder="Keyword queries" allowClear />
          </div>
        </div>
        <div className="item">
          <div className="item-title">Tags</div>
          <div className="item-tag-zone">
            {tags.map((tag) => (
              <CheckTag
                label={tag.label}
                check={tag.check}
                chgStatus={(val: boolean) => {
                  const latestTags = tags.map((item) => {
                    if (tag.label == item.label) {
                      return { ...item, check: val };
                    }

                    return item;
                  });

                  setTags(latestTags);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LZonView;
