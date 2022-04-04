import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import axios from "axios";
// import { useParams } from "react-router-dom";
import ExerciseContent from "./ExerciseContent";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  CardMedia,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

function PathwayCourse() {
  const user = useSelector(({ User }) => User);
  const [course, setCourse] = useState();
  const [exerciseId, setExerciseId] = useState(0);
  const courseId = 370;
  const classes = useStyles();
  // const params = useParams();

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
    });
  }, []);

  const previousClickHandler = () => {
    setExerciseId(exerciseId - 1);
  };

  const nextClickHandler = () => {
    setExerciseId(exerciseId + 1);
  };

  console.log("course", course);
  console.log("exerciseId", exerciseId);
  const courseLength = course && course.length;

  return (
    <>
      {/* <Container maxWidth="false"> */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="background">
          <Container maxWidth="false">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <CloseIcon />
              </Typography>
              <Toolbar sx={{ flexGrow: 1, ml: { sm: 0, md: 13 } }}>
                {exerciseId !== 0 && (
                  <ArrowBackIosIcon
                    sx={{ marginRight: 3 }}
                    onClick={previousClickHandler}
                  />
                )}

                {course &&
                  course.map((exercise) => (
                    <>
                      <Link to="/">
                        <img
                          src={require("./asset/contenttype.svg")}
                          loading="lazy"
                          className={classes.contentImg}
                        />
                      </Link>
                    </>
                  ))}
                {exerciseId < courseLength - 1 && (
                  <ArrowForwardIosIcon
                    sx={{ marginLeft: 3 }}
                    onClick={nextClickHandler}
                  />
                )}
              </Toolbar>
              <Button color="inherit">English</Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <ExerciseContent exerciseId={exerciseId} />
      <Box>
        <Toolbar>
          <Button
            variant="text"
            color="primary"
            onClick={previousClickHandler}
            sx={{ flexGrow: 0 }}
          >
            Back
          </Button>
          <Button
            variant="text"
            color="primary"
            sx={{ flexGrow: 1 }}
            onClick={nextClickHandler}
          >
            Next
          </Button>
        </Toolbar>
      </Box>
      {/* </Container> */}
    </>
  );
}

export default PathwayCourse;
