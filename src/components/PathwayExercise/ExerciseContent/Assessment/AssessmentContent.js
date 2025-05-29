import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Button, Paper, Stack } from "@mui/material";
import useStyles from "../../styles";
import get from "lodash/get";
import { Radio, Checkbox, FormControlLabel, RadioGroup } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DOMPurify from "dompurify";
// import { fi } from "date-fns/locale";
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
  type,
  setType,
  Partially_ans,
  setWrongAnswer,
  finalDesicion,
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
        const Partially_retry = DOMPurify.sanitize(get(Partially_ans, "value"));
        return (
          <>
            {submit && finalDesicion && finalDesicion !== "CORRECT" ? (
              <UnsafeHTML
                Container={Typography}
                variant="body1"
                html={Partially_retry}
              />
            ) : (
              ""
            )}

            <Grid container spacing={2} mt={1} mb={10}>
              {/* <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  disabled
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
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    setAnswer([]);
                    setSubmit();
                    setSubmitDisable();
                  }}
                >
                  <Typography variant="subtitle2">Re-try</Typography>
                </Button>
              </Grid>
            </Grid>
          </>
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
  if (content.component === "image") {
    const image = DOMPurify.sanitize(get(content, "value"));

    const isImage = image.match(/\.(jpeg|jpg|gif|png)$/);

    if (isImage) {
      return <img src={image} alt="Image" />;
    }

    return (
      <UnsafeHTML
        Container={Typography}
        sx={{ m: "2rem 0", fontWeight: 700, fontSize: "1.2rem" }}
        variant="body1"
        html={image}
      />
    );
  }
  if (content.component === "options") {
    return (
      <Box sx={{ m: "32px 0px" }}>
        <Grid container spacing={2}>
          {Object.values(content.value).map((item, index) => {
            const text = DOMPurify.sanitize(item.value);
            const isChecked = answer?.includes(item.id);
            const isRadioChecked =
              answer?.length === 1 && answer?.includes(item.id);

            const isValuePresent = solution?.some(
              (sitem) => sitem.value === item.id
            );
            return (
              <>
                <Grid item xs={item.option_type !== "image" ? 12 : 6}>
                  <Paper
                    elevation={0}
                    sx={{
                      height: "auto",
                      cursor: submit ? "default" : "pointer",
                      p: "4px",
                    }}
                    className={
                      submit && triedAgain > 1
                        ? isValuePresent
                          ? answer?.includes(item.id)
                            ? classes.userSelectedCorrect
                            : classes.correctAnswer   //commented out to remove the green color from the correct answer after the 2nd attemt.we will retrive it once android will have the same.
                          : answer?.includes(item.id)
                          ? classes.inCorrectAnswer
                          : ""
                        : submit &&
                          answer?.includes(item.id) &&
                          classes.greishOption
                    }
                  >
                    <Stack direction="row" gap={1}>
                      <FormControlLabel
                        sx={{ marginLeft: "8px" }}
                        className={submit ? classes.cursorA : classes.cursorP}
                        control={
                          type === "single" ? (
                            submit ? (
                              answer?.includes(item.id) && isValuePresent ? (
                                <Radio
                                  checked={isRadioChecked}
                                  onChange={() => {}}
                                  checkedIcon={<CheckCircleIcon />}
                                />
                              ) : answer?.includes(item.id) &&
                                triedAgain > 1 ? (
                                <CancelIcon
                                  sx={{
                                    marginBlock: "9px",
                                    color: "red",
                                    marginLeft: 1,
                                    marginRight: 1,
                                  }}
                                />
                              ) : (
                                <Radio
                                  checked={isRadioChecked}
                                  disabled={submit}
                                  onChange={() => {
                                    if (!submit) {
                                      setAnswer([item.id]);
                                    }
                                  }}
                                />
                              )
                            ) : (
                              <Radio
                                checked={isRadioChecked}
                                disabled={submit}
                                onChange={() => {
                                  if (!submit) {
                                    setAnswer([item.id]);
                                  }
                                }}
                              />
                            )
                          ) : submit ? (
                            answer?.includes(item.id) &&
                            isValuePresent &&
                            triedAgain > 1 ? (
                              <Checkbox
                                checked={isChecked}
                                onChange={() => {}} //this is for not changing the state
                                checkedIcon={<CheckCircleIcon />}
                                className={
                                  submit ? classes.cursorA : classes.cursorP
                                }
                              />
                            ) : answer?.includes(item.id) && triedAgain > 1 ? (
                              <CancelIcon
                                sx={{
                                  marginBlock: "9px",
                                  color: "red",
                                  marginLeft: 1,
                                  marginRight: 1,
                                }}
                              />
                            ) : (
                              <Checkbox
                                checked={isChecked}
                                onChange={() => {
                                  if (!submit) {
                                    const updatedAnswer = isChecked
                                      ? answer.filter((id) => id !== item.id)
                                      : [...answer, item.id];
                                    setAnswer(updatedAnswer);
                                  }
                                }}
                                className={
                                  submit ? classes.cursorA : classes.cursorP
                                }
                              />
                            )
                          ) : (
                            <Checkbox
                              checked={isChecked}
                              disabled={submit}
                              onChange={() => {
                                if (!submit) {
                                  const updatedAnswer = isChecked
                                    ? answer.filter((id) => id !== item.id)
                                    : [...answer, item.id];
                                  setAnswer(updatedAnswer);
                                }
                              }}
                              className={
                                submit ? classes.cursorA : classes.cursorP
                              }
                            />
                          )
                        }
                        label={
                          item.option_type !== "image" ? (
                            <UnsafeHTML
                              Container={Typography}
                              variant="body1"
                              html={text}
                            />
                          ) : (
                            <img
                              src={text}
                              className={classes.optionImg}
                              alt="Your Alt Text"
                            />
                          )
                        }
                      />
                    </Stack>
                  </Paper>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Box>
    );
  }
  if (content.component === "solution") {
    setSolution(content?.correct_options_value);
    setType(content?.type);
    setWrongAnswer();
  }
  return "";
};
export default AssessmentContent;
