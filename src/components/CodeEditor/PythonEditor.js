import React from "react";

import { usePython } from "./react-py";

import CodeMirrorEditor from "./CodeMirror";

import { Grid } from "@mui/material";

import { Button } from "@mui/material";
const PythonEditor = ({ value, setEditorState }) => {
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  return (
    <div className>
      {isRunning && <div>Running</div>}
      {isLoading && <div>Loading</div>}

      <CodeMirrorEditor value={value} setEditorState={setEditorState} />

      <Button
        variant="contained"
        onClick={() => {
          runPython(value);
        }}
      >
        Run
      </Button>

      <pre>
        <code>{stdout}</code>
        <code>{stderr}</code>
      </pre>
    </div>
  );
};

export default PythonEditor;
