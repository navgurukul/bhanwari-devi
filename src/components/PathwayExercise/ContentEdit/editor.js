import React, { useEffect, useState } from "react";
import { createReactEditorJS } from "react-editor-js";

import Image from "@editorjs/image";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
const CodeTool = require("@editorjs/code");

const EDITOR_JS_TOOLS = {
  image: Image,
  header: Header,
  list: List,
  // embed: Embed,
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        // coub: true
      },
    },
  },
  code: CodeTool,
};

//npm install --save  react-editor-js @editorjs/editorjs @editorjs/paragraph  @editorjs/header @editorjs/image
// import { EDITOR_JS_TOOLS } from "./constants";

function ReactEditor({ course }) {
  const [editor, setEditor] = React.useState(null);
  const ReactEditorJS = createReactEditorJS();
  const handleInitialize = async (instance) => {
    await setEditor(instance);
    console.log(editor, "editor");
  };

  let blocks = course.map((item, index) => {
    let youtube;
    if (item.component === "youtube") {
      if (!item.value.includes("=")) {
        youtube = "https://www.youtube.com/embed/" + item.value;
      } else {
        let value = item.value.split("=")[1];
        youtube = "https://www.youtube.com/embed/" + value;
      }
    }

    return {
      // id: index,
      type:
        item.component == "text"
          ? "paragraph"
          : item.component === "youtube"
          ? "embed"
          : item.component,
      data: {
        text:
          (item.component === "text" || item.component === "header") &&
          item.value,
        level: item.variant,
        code: item.component === "code" && item.value,
        // image: item.component === "image" && item.value,
        file: {
          url: item.component === "image" && item.value,
        },
        embed: item.component === "youtube" && youtube,
        source: item.component === "youtube" && youtube,
        service: item.component === "youtube" && item.value && item.component,
        caption: "",
        height: 320,
        width: 580,
      },
    };
  });

  console.log("blocks", blocks);

  const onReady = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Editor.js is ready to work!");
  };

  const onChange = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Now I know that Editor's content changed!");
  };

  const onSave = async () => {
    // https://editorjs.io/saving-data

    try {
      const outputData = await editor.save();
      console.log("Article data: ", outputData);
    } catch (e) {
      console.log("Saving failed: ", e);
    }
  };

  return (
    <>
      {blocks.length > 0 && (
        <>
          <ReactEditorJS
            onInitialize={handleInitialize}
            onReady={onReady}
            onChange={onChange}
            // editorInstance={editorInstance => {
            //   editor = editorInstance
            // }}

            tools={EDITOR_JS_TOOLS}
            defaultValue={{
              time: 1635603431943,
              // courseBlock,
              blocks,
              // blocks: [
              //   {
              //     id: "sheNwCUP5A",
              //     type: "header",
              //     data: {
              //       text: "Editor.js",
              //       level: 2,
              //     },
              //   },
              //   {
              //     id: "12iM3lqzcm",
              //     type: "paragraph",
              //     data: {
              //       text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
              //     },
              //   },
              //   {
              //     id: "fvZGuFXHmK",
              //     type: "header",
              //     data: {
              //       text: "Key features",
              //       level: 3,
              //     },
              //   },
              //   {
              //     id: "xnPuiC9Z8M",
              //     type: "list",
              //     data: {
              //       style: "unordered",
              //       items: [
              //         "It is a block-styled editor",
              //         "It returns clean data output in JSON",
              //         "Designed to be extendable and pluggable with a simple API",
              //       ],
              //     },
              //   },
              //   {
              //     id: "-MhwnSs3Dw",
              //     type: "header",
              //     data: {
              //       text: "What does it mean «block-styled editor»",
              //       level: 3,
              //     },
              //   },
              //   {
              //     id: "Ptb9oEioJn",
              //     type: "paragraph",
              //     data: {
              //       text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
              //     },
              //   },
              //   {
              //     id: "-J7nt-Ksnw",
              //     type: "paragraph",
              //     data: {
              //       text: 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.',
              //     },
              //   },
              //   {
              //     id: "SzwhuyoFq6",
              //     type: "header",
              //     data: {
              //       text: "What does it mean clean data output",
              //       level: 3,
              //     },
              //   },
              //   {
              //     id: "x_p-xddPzV",
              //     type: "paragraph",
              //     data: {
              //       text: "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below",
              //     },
              //   },
              //   {
              //     id: "6W5e6lkub-",
              //     type: "paragraph",
              //     data: {
              //       text: 'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.',
              //     },
              //   },
              //   {
              //     id: "eD2kuEfvgm",
              //     type: "paragraph",
              //     data: {
              //       text: "Clean data is useful to sanitize, validate and process on the backend.",
              //     },
              //   },
              //   {
              //     id: "IpKh1dMyC6",
              //     type: "paragraph",
              //     data: {
              //       text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
              //     },
              //   },
              //   {
              //     id: "1",
              //     type: "image",
              //     data: {
              //       file: {
              //         url: "https://codex.so/public/app/img/external/codex2x.png",
              //       },
              //       caption: "",
              //       withBorder: false,
              //       stretched: false,
              //       withBackground: false,
              //     },
              //   },
              // ],
            }}
          />

          <button onClick={() => onSave()}>save</button>
        </>
      )}
    </>
  );
}

export default ReactEditor;
