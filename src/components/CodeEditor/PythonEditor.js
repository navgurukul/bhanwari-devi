import React from "react";

import { usePython } from "./react-py";

import CodeMirrorEditor from "./CodeMirror";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { Box, Button, Grid, Typography } from "@mui/material";

const PythonEditor = ({ value, setEditorState }) => {
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  return (
    <Box
      className="PythonCodeEditor"
      sx={{
        my: 3,
      }}
    >
      <Box
        sx={{
          p: "2px",
          border: "1px solid #6D6D6D",
          borderRadius: "8px",
          mb: 1.5,
        }}
      >
        <CodeMirrorEditor value={value} setEditorState={setEditorState} />
        <Box
          className="middle-border"
          sx={{ margin: "0 -2px", borderTop: "1px solid #6D6D6D" }}
        />

        <Box
          className="toolbar"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Button
            startIcon={<RestartAltIcon />}
            disabled={isLoading}
            variant=""
            onClick={() => {
              runPython(value);
            }}
          >
            Reset Code
          </Button>

          <Button
            endIcon={<ArrowRightIcon />}
            disabled={isLoading}
            variant="contained"
            onClick={() => {
              runPython(value);
            }}
          >
            Run
          </Button>
        </Box>
      </Box>

      <Box
        className="Output"
        sx={{ border: "1px solid #6D6D6D", borderRadius: "8px" }}
      >
        <pre>stdout</pre>
        <pre>stderr</pre>
      </Box>
    </Box>
  );
};

export default PythonEditor;
