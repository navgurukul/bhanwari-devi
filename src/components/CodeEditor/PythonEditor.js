import React from "react";

// import { usePython } from 'react-py'

import CodeMirrorEditor from "./CodeMirror";

import { Button } from "@mui/material";
const PythonEditor = ({ value, setEditorState }) => {
  // const { runPython, stdout, stderr, isLoading, isRunning } = usePython()

  return (
    <div className="PythonCodeExample">
      {/* {isRunning && <div>Running</div>} */}
      {/* {isLoading && <div>Loading</div>} */}
      <Button
        onClick={() => {
          // runPython(value)
          console.log("python ran");
        }}
      />
      <CodeMirrorEditor value={value} setEditorState={setEditorState} />
      {/* <pre> */}
      {/* <code>{stdout}</code> */}
      {/* <code>{stderr}</code> */}
      {/* </pre> */}
    </div>
  );
};

export default PythonEditor;
