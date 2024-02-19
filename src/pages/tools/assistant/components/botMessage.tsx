import { RobotOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkEmoji from "remark-emoji";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useDispatch } from "react-redux";
import {
  thinkingNormalBotMessageDone,
  typingNormalBotMessageDone,
} from "../redux/msglistSlice";
import { InnerProps } from "./message";

export function generateFixBotAnswer() {
  // https://www.daodejing.org/
  const theTaoteChing: string[] = [
    "【第一章】道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。",
    "【第二章】天下皆知美之为美，斯恶（è）已；皆知善之为善，斯不善已。故有无相生，难易相成，长短相较，高下相倾，音声相和（hè），前后相随。是以圣人处无为之事，行不言之教，万物作焉而不辞，生而不有，为而不恃，功成而弗居。夫（fú）唯弗居，是以不去。",
    "【第三章】不尚贤，使民不争；不贵难得之货，使民不为盗；不见（xiàn）可欲，使民心不乱。是以圣人之治，虚其心，实其腹；弱其志，强其骨。常使民无知无欲，使夫（fú）智者不敢为也。为无为，则无不治。",
    "【第四章】道冲而用之或不盈，渊兮似万物之宗。挫其锐，解其纷，和其光，同其尘。湛兮似或存，吾不知谁之子，象帝之先。",
    "【第五章】天地不仁，以万物为刍（chú）狗；圣人不仁，以百姓为刍狗。天地之间，其犹橐龠（tuó yuè）乎？虚而不屈，动而愈出。多言数（shuò）穷，不如守中。",
    "【第六章】谷神不死，是谓玄牝（pìn），玄牝之门，是谓天地根。绵绵若存，用之不勤。",
    // "",
    // "",
    // "",
  ];

  const randindex = Math.floor(Math.random() * theTaoteChing.length);

  return thinkingNormalBotMessageDone(theTaoteChing[randindex]);
}

export interface NormalBotMessageProps {
  content: string;

  isThinking: boolean;
  isTyping: boolean;

  onTypingDone?: () => void;
}

const NormalBotMessage: React.FC<NormalBotMessageProps & InnerProps> = (
  props
) => {
  const { id, content, isThinking, isTyping, onTypingDone } = props;

  const [dots, setDots] = useState<string>(".");
  const [rendermsg, setRendermsg] = useState<string>(isTyping ? "" : content);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isThinking) {
      return;
    }

    const interval = setInterval(() => {
      setDots((prevDots) => {
        return prevDots.length < 3 ? prevDots + "." : ".";
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isThinking]);

  useEffect(() => {
    if (isThinking) {
      return;
    }
    if (content.length === rendermsg.length) {
      return;
    }

    const interval = setInterval(() => {
      setRendermsg((prevContent) => {
        const nextchar = content[prevContent.length];

        if (nextchar !== undefined) {
          return prevContent + nextchar;
        }

        return prevContent;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [content]);

  useEffect(() => {
    if (isThinking) {
      return;
    }
    if (rendermsg.length !== content.length) {
      return;
    }

    dispatch(typingNormalBotMessageDone(id));

    if (onTypingDone) {
      onTypingDone();
    }
  }, [rendermsg]);

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "8px",
      marginTop: "8px",

      ".avater": {
        marginTop: "10px",
        marginRight: "5px",
        fontSize: "16px",
        height: "100%",
      },

      ".dialog-content": {
        border: "1px solid rgb(204, 204, 204)",
        borderRadius: "8px",
        padding: "7px 10px",
        backgroundColor: "rgb(240, 240, 240)",
        fontSize: "14px",
        minHeight: "37px",
      },
    };
  });

  const mdclsname = useEmotionCss(() => {
    return {
      lineHeight: 1.5,

      ol: {
        listStyle: "decimal",
        marginLeft: "30px",
      },
      ul: {
        listStyle: "disc",
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
    <div className={clsname}>
      <div className="avater">
        <RobotOutlined />
      </div>
      <div className="dialog-content">
        {isThinking ? (
          dots
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath, remarkEmoji]}
            rehypePlugins={[rehypeRaw, rehypeKatex as any]}
            className={mdclsname}
            components={{
              code({ inline, className, children, ...props1 }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props1}
                    style={atomOneLight}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
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
            {rendermsg}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default NormalBotMessage;
