import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Grid,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PreQuiz from "./PreQuiz"; 

const McDigitalCourse = ({
  pathwayCourseData,
  completedPortion,
  pathwayId,
  courseData
}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseName, setCourseName] = useState(''); 
  const [quizOpen, setQuizOpen] = useState(false);
  const history = useHistory();
  const isActive = useMediaQuery("(max-width:600px)");
  const classes = useStyles({ isActive });
  const handleCourseClick = (course) => {
    if (course.isPreQuizCompleted) { //condition for isPreQuizCompleted==="false"
      setSelectedCourse(course);
      setCourseName(course.name);
      setQuizOpen(true);
    } else {
      history.push(
        interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
          courseId: course.id,
          exerciseId: 0,
          pathwayId: pathwayId,
        })
      );
    }
  };
  
  
  
  const handleClose = () => {
    setQuizOpen(false);
  };
 

  return (
    <Box className={classes.box}>
      <Typography
        className={classes.course}
        ml={2}
        variant="h6"
        sx={{ textAlign: isActive && "center" }}
      >
        Mandatory Courses
      </Typography>

      <Grid container spacing={3} align="center">
        {pathwayCourseData.length > 0 ? (
          pathwayCourseData.map((item, index) =>
            item.isMandatory === "true" ? (
              <Grid
                item
                key={index}
                xs={12}
                md={3}
                className={classes.courseCard}
              >
                <Card
                  className={classes.pathwayCard}
                  elevation={0}
                  sx={{
                    ml: 3,
                    p: "16px",
                    mb: isActive ? "0px" : "16px",
                  }}
                  onClick={() => handleCourseClick(item)}
                >
                  <img
                    className={classes.courseImage}
                    src={item.logo}
                    alt="course"
                  />
                  <CardContent
                    sx={{
                      height: isActive ? "60px" : "70px",
                      p: isActive ? "0px" : "0px 8px 0px 0px",
                    }}
                  >
                    <div className={classes.courseTitleNumber}>
                      <Typography
                        align={isActive ? "center" : "left"}
                        variant="body2"
                        className={classes.courseName}
                        sx={{
                          mr: "10px",
                          padding: isActive ? "5px" : "5px 0 5px 13px",
                          verticalAlign: "top",
                        }}
                      >
                        {index + 1}
                      </Typography>

                      <Typography
                        align={isActive ? "center" : "left"}
                        variant="body1"
                      >
                        {item.name}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions
                    sx={{
                      height: "8px",
                      padding: "8px 8px 8px 0px",
                    }}
                  >
                    <LinearProgress
                      className={classes.progressBar}
                      variant="determinate"
                      value={parseInt(completedPortion[item.id]) || 0}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ) : null
          )
        ) : (
          <Typography>No mandatory courses available.</Typography>
        )}
      </Grid>

      <Typography
        className={classes.course}
        ml={2}
        variant="h6"
        sx={{ textAlign: isActive && "center" }}
      >
        Optional Courses
      </Typography>

      <Grid container spacing={3}>
        {pathwayCourseData.length > 0 ? (
          pathwayCourseData.map((item, index) =>
            item.isMandatory === "false" ? (
              <Grid
                item
                key={index}
                xs={12}
                md={3}
                className={classes.courseCard}
              >
                <Card
                  className={classes.pathwayCard}
                  elevation={0}
                  sx={{
                    ml: 3,
                    p: "16px",
                    mb: isActive ? "0px" : "16px",
                  }}
                  onClick={() => handleCourseClick(item)}
                >
                  <img
                    className={classes.courseImage}
                    src={item.logo}
                    alt="course"
                  />
                  <CardContent
                    sx={{
                      height: isActive ? "60px" : "70px",
                      p: isActive ? "0px" : "0px 8px 0px 0px",
                    }}
                  >
                    <div className={classes.courseTitleNumber}>
                      <Typography
                        align={isActive ? "center" : "left"}
                        variant="body2"
                        className={classes.courseName}
                        sx={{
                          mr: "10px",
                          padding: isActive ? "5px" : "5px 0 5px 13px",
                          verticalAlign: "top",
                        }}
                      >
                        {index + 1}
                      </Typography>

                      <Typography
                        align={isActive ? "center" : "left"}
                        variant="body1"
                      >
                        {item.name}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions
                    sx={{
                      height: "8px",
                      padding: "8px 8px 8px 0px",
                    }}
                  >
                    <LinearProgress
                      className={classes.progressBar}
                      variant="determinate"
                      value={parseInt(completedPortion[item.id]) || 0}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ) : null
          )
        ) : (
          <Typography>No optional courses available.</Typography>
        )}
      </Grid>

     
      <PreQuiz
        open={quizOpen}
        handleClose={handleClose}
        courseId={selectedCourse?.id}
        pathwayId={pathwayId}
        courseName={courseName} 
        courseData={courseData} 
      />
    </Box>
  );
};

export default McDigitalCourse;
