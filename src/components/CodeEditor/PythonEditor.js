import React from "react";

import { usePython } from "./react-py";

import CodeMirrorEditor from "./CodeMirror";

import { Button, Grid, Typography } from "@mui/material";
const PythonEditor = ({ value, setEditorState }) => {
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  return (
    <div className>
      {isRunning && <div>Running</div>}
      <CodeMirrorEditor value={value} setEditorState={setEditorState} />

      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <code>{stdout}</code>
          <code>{stderr}</code>
        </Grid>
        <Grid item mt={2}>
          <Button
            disabled={isLoading}
            variant="contained"
            onClick={() => {
              runPython(value);
            }}
          >
            Run
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PythonEditor;
