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

const CodeTool = require("@editorjs/code");
const ColorPlugin = require("editorjs-text-color-plugin");

export const EDITOR_JS_TOOLS = {
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile:
          "https://dev-api.navgurukul.org/apiDocs/courseEditor/ImageUploadS3", // backend file uploader endpoint
        byUrl:
          "https://dev-api.navgurukul.org/apiDocs/courseEditor/ImageUploadS3/byUrl", // endpoint that provides uploading by Url
      },
    },
  },
  quote: Quote,
  // marker: Marker,
  Color: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      colorCollections: [
        // '#2E2E2E"',
        "#171616",
        // "#080600",
        // "#FFCC00",
        "#48A145",
      ],
      defaultColor: "#2E2E2E",
      type: "text",
    },
  },
  Marker: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      colorCollections: ["#FFFFFF", "E9F5E9"],
      // defaultColor: '#E9F5E9',
      defaultColor: "#E9F5E9",
      //  '#FFBF00',
      type: "marker",
    },
  },
  raw: Raw,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  header: Header,
  list: {
    class: List,
    inlineToolbar: true, // or ['bold', 'link']
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
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
