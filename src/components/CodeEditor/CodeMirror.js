import React from "react";
import { Box } from "@mui/material";
import { INDENT } from "../../constant";

import "codemirror/lib/codemirror.css";

// Themes
import "codemirror/theme/night.css";

// Languages
import "codemirror/mode/python/python";

import { Controlled as ControlledEditorComponent } from "react-codemirror2";

const CodeMirrorEditor = ({ value, setEditorState, disableEditing }) => {
  const handleEditorChange = (editor, data, value) => {
    setEditorState(value);
  };

  return (
    <Box className="editor-container">
      <ControlledEditorComponent
        onFocus={(editor) => {
          editor.setSize(null, null);
        }}
        onBeforeChange={handleEditorChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: "python",
          lineNumbers: true,
          indentUnit: INDENT,
          matchBrackets: true,
          singleCursorHeightPerLine: false,
          readOnly: disableEditing,
        }}
      />
    </Box>
  );
};

export default CodeMirrorEditor;
