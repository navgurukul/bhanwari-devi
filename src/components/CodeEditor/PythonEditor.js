import React, { useState, useEffect } from "react";

import { usePython } from "./react-py";

import CodeMirrorEditor from "./CodeMirror";

import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CableIcon from "@mui/icons-material/Cable";

/**
 * <Component to render a Python code editor>
 * @component
 * @param   {<String>} initialCodeEditorValue Initial Python Code Editor value
 * @param   {<boolean>} disableEditing Disable the user's ability to edit the Python Code Editor
 * @param   {<boolean>} disableRun Disable the user's ability to run the Python Code Editor; Editing is also disabled when true.
 * @return  (PythonEditor)
 */

const PythonEditor = ({
  initialCodeEditorValue,
  disableEditing,
  disableRun,
}) => {
  const theme = useTheme();
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();
  const [pythonEditorCode, setPythonEditorCode] = useState(
    initialCodeEditorValue
  );

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
          border: `1px solid ${theme.palette.text.secondary}`,
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
          sx={{
            margin: "0 -2px",
            borderTop: `1px solid ${theme.palette.text.secondary}`,
          }}
        />

        {disableRun ? (
          <Typography sx={{ p: 1, color: `${theme.palette.text.secondary}` }}>
            Code not runnable? It's because this code does not have output
            statements and is meant for understanding the code snippet
          </Typography>
        ) : (
          <Box>
            {disableEditing && (
              <Typography
                sx={{
                  p: 1,
                  color: `${theme.palette.text.secondary}`,
                  margin: "0 -2px",
                  borderBottom: `1px solid ${theme.palette.text.secondary}`,
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
                disabled={isLoading || isRunning}
                variant="outlined"
                onClick={() => {
                  setPythonEditorCode(initialCodeEditorValue);
                }}
              >
                Reset Editor
              </Button>
              <Button
                endIcon={<ArrowRightIcon />}
                disabled={isLoading || isRunning}
                variant="contained"
                onClick={() => {
                  const lines = pythonEditorCode.split(/\r?\n/g);
                  const noInputIndex = lines.findIndex(
                    (line) =>
                      line.trim() &&
                      !/^[a-zA-Z_]\w*[ ]*=[ ]*(int\(|float\()?input/.test(line.trim())
                  );
                  const initialPythonCode = lines.slice(0, noInputIndex).map((line) => {
                    const jsCode = line
                      .replace('input', 'prompt')
                      .replace('int', 'parseInt')
                      .replace('float', 'parseFloat');
                    const varName = line.substring(0, line.search(/[^\w]/));
                    // alert('const ' + jsCode + ';' + varName);
                    /*
x = float(input("Enter x"))
y = int(input("Enter y"))
z = input("Enter a word")
print(x + y, z)
                    */
                    let valueOfVarName;
                    try {
                      valueOfVarName = eval('const ' + jsCode + ';' + varName);
                    } catch (e) {
                      console.log(e);
                      valueOfVarName = '';
                    }
                    return `${varName} = ${
                      typeof valueOfVarName === 'string'
                        ? '"' + valueOfVarName.replace(/"/g, '\\"') + '"'
                        : valueOfVarName
                    }`;
                  });

                  runPython(initialPythonCode.join("\n") + "\n" + lines.slice(noInputIndex).join("\n"));
                }}
              >
                Run
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Box
        className="Output"
        sx={{
          border: `1px solid ${theme.palette.text.secondary}`,
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
          <Typography>{stderr}</Typography>
          <Typography>{stdout}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PythonEditor;
