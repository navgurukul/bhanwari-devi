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

      <Grid
        container
        direction="row"
        wrap="nowrap"
        justifyContent="space-between"
        mt={2}
        spacing={2}
      >
        <pre style={{ width: "50%" }}>
          <output>{stdout}</output>
          <output>{stderr}</output>
        </pre>
        <Grid>
          <Button
            sx={{ float: "right" }}
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
