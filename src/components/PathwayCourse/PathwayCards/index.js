import React, { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";
import Chip from "@mui/material/Chip";
import {
  Container,
  Box,
  Grid,
  Card,
  Stack,
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
import useStyles from "../styles";
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
    const classes = useStyles();
    const isActive = useMediaQuery(
      "(max-width:" + breakpoints.values.sm + "px)"
    );
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
          className={classes.UpcomingCard}
          elevation={2}
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
          style={{
            minWidth: isActive ? "290px" : "350",
            marginRight: isActive ? "500px" : "40px",
          }}
        >
          <Box
            sx={{
              borderTop: 5,
              color:
                item.type === "batch" ||
                item.type === "revision" ||
                item.type === "cohort"
                  ? "primary.main"
                  : "secondary.main",
            }}
          />

          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              className={classes.cardContent}
            >
              <Typography variant="body1" gutterBottom>
                {item.sub_title || item.title}
              </Typography>
              <Chip
                label={item.type}
                variant="caption"
                sx={
                  item.type === "batch" ||
                  item.type === "revision" ||
                  item.type === "cohort"
                    ? {
                        borderRadius: { xs: 25, sm: 15 },
                        height: { xs: 34, sm: 25 },
                        backgroundColor: "primary.light",
                        color: "primary.dark",
                        "&:hover": {
                          backgroundColor: "primary.light",
                          color: "primary.dark",
                          "&:hover": {
                            backgroundColor: "primary.light",
                          },
                        },
                      }
                    : {
                        borderRadius: { xs: 25, sm: 15 },
                        height: { xs: 34, sm: 25 },
                        // fontSize: "11px",
                        backgroundColor: "secondary.light",
                        color: "secondary.dark",
                      }
                }
              />
            </Stack>
            <Grid container spacing={1}>
              <Grid item xs={2} md={3}>
                <Typography variant="body2">
                  {format(item.start_time, "dd MMM yy")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">{language[item.lang]}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <>
      <Container maxWidth="lg">
        <Typography mb={2} mt={2} variant="h6">
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
