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

  let style = "";
  let items = [];

  // let blocks1 = [];

  // for (const item of course) {
  //   let youtube;
  //   if (item.component === "youtube") {
  //     if (!item.value.includes("=")) {
  //       youtube = "https://www.youtube.com/embed/" + item.value;
  //     } else {
  //       let value = item.value.split("=")[1];
  //       youtube = "https://www.youtube.com/embed/" + value;
  //     }
  //   } else if (item.component === "text") {
  //     if ("decoration" in item) {
  //       if (item.decoration.type == "bullet") {
  //         style = "unordered";
  //       } else {
  //         style = "ordered";
  //       }
  //       items.push(item.value);
  //     } else {
  //       items = [];
  //     }
  //   } else {
  //     items = [];
  //   }

  //   let type;
  //   if (item.component == "text" && "decoration" in item) {
  //     type = "list";
  //   } else if (item.component == "text") {
  //     type = "paragraph";
  //   } else if (item.component === "youtube") {
  //     type = "embed";
  //   } else {
  //     type = item.component;
  //   }

  //   let data = {
  //     type: type,
  //     data: {
  //       style: style,
  //       items: items,
  //       text:
  //         type == "list"
  //           ? false
  //           : (item.component === "text" || item.component === "header") &&
  //             item.value,
  //       level: item.variant,
  //       code: item.component === "code" && item.value,
  //       file: {
  //         url: item.component === "image" && item.value,
  //       },
  //       embed: item.component === "youtube" && youtube,
  //       source: item.component === "youtube" && youtube,
  //       service: item.component === "youtube" && item.value && item.component,
  //       caption: "",
  //       height: 320,
  //       width: 580,
  //     },
  //   };
  //   blocks1.push(data);
  // }

  let blocks1 = course.map((item, index) => {
    let youtube;
    if (item.component === "youtube") {
      if (!item.value.includes("=")) {
        youtube = "https://www.youtube.com/embed/" + item.value;
      } else {
        let value = item.value.split("=")[1];
        youtube = "https://www.youtube.com/embed/" + value;
      }
    } else if (item.component === "text") {
      if ("decoration" in item) {
        if (item.decoration.type == "bullet") {
          style = "unordered";
        } else {
          style = "ordered";
        }
        items.push(item.value);
      } else {
        items = [];
      }
    } else {
      items = [];
    }

    let type;
    let code;
    if (item.component == "text" && "decoration" in item) {
      type = "list";
    } else if (item.component == "text") {
      type = "paragraph";
    } else if (item.component === "youtube") {
      type = "embed";
    } else if (item.component === "code") {
      code = item.value.replace(/<br>/g, "\n").replace(/&emsp;/g, "    ");
      type = item.component;
    } else {
      type = item.component;
    }

    return {
      type: type,
      data: {
        style: style,
        items: items,
        text:
          type == "list"
            ? false
            : (item.component === "text" || item.component === "header") &&
              item.value,
        level: item.variant,
        code: item.component === "code" && code,
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

  let blocks = blocks1.filter((item, index) => {
    const stringifiedItem = JSON.stringify(item);
    return (
      index ===
      blocks1.findIndex((obj) => {
        return JSON.stringify(obj) === stringifiedItem;
      })
    );
  });

  console.log("blocks", blocks);
  // console.log("blocks1", blocks1);

  const MerakiJSON = () => {
    let json = blocks.map((item, index) => {
      // console.log("item", item);
      let value;
      let component;
      let variant;
      if (item.type === "embed") {
        value = item.data.embed.split("https://www.youtube.com/embed/")[1];
        component = "youtube";
        // console.log("youtube", value);
      }
      // else if (item.component === "text") {
      //   if ("decoration" in item) {
      //     if (item.decoration.type == "bullet") {
      //       style = "unordered";
      //     } else {
      //       style = "ordered";
      //     }
      //     items.push(item.value);
      //   } else {
      //     items = [];
      //   }
      // } else {
      //   items = [];
      // }

      let type;
      let code;
      if (item.type === "list") {
        // if(item.type ==='list') {

        // }
        component = "text";
        value = item.data.text;
      } else if (item.type === "paragraph") {
        component = "text";
        value = item.data.text;
      } else if (item.type == "header") {
        component = item.type;
        value = item.data.text;
      } else if (item.type === "code") {
        code = item.data.code.replace(/\n/g, "<br>").replace(/    /g, "&emsp;");
        component = item.type;
        value = code;
      } else {
        type = item.component;
      }

      return {
        value: value,
        component: component,
        variant: variant,
        // type: type,
        // data: {
        //   style: style,
        //   items: items,
        //   text:
        //     type == "list"
        //       ? false
        //       : (item.component === "text" || item.component === "header") &&
        //         item.value,
        //   level: item.variant,
        //   code: item.component === "code" && code,
        //   file: {
        //     url: item.component === "image" && item.value,
        //   },
        //   embed: item.component === "youtube" && youtube,
        //   source: item.component === "youtube" && youtube,
        //   service: item.component === "youtube" && item.value && item.component,
        //   caption: "",
        //   height: 320,
        //   width: 580,
        // },
      };
    });
    console.log("json", json);
  };

  // console.log("json", json);

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
    MerakiJSON();

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
              blocks,
            }}
          />

          <button onClick={() => onSave()}>save</button>
        </>
      )}
    </>
  );
}

export default ReactEditor;
