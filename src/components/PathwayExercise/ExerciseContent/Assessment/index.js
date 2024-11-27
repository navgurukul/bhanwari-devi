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
  exerciseSlugId,
  courseData,
  setCourseData,
  setProgressTrackId,
  res,
  triger,
  setTriger,
  lang,
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

  const submitAssessment = (isCorrect) => {
    const correctStr = isCorrect ? "Pass" : "Fail";
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
      setTriedAgain(triedAgain + 2);
    } else {
      setTriedAgain(triedAgain + 1);
    }
    axios({
      method: METHODS.POST,
      url: `${process.env.REACT_APP_MERAKI_URL}/assessment/slug/complete`,
      headers: {
        accept: "application/json",
        Authorization:
          user?.data?.token || localStorage.getItem("studentAuthToken"),
      },
      data: [
        {
          // assessment_id: exerciseId,
          slug_id: exerciseSlugId,
          selected_option: answer,
          status: correctStr,
          course_id: +params.courseId,
          lang: lang,
        },
      ],
    })
      .then((res) => {})
      .catch((err) => {});
    setCorrect(isCorrect);
    setStatus(correctStr);
    setSubmitDisable(true);
    setTriger(!triger);
  };

  console.log(data);
  useEffect(() => {
    // adding a nullish coalescing operator (??), so that the null value can not effect on the assessment.
    // if (res?.assessment_id === (courseData ?? {}).id) {
    if (res?.slug_id === (courseData ?? {}).slug_id) {
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
      } else if (res?.attempt_status === "PARTIALLY_CORRECT") {
        setAnswer(res?.selected_option);
        setTriedAgain(res?.attempt_count);
        setSubmitDisable(true);
        setSubmit(true);
      } else if (res?.attempt_status === "PARTIALLY_INCORRECT") {
        setAnswer(res?.selected_option);
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
  // console.log("data", data);

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
          disabled={!answer?.length}
          onClick={submitAssessment}
        >
          Submit
        </Button>
      </Box>

      {data &&
        submit &&
        data?.map((content) => {
          let dataArr = [];
          if (
            data[2]?.type === "single" ||
            data[2]?.assessment_type === "single"
          ) {
            dataArr =
              content?.value && correct
                ? content?.value?.correct
                : content?.value?.incorrect;
          } else if (
            data[2]?.type === "multiple" ||
            data[2]?.assessment_type === "multiple"
          ) {
            dataArr =
              content?.value && res?.attempt_status === "PARTIALLY_CORRECT"
                ? content?.value?.partially_correct
                : content?.value &&
                  res?.attempt_status === "PARTIALLY_INCORRECT"
                ? content?.value?.partially_incorrect
                : content?.value && res?.attempt_status === "CORRECT"
                ? content?.value?.correct
                : content?.value?.incorrect;
          }

          return (
            content?.component === "output" &&
            dataArr?.map((content, index) => (
              <AssessmentContent
                finalDesicion={res?.attempt_status}
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
