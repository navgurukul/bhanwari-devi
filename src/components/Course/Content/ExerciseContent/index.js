import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";
import YouTube from "react-youtube";
// import { useTable } from "react-table";
import get from "lodash/get";

import "./styles.scss";
import ExerciseContentTable from "../ExerciseContentTable/ExerciseContentTable";

// See https://github.com/aknuds1/html-to-react#with-custom-processing-instructions
// for more info on the processing instructions
const parseHtml = htmlParser({
  isValidNode: (node) => node.type !== "script",
  processingInstructions: [
    /* ... */
  ],
});

// const table = (data) => {
//   const tableInstance = useTable({
//     columns: data.value.header,
//     data: data.value.value
//   })

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = tableInstance

//   return (
//     <table {...getTableProps()}>
//       <thead>
//         {
//         headerGroups.map(headerGroup => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {
//             headerGroup.headers.map(column => (
//               <th {...column.getHeaderProps()}>
//                 {
//                 column.render('Header')}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {
//         rows.map(row => {
//           prepareRow(row)
//           return (
//             <tr {...row.getRowProps()}>
//               {
//               row.cells.map(cell => {
//                 return (
//                   <td {...cell.getCellProps()}>
//                     {
//                     cell.render('Cell')}
//                   </td>
//                 )
//               })}
//             </tr>
//           )
//         })}
//       </tbody>
//     </table>
//   )
// }

const RenderContent = ({ data }) => {
  if (data.type === "image") {
    console.log("get(data)", get(data));
    return <img className="image" src={get(data, "value.url")} alt="content" />;
  }
  if (data.type === "youtube") {
    console.log("Video aa rha");
    return <YouTube className={"youtube-video"} videoId={data.value} />;
  }
  if (data.type === "table") {
    const columns = data.value.header;
    const tableData = data.value.value;

    return (
      <table className="table">
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
                  return <th>{row}</th>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );

    // return <ExerciseContentTable data={data}/>
  }
  if (data.type === "markdown") {
    console.log("ho rha h");
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
  // } else if (data.type == "image") {
  //   return <img className="image" src={get(data, "value.url")} alt="content" />;
  // } else if (data.type == "video") {
  //   return <YouTube className={"youtube-video"} videoId={data.value} />;
  // }
  // if (data.type == "youtube") {
  //   return <YouTube className={"youtube-video"} videoId={data.value} />;
  // }
  // if (data.type == "image") {
  //   console.log("get(data)", get(data))
  //   return <img className="image" src={get(data, "value.url")} alt="content" />;
  // }
  return "";
};

function ExerciseContent(props) {
  const { content = [] } = props;
  // console.log('content', content)

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
