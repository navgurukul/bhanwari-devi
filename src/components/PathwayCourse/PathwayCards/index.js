import React, { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";
import Chip from "@mui/material/Chip";
import { lang as language } from "../../../constant";
import {
  Container,
  Box,
  Grid,
  Card,
  Button,
  CardContent,
  Typography,
} from "@mui/material";
import { interpolatePath, PATHS } from "../../../constant";
import { format } from "../../../common/date";
import { getCourseContent } from "../../Course/redux/api";
import { useSelector } from "react-redux";
import { versionCode } from "../../../constant";
import { useHistory } from "react-router-dom";
const PathwayCards = (props) => {
  // const language = {
  //   hi: "Hindi",
  //   en: "English",
  //   mr: "Marathi",
  // };

  // const language ;

  const history = useHistory();
  const language = {
    hi: "Hindi",
    en: "English",
    mr: "Marathi",
  };
  const { userEnrolledClasses, data } = props;
  console.log(userEnrolledClasses);
  function UpcomingClassCardComponent({ item }) {
    const user = useSelector(({ User }) => User);
    const [classIndex, setClassIndex] = React.useState(0);
    useEffect(() => {
      const courseId = item.course_id;
      getCourseContent({ courseId, versionCode, user }).then((res) => {
        const index = res.data.course.exercises.findIndex(
          (ex) => ex.id === item.exercise_id
        );
        setClassIndex(index + 1);
      });
    }, []);
    return (
      <Grid item xs={12} sm={4} md={4}>
        <Card
          onClick={() => {
            console.log("clicked");
            history.push(
              interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                courseId: item.course_id,
                exerciseId: classIndex,
                pathwayId: item.pathway_id,
              })
            );
          }}
          style={{ minWidth: "300px", margin: "10px" }}
        >
          <Box
            sx={{
              borderTop: 5,
              color: item.type === "batch" ? "forestgreen" : "forestgreen",
            }}
          />

          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={6} md={8}>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Chip
                  label={item.type}
                  variant="caption"
                  sx={
                    item.type === "batch"
                      ? {
                          borderRadius: { xs: 25, sm: 15 },
                          height: { xs: 34, sm: 25 },
                          // fontSize: "11px",
                          backgroundColor: "primary.light",
                          color: "primary.dark",
                          "&:hover": {
                            backgroundColor: "primary.light",
                          },
                        }
                      : {
                          borderRadius: { xs: 25, sm: 15 },
                          height: { xs: 34, sm: 25 },
                          // fontSize: "11px",
                          backgroundColor: "primary.light",
                          color: "primary.dark",
                        }
                  }
                />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={8} md={5}>
                <Typography variant="body2">
                  {format(item.start_time, "dd MMM yy")}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2">
                  <li>{language[item.lang]}</li>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <>
      <Container maxWidth="xl">
        <Typography mb={2} mt={2} variant="h5">
          Upcoming Classes
        </Typography>

        <div
          className="pathway-enrolledClass-cards"
          style={{
            display: "flex",
            maxWidth: "100%",
            overflowX: "scroll",
          }}
        >
          {userEnrolledClasses?.slice(0, 3).map((item) => {
            return (
              <>
                <UpcomingClassCardComponent item={item} />
              </>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default PathwayCards;
