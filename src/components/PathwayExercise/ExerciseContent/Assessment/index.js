import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Box, Typography, Paper, Button, Grid } from "@mui/material";
import useStyles from "../../styles";
import get from "lodash/get";
import DOMPurify from "dompurify";
import axios from "axios";
import { METHODS } from "../../../../services/api";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";

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
    ))
);

const AssessmentContent = ({
  content,
  answer,
  setAnswer,
  setSolution,
  submit,
  setSubmit,
  correct,
  index,
  setSubmitDisable,
  triedAgain,
  setTriedAgain,
  submitDisable,
}) => {
  const classes = useStyles();
  if (content.component === "header") {
    if (triedAgain > 1) {
      return headingVarients[content.variant](
        DOMPurify.sanitize(get(content, "value"))
      );
    }
  }
  if (content.component === "text") {
    const text = DOMPurify.sanitize(get(content, "value"));
    if (index === 0) {
      return (
        <Box sx={{ mt: "32px" }}>
          <Typography variant="h6" align="center">
            Output
          </Typography>

          <Box
            sx={{
              mt: "32px",
              bgcolor: correct ? "success.light" : "error.light",
              p: "16px",
              borderRadius: "8px",
            }}
          >
            <UnsafeHTML Container={Typography} variant="body1" html={text} />
          </Box>
        </Box>
      );
    }
    if (index === 2) {
      if (triedAgain > 1) {
        return (
          <Box
            sx={{
              p: "16px 0",
              borderRadius: "8px",
            }}
          >
            <UnsafeHTML Container={Typography} variant="body1" html={text} />
          </Box>
        );
      } else {
        return (
          <Grid container spacing={2} mt={3} mb={10}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setTriedAgain(triedAgain + 1);
                }}
              >
                <Typography variant="subtitle2">
                  See Answer & Explanation
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setAnswer();
                  setSubmit();
                  setSubmitDisable();
                }}
              >
                <Typography variant="subtitle2">Re-try</Typography>
              </Button>
            </Grid>
          </Grid>
        );
      }
    }
  }
  if (content.component === "questionCode") {
    const text = DOMPurify.sanitize(get(content, "value"));
    return (
      <Box
        sx={{
          mt: "32px",
          bgcolor: "#F7F7F7",
          p: "16px 16px 22px 16px",
          borderRadius: "8px",
        }}
      >
        <UnsafeHTML
          Container={Typography}
          // sx={{ m: "2rem 0" }}
          sx={{ m: "16px" }}
          variant="body1"
          html={text}
        />
      </Box>
    );
  }
  if (content.component === "questionExpression") {
    const text = DOMPurify.sanitize(get(content, "value"));
    return (
      <UnsafeHTML
        Container={Typography}
        sx={{ m: "2rem 0", fontWeight: 700, fontSize: "1.2rem" }}
        variant="body1"
        html={text}
      />
    );
  }

  if (content.component === "options") {
    return (
      <Box sx={{ m: "32px 0px" }}>
        {Object.values(content.value).map((item, index) => {
          const text = DOMPurify.sanitize(item.value.slice(2));
          return (
            <Paper
              elevation={3}
              sx={{
                height: "auto",
                mb: "16px",
                cursor: "pointer",
                p: "16px",
              }}
              className={
                submit
                  ? correct
                    ? answer === item.id && classes.correctAnswer
                    : answer === item.id && classes.inCorrectAnswer
                  : answer === item.id && classes.option
              }
              // onClick={() => setAnswer(item.id)}
              onClick={() => !submitDisable && setAnswer(item.id)}
            >
              <Stack direction="row" gap={1}>
                <Typography variant="body1">
                  {item.value.slice(0, 2)}
                </Typography>
                <UnsafeHTML
                  Container={Typography}
                  variant="body1"
                  html={text}
                />
              </Stack>
            </Paper>
          );
        })}
      </Box>
    );
  }
  if (content.component === "solution") {
    setSolution(content.value);
  }
  return "";
};

