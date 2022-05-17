import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Box, Typography, Paper, Button, Grid } from "@mui/material";
import useStyles from "./styles";
import get from "lodash/get";
import DOMPurify from "dompurify";
import axios from "axios";
import { METHODS } from "../../../../services/api";
// ../../services/api

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

const AssessmentContent = ({
  content,
  answer,
  setAnswer,
  setSolution,
  submit,
  correct,
  index,
  setSubmitDisable,
  triedAgain,
  setTriedAgain,
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
              bgcolor: correct ? "success.light" : "error.light",
              p: "16px",
              borderRadius: "8px",
            }}
          >
            <UnsafeHTML Container={Typography} variant="body1" html={text} />
            {/* <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: text }}
            /> */}
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
            {/* <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: text }}
            /> */}
          </Box>
        );
      } else {
        // setTriedAgain(true);
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth>
                See Answer & Explanation
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth>
                Re-try
              </Button>
            </Grid>
          </Grid>
        );
      }
    }
    // if (index === 2) {
    //   return (
    //     <Box
    //       sx={{
    //         p: "16px 0",
    //         borderRadius: "8px",
    //       }}
    //     >
    //       <UnsafeHTML Container={Typography} variant="body1" html={text} />
    //       {/* <Typography
    //         variant="body1"
    //         dangerouslySetInnerHTML={{ __html: text }}
    //       /> */}
    //     </Box>
    //   );
    // }
    else {
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
            sx={{ m: "2rem 0" }}
            variant="body1"
            html={text}
          />
          {/* <Typography
            sx={{ m: "2rem 0" }}
            variant="body1"
            dangerouslySetInnerHTML={{ __html: text }}
          /> */}
        </Box>
      );
    }
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

function Assessment({ data, exerciseId }) {
  const user = useSelector(({ User }) => User);
  const [answer, setAnswer] = useState();
  const [correct, setCorrect] = useState();
  const [solution, setSolution] = useState();
  const [submit, setSubmit] = useState();
  const [submitDisable, setSubmitDisable] = useState();
  const [status, setStatus] = useState();
  const [triedAgain, setTriedAgain] = useState(0);

  useEffect(() => {
    axios({
      method: METHODS.POST,
      url: `${process.env.REACT_APP_MERAKI_URL}/assessment/student/result`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
      data: { assessment_id: exerciseId, status: status },
    }).then((res) => {
      console.log("res", res);
    });
  }, [status]);

  const submitAssessment = () => {
    setSubmit(true);
    if (answer == solution) {
      setCorrect(true);
      setStatus("Pass");
    } else {
      setCorrect(false);
      setStatus("Fail");
      setTriedAgain(triedAgain + 1);
    }
  };

  console.log("triedAgain", triedAgain);
  // const submit = true
  // const data = [
  //   {
  //     component: "header",
  //     value: "Lets dive in with a code sample",
  //     variant: 3,
  //   },
  //   {
  //     component: "options",
  //     value: {
  //       1: "You can have a chocolate",
  //       2: "You can not have a chocolate",
  //       3: "Thumbsup",
  //       4: "None",
  //     },
  //   },
  //   { component: "solution", value: "1" },
  //   {
  //     component: "output",
  //     correct: [
  //       { component: "text", value: "You got it right" },
  //       { component: "header", variant: 3, value: "Lets see why" },
  //       { component: "header", variant: 3, value: "Lets see why" },
  //     ],
  //     incorrect: [
  //       { component: "text", value: "It missed the mark" },
  //       { component: "header", variant: 3, value: "Lets see why" },
  //       { component: "header", variant: 3, value: "Lets see why" },
  //     ],
  //   },
  // ];

  return (
    <Container maxWidth="sm" sx={{ align: "center", m: "40px 0 62px 0" }}>
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
                submit={submit}
                setSubmitDisable={setSubmitDisable}
                triedAgain={triedAgain}
                setTriedAgain={setTriedAgain}
              />
            ))
          );
        })}

      {/* {data &&
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
        })} */}
    </Container>
  );
}

export default Assessment;
