import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import YouTube from "react-youtube";
import get from "lodash/get";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import HiddenContent from "../HiddenContent";
import DOMPurify from "dompurify";

import "./styles.scss";

// const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
// const DOMPurify = createDOMPurify(window);

function getMarkdown(code, lang) {
  let l = lang == "python" ? "py" : "js";
  return `~~~${l}
${code}
~~~`;
}

// for transforming code : encodeURIComponent => decode comma(,) and slash(/) => encode round brackets
const createVisulizeURL = (code, lang, mode) => {
  // only support two languages for now
  let l = lang == "python" ? "2" : "js";
  let url = `http://pythontutor.com/visualize.html#code=${encodeURIComponent(
    code
  )
    .replace(/%2C|%2F/g, decodeURIComponent)
    .replace(/\(/g, "%28")
    .replace(
      /\)/g,
      "%29"
    )}&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=${mode}&origin=opt-frontend.js&py=${l}&rawInputLstJSON=%5B%5D&textReferences=false`;
  return url;
};

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        showLineNumbers
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const table = {
  table({ node, ...props }) {
    return <table style={{ borderCollapse: "collapse" }} {...props} />;
  },
};

const headingVarients = {
  1: (data) => <h1 className="heading">{data.value}</h1>,
  2: (data) => <h2 className="heading">{data.value}</h2>,
  3: (data) => <h3 className="heading">{data.value}</h3>,
  4: (data) => <h4 className="heading">{data.value}</h4>,
  5: (data) => <h5 className="heading">{data.value}</h5>,
  6: (data) => <h6 className="heading">{data.value}</h6>,
};

const RenderContent = ({ data }) => {
  if (data.component === "header") {
    return headingVarients[data.variant](data);
  }

  if (data.component === "image") {
    return <img className="image" src={get(data, "value")} alt="content" />;
  }
  if (data.component === "youtube") {
    return <YouTube className={"youtube-video"} videoId={data.value} />;
  }
  if (data.component === "text") {
    return <p>{`${data.value}`}</p>;
  }
  // if (data.type === "markdown") {
  //   return (
  //     <ReactMarkdown
  //       className="table-content"
  //       children={data.value}
  //       rehypePlugins={[rehypeRaw, rehypeSanitize]}
  //       remarkPlugins={[gfm]}
  //       components={table}
  //     />
  //   );
  // }
  if (data.component === "code")
    if (data.type === "python" || data.type === "javascript") {
      return (
        <div>
          <ReactMarkdown
            components={components}
            children={getMarkdown(
              DOMPurify.sanitize(get(data, "value"), data.type)
            )}
          />
          <div className="code__controls">
            <a
              target="_blank"
              href={createVisulizeURL(get(data, "value"), data.type, "display")}
            >
              Visualize
            </a>

            <a
              target="_blank"
              href={createVisulizeURL(
                get(data, "value.code"),
                data.type,
                "edit"
              )}
            >
              Edit
            </a>
          </div>
        </div>
      );
    }
  // if (data.type === "bash") {
  //   return (
  //     <code className="language-bash code-block">
  //       {" "}
  //       {get(data, "value.code")}{" "}
  //     </code>
  //   );
  // }
  if (data.type === "solution") {
    return (
      <HiddenContent>
        <code>
          <ReactMarkdown children={get(data, "value.code")} />
        </code>
      </HiddenContent>
    );
  }

  return "";
};

function ExerciseContent(props) {
  const { content = [] } = props;

  if (!content) {
    return "";
  }

  return (
    <div className="ng-exercise-content" align="justify">
      {content.map((contentItem, index) => (
        <RenderContent data={contentItem} key={index} />
      ))}
    </div>
  );
}

ExerciseContent.propTypes = {
  content: PropTypes.array,
};

export default ExerciseContent;
