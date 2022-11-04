// import Image from "@editorjs/image";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

// const Quote = require("@editorjs/quote");
const CodeTool = require("@editorjs/code");

export const EDITOR_JS_TOOLS = {
  // image: Image,
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
        byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
      },
    },
  },
  quote: Quote,
  marker: Marker,
  raw: Raw,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  header: Header,
  list: List,
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
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
};
