import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";
import YouTube from "react-youtube";
import get from "lodash/get";
import "./styles.scss";

// See https://github.com/aknuds1/html-to-react#with-custom-processing-instructions
// for more info on the processing instructions
const parseHtml = htmlParser({
  isValidNode: (node) => node.type !== "script",
  processingInstructions: [
    /* ... */
  ],
});

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
        source={data.value}
        escapeHtml={false}
        astPlugins={[parseHtml]}
      />
    );
  }
  if (data.type === "python" || "javascript") {
    return (
      <code className="language-python code-block">
        {" "}
        <br />
        {get(data, "value.code")} <br />
      </code>
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
  console.log(content, "content -------");

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
