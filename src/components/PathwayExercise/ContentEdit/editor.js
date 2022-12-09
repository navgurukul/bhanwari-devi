import React, { useEffect, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import axios from "axios";
import { METHODS } from "../../../services/api";
import { useSelector } from "react-redux";
import { PATHS, interpolatePath, versionCode } from "../../../constant";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./styles.scss";
import _ from "lodash";
import { EDITOR_JS_TOOLS } from "./constants";

//npm install --save  react-editor-js @editorjs/editorjs @editorjs/paragraph  @editorjs/header @editorjs/image

function ReactEditor({ course, id, save }) {
  const user = useSelector(({ User }) => User);
  const history = useHistory();
  const params = useParams();
  const [editor, setEditor] = React.useState(null);
  const ReactEditorJS = createReactEditorJS();
  const handleInitialize = async (instance) => {
    await setEditor(instance);
    console.log(editor, "editor");
  };

  console.log("course", course);
  let style = "";
  let items = [];

  let courseData = course.map((item, index) => {
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
    let content = [];
    if (item.component == "text" && "decoration" in item) {
      type = "list";
    } else if (item.component == "text") {
      type = "paragraph";
    } else if (item.component === "youtube") {
      type = "embed";
    } else if (item.component === "code") {
      code = item.value.replace(/<br>/g, "\n").replace(/&emsp;/g, "    ");
      type = item.component;
    } else if (item.component === "table") {
      type = "table";
      const header = item.value.map((item) => item.header);
      const allData = item.value.map((item) => item.items);
      const dataInCol = allData[0].map((_, i) =>
        allData.map((_, j) => allData[j][i])
      );
      content = [[...header], ...dataInCol];
      console.log("allData", allData);
      console.log("header", header);
      console.log("dataInCol", dataInCol);
      console.log("content", content);
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
        caption: item.component === "image" && item.alt,
        withBorder: false,
        withBackground: false,
        stretched: true,
        embed: item.component === "youtube" && youtube,
        source: item.component === "youtube" && youtube,
        service: item.component === "youtube" && item.value && item.component,
        height: 320,
        width: 580,
        // withHeadings: true,
        content: content,
      },
    };
  });

  console.log("courseData", courseData);

  let blocks = courseData.filter((item, index) => {
    // const stringifiedItem = JSON.stringify(item);
    return (
      index ===
      courseData.findIndex((obj) => {
        return _.isEqual(obj, item);
        // return JSON.stringify(obj) === stringifiedItem;
      })
    );
  });

  console.log("blocks", blocks);
  console.log("Course editor completed, Ready to raise PR");

  let json = [];
  const MerakiJSON = (blocks) => {
    blocks.map((item, index) => {
      let value;
      let component;
      let alt;
      if (item.type === "embed") {
        value = item.data.embed.split("https://www.youtube.com/embed/")[1];
        component = "youtube";
      }
      let code;
      if (item.type === "list") {
        item.data.items.map((value, index) => {
          let decoration = {};
          let object = {};
          if (item.data.style === "unordered") {
            decoration.type = "bullet";
          } else {
            decoration.type = "number";
            decoration.value = index + 1;
          }
          object = {
            ...object,
            value: value,
            component: "text",
            decoration,
            variant: item.data.level,
          };
          console.log("object", object);
          json.push(object);
        });
      } else if (item.type === "paragraph") {
        component = "text";
        value = item.data.text;
        console.log("Value", value);
      } else if (item.type == "header") {
        component = item.type;
        value = item.data.text;
      } else if (item.type === "code") {
        code = item.data.code.replace(/\n/g, "<br>").replace(/    /g, "&emsp;");
        component = item.type;
        value = code;
      } else if (item.type == "image") {
        component = item.type;
        value = item.data.file.url;
        alt = item.data.caption;
      } else if (item.type == "table") {
        component = item.type;
        let content = item.data.content;
        let header = content[0];
        content.splice(0, 1);
        const dataInCol = content[0].map((_, j) =>
          content.map((_, i) => content[i][j])
        );
        console.log("content 2", content);
        console.log("header 2", header);
        console.log("dataInCol 2", dataInCol);
        value = [];
        for (const ele in header) {
          console.log("ele", ele);
          console.log("header[ele]", header[ele]);
          value.push({
            header: header[ele],
            items: dataInCol[ele],
          });
        }
        console.log("value", value);
      }

      if (item.type !== "list") {
        json.push({
          value: value,
          component: component,
          variant: item.data.level,
          alt: alt,
        });
      }
    });
    console.log("json", json);
  };

  const onReady = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Editor.js is ready to work!");
  };

  const onChange = (e) => {
    console.log("e", e);
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Now I know that Editor's content changed!");
  };

  const onSave = async () => {
    // https://editorjs.io/saving-data
    try {
      const outputData = await editor.save();
      console.log("Article data: ", outputData);
      MerakiJSON(outputData.blocks);
      const stringifiedCourse = JSON.stringify(json, null, 0);
      console.log(id, stringifiedCourse, "cc");

      axios({
        method: METHODS.PUT,
        url: `${process.env.REACT_APP_MERAKI_URL}/exercises/${id}`,
        headers: {
          "version-code": versionCode,
          accept: "application/json",
          Authorization: user.data?.token || "",
        },
        data: {
          content: stringifiedCourse,
        },
      }).then((res) => {
        history.push(
          interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
            courseId: params.courseId,
            exerciseId: params.exerciseId,
            pathwayId: params.pathwayId,
          })
        );
        console.log(res, "res");
      });
    } catch (e) {
      console.log("Saving failed: ", e);
    }
  };

  useEffect(() => {
    onSave();
  }, [save]);

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
        </>
      )}
    </>
  );
}

export default ReactEditor;
