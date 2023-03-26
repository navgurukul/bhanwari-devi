import React, { useState, useEffect } from "react";

import { usePython } from "./react-py";

import CodeMirrorEditor from "./CodeMirror";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CableIcon from "@mui/icons-material/Cable";

import { Box, Button, Grid, Typography } from "@mui/material";

const PythonEditor = ({
  initialCodeEditorValue,
  disableEditing,
  disableRun,
}) => {
  let { runPython, stdout, stderr, isLoading, isRunning } = usePython();
  const [pythonEditorCode, setPythonEditorCode] = useState(
    initialCodeEditorValue
  );
  const [codeRan, setCodeRan] = useState();
  let [codeExecuted, setCodeExecuted] = useState(stdout, stderr);

  useEffect(() => {
    if (stdout) {
      setCodeExecuted(stdout);
    } else {
      setCodeExecuted(stderr);
    }
  }, [stdout, stderr]);
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
        <CodeMirrorEditor
          value={pythonEditorCode}
          setEditorState={setPythonEditorCode}
          readOnly={disableEditing}
        />
        <Box
          className="middle-border"
          sx={{ margin: "0 -2px", borderTop: "1px solid #6D6D6D" }}
        />

        {disableRun ? (
          <Typography sx={{ p: 1, color: "#6D6D6D" }}>
            Code not runnable? It's because this code does not have output
            statements and is meant for understanding the code snippet
          </Typography>
        ) : (
          <Box>
            {disableEditing && (
              <Typography
                sx={{
                  p: 1,
                  color: "#6D6D6D",
                  margin: "0 -2px",
                  borderBottom: "1px solid #6D6D6D",
                }}
              >
                Code not editable? It's because we want you to understand the
                outcome directly
              </Typography>
            )}
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
                disabled={
                  isLoading ||
                  (initialCodeEditorValue === pythonEditorCode && !codeExecuted)
                }
                variant="outlined"
                onClick={() => {
                  setPythonEditorCode(initialCodeEditorValue);
                  setCodeExecuted("");
                }}
              >
                Reset
              </Button>
              <Button
                endIcon={<ArrowRightIcon />}
                disabled={isLoading || isRunning}
                variant="contained"
                onClick={() => {
                  setCodeRan(pythonEditorCode);
                  runPython(pythonEditorCode);
                }}
              >
                Run
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      {codeExecuted && (
        <Box
          className="Output"
          sx={{
            border: "1px solid #6D6D6D",
            borderRadius: "8px",
            padding: 2,
          }}
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
            <Typography>{codeExecuted}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PythonEditor;
