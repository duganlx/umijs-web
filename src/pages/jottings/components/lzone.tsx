import { FileTextOutlined, FilterOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Input, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { CatalogItem } from "..";

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
      borderTop: "1px solid #f0f0f0",
      borderRadius: "3px",
      padding: "3px 2px",

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

          ".article-tags-item-split": {
            color: "black",
          },
        },

        ".article-tags-item:before": {
          content: '""',
          marginLeft: "2px",
        },
      },

      "&:hover": {
        backgroundColor: "#f6ffed",
      },

      "&:last-child": {
        borderBottom: "1px solid #f0f0f0",
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="article-title">{title}</div>
      <div className="article-tags">
        {tags.map((tag, index) => (
          <>
            <span className="article-tags-item">
              {tag}
              <span className="article-tags-item-split">
                {index < tags.length - 1 ? "," : ""}
              </span>
            </span>
          </>
        ))}
      </div>
    </div>
  );
};

interface TagProps {
  label: string;
  check: boolean;
}

interface CheckTagProps {
  chgStatus: (val: boolean) => void;
}

const CheckTag: React.FC<TagProps & CheckTagProps> = (props) => {
  const { label, check, chgStatus } = props;

  const clsname = useEmotionCss(() => {
    return {
      cursor: "pointer",
      color: "black",
      backgroundColor: check ? "#ffd666" : "#fafafa",
      border: check ? "1px solid #ffd666" : "1px solid #d9d9d9",
      userSelect: "none",
      marginTop: "6px",
    };
  });

  return (
    <Tag className={clsname} onClick={() => chgStatus(!check)}>
      {label}
    </Tag>
  );
};

function generateTagProps(catalogs: CatalogItem[]) {
  const tagSet = new Set();

  catalogs.forEach((item) => {
    const { tags } = item;

    tags.forEach((tag) => {
      tagSet.add(tag);
    });
  });

  const uniqueTags = Array.from(tagSet) as string[];

  return uniqueTags
    .sort((a, b) => a.localeCompare(b))
    .map((tag) => {
      return { label: tag, check: false } as TagProps;
    });
}

interface LZoneViewProps {
  catalogs: CatalogItem[];
}

const LZoneView: React.FC<LZoneViewProps> = (props) => {
  const { catalogs } = props;

  const [tags, setTags] = useState<TagProps[]>([]);
  const [openFP, setOpenFP] = useState<boolean>(false);

  useEffect(() => {
    const tps = generateTagProps(catalogs);

    setTags(tps);
  }, [catalogs]);

  const clsname = useEmotionCss(() => {
    return {
      height: "100%",
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

      ".lzone-article": {
        padding: "4px 3px",
        height: "calc(100% - 21px)",
        overflow: "auto",

        "&::-webkit-scrollbar": {
          width: "5px",
          backgroundColor: "white",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#d9d9d9",
          borderRadius: "5px",
        },
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

        ".filter-panel-item:before": {
          content: '">"',
          marginRight: "4px",
        },

        ".item-input": {
          padding: "4px 3px",
        },

        ".item-tag-zone": {
          padding: "0 3px 4px 3px",
          height: "calc(100% - 75px)",
          overflow: "auto",

          "&::-webkit-scrollbar": {
            width: "5px",
            backgroundColor: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#d9d9d9",
            borderRadius: "5px",
          },
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
      <div className="lzone-article">
        {catalogs.map((item) => {
          const { title, tags } = item;
          return <Article title={title} tags={tags} />;
        })}
      </div>

      <div className="filter-panel">
        <div className="filter-panel-item">Keywords</div>
        <div className="item-input">
          <Input size="small" placeholder="Keyword queries" allowClear />
        </div>
        <div className="filter-panel-item">Tags</div>
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
  );
};

export default LZoneView;
