import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  CardActionArea,
  CardMedia,
  Card,
  CardContent,
  Box,
  Link,
} from "@mui/material";
import { Grid } from "@mui/material";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import { useHistory } from "react-router-dom";
import { interpolatePath, PATHS } from "../../constant";
import { getPathwaysCourse } from "../PathwayCourse/redux/api";
const CardData = {
  1: {
    image: "python",
    course_Name: "Python",
    NoOfCourse: "8",
    NoOfTopic: "1",
    TopicName: "Introduction To Python",
  },
  2: {
    image: "typeicon",
    course_Name: "Typing Guru",
    NoOfCourse: "5",
    NoOfTopic: "1",
    TopicName: "Home Row",
  },
  3: {
    image: "jsicon",
    course_Name: "Javascript",
    NoOfCourse: "8",
    NoOfTopic: "2",
    TopicName: "JS Variable",
  },
};
const CardDatas = {
  1: {},
};
function LearningTrackCard(props) {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");
  const classes = useStyles();
  const history = useHistory();
  const [PathwayData, setPathwayData] = useState([]);
  const [courseIndex, setCourseIndex] = useState(0);
  const { item } = props;
  const pathwayId = item.pathway_id;
  useEffect(() => {
    getPathwaysCourse({ pathwayId: pathwayId }).then((res) => {
      setPathwayData(res.data);
    });
    console.log(PathwayData);
    const COurseIndex = PathwayData?.courses?.findIndex((course, index) => {
      if (course.course_id === item.course_id) {
        return index;
      }
    });
    setCourseIndex(COurseIndex);
  }, [item]);

  return (
    <>
      <Grid
        onClick={() => {
          history.push(
            interpolatePath(PATHS.PATHWAY_COURSE, {
              pathwayId: item.pathway_id,
            })
          );
        }}
        xs={isActive ? 12 : isActiveIpad ? 6 : 4}
      >
        <Grid
          align="right"
          mt={1}
          maxWidth={350}
          mb={2}
          flexDirection="column"
          className={classes.courseCard}
        >
          <Card elevation={2} pl={10}>
            <CardActionArea>
              <CardContent>
                <Grid container mb={1} maxHeight={60}>
                  <Grid item>
                    <img
                      style={{
                        width: "55px",
                      }}
                      // align="left"
                      src={PathwayData?.logo}
                      alt="Students Img"
                    />
                  </Grid>
                  <Grid item mx={2}>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      pt={1}
                      maxWidth={75}
                    >
                      {PathwayData?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="body1"
                      mb={1}
                      color="text.secondary"
                      style={{
                        align: "left",
                        display: "flex",
                        padding: "10px 0",
                      }}
                    >
                      <img
                        src={require("./assets/Ellipse.svg")}
                        alt="Students Img"
                        style={{ margin: "0px 4px" }}
                      />
                      {PathwayData?.courses?.length} Courses
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  variant="body1"
                  mb={1}
                  style={{
                    display: "flex",
                  }}
                >
                  Ongoing Course
                </Typography>
                <Typography style={{ display: "flex" }} mt={2} variant="body1">
                  <Typography
                    mr="10px"
                    variant="body2"
                    // className={classes.courseNumber}
                  >
                    {/* {courseIndex} */}
                  </Typography>
                  {
                    PathwayData?.courses?.find(
                      (CourseItem) => CourseItem.id === item.course_id
                    )?.name
                  }
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default LearningTrackCard;
