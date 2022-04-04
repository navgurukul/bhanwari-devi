import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { METHODS } from "../../../services/api";
import axios from "axios";
import get from "lodash/get";
import YouTube from "react-youtube";
import DOMPurify from "dompurify";
import useStyles from "../styles";

// import HiddenContent from "../HiddenContent";

import {
  Container,
  Box,
  Toolbar,
  Typography,
  Button,
  Grid,
} from "@mui/material";

function getMarkdown(code, lang) {
  let l = lang == "python" ? "py" : "js";
  return `~~~${l}
${code}
~~~`;
}

const createVisulizeURL = (code, lang, mode) => {
  // only support two languages for now
  let l = lang == "python" ? "2" : "js";
  let replacedCode = code && code.replace(/<br>/g, "\n");
  let visualizerCode = replacedCode.replace(/&emsp;/g, " ");
  let url = `http://pythontutor.com/visualize.html#code=${encodeURIComponent(
    visualizerCode
  )
    .replace(/%2C|%2F/g, decodeURIComponent)
    .replace(/\(/g, "%28")
    .replace(
      /\)/g,
      "%29"
    )}&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=${mode}&origin=opt-frontend.js&py=${l}&rawInputLstJSON=%5B%5D&textReferences=false`;
  return url;
};

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

const RenderContent = ({ data, classes }) => {
  if (data.component === "header") {
    return headingVarients[data.variant](
      DOMPurify.sanitize(get(data, "value"))
    );
  }
  if (data.component === "image") {
    return (
      <img
        className="classes.content-img"
        src={get(data, "value")}
        alt="content"
      />
    );
  }
  if (data.component === "youtube") {
    const videoId = data.value.includes("=")
      ? data.value.split("=")[1]
      : data.value;
    return <YouTube className={"youtube-video"} videoId={videoId} />;
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
    const allData = data.value.map((item) => item.items);
    const dataInCol = allData[0].map((_, i) =>
      allData.map((_, j) => allData[j][i])
    );
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
            {dataInCol.map((item) => {
              return (
                <tr>
                  {item.map((row) => {
                    const rowData = DOMPurify.sanitize(row);
                    return (
                      <>
                        <td dangerouslySetInnerHTML={{ __html: rowData }} />
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  if (data.component === "code") {
    const codeContent = DOMPurify.sanitize(get(data, "value"));
    return (
      <div>
        <Box className={classes.codeBackground}>
          <Toolbar disableGutters>
            <img
              src={require("../asset/code-example.svg")}
              loading="lazy"
              className={classes.codeExampleImg}
            />
            <Typography variant="subtitle1">Code Example</Typography>
          </Toolbar>
          <Typography
            className={classes.codeWrap}
            dangerouslySetInnerHTML={{
              __html: codeContent,
            }}
          />
          <Grid container justifyContent="flex-end">
            <Button
              variant="contained"
              color="dark"
              target="_blank"
              href={createVisulizeURL(get(data, "value"), data.type, "display")}
            >
              Visualize
            </Button>
          </Grid>
        </Box>
      </div>
    );
  }
  // if (data.type === "solution") {
  //   return (
  //     <HiddenContent>
  //       <code>
  //         <ReactMarkdown children={get(data, "value.code")} />
  //       </code>
  //     </HiddenContent>
  //   );
  // }

  return "";
};

function ExerciseContent({ exerciseId }) {
  const user = useSelector(({ User }) => User);
  const [content, setContent] = useState([]);
  const classes = useStyles();
  const courseId = 370;

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises`,
      headers: {
        "version-code": 40,
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setContent(res.data.course.exercises[exerciseId].content);
    });
    // }, [courseId, exerciseId, id, user.data.token]);
  }, [courseId, exerciseId]);

  console.log("content", content);

  return (
    <Container maxWidth="sm">
      <Box>
        {content &&
          content.map((contentItem, index) => (
            <RenderContent data={contentItem} key={index} classes={classes} />
          ))}
      </Box>
    </Container>
  );
}

export default ExerciseContent;
