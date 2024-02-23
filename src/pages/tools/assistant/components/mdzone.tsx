import { useEmotionCss } from "@ant-design/use-emotion-css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkEmoji from "remark-emoji";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import copy from "copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";
import { message } from "antd";

interface MdZoneProps {
  content: string;
}

const MdZone: React.FC<MdZoneProps> = (props) => {
  const { content } = props;

  const clsName = useEmotionCss(() => {
    return {
      ".codezone": {
        position: "relative",

        ".dialog-copy": {
          display: "none",
        },
      },

      ".codezone:hover": {
        ".dialog-copy": {
          display: "block",
          position: "absolute",
          top: "0",
          right: "3px",
        },

        ".dialog-copy:hover": {
          cursor: "pointer",
          color: "#4096ff",
        },
      },
    };
  });

  const mdclsname = useEmotionCss(() => {
    return {
      lineHeight: 1.5,

      "h1, h2, h3, h4, h5": {
        marginTop: "8px",
      },

      ol: {
        listStyle: "decimal",
        marginLeft: "30px",
      },
      ul: {
        listStyle: "disc",
        marginLeft: "30px",
      },
      "ul.contains-task-list": {
        listStyle: "none",
        paddingInlineStart: "30px",
      },
      pre: {
        margin: "5px 0",
      },
    };
  });

  return (
    <div className={clsName}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkEmoji]}
        rehypePlugins={[rehypeRaw, rehypeKatex as any]}
        className={mdclsname}
        components={{
          code({ inline, className, children, ...props1 }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div className="codezone">
                <SyntaxHighlighter
                  {...props1}
                  style={atomOneLight}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
                <div
                  className="dialog-copy"
                  onClick={() => {
                    if (copy(String(children).replace(/\n$/, ""))) {
                      message.success("copy successful");
                    } else {
                      message.error("copy failed");
                    }
                  }}
                >
                  <CopyOutlined />
                </div>
              </div>
            ) : (
              <code {...props1} className={className}>
                {children}
              </code>
            );
          },
          a({ children, href }) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MdZone;
