import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { METHODS } from "../../../services/api";
import axios from "axios";
import get from "lodash/get";
import YouTube from "react-youtube";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import { getCourseContent } from "../../../components/Course/redux/api";
import {
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  Typography,
  Container,
  Box,
  Button,
  Grid,
} from "@mui/material";

// import HiddenContent from "../HiddenContent";
import { versionCode } from "../../../constant";

import useStyles from "../styles";

// import { Container, Box, Typography, Button, Grid } from "@mui/material";

const createVisulizeURL = (code, lang, mode) => {
  // only support two languages for now
  const l = lang == "python" ? "2" : "js";
  const replacedCode = code && code.replace(/<br>/g, "\n");
  const visualizerCode = replacedCode.replace(/&emsp;/g, " ");
  const url = `http://pythontutor.com/visualize.html#code=${encodeURIComponent(
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

const headingVarients = {};

[Typography, "h2", "h3", "h4", "h5", "h6"].forEach(
  (Name, index) =>
    (headingVarients[index + 1] = (data) => (
      <Name
        className="heading"
        dangerouslySetInnerHTML={{ __html: data }}
        {...(index === 0 ? { component: "h1", variant: "h6" } : {})}
      />
    ))
);

const RenderContent = ({ data }) => {
  const classes = useStyles();
  if (data.component === "header") {
    return headingVarients[data.variant](
      DOMPurify.sanitize(get(data, "value"))
    );
  }
  if (data.component === "image") {
    return (
      <img className={classes.contentImage} src={data.value} alt="content" />
    );
  }
  if (data.component === "youtube") {
    const videoId = data.value.includes("=")
      ? data.value.split("=")[1]
      : data.value;
    return <YouTube className={classes.youtubeVideo} videoId={videoId} />;
  }
  if (data.component === "text") {
    const text = DOMPurify.sanitize(get(data, "value"));
    if (data.decoration && data.decoration.type === "bullet") {
      return (
        <Box className={classes.List}>
          <CircleIcon sx={{ pr: 2, width: "7px" }} />
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </Box>
      );
    }
    if (data.decoration && data.decoration.type === "number") {
      return (
        <Box className={classes.List}>
          <Typography
            variant="body1"
            sx={{ pr: 1 }}
            className={classes.contentNumber}
            dangerouslySetInnerHTML={{ __html: data.decoration.value }}
          />
          <Typography
            variant="body1"
            className={classes.contentNumber}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </Box>
      );
    } else {
      return (
        <Typography
          style={{
            margin: "2rem 0",
          }}
          variant="body1"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }
  }
  if (data.component === "table") {
    const allData = data.value.map((item) => item.items);
    const dataInCol = allData[0].map((_, i) =>
      allData.map((_, j) => allData[j][i])
    );
    return (
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {data.value.map((item) => {
                const header = DOMPurify.sanitize(item.header);
                return (
                  <TableCell
                    style={{
                      fontWeight: "bold",
                    }}
                    sx={{ background: "#F5F5F5" }}
                    className={classes.tableHead}
                    dangerouslySetInnerHTML={{ __html: header }}
                  />
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataInCol.map((item) => {
              return (
                <TableRow className={classes.tableHead} hover={false}>
                  {item.map((row) => {
                    const rowData = DOMPurify.sanitize(row);
                    return (
                      <TableCell
                        className={classes.tableHead}
                        dangerouslySetInnerHTML={{ __html: rowData }}
                      />
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (data.component === "code") {
    const codeContent = DOMPurify.sanitize(get(data, "value"));
    return (
      <div>
        <Box className={classes.codeBackground}>
          {/* <Toolbar disableGutters> */}
          <Box sx={{ display: "flex", pb: 2 }}>
            <img
              src={require("../asset/code-example.svg")}
              loading="lazy"
              className={classes.codeExampleImg}
            />
            <Typography variant="subtitle1">Code Example</Typography>
          </Box>
          {/* </Toolbar> */}
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

function ExerciseContent({ exerciseId, lang }) {
  const user = useSelector(({ User }) => User);
  const [content, setContent] = useState([]);
  const [course, setCourse] = useState();
  const [exercise, setExercise] = useState();
  const classes = useStyles();
  const params = useParams();
  const courseId = params.courseId;

  useEffect(() => {
    getCourseContent({ courseId, lang, versionCode }).then((res) => {
      setCourse(res.data.course.name);
      setExercise(res.data.course.exercises[exerciseId]?.name);
      setContent(res.data.course.exercises[exerciseId]?.content);
    });
  }, [courseId, exerciseId, lang]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ m: "32px 0px" }}>
        <Typography variant="h5">{course}</Typography>
        <Typography variant="h6" sx={{ mt: "16px" }}>
          {exercise && exercise}
        </Typography>
        <Box sx={{ mt: 5, mb: 8 }}>
          {content &&
            content.map((contentItem, index) => (
              <RenderContent data={contentItem} key={index} classes={classes} />
            ))}
        </Box>
      </Box>
    </Container>
  );
}

export default ExerciseContent;
