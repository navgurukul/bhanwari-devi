import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Box, Button } from "@mui/material";
import axios from "axios";
import { METHODS } from "../../../../services/api";
import { useParams } from "react-router-dom";
import AssessmentContent from "./AssessmentContent";

function Assessment({
  data,
  exerciseId,
  courseData,
  setCourseData,
  setProgressTrackId,
  res,
  triger,
  setTriger,
}) {
  const user = useSelector(({ User }) => User);

  const [answer, setAnswer] = useState([]);
  const [correct, setCorrect] = useState();
  const [solution, setSolution] = useState();
  const [submit, setSubmit] = useState();
  const [submitDisable, setSubmitDisable] = useState();
  const [status, setStatus] = useState();
  const [triedAgain, setTriedAgain] = useState(res?.attempt_count);
  const params = useParams();
  const [type, setType] = useState("single");
  const [wrongAnswer, setWrongAnswer] = useState();

  // Assessment submit handler
  const isValuesCorrect = (value1, value2) => {
    if (value1?.length !== value2?.length) {
      return false; // Lengths are different, so they are not the same
    }

    for (let i = 0; i < value1?.length; i++) {
      if (!value2?.includes(value1[i]?.value)) {
        // if (value1[i]?.value !== value2[i]) {
        return false; // Elements are different, so they are not the same
      }
    }

    return true; // Length and elements match, so they are the same
  };

  const isCorrect = isValuesCorrect(solution, answer);

  const calculateSelections = () => {
    let correctSelections = 0;
    let incorrectSelections = 0;

    answer &&
      answer.forEach((option) => {
        const isCorrect = solution?.some(
          (correctOption) => correctOption?.value === option
        );
        if (isCorrect) {
          correctSelections++;
        } else {
          incorrectSelections++;
        }
      });

    return { correctSelections, incorrectSelections };
  };

  const { correctSelections, incorrectSelections } = calculateSelections();

  // implementing this logic to check if the answer is partially correct or not

  const [finalDesicion, setFinalDesicion] = useState("");

  useEffect(() => {
    if (answer?.length > 1) {
      if (answer?.length == 3) {
        if (correctSelections == 3 && incorrectSelections == 0) {
          setFinalDesicion("correct");
        } else if (correctSelections == 2 && incorrectSelections == 1) {
          setFinalDesicion("partially incorrect");
        } else if (correctSelections == 1 && incorrectSelections == 2) {
          setFinalDesicion("partially correct");
        }
      } else if (answer.length == 2) {
        if (correctSelections == 2 && incorrectSelections == 0) {
          setFinalDesicion("correct");
        } else if (correctSelections == 0 && incorrectSelections == 2) {
          setFinalDesicion("incorrect");
        } else if (correctSelections == 1 && incorrectSelections == 1) {
          setFinalDesicion("partially correct");
        }
      }
    }
  }, [answer, correctSelections, incorrectSelections]);

  console.log(finalDesicion, "finalDesicion1");

  const submitAssessment = (isCorrect) => {
    setSubmit(true);

    // Commented this API to test if progress tracking is working fine now

    // axios({
    //   method: METHODS.POST,
    //   url: `${process.env.REACT_APP_MERAKI_URL}/progressTracking/learningTrackStatus`,
    //   headers: {
    //     accept: "application/json",
    //     Authorization: user.data?.token || "",
    //   },
    //   data: {
    //     pathway_id: params.pathwayId,
    //     course_id: params.courseId,
    //     exercise_id: courseData.id,
    //   },
    // });
    if (isCorrect) {
      setCorrect(true);
      setStatus("Pass");
      setTriedAgain(triedAgain + 2);
      setSubmitDisable(true);
      axios({
        method: METHODS.POST,
        // url: `${process.env.REACT_APP_MERAKI_URL}/assessment/student/result`,
        url: `${process.env.REACT_APP_MERAKI_URL}/assessment/student/result/v2`,
        headers: {
          accept: "application/json",
          Authorization: user.data.token,
        },
        data: {
          assessment_id: exerciseId,
          // selected_option: answer,
          selected_multiple_option: answer,
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
        // url: `${process.env.REACT_APP_MERAKI_URL}/assessment/student/result`,
        url: `${process.env.REACT_APP_MERAKI_URL}/assessment/student/result/v2`,
        headers: {
          accept: "application/json",
          Authorization: user.data.token,
        },
        data: {
          assessment_id: exerciseId,
          // selected_option: answer,
          selected_multiple_option: answer,
          status: "Fail",
        },
      }).then((res) => {
        // console.log("res", res);
      });
    }
    setTriger(!triger);
  };

  useEffect(() => {
    if (res?.assessment_id === courseData.id) {
      if (res?.attempt_status === "CORRECT") {
        // replaced selected_option with selected_multiple_option
        // setAnswer([res?.selected_option]);
        setAnswer([res?.selected_multiple_option]);
        setCorrect(true);
        setTriedAgain(2);
        setStatus("pass");
        setSubmitDisable(true);
        setSubmit(true);
      } else if (res?.attempt_status === "INCORRECT") {
        setAnswer([res?.selected_multiple_option]);
        // setFinalDesicion("incorrect");
        // setAnswer([res?.selected_option]);
        setTriedAgain(res?.attempt_count);
        setSubmitDisable(true);
        setSubmit(true);
      } else if (res?.attempt_status === "PARTIALLY_CORRECT") {
        setAnswer([res?.selected_multiple_option]);
        // setFinalDesicion("partially correct");
        // setAnswer([res?.selected_option]);
        setTriedAgain(res?.attempt_count);
        setSubmitDisable(true);
        setSubmit(true);
      } else if (res?.attempt_status === "PARTIALLY_INCORRECT") {
        setAnswer([res?.selected_multiple_option]);
        // setFinalDesicion("partially incorrect");
        // setAnswer([res?.selected_option]);
        setTriedAgain(res?.attempt_count);
        setSubmitDisable(true);
        setSubmit(true);
      }
    }
  }, [res, triedAgain]);

  const handleOptionClick = (id) => {
    if (!submitDisable) {
      if (answer.includes(id)) {
        // Item is already selected, so remove it
        setAnswer(answer.filter((itemId) => itemId !== id));
      } else {
        // Item is not selected, so add it
        setAnswer([...answer, id]);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ align: "center", m: "40px 0 62px 0" }}>
      {data &&
        data.map((content) => (
          <AssessmentContent
            // finalDesicion={finalDesicion}
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
            params={params}
            type={type}
            setType={setType}
            handleOptionClick={handleOptionClick}
            setWrongAnswer={setWrongAnswer}
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
        data?.map((content) => {
          let dataArr = [];
          if (data[2]?.type === "single") {
            dataArr =
              content?.value && correct
                ? content?.value?.correct
                : content?.value?.incorrect;
          } else if (data[2]?.type === "multiple") {
            dataArr =
              content?.value && finalDesicion == "partially correct"
                ? content?.value?.partially_correct
                : content?.value && finalDesicion == "partially incorrect"
                ? content?.value?.partially_incorrect
                : content?.value && finalDesicion == "correct"
                ? content?.value?.correct
                : content?.value?.incorrect;
          }

          return (
            content?.component === "output" &&
            dataArr?.map((content, index) => (
              <AssessmentContent
                finalDesicion={finalDesicion}
                content={content}
                Partially_ans={dataArr[0]}
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
                type={type}
                setType={setType}
                handleOptionClick={handleOptionClick}
                setWrongAnswer={setWrongAnswer}
              />
            ))
          );
        })}
    </Container>
  );
}

export default Assessment;
