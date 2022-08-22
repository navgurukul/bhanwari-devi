import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { METHODS } from "../../../services/api";
import axios from "axios";
import get from "lodash/get";
import YouTube from "react-youtube";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import { getCourseContent } from "../../../components/Course/redux/api";
// import { actions as courseActions } from "../../../components/Course/redux/action";
import { actions as enrolledBatchesActions } from "../../PathwayCourse/redux/action";
import Assessment from "../ExerciseContent/Assessment";
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
  useMediaQuery,
} from "@mui/material";

// import HiddenContent from "../HiddenContent";
import { versionCode } from "../../../constant";

import useStyles from "../styles";
import ExerciseBatchClass from "../../BatchClassComponents/ExerciseBatchClass/ExerciseBatchClass";
import CourseEnroll from "../../BatchClassComponents/EnrollInCourse/EnrollInCourse";
import DoubtClassExerciseComponent from "../../BatchClassComponents/DoubtClassExerciseComponent";
import RevisionClassEnroll from "../../BatchClassComponents/Revision/RevisionClassEnroll";
import { actions as upcomingBatchesActions } from "../..//PathwayCourse/redux/action";
import { actions as upcomingClassActions } from "../../PathwayCourse/redux/action";
import ClassTopic from "../ClassTopic/ClassTopic";
// import { Container, Box, Typography, Button, Grid } from "@mui/material";
import languageMap from "../../../pages/CourseContent/languageMap";
import ExerciseContentLoading from "./ExerciseContentLoading";
// import { isStudentOnly } from "../../User/redux/selectors";
import { selectPartnerId } from "../../User/redux/selectors";
import PersistentDrawerLeft from "./Drawers/Drawer";
import MobileDrawer from "./Drawers/MobileDrawer";
import ContentListText from "./Drawers/ContentListText";

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

