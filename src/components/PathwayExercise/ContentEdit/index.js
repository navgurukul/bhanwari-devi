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

  const courseId = params.courseId;
  const exerciseId = params.exerciseId;

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
        setCourse(res.data.course.exercises[exerciseId].content);
      })
      .catch((err) => {
        console.log("error");
      });
  }, [courseId, exerciseId]);

  console.log("course", course);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {course && (
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          name="title"
          // value={courseId}
          value={course[0]?.value}
          fullWidth
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
      )}
      {course &&
        course[1]?.value.map((item) => {
          console.log("item", item);
          return (
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="title"
              value={item.value}
              fullWidth
              sx={{ marginTop: "10px", marginBottom: "10px" }}
            />
          );
        })}
      <Typography>Explanation</Typography>
      <Typography>Correct</Typography>
      {course &&
        course[3]?.value?.correct.map((item) => {
          return (
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="title"
              value={item.value}
              fullWidth
              sx={{ marginTop: "10px", marginBottom: "10px" }}
            />
          );
        })}
      <Typography>Incorrect</Typography>
      {course &&
        course[3]?.value?.incorrect.map((item) => {
          return (
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="title"
              value={item.value}
              fullWidth
              sx={{ marginTop: "10px", marginBottom: "10px" }}
            />
          );
        })}

      <Button variant="contained">Submit</Button>
    </Container>
  );
}

export default ContentEdit;
