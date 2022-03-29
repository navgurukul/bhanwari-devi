import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import axios from "axios";
import PathwayCourseContent from "./PathwayCourseContent";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

function PathwayCourse() {
  const user = useSelector(({ User }) => User);
  const [course, setCourse] = useState();
  const courseId = 370;

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises`,
      headers: {
        "version-code": 40,
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      console.log("res", res.data.course.exercises[0].content);
      setCourse(res.data.course.exercises);
      // setPathways(res.data.pathways);
    });
  }, []);

  console.log("course", course);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <CloseIcon />
            </Typography>
            <Toolbar sx={{ flexGrow: 1 }}>
              <ArrowBackIosIcon sx={{ marginRight: 3 }} />
              {course &&
                course.map((exercise) => (
                  <Typography variant="h6" component="div" sx={{ margin: 1 }}>
                    {exercise.id}
                    {console.log("exercise", exercise)}
                  </Typography>
                ))}
              <ArrowForwardIosIcon sx={{ marginLeft: 3 }} />
            </Toolbar>
            <Button color="inherit">English</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <PathwayCourseContent />
    </>
  );
}

export default PathwayCourse;