function UnsafeHTML(props) {
  const { html, Container, ...otherProps } = props;
  const sanitizedHTML = DOMPurify.sanitize(html);
  return (
    <Container
      {...otherProps}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}

const headingVarients = {};

[Typography, "h2", "h3", "h4", "h5", "h6"].forEach(
  (Name, index) =>
    (headingVarients[index + 1] = (data) => (
      <UnsafeHTML
        Container={Name}
        className="heading"
        html={data}
        {...(index === 0 ? { component: "h1", variant: "h6" } : {})}
      />
      // <Name
      //   className="heading"
      //   dangerouslySetInnerHTML={{ __html: data }}
      //   {...(index === 0 ? { component: "h1", variant: "h6" } : {})}
      // />
    ))
);

const RenderDoubtClass = ({ data, exercise }) => {
  const classes = useStyles();
  if (data?.component === "banner") {
    const value = data.value;
    const actions = JSON.parse(data.actions[0].data);
    const { start_time, end_time } = actions;
    return (
      <div>
        {start_time && end_time && (
          <>
            <DoubtClassExerciseComponent value={value} actions={actions} />

            <div
              style={{
                borderBottom: "1px solid #BDBDBD",
                margin: "40px 0px",
              }}
            ></div>
          </>
        )}
      </div>
    );
  }
  return null;
};

const RenderContent = ({ data, exercise }) => {
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
          <Grid container justifyContent="flex-end" mt={2}>
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

function ExerciseContent({ exerciseId, lang, contentList, setExerciseId }) {
  const user = useSelector(({ User }) => User);
  // const isStudentOnlyRole = useSelector(isStudentOnly);
  const partnerId = useSelector(selectPartnerId);
  const [content, setContent] = useState([]);
  const [course, setCourse] = useState();
  const [exercise, setExercise] = useState();
  const classes = useStyles();
  const params = useParams();
  const courseId = params.courseId;
  const pathwayId = params.pathwayId;
  const [showJoinClass, setShowJoinClass] = useState(true);
  const [courseData, setCourseData] = useState({ content_type: null });
  const [cashedData, setCashedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cashedData?.length > 0) {
      setLoading(false);
    }
  }, [cashedData]);
  // const upcomingBatchesData = useSelector((state) => {
  //   return state.Pathways?.upcomingBatches?.data;
  // });

  // const userEnrolledClasses = useSelector((state) => {
  //   return state.Pathways?.upcomingEnrolledClasses?.data;
  // });

  const reloadContent = () => {
    getCourseContent({ courseId, lang, versionCode, user }).then((res) => {
      setCourse(res.data.course.name);
      setExercise(res.data.course.exercises[exerciseId]);
      setContent(res.data.course.exercises[exerciseId]?.content);
      setCourseData(res.data.course.exercises[exerciseId]);
      setCashedData(res.data.course.exercises);
    });
  };

  useEffect(() => {
    getCourseContent({ courseId, lang, versionCode, user }).then((res) => {
      setCourse(res.data.course.name);
      setExercise(res.data.course.exercises[params.exerciseId]);
      setContent(res.data.course.exercises[params.exerciseId]?.content);
      setCourseData(res.data.course.exercises[params.exerciseId]);
      setCashedData(res.data.course.exercises);
    });
  }, [courseId, lang]);
  useEffect(() => {
    setExercise(cashedData?.[params.exerciseId]);
    setContent(cashedData?.[params.exerciseId]?.content);
    setCourseData(cashedData?.[params.exerciseId]);
  }, [params.exerciseId]);

  const enrolledBatches = useSelector((state) => {
    if (state?.Pathways?.enrolledBatches?.data?.length > 0) {
      return state?.Pathways?.enrolledBatches?.data;
    } else {
      return null;
    }
  });
  useEffect(() => {
    // getupcomingEnrolledClasses
    if (user?.data?.token) {
      dispatch(
        enrolledBatchesActions.getEnrolledBatches({
          pathwayId,
          authToken: user?.data?.token,
        })
      );
      dispatch(
        upcomingBatchesActions.getUpcomingBatches({
          pathwayId,
          // isStudent: isStudentOnlyRole,
          partnerId,
          authToken: user?.data?.token,
        })
      );
      // dispatch(
      //   upcomingClassActions.getupcomingEnrolledClasses({
      //     pathwayId: pathwayId,
      //     authToken: user?.data?.token,
      //   })
      // );
    }
  }, [params.pathwayId]);

  function ExerciseContentMain() {
    const [selected, setSelected] = useState(params.exerciseId);
    const desktop = useMediaQuery("(min-width: 900px)");

    return (
      <Container maxWidth="lg">
        {!desktop && (
          <ContentListText desktop={desktop} setOpenDrawer={setOpenDrawer} />
        )}
        <Grid container justifyContent={"center"}>
          <Grid xs={0} item>
            <Box sx={{ m: "32px 0px" }}>
              <Box>
                {courseData?.content_type == "class_topic" &&
                  enrolledBatches && <ClassTopic courseData={courseData} />}
              </Box>
            </Box>
          </Grid>
          {desktop && (
            <ContentListText desktop={desktop} setOpenDrawer={setOpenDrawer} />
          )}
          <Grid
            style={{
              display: showJoinClass ? "block" : "none",
            }}
            item
          >
            {courseData?.content_type == "class_topic" && (
              <>
                {enrolledBatches ? (
                  <ExerciseBatchClass
                    id={courseData.id}
                    facilitator={courseData.facilitator.name}
                    start_time={courseData.start_time}
                    end_time={courseData.end_batch_time}
                    is_enrolled={courseData.is_enrolled}
                    meet_link={courseData.meet_link}
                  />
                ) : (
                  <CourseEnroll reloadContent={reloadContent} />
                )}
              </>
            )}
          </Grid>
        </Grid>

        <Container maxWidth="sm">
          {desktop ? (
            <PersistentDrawerLeft
              setSelected={setSelected}
              list={contentList}
              open={openDrawer}
              setOpen={setOpenDrawer}
              setExerciseId={setExerciseId}
            />
          ) : (
            <MobileDrawer
              setSelected={setSelected}
              list={contentList}
              open={openDrawer}
              setOpen={setOpenDrawer}
            />
          )}
          {content &&
            content.map((contentItem, index) => (
              <RenderDoubtClass
                data={contentItem}
                exercise={exercise}
                key={index}
                classes={classes}
              />
            ))}

          {exercise && exercise.content_type === "exercise" && (
            <Box sx={{ m: "32px 0px" }}>
              {/* <Typography variant="h5">{course}</Typography> */}
              <Typography variant="h6" sx={{ mt: "16px" }}>
                {exercise && exercise.name}
              </Typography>
              <Box sx={{ mt: 5, mb: 8 }}>
                {content &&
                  content.map((contentItem, index) => (
                    <RenderContent
                      data={contentItem}
                      key={index}
                      classes={classes}
                    />
                  ))}
              </Box>
            </Box>
          )}
          {exercise && exercise.content_type === "assessment" && (
            <Assessment
              data={content}
              exerciseId={exercise.id}
              courseData={courseData}
              setCourseData={setCourseData}
            />
          )}
        </Container>
      </Container>
    );
  }

  return <>{!loading ? <ExerciseContentMain /> : <ExerciseContentLoading />}</>;
}

export default ExerciseContent;
