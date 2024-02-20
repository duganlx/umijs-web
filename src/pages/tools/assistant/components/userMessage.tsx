import { SmileOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useDispatch } from "react-redux";

export interface NormalUserMessageProps {
  content: string;
}

const NormalUserMessage: React.FC<NormalUserMessageProps> = (props) => {
  const { content } = props;

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "8px",
      marginTop: "8px",
      lineHeight: 1.5,

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

  return (
    <div className={clsname}>
      <div className="avater">
        <SmileOutlined />
      </div>
      <div className="dialog-content">
        <pre>{content}</pre>
      </div>
    </div>
  );
};

export default NormalUserMessage;
