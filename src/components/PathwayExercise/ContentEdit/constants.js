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
  marker: Marker,
  raw: Raw,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  header: Header,
  list: {
    class: List,
    inlineToolbar: true // or ['bold', 'link']
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
