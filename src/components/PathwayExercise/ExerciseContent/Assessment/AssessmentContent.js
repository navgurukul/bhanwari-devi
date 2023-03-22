import React from "react";
import { Grid, Typography, Box, Button, Paper, Stack } from "@mui/material";
import useStyles from "../../styles";
import get from "lodash/get";
import DOMPurify from "dompurify";
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
  solution,
  setSubmit,
  correct,
  index,
  setSubmitDisable,
  triedAgain,
  setTriedAgain,
  submitDisable,
  submitAssessment,
}) => {
  // console.log(solution);

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
                  submitAssessment();
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
                    : triedAgain === 1
                    ? answer === item.id && classes.inCorrectAnswer
                    : (answer === item.id && classes.inCorrectAnswer) ||
                      (solution === item.id && classes.correctAnswer)
                  : answer === item.id && classes.option
              }
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
export default AssessmentContent;
