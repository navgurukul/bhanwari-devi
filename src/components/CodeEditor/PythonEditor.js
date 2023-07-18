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
                      !/^[a-zA-Z_]\w*[ ]*=[ ]*(int\(|float\()?input/.test(
                        line.trim()
                      )
                  );
                  const inputLines = lines
                    .slice(0, noInputIndex)
                    .filter((line) => line.trim());
                  const jsInputLines = inputLines.map((line) =>
                    line
                      .replace(/input[ ]*\(/g, 'prompt(')
                      .replace(/int[ ]*\(/g, 'parseInt(')
                      .replace(/float[ ]*\(/g, 'parseFloat(')
                  );
                  const varNames = inputLines.map((line) =>
                    line.substring(0, line.search(/[^\w]/))
                  );
                  const uniqueVarNames = Array.from(new Set(varNames));
                  let varValues;
                  try {
                    varValues = new Function(
                      `let ${uniqueVarNames.join(',')};\n${jsInputLines.join(
                        '\n'
                      )};\nreturn [${uniqueVarNames.map(
                        (varName) => `${varName}`
                      )}]`
                    )();
                  } catch (e) {
                    alert(
                      'There was an error while running the code, but it may be because input does not fully work now.'
                    );
                    console.log(e);
                  }
/*
x = float(input("Enter a number"))
y = int(input("You entered " + x + ". Now enter another number."))
x = int(input("You entered " + y + ". Enter first number again."))
z = input("Enter a word")
print("Sum of two numbers is:", x + y, "Your word is:", z)
*/
                  const initialPythonCode = uniqueVarNames.map(
                    (varName, index) => {
                      const valueOfVarName = varValues[index];
                      return `${varName} = ${
                        typeof valueOfVarName === 'string'
                          ? '"' + valueOfVarName.replace(/"/g, '\\"') + '"'
                          : valueOfVarName
                      }`;
                    }
                  );

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
