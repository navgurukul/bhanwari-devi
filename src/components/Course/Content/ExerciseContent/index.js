import React, { useState } from "react";
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
import Highlight from "react-highlight";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import axios from "axios";
import { METHODS } from "../../../../services/api";
import { useSelector, useDispatch } from "react-redux";

import "./styles.scss";
const { JSDOM } = require("jsdom");

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

// const components = {
//   code({ node, inline, className, children, ...props }) {
//     const match = /language-(\w+)/.exec(className || "");
//     return !inline && match ? (
//       <SyntaxHighlighter
//         showLineNumbers
//         language={match[1]}
//         PreTag="div"
//         children={String(children).replace(/\n$/, "")}
//         {...props}
//       />
//     ) : (
//       <code className={className} {...props}>
//         {children}
//       </code>
//     );
//   },
// };

const headingVarients = {
  1: (data) => (
    <h1 className="heading" dangerouslySetInnerHTML={{ __html: data }}></h1>
  ),
  2: (data) => (
    <h2 className="heading" dangerouslySetInnerHTML={{ __html: data }}></h2>
  ),
  3: (data) => (
    <h3 className="heading" dangerouslySetInnerHTML={{ __html: data }}></h3>
  ),
  4: (data) => (
    <h4 className="heading" dangerouslySetInnerHTML={{ __html: data }}></h4>
  ),
  5: (data) => (
    <h5 className="heading" dangerouslySetInnerHTML={{ __html: data }}></h5>
  ),
  6: (data) => (
    <h6 className="heading" dangerouslySetInnerHTML={{ __html: data }}></h6>
  ),
};

const RenderContent = ({ data }) => {
  if (data.component === "header") {
    return headingVarients[data.variant](
      DOMPurify.sanitize(get(data, "value"))
    );
  }

  if (data.component === "image") {
    return <img className="image" src={get(data, "value")} alt="content" />;
  }
  if (data.component === "youtube") {
    return <YouTube className={"youtube-video"} videoId={data.value} />;
  }
  if (data.component === "text") {
    const text = DOMPurify.sanitize(get(data, "value"));
    if (data.decoration && data.decoration.type === "bullet") {
      return (
        <li className="paragraph" dangerouslySetInnerHTML={{ __html: text }} />
      );
    }
    if (data.decoration && data.decoration.type === "number") {
      return (
        <div className="list">
          <p
            className="number"
            dangerouslySetInnerHTML={{ __html: data.decoration.value }}
          />
          <p className="paragraph" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      );
    } else {
      return (
        <p className="paragraph" dangerouslySetInnerHTML={{ __html: text }} />
      );
    }
  }
  if (data.component === "table") {
    return (
      <div>
        <table className="table-data">
          <thead>
            <tr>
              {data.value.map((item) => {
                const header = DOMPurify.sanitize(item.header);
                return <th dangerouslySetInnerHTML={{ __html: header }} />;
              })}
            </tr>
          </thead>
          <tbody>
            {data.value.map((item) => {
              return (
                <td>
                  {item.items.map((row) => {
                    const rowData = DOMPurify.sanitize(row);
                    return (
                      <>
                        <div dangerouslySetInnerHTML={{ __html: rowData }} />
                        <hr />
                      </>
                    );
                  })}
                </td>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  if (data.component === "code") {
    // if (data.type === "python" || data.type === "javascript") {
    const codeContent = DOMPurify.sanitize(get(data, "value"));
    return (
      <div>
        <div className="code-bg">
          {/* <div
            dangerouslySetInnerHTML={{
              __html: getMarkdown(codeContent, data.type),
            }}
          /> */}
          <Highlight innerHTML={true}>{get(data, "value")}</Highlight>
        </div>
        <div className="code__controls">
          <a
            target="_blank"
            href={createVisulizeURL(get(data, "value"), data.type, "display")}
          >
            Visualize
          </a>

          <a
            target="_blank"
            href={createVisulizeURL(get(data, "value.code"), data.type, "edit")}
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
  const [updateCourse, setUpdateCourse] = useState();
  // const [saveButton, setSaveButton] = useState(false);
  const [flag, setFlag] = useState(true);
  const user = useSelector(({ User }) => User);
  const { content = [] } = props;

  if (!content) {
    return "";
  }

  const url = window.location.href;
  const exerciseId = url.split("exercise/")[1];
  const courseId = url.split("course/")[1].split("/")[0];
  console.log("url", url.split("course/")[1].split("/")[0]);
  console.log("courseId", courseId);

  const handleEdit = () => {
    setFlag(true);
    // return
    axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/exercises/${exerciseId}`,
      method: METHODS.PUT,
      headers: {
        "Content-Type": "application/json",
        "version-code": 25,
      },
      data: {
        content: updateCourse,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    // setTimeout(() => {
    //   axios({
    //     url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises`,
    //     method: METHODS.GET,
    //     headers: {
    //       "Content-Type": "application/json",
    //       "version-code": 25,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, 3000);
  };

  return (
    <>
      {flag && (
        <span class="tooltip" title="Edit Content">
          <i
            class="fa fa-pencil edit-button"
            onClick={() => {
              setFlag(false);
            }}
          ></i>
        </span>
      )}
      {/* <span class="tooltip" title="Edit Content">
        <i
          class="fa fa-pencil edit-button"
          onClick={() => {
            setFlag(false);
          }}
        ></i>
      </span> */}
      {flag ? null : (
        <button
          className="save-button"
          onClick={handleEdit}
          // onClick={() => {
          //   setFlag(true);
          // }}
        >
          Save the Content
        </button>
      )}
      {flag ? (
        <div className="ng-exercise-content" align="justify">
          {content.map((contentItem, index) => (
            <RenderContent data={contentItem} key={index} />
          ))}
        </div>
      ) : (
        <div align="left">
          {content.map((contentItem, index) => (
            <JSONInput
              // key={index}
              id="a_unique_id"
              placeholder={contentItem}
              // colors={darktheme}
              locale={locale}
              onChange={(e) => {
                setUpdateCourse(e.json);
              }}
              height="auto"
              width="800px"
            />
          ))}
        </div>
      )}

      {/* {props.flag? (
        <div className="ng-exercise-content" align="justify">
          {content.map((contentItem, index) => (
            <RenderContent data={contentItem} key={index} />
          ))}
        </div>
      ) : (
        <div align="left">
          {content.map((contentItem, index) => (
            <JSONInput
              // key={index}
              id="a_unique_id"
              placeholder={contentItem}
              // colors={darktheme}
              locale={locale}
              onChange={(e) => {
                setUpdateCourse(e.json);
              }}
              height="auto"
              width="800px"
            />
          ))}
        </div>
      )} */}
    </>
  );
}
ExerciseContent.propTypes = {
  content: PropTypes.array,
};

export default ExerciseContent;
