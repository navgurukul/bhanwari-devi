import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Container, Box, Button } from "@mui/material";
import axios from "axios";
import { METHODS } from "../../../../services/api";
import { useParams } from "react-router-dom";
import AssessmentContent from "./AssessmentContent";
import { actions as progressTrackingActions } from "../../redux/action";
import { versionCode } from "../../../../constant";

function Assessment({
  data,
  exerciseId,
  courseData,
  setCourseData,
  setProgressTrackId,
  res,
}) {
  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const ProgressTracking = useSelector(
    ({ ProgressTracking }) => ProgressTracking
  );
  const state = useSelector((state) => {
    console.log("state1", state);
    return state;
  });

  const [answer, setAnswer] = useState(res?.selected_option);
  const [correct, setCorrect] = useState();
  const [solution, setSolution] = useState();
  const [submit, setSubmit] = useState();
  const [submitDisable, setSubmitDisable] = useState();
  const [status, setStatus] = useState();
  const [showExplaination, setShowExplaination] = useState(false);
  const [triedAgain, setTriedAgain] = useState(res?.attempt_count);
  const params = useParams();

  useEffect(() => {
    console.log(res, correct);
  }, [answer]);

  console.log("ProgressTracking", ProgressTracking);

  // useEffect(() => {
  // dispatch(
  //   progressTrackingActions.getProgressTracking({
  //     courseId: params.courseId,
  //     authToken: user.data?.token || "",
  //   })
  // );
  // }, []);

  console.log("showExplaination out side", showExplaination);

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

    console.log("triedAgain", triedAgain);
    console.log("showExplaination inside", showExplaination);

    if (triedAgain <= 1) {
      // if (showExplaination || answer == solution) {
      // call completedCourseContentIds api
      // dispatch(
      //   progressTrackingActions.getProgressTracking({
      //     courseId: params.courseId,
      //     authToken: user.data?.token || "",
      //   })
      // );
      let courseId = params.courseId;
      axios({
        method: METHODS.GET,
        url: `${process.env.REACT_APP_MERAKI_URL}/progressTracking/${courseId}/completedCourseContentIds`,
        headers: {
          "version-code": versionCode,
          accept: "application/json",
          Authorization: user.data?.token || "",
        },
      }).then((res) => {
        console.log("res in assessment", res);
        const data = res.data;

        // setProgressTrackId(data);
      });
    }

    if (answer == solution) {
      // setShowExplaination(true);
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
      }).then((res) => {
        // console.log("res", res);
      });
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
      }).then((res) => {
        // console.log("res", res);
      });
    }
  };

  useEffect(() => {
    if (res?.assessment_id === courseData.id) {
      if (res?.attempt_status === "CORRECT") {
        setAnswer(res?.selected_option);
        setCorrect(true);
        setTriedAgain(2);
        setStatus("pass");
        setSubmitDisable(true);
        setSubmit(true);
      } else if (res?.attempt_status === "INCORRECT") {
        setAnswer(res?.selected_option);
        setTriedAgain(res?.attempt_count);
        setSubmitDisable(true);
        setSubmit(true);
      }
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
            solution={solution}
            setSubmit={setSubmit}
            correct={correct}
            setTriedAgain={setTriedAgain}
            setSubmitDisable={setSubmitDisable}
            submitDisable={submitDisable}
            triedAgain={triedAgain}
            submitAssessment={submitAssessment}
            setShowExplaination={setShowExplaination}
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
                submitAssessment={submitAssessment}
                setShowExplaination={setShowExplaination}
              />
            ))
          );
        })}
    </Container>
  );
}

export default Assessment;
