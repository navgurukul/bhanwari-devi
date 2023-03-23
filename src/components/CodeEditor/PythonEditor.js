import React, { useState, useEffect } from "react";

import { usePython } from "./react-py";

import CodeMirrorEditor from "./CodeMirror";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CableIcon from "@mui/icons-material/Cable";

import { Box, Button, Grid, Typography } from "@mui/material";

const PythonEditor = ({ initialValue, value, setEditorState }) => {
  let { runPython, stdout, stderr, isLoading, isRunning } = usePython();
  let [codeExecuted, setCodeExecuted] = useState(false);

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
            disabled={isLoading || initialValue === value}
            variant="outlined"
            onClick={() => {
              console.log(initialValue);
              setEditorState(initialValue);
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
        sx={{ border: "1px solid #6D6D6D", borderRadius: "8px", padding: 2 }}
      >
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <CableIcon />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Output
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            wordBreak: "normal",
            p: 1,
          }}
        >
          <Typography>{stdout}</Typography>
          <Typography>{stderr}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PythonEditor;
