import React, { useEffect, useState } from "react";
import { METHODS } from "../../../services/api";
import { useSelector } from "react-redux";
import { PATHS, interpolatePath, versionCode } from "../../../constant";
import axios from "axios";
import { useParams } from "react-router-dom";
import useStyles from "../styles";
import {
  Container,
  TextField,
  TextareaAutosize,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import "./styles.scss";

function ContentEdit() {
  const user = useSelector(({ User }) => User);
  const params = useParams();
  const [course, setCourse] = useState([]);
  const [id, setId] = useState();
  const [courseType, setCourseType] = useState();
  const courseId = params.courseId;
  const exerciseId = params.exerciseId;
  const classes = useStyles();

  console.log("params", params);

  let name = "name";
  const putApiExercisesCall = () => {
    const stringifiedCourse = JSON.stringify(course, null, 0);
    console.log(id, stringifiedCourse, "cc");
    axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/exercises/${id}`,
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
  const putApiAssessmentCall = () => {
    //delete the component which value is empty string or empty list
    const needToBeRemovedIndex = [];
    for (var i in course) {
      if (course[i].value.length === 0) {
        needToBeRemovedIndex.push(i);
      }
    }
    for (var index of needToBeRemovedIndex) {
      course.splice(index, 1);
    }
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
        const course_type = res.data.course.exercises[exerciseId].content_type;
        setCourseType(course_type);
        if (course_type === "assessment") {
          if (
            res.data.course.exercises[exerciseId].content[0].component !==
            "questionExpression"
          ) {
            res.data.course.exercises[exerciseId].content.splice(0, 0, {
              component: "questionExpression",
              type: "python",
              title: "",
              value: "",
            });
          }
          if (
            res.data.course.exercises[exerciseId].content[1].component !==
            "questionCode"
          ) {
            res.data.course.exercises[exerciseId].content.splice(1, 0, {
              component: "questionCode",
              type: "python",
              title: "",
              value: "",
            });
          }
        }
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
      {courseType === "assessment" ? (
        <>
          {course &&
            course.map((e, index) => {
              if (e.component === "questionExpression") {
                return (
                  <Box>
                    <Typography>Question</Typography>
                    {/* <TextField
                      id="outlined-basic"
                      // label="Question"
                      variant="outlined"
                      fullWidth
                      sx={{ marginTop: "10px", marginBottom: "10px" }}
                      value={course[index].value}
                      onChange={(e) => {
                        var temp = [...course];
                        temp[index].value = e.target.value;
                        setCourse(temp);
                      }}
                    /> */}
                    <TextareaAutosize
                      aria-label="empty textarea"
                      fullWidth
                      placeholder="Question"
                      color="primary"
                      // className="area"
                      // className={classes.textarea}
                      style={{
                        width: 529,
                        margin: "10px 0px",
                        padding: "20px 10px",
                        border: "1px solid #BDBDBD",
                        fontSize: "1.125rem",
                        color: "#2E2E2E",
                        fontFamily: "Noto Sans",
                      }}
                      value={course[index].value}
                      onChange={(e) => {
                        var temp = [...course];
                        temp[index].value = e.target.value;
                        setCourse(temp);
                      }}
                    />
                  </Box>
                );
              } else if (e.component === "questionCode") {
                return (
                  <Box>
                    <Typography>Code</Typography>
                    <TextField
                      id="outlined-basic"
                      label="Code"
                      variant="outlined"
                      fullWidth
                      // className={classes.editField}
                      sx={{ marginTop: "10px", marginBottom: "10px" }}
                      value={course[index].value}
                      onChange={(e) => {
                        var temp = [...course];
                        temp[index].value = e.target.value;
                        setCourse(temp);
                      }}
                    />
                  </Box>
                );
              } else if (e.component === "options") {
                return (
                  <Box>
                    <Typography>Options</Typography>
                    {e.value.map((options, optionIndex) => {
                      return (
                        <TextField
                          id="outlined-basic"
                          label={`Option ${optionIndex + 1}`}
                          variant="outlined"
                          fullWidth
                          // className={classes.editField}
                          sx={{ marginTop: "10px", marginBottom: "10px" }}
                          value={options.value}
                          onChange={(e) => {
                            var temp = [...course];
                            temp[index].value[optionIndex].value =
                              e.target.value;
                            setCourse(temp);
                          }}
                        />
                      );
                    })}
                  </Box>
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
                      // className={classes.editField}
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
              } else if (e.component === "output") {
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
                            // className={classes.editField}
                            sx={{ marginTop: "10px", marginBottom: "10px" }}
                            value={solution.value}
                            onChange={(e) => {
                              var temp = [...course];
                              temp[index].value[sol][index2].value =
                                e.target.value;
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
        </>
      ) : (
        <>
          {course &&
            course.map((e, index) => {
              if (e.component === "header") {
                return (
                  <>
                    <Typography>Header</Typography>
                    <TextField
                      id="outlined-basic"
                      label="Header"
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
              } else if (e.component === "code") {
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
              } else if (e.component === "text") {
                return (
                  <>
                    <Typography>Text</Typography>

                    <TextField
                      id="outlined-basic"
                      label="Text"
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
              } else if (e.component === "youtube") {
                return (
                  <>
                    <Typography>Youtube</Typography>

                    <TextField
                      id="outlined-basic"
                      label="Youtube"
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
              } else if (e.component === "image") {
                return (
                  <>
                    <Typography>Image</Typography>

                    <TextField
                      id="outlined-basic"
                      label="Image"
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
              }
            })}

          <Button variant="contained" onClick={(e) => putApiExercisesCall()}>
            Submit
          </Button>
        </>
      )}
    </Container>
  );
}

export default ContentEdit;
