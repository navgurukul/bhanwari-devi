import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import YouTube from "react-youtube";
import get from "lodash/get";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import "./styles.scss";

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

const RenderContent = ({ data }) => {
  if (data.type === "image") {
    return <img className="image" src={get(data, "value.url")} alt="content" />;
  }
  if (data.type === "youtube") {
    return <YouTube className={"youtube-video"} videoId={data.value} />;
  }
  if (data.type === "table") {
    const columns = data.value.header;
    const tableData = data.value.value;
    return (
      <table className="table-content">
        <thead>
          <tr>
            {columns.map((col) => {
              return <th>{col}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((rows) => {
            return (
              <tr>
                {rows.map((row) => {
                  return <td>{row}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  if (data.type === "markdown") {
    return (
      <ReactMarkdown
        children={data.value}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      />
    );
  }
  if (data.type === "python" || "javascript") {
    return (
      <div>
        <ReactMarkdown
          components={components}
          children={getMarkdown(get(data, "value.code"), data.type)}
        />
        <button>
          <a
            target="_blank"
            href={createVisulizeURL(
              get(data, "value.code"),
              data.type,
              "display"
            )}
          >
            Visualize
          </a>
        </button>
        <button>
          <a
            target="_blank"
            href={createVisulizeURL(get(data, "value.code"), data.type, "edit")}
          >
            Edit
          </a>
        </button>
      </div>
    );
  }
  if (data.type === "bash") {
    return (
      <code className="language-bash code-block">
        {" "}
        {get(data, "value.code")}{" "}
      </code>
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
    <div className="ng-exercise-content">
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
