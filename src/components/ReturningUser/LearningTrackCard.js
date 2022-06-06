import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
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
  const classes = useStyles();
  const history = useHistory();
  const [PathwayData, setPathwayData] = useState([]);

  const { item } = props;
  const pathwayId = item.pathway_id;
  useEffect(() => {
    getPathwaysCourse({ pathwayId: pathwayId }).then((res) => {
      setPathwayData(res.data);
      console.log(res.data);
    });
  }, [item]);

  return (
    <>
      <Grid
        onClick={() => {
          history.push(
            interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
              courseId: item.course_id,
              exerciseId: item.course_index,
              pathwayId: item.pathway_id,
            })
          );
        }}
        xs={4}
      >
        <Box align="right" mt={1} maxWidth={350} mb={10}>
          <Card elevation={2} pl={10}>
            <CardContent>
              <Grid container>
                <Grid item xs={2}>
                  <img
                    style={{
                      width: "55px",
                    }}
                    align="left"
                    src={PathwayData?.logo}
                    alt="Students Img"
                  />
                </Grid>
                <Grid item xs={4} mr={1}>
                  <Typography gutterBottom variant="subtitle1" pt={1}>
                    {PathwayData?.name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    mb={1}
                    color="text.secondary"
                    style={{
                      align: "right",
                      display: "flex",
                      padding: "10px 0",
                    }}
                  >
                    <img
                      src={require("./assets/Ellipse.svg")}
                      alt="Students Img"
                      style={{ marginRight: "12px" }}
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
                  className={classes.courseNumber}
                >
                  {item.course_index}
                </Typography>
                {
                  PathwayData?.courses?.find(
                    (CourseItem) => CourseItem.id === item.course_id
                  )?.name
                }
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </>
  );
}

export default LearningTrackCard;
