import React, { useEffect, useState } from "react";
import { METHODS } from "../../../services/api";
import { useSelector } from "react-redux";
import { PATHS, interpolatePath, versionCode } from "../../../constant";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";

function ContentEdit() {
  const user = useSelector(({ User }) => User);
  const params = useParams();
  const [course, setCourse] = useState([]);
  const [id, setId] = useState();
  const courseId = params.courseId;
  const exerciseId = params.exerciseId;

  console.log("params", params);

  let name = "name";
  const putApiAssessmentCall = () => {
    const stringifiedCourse = JSON.stringify(course, null, 0);
    console.log(id, stringifiedCourse, "cc");
    axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/assessment/${id}`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user.data?.token || "",
      },
      data: {
        content: stringifiedCourse,
      },
    }).then((res) => {
      console.log(res, "res");
    });
  };
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user.data?.token || "",
      },
    })
      .then((res) => {
        console.log("res", res);
        setId(res.data.course.exercises[exerciseId].id);
        setCourse(res.data.course.exercises[exerciseId].content);
      })
      .catch((err) => {
        console.log("error");
      });
  }, [courseId, exerciseId]);

  console.log("course", course);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {course &&
        course.map((e, index) => {
          if (e.component === "questionExpression") {
            return (
              <>
                <Typography>Question</Typography>
                <TextField
                  id="outlined-basic"
                  label="Question"
                  variant="outlined"
                  fullWidth
                  sx={{ marginTop: "10px", marginBottom: "10px" }}
                  value={course[index].value}
                  onChange={(e) => {
                    var temp = [...course];
                    temp[index].value = e.target.value;
                    setCourse(temp);
                  }}
                />
              </>
            );
          } else if (e.component === "questionCode") {
            return (
              <>
                <Typography>Code</Typography>
                <TextField
                  id="outlined-basic"
                  label="Code"
                  variant="outlined"
                  fullWidth
                  sx={{ marginTop: "10px", marginBottom: "10px" }}
                  value={course[index].value}
                  onChange={(e) => {
                    var temp = [...course];
                    temp[index].value = e.target.value;
                    setCourse(temp);
                  }}
                />
              </>
            );
          } else if (e.component === "options") {
            return (
              <>
                <Typography>Options</Typography>
                {e.value.map((options, optionIndex) => {
                  return (
                    <TextField
                      id="outlined-basic"
                      label="Options"
                      variant="outlined"
                      fullWidth
                      sx={{ marginTop: "10px", marginBottom: "10px" }}
                      value={options.value}
                      onChange={(e) => {
                        var temp = [...course];
                        temp[index].value[optionIndex].value = e.target.value;
                        setCourse(temp);
                      }}
                    />
                  );
                })}
              </>
            );
          } else if (e.component === "solution") {
            return (
              <>
                <Typography>Solution</Typography>
                <TextField
                  id="outlined-basic"
                  label="Solution"
                  variant="outlined"
                  fullWidth
                  sx={{ marginTop: "10px", marginBottom: "10px" }}
                  value={course[index].value}
                  onChange={(e) => {
                    var temp = [...course];
                    temp[index].value = e.target.value;
                    setCourse(temp);
                  }}
                />
              </>
            );
          } else if (e.component === "Output") {
            return Object.keys(course[index].value).map((sol, index1) => {
              return (
                <>
                  <Typography>{sol} Explaination</Typography>

                  {course[index].value[sol].map((solution, index2) => {
                    return (
                      <TextField
                        id="outlined-basic"
                        label="Output"
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: "10px", marginBottom: "10px" }}
                        value={solution.value}
                        onChange={(e) => {
                          var temp = [...course];
                          temp[index].value[sol][index2].value = e.target.value;
                          setCourse(temp);
                        }}
                      />
                    );
                  })}
                </>
              );
            });
          }
        })}
      <Button variant="contained" onClick={(e) => putApiAssessmentCall()}>
        Submit
      </Button>
    </Container>
  );
}

export default ContentEdit;