function Assessment({
  data,
  exerciseId,
  courseData,
  setCourseData,
  setProgressTrackId,
  res,
}) {
  const user = useSelector(({ User }) => User);
  const [answer, setAnswer] = useState();
  const [correct, setCorrect] = useState();
  const [solution, setSolution] = useState();
  const [submit, setSubmit] = useState();
  const [submitDisable, setSubmitDisable] = useState();
  const [status, setStatus] = useState();
  const [triedAgain, setTriedAgain] = useState(0);
  const params = useParams();

  // Assessment submit handler
  const submitAssessment = () => {
    setSubmit(true);
    axios({
      method: METHODS.POST,
      url: `${process.env.REACT_APP_MERAKI_URL}/progressTracking/learningTrackStatus`,
      headers: {
        accept: "application/json",
        Authorization: user.data?.token || "",
      },
      data: {
        pathway_id: params.pathwayId,
        course_id: params.courseId,
        exercise_id: courseData.id,
      },
    });

    if (answer === solution) {
      setCorrect(true);
      setStatus("Pass");
      setTriedAgain(triedAgain + 2);
      setSubmitDisable(true);
      axios({
        method: METHODS.POST,
        url: `${process.env.REACT_APP_MERAKI_URL}/assessment/student/result`,
        headers: {
          accept: "application/json",
          Authorization: user.data.token,
        },
        data: {
          assessment_id: exerciseId,
          selected_option: answer,
          status: "Pass",
        },
      }).then((res) => {});
    } else {
      setCorrect(false);
      setStatus("Fail");
      setTriedAgain(triedAgain + 1);
      setSubmitDisable(true);
      axios({
        method: METHODS.POST,
        url: `${process.env.REACT_APP_MERAKI_URL}/assessment/student/result`,
        headers: {
          accept: "application/json",
          Authorization: user.data.token,
        },
        data: {
          assessment_id: exerciseId,
          selected_option: answer,
          status: "Fail",
        },
      }).then((res) => {});
    }
  };

  useEffect(() => {
    if (res?.attempt_status === "CORRECT" || res?.attempt_count === 2) {
      if (res?.attempt_status === "CORRECT") {
        setAnswer(res?.selected_option);
        setCorrect(true);
        setStatus("pass");
        setTriedAgain(2);
        setSubmitDisable(true);
        setSubmit(true);
      } else if (res?.attempt_status === "INCORRECT") {
        setCorrect(false);
        setTriedAgain(2);
        setAnswer(res?.selected_option);
        setStatus("fail");
        setSubmitDisable(true);
        setSubmit(true);
      }
    } else if (res?.attempt_count === 1) {
      setSubmitDisable(true);
      setAnswer(res?.data?.selected_option);
      setSubmit(true);
      setTriedAgain(res?.data?.attempt_count);
    }
  }, [res]);

  return (
    <Container maxWidth="sm" sx={{ align: "center", m: "40px 0 62px 0" }}>
      {data &&
        data.map((content) => (
          <AssessmentContent
            content={content}
            answer={answer}
            setAnswer={setAnswer}
            setSolution={setSolution}
            submit={submit}
            setSubmit={setSubmit}
            correct={correct}
            setTriedAgain={setTriedAgain}
            setSubmitDisable={setSubmitDisable}
            submitDisable={submitDisable}
          />
        ))}

      <Box textAlign="center" sx={{ display: submitDisable && "none" }}>
        <Button
          variant="contained"
          sx={{ width: "256px", p: "8px 16px 8px 16px" }}
          color={answer ? "primary" : "secondary"}
          disabled={!answer}
          onClick={submitAssessment}
        >
          Submit
        </Button>
      </Box>

      {data &&
        submit &&
        data.map((content) => {
          const dataArr =
            content.value && correct
              ? content.value.correct
              : content.value.incorrect;
          return (
            content.component === "output" &&
            dataArr.map((content, index) => (
              <AssessmentContent
                content={content}
                index={index}
                correct={correct}
                setTriedAgain={setTriedAgain}
                setAnswer={setAnswer}
                submit={submit}
                setSubmit={setSubmit}
                setSubmitDisable={setSubmitDisable}
                triedAgain={triedAgain}
                submitDisable={submitDisable}
              />
            ))
          );
        })}
    </Container>
  );
}

export default Assessment;
