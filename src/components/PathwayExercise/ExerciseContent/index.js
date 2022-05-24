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
import { dateTimeFormat, TimeLeft, versionCode } from "../../../constant";

import useStyles from "../styles";
import ExerciseBatchClass from "../../BatchClassComponents/ExerciseBatchClass/ExerciseBatchClass";
import CourseEnroll from "../../BatchClassComponents/EnrollInCourse/EnrollInCourse";
import RevisionClassExerciseComponent, {
  MoreDetails,
} from "../../BatchClassComponents/Revision/RevisionClassExerciseComponent";
import RevisionClassEnroll from "../../BatchClassComponents/Revision/RevisionClassEnroll";
// import { Container, Box, Typography, Button, Grid } from "@mui/material";
import languageMap from "../../../pages/CourseContent/languageMap";
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

const RenderContent = ({
  data,
  exercise,
  enrolledDoubtClassData,
  setEnrolledDoubtClassData,
}) => {
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
  if (data.component === "banner") {
    const value = data.value;
    const actions = JSON.parse(data.actions[0].data);
    let alreadyExists = false;
    if (actions.is_enrolled) {
      enrolledDoubtClassData.forEach((item) => {
        if (item.id === actions.id) {
          alreadyExists = true;
        }
      });
      if (!alreadyExists) {
        setEnrolledDoubtClassData([...enrolledDoubtClassData, actions]);
      }
    }
    // console.log(actions.is_enrolled);
    return <RevisionClassExerciseComponent value={value} actions={actions} />;
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
  const pathwayId = params.pathwayId;
  const [showJoinClass, setShowJoinClass] = useState(true);
  const [open, setOpen] = useState(false);
  const [courseData, setCourseData] = useState({ content_type: null });
  const [userEnrolledClasses, setUserEnrolledClasses] = useState([]);
  const [upcomingBatchesData, setUpcomingBatchesData] = useState([]);
  const [enrolledDoubtClassData, setEnrolledDoubtClassData] = useState([]);

  useEffect(() => {
    getCourseContent({ courseId, lang, versionCode, user }).then((res) => {
      setCourse(res.data.course.name);
      setExercise(res.data.course.exercises[exerciseId]);
      setContent(res.data.course.exercises[exerciseId]?.content);
      setCourseData(res.data.course.exercises[exerciseId]);
    });
  }, [courseId, exerciseId, lang]);

  useEffect(() => {
    console.log(enrolledDoubtClassData);
  }, [enrolledDoubtClassData]);

  useEffect(() => {
    // getupcomingEnrolledClasses
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}pathways/${pathwayId}/upcomingEnrolledClasses`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token,
      },
    }).then((res) => {
      setUserEnrolledClasses(res.data);
    });
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}pathways/${pathwayId}/upcomingBatches`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token,
      },
    }).then((res) => {
      setUpcomingBatchesData(res.data);
    });
  }, [params.pathwayId, open]);

  function ExerciseContentMain() {
    return (
      <Grid container justifyContent={"center"}>
        <Grid xs={0} item>
          <Container maxWidth="sm">
            <Box sx={{ m: "32px 0px" }}>
              <Box>
                {courseData["content_type"] == "class_topic" && (
                  <>
                    <Box m={4} sx={{ maxWidth: "300px" }}>
                      <Typography variant="h6" mt={2}>
                        {courseData.title}
                      </Typography>
                      <Box mt={3}>
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{
                            borderRadius: 90,
                            height: 30,
                            backgroundColor: "#E9F5E9",
                          }}
                        >
                          <Typography variant="body2">
                            {" "}
                            {courseData.type}
                          </Typography>
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{
                            marginLeft: 10,
                            borderRadius: 90,
                            height: 30,
                          }}
                        >
                          <Typography variant="body2">
                            {languageMap[courseData.lang]}
                          </Typography>
                        </Button>
                      </Box>
                      <Box mt={3}>
                        <Typography variant="body2">
                          Clear your doubts related to the first class of Python
                          and other queries during your studies
                        </Typography>
                      </Box>
                      <Box mt={3}>
                        <Typography variant="body2">
                          If you miss the class or need to revise, you can
                          enroll in an extra class to catch up after{" "}
                          {dateTimeFormat(courseData.start_time).finalDate}
                        </Typography>
                      </Box>
                      {TimeLeft(courseData.start_time) == "expired" ? (
                        <>
                          <Box sx={{ display: "flex" }} mt={3}>
                            <svg
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 0.5C15.5228 0.5 20 4.97715 20 10.5C20 16.0228 15.5228 20.5 10 20.5C4.47715 20.5 0 16.0228 0 10.5C0 4.97715 4.47715 0.5 10 0.5ZM13.2197 7.46967L8.75 11.9393L6.78033 9.96967C6.48744 9.67678 6.01256 9.67678 5.71967 9.96967C5.42678 10.2626 5.42678 10.7374 5.71967 11.0303L8.21967 13.5303C8.51256 13.8232 8.98744 13.8232 9.28033 13.5303L14.2803 8.53033C14.5732 8.23744 14.5732 7.76256 14.2803 7.46967C13.9874 7.17678 13.5126 7.17678 13.2197 7.46967Z"
                                fill="#48A145"
                              />
                            </svg>

                            <Typography ml={2} variant="body2">
                              Completed on{" "}
                              {dateTimeFormat(courseData.start_time).finalDate}
                            </Typography>
                          </Box>
                        </>
                      ) : (
                        ""
                      )}
                    </Box>
                  </>
                )}
                {content &&
                  content.map((contentItem, index) => (
                    <RenderContent
                      data={contentItem}
                      exercise={exercise}
                      key={index}
                      classes={classes}
                      enrolledDoubtClassData={enrolledDoubtClassData}
                      setEnrolledDoubtClassData={setEnrolledDoubtClassData}
                    />
                  ))}
              </Box>
            </Box>
          </Container>
        </Grid>
        <Grid
          style={{
            display: showJoinClass ? "block" : "none",
          }}
          item
        >
          {courseData["content_type"] == "class_topic" && (
            <>
              {" "}
              <ExerciseBatchClass
                id={courseData.id}
                facilitator={courseData.facilitator.name}
                start_time={courseData.start_time}
                end_time={courseData.end_time}
                is_enrolled={courseData.is_enrolled}
                meet_link={courseData.meet_link}
              />
            </>
          )}
        </Grid>
      </Grid>
    );
  }

  return userEnrolledClasses?.length == 0 &&
    upcomingBatchesData?.length == 0 ? (
    <>
      <ExerciseContentMain />
    </>
  ) : userEnrolledClasses?.length == 0 ? (
    <CourseEnroll
      upcomingBatchesData={upcomingBatchesData}
      open={open}
      setOpen={setOpen}
    />
  ) : (
    <ExerciseContentMain />
  );
}

export default ExerciseContent;
