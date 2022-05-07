import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Paper, Button } from "@mui/material";
import useStyles from "./styles";
import get from "lodash/get";
import DOMPurify from "dompurify";

import { set } from "date-fns";
import { ClassNames } from "@emotion/react";

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

const AssessmentContent = ({ content, answer, setAnswer }) => {
  const classes = useStyles();
  if (content.component === "header") {
    return headingVarients[content.variant](
      DOMPurify.sanitize(get(content, "value"))
    );
  }
  if (content.component === "text") {
    const text = DOMPurify.sanitize(get(content, "value"));
    return (
      <Box
        sx={{
          mt: "32px",
          bgcolor: "#F7F7F7",
          // height: "30vh",
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
  if (content.component === "options") {
    console.log(content.value[1]);
    return (
      <Box sx={{ mt: "32px" }}>
        {Object.values(content.value).map((item, index) => {
          return (
            <Paper
              elevation={3}
              sx={{
                height: "59px",
                // width: "544px",
                mb: "16px",
              }}
              className={answer === index + 1 && classes.option}
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
  return "";
};

function Assessment({ data }) {
  const classes = useStyles();
  const [answer, setAnswer] = useState();
  const options = ["A", "B", "C", "D"];
  const code = true;
  console.log("data", data);
  return (
    <Container maxWidth="sm" sx={{ align: "center", mb: "32px" }}>
      {/* <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}> */}

      <Typography variant="h6" align="center">
        Find the Output
      </Typography>

      {data.map((content) => (
        <AssessmentContent
          content={content}
          answer={answer}
          setAnswer={setAnswer}
        />
      ))}

      <Button
        variant="contained"
        sx={{ width: "256px", p: "8px 16px 8px 16px" }}
        color={answer ? "primary" : "disable"}
        align="center"
      >
        Submit
      </Button>

      {/* {code ? (
        <Box align="center">
          <Typography variant="h6" align="center">
            Find the Output
          </Typography>
          <Box
            sx={{
              mt: "32px",
              bgcolor: "#F7F7F7",
              height: "30vh",
              p: "16px 16px 22px 16px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6">Code</Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6">
          What is the output of 2 + 2 and 5 + 9?
        </Typography>
      )}
      <Box sx={{ mt: "32px" }}>
        {options.map((item) => {
          return (
            <Paper
              elevation={3}
              sx={{
                height: "59px",
                width: "544px",
                mb: "16px",
              }}
              className={answer === item && classes.option}
              onClick={() => setAnswer(item)}
            >
              <Typography variant="body1" sx={{ p: "16px" }}>
                {item}. Poonam
              </Typography>
            </Paper>
          );
        })}
      </Box>
      <Button
        variant="contained"
        sx={{ width: "256px", p: "8px 16px 8px 16px" }}
        color={answer ? "primary" : "disable"}
        align="center"
      >
        Submit
      </Button> */}
      {/* </Box> */}
    </Container>
  );
}

export default Assessment;
