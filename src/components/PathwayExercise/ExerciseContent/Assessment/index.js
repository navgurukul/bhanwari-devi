import React, { useState } from "react";
import { Container, Box, Typography, Paper, Button } from "@mui/material";
import useStyles from "./styles";
import get from "lodash/get";
import DOMPurify from "dompurify";

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

const AssessmentContent = ({
  content,
  answer,
  setAnswer,
  setSolution,
  submit,
  correct,
  index,
  setSubmitDisable,
}) => {
  const classes = useStyles();
  if (content.component === "header") {
    return headingVarients[content.variant](
      DOMPurify.sanitize(get(content, "value"))
    );
  }
  if (content.component === "text") {
    const text = DOMPurify.sanitize(get(content, "value"));
    if (index === 0) {
      setSubmitDisable(true);
      return (
        <Box sx={{ mt: "32px" }}>
          <Typography variant="h6" align="center">
            Output
          </Typography>

          <Box
            sx={{
              mt: "32px",
              bgcolor: correct ? "#E9F5E9" : "#FFE5E3",
              p: "16px",
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </Box>
        </Box>
      );
    }
    if (index === 2) {
      return (
        <Box
          sx={{
            p: "16px 0",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            mt: "32px",
            bgcolor: "#F7F7F7",
            p: "16px 16px 22px 16px",
            borderRadius: "8px",
          }}
        >
          <Typography
            sx={{ m: "2rem 0" }}
            variant="body1"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </Box>
      );
    }
    // }
  }
  if (content.component === "options") {
    return (
      <Box sx={{ mt: "32px" }}>
        {Object.values(content.value).map((item, index) => {
          return (
            <Paper
              elevation={3}
              sx={{
                height: "59px",
                mb: "16px",
                cursor: "pointer",
              }}
              className={
                submit
                  ? correct
                    ? answer === index + 1 && classes.correctAnswer
                    : answer === index + 1 && classes.inCorrectAnswer
                  : answer === index + 1 && classes.option
              }
              onClick={() => setAnswer(index + 1)}
            >
              <Typography variant="body1" sx={{ p: "16px" }}>
                {item}
              </Typography>
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

function Assessment({ data }) {
  const [answer, setAnswer] = useState();
  const [correct, setCorrect] = useState();
  const [solution, setSolution] = useState();
  const [submit, setSubmit] = useState();
  const [submitDisable, setSubmitDisable] = useState();

  const submitAssessment = () => {
    setSubmit(true);
    if (answer == solution) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ align: "center", m: "40px 0 58px 0" }}>
      <Typography variant="h6" align="center">
        Find the Output
      </Typography>
      {data &&
        data.map((content) => (
          <AssessmentContent
            content={content}
            answer={answer}
            setAnswer={setAnswer}
            setSolution={setSolution}
            submit={submit}
            correct={correct}
            setSubmitDisable={setSubmitDisable}
          />
        ))}

      <Box textAlign="center" sx={{ display: submitDisable && "none" }}>
        <Button
          variant="contained"
          sx={{ width: "256px", p: "8px 16px 8px 16px" }}
          color={answer ? "primary" : "disable"}
          onClick={submitAssessment}
        >
          Submit
        </Button>
      </Box>

      {data &&
        data.map((content) => {
          if (content.component === "output") {
            return (
              <>
                {submit
                  ? correct
                    ? content.value.correct.map((content, index) => (
                        <AssessmentContent
                          content={content}
                          index={index}
                          correct={correct}
                          submit={submit}
                          setSubmitDisable={setSubmitDisable}
                        />
                      ))
                    : content.value.incorrect.map((content, index) => (
                        <AssessmentContent
                          content={content}
                          index={index}
                          correct={correct}
                          submit={submit}
                          setSubmitDisable={setSubmitDisable}
                        />
                      ))
                  : null}
              </>
            );
          }
        })}
    </Container>
  );
}

export default Assessment;
