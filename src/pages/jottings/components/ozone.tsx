import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Tag } from "antd";
import React, { useState } from "react";

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

const OZoneView: React.FC = () => {
  const [tags, setTags] = useState<any[]>(defaultTags);

  const clsname = useEmotionCss(() => {
    return {
      padding: "2px 3px",
      ".ozone-title": {
        fontSize: "16px",
        fontWeight: "normal",
      },

      ".ozone-tag-zone": {
        padding: "4px 3px",
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="ozone-title">&gt;&nbsp;Tags</div>
      <div className="ozone-tag-zone">
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
  );
};

export default OZoneView;
