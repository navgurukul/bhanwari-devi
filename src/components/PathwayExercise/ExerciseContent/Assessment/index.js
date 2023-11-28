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
    let correctSelection = "correct";
    let incorrectSelection = "incorrect";
    let partiallyCorrectSelection = "partially correct";
    let partiallyIncorrectSelection = "partially incorrect";
    if (answer?.length > 1) {
      if (answer?.length === 4) {
        if (correctSelections === 1 && incorrectSelections === 3) {
          setFinalDesicion(partiallyCorrectSelection);
        } else if (correctSelections === 2 && incorrectSelections === 2) {
          setFinalDesicion(partiallyCorrectSelection);
        } else if (correctSelections === 3 && incorrectSelections === 1) {
          setFinalDesicion(partiallyIncorrectSelection);
        } else if (correctSelections === 4 && incorrectSelections === 0) {
          setFinalDesicion(correctSelection);
        } else if (correctSelections === 0 && incorrectSelections === 4) {
          setFinalDesicion(incorrectSelection);
        }
      } else if (answer?.length === 3) {
        if (correctSelections === 3 && incorrectSelections === 0) {
          setFinalDesicion(correctSelection);
        } else if (correctSelections === 2 && incorrectSelections === 1) {
          setFinalDesicion(partiallyIncorrectSelection);
        } else if (correctSelections === 1 && incorrectSelections === 2) {
          setFinalDesicion(partiallyCorrectSelection);
        }
      } else if (answer.length === 2) {
        if (correctSelections === 2 && incorrectSelections === 0) {
          setFinalDesicion(correctSelection);
        } else if (correctSelections === 0 && incorrectSelections === 2) {
          setFinalDesicion(incorrectSelection);
        } else if (correctSelections === 1 && incorrectSelections === 1) {
          setFinalDesicion(partiallyCorrectSelection);
        }
      }
    } else {
      if (solution?.length > 1) {
        if (correctSelections === 1) {
          setFinalDesicion(partiallyCorrectSelection);
        } else {
          setFinalDesicion(incorrectSelection);
        }
      } else {
        if (answer?.[0] === solution?.[0]?.value) {
          setFinalDesicion(correctSelection);
        } else {
          setFinalDesicion(incorrectSelection);
        }
      }
    }
  }, [answer, correctSelections, incorrectSelections, triedAgain, solution]);

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
        url: `${process.env.REACT_APP_MERAKI_URL}/assessment/student/result/v2`,
        headers: {
          accept: "application/json",
          Authorization:
            user?.data?.token || localStorage.getItem("studentAuthToken"),
        },
        data: {
          assessment_id: exerciseId,
          selected_multiple_option: answer,
          status: "Pass",
        },
      })
        .then((res) => {
          // console.log("res", res);
        })
        .catch((err) => {});
    } else {
      setCorrect(false);
      setStatus("Fail");
      setTriedAgain(triedAgain + 1);
      setSubmitDisable(true);
      axios({
        method: METHODS.POST,
        url: `${process.env.REACT_APP_MERAKI_URL}/assessment/student/result/v2`,
        headers: {
          accept: "application/json",
          Authorization:
            user?.data?.token || localStorage.getItem("studentAuthToken"),
        },
        data: {
          assessment_id: exerciseId,
          selected_multiple_option: answer,
          status: "Fail",
        },
      })
        .then((res) => {
          // console.log("res", res);
        })
        .catch((err) => {});
    }
    setTriger(!triger);
  };

  useEffect(() => {
    // adding a nullish coalescing operator (??), so that the null value can no effect on the assessment.
    if (res?.assessment_id === (courseData ?? {}).id) {
      if (res?.attempt_status === "CORRECT") {
        setAnswer(res?.selected_multiple_option);
        setCorrect(true);
        setTriedAgain(2);
        setStatus("pass");
        setSubmitDisable(true);
        setSubmit(true);
      } else if (res?.attempt_status === "INCORRECT") {
        setAnswer(res?.selected_multiple_option);
        setTriedAgain(res?.attempt_count);
        setSubmitDisable(true);
        setSubmit(true);
      } else if (res?.attempt_status === "PARTIALLY_CORRECT") {
        setAnswer(res?.selected_multiple_option);
        setTriedAgain(res?.attempt_count);
        setSubmitDisable(true);
        setSubmit(true);
      } else if (res?.attempt_status === "PARTIALLY_INCORRECT") {
        setAnswer(res?.selected_multiple_option);
        setTriedAgain(res?.attempt_count);
        setSubmitDisable(true);
        setSubmit(true);
      }
    }
  }, [res, triedAgain]);

  // const handleOptionClick = (id) => {
  //   if (!submitDisable) {
  //     if (answer.includes(id)) {
  //       // Item is already selected, so remove it
  //       setAnswer(answer.filter((itemId) => itemId !== id));
  //     } else {
  //       // Item is not selected, so add it
  //       setAnswer([...answer, id]);
  //     }
  //   }
  // };

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
            params={params}
            type={type}
            setType={setType}
            setWrongAnswer={setWrongAnswer}
          />
        ))}

      <Box textAlign="center" sx={{ display: submitDisable && "none" }}>
        <Button
          variant="contained"
          sx={{ width: "256px", p: "8px 16px 8px 16px" }}
          color={answer ? "primary" : "secondary"}
          disabled={answer.length === 0 ? true : false}
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
              content?.value && finalDesicion === "partially correct"
                ? content?.value?.partially_correct
                : content?.value && finalDesicion === "partially incorrect"
                ? content?.value?.partially_incorrect
                : content?.value && finalDesicion === "correct"
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
                setWrongAnswer={setWrongAnswer}
              />
            ))
          );
        })}
    </Container>
  );
}

export default Assessment;
