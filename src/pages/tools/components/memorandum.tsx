import { useState } from "react";
import MonacoEditor from "react-monaco-editor";

interface MemorandumViewProps {
  layoutsize: [number, number];
}

const MemorandumView: React.FC<MemorandumViewProps> = (props) => {
  const { layoutsize } = props;
  const [hwins, wwins] = layoutsize;
  const [content, setContent] = useState<string>("1");

  return (
    <>
      <MonacoEditor
        width={`${wwins - 35}px`}
        height="300px"
        theme="vs"
        value={content}
        onChange={(newcontent: any) => {
          setContent(newcontent);
        }}
      />
    </>
  );
};

export default MemorandumView;
