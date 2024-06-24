import React, { useState, useEffect } from "react";

// import { usePython } from "./react-py";

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
  pythonRunner
}) => {
  const theme = useTheme();
  // const { runPython, stdout, stderr, isLoading, isRunning } = usePython();
  const { runPython, stdout, stderr, isLoading, isRunning } = pythonRunner;
  const [pythonEditorCode, setPythonEditorCode] = useState(
    initialCodeEditorValue
  );
  const [output, setOutput] = useState('');
  const [errorOutput, setErrorOutput] = useState('');
  const [isMyCodeRunning, setIsMyCodeRunning] = useState(false);

  useEffect(() => {
    if (isMyCodeRunning) {
      setOutput(stdout);
      setErrorOutput(stderr);
      setIsMyCodeRunning(false);
    }
  }, [isMyCodeRunning, isRunning]);

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

                  if (noInputIndex === 0) {
                    runPython(pythonEditorCode);
                    return;
                  }

                  const inputLines = lines
                    .slice(0, noInputIndex)
                    .filter((line) => line.trim());
                  const jsInputLines = inputLines.map((line) => {
                    let currentOpenQuote = "";
                    const replaceStrings = {
                      input: "prompt",
                      int: "parseInt",
                      float: "parseFloat",
                      "#": "//",
                    };
                    let lastStartQuoteIndex = -1;
                    let lastCloseQuoteIndex = -1;
                    let replacedLine = "";
                    for (let i = 0; i < line.length; i++) {
                      // When i === 0, line[i-1] will be undefined so 1st part of condition will be true
                      if (line[i - 1] !== "\\" && line[i] === currentOpenQuote) {
                        // found end of string literal, add it as is
                        replacedLine += line.substring(
                          lastStartQuoteIndex + 1,
                          i + 1
                        );
                        lastCloseQuoteIndex = i;
                        currentOpenQuote = "";
                      } else if (
                        (!currentOpenQuote &&
                          line[i - 1] !== "\\" &&
                          (line[i] === `'` || line[i] === `"`)) ||
                        i === line.length - 1
                      ) {
                        // start of string literal or end of string, add since last close quote with replacements
                        currentOpenQuote = line[i];
                        replacedLine += Object.keys(replaceStrings).reduce(
                          (currentStr, strToReplace) =>
                            currentStr.replace(
                              RegExp(strToReplace, "g"),
                              replaceStrings[strToReplace]
                            ),
                          line.substring(lastCloseQuoteIndex + 1, i + 1)
                        );
                        lastStartQuoteIndex = i;
                      }
                    }
                    return replacedLine;
                  });
                  const varNames = inputLines.map((line) =>
                    line.substring(0, line.search(/[^\w]/))
                  );
                  const uniqueVarNames = Array.from(new Set(varNames));
                  let varValues;
                  try {
                    varValues = new Function(
                      `let ${uniqueVarNames.join(",")};\n${jsInputLines.join(
                        "\n"
                      )};\nreturn [${uniqueVarNames.map(
                        (varName) => `${varName}`
                      )}]`
                    )();
                  } catch (e) {
                    alert(
                      "There was an error while attempting to run the code, which was caused by a line with input.\n" +
                      "However, the translation to code that's run in the browser is not perfect, so this may not be a problem with something you wrote.\n" +
                      "Please try downloading Python (https://www.python.org/) and a code editor such as Visual Studio to run advanced Python code."
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
                        typeof valueOfVarName === "string"
                          ? '"' + valueOfVarName.replace(/"/g, '\\"') + '"'
                          : valueOfVarName
                      }`;
                    }
                  );

                  runPython(
                    initialPythonCode.join("\n") +
                      "\n" +
                      lines.slice(noInputIndex).join("\n")
                  );
                  setIsMyCodeRunning(true);
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
          <Typography>{errorOutput}</Typography>
          <Typography>{output}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PythonEditor;
