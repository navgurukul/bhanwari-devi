import React, { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";
import Chip from "@mui/material/Chip";
import CircleIcon from "@mui/icons-material/Circle";
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
import { Link, useHistory } from "react-router-dom";

import useStyles from "../styles";
const PathwayCards = (props) => {
  // const language = {
  //   hi: "Hindi",
  //   en: "English",
  //   mr: "Marathi",
  // };

  // const language ;
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const history = useHistory();
  const language = {
    hi: "Hindi",
    en: "English",
    mr: "Marathi",
  };
  const { userEnrolledClasses, data } = props;

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
          (ex) => ex.id === item.id
        );

        setClassIndex(index);
      });
    }, []);
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Link
          style={{
            textDecoration: "none",
          }}
          to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
            courseId: item.course_id,
            exerciseId: classIndex,
            pathwayId: item.pathway_id,
          })}
        >
          <Card
            className={classes.UpcomingCard}
            elevation={2}
            // onClick={() => {
            //   history.push(
            //     interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
            //       courseId: item.course_id,
            //       exerciseId: classIndex,
            //       pathwayId: item.pathway_id,
            //     })
            //   );
            // }}
            style={{
              minWidth: isActive ? "95%" : "350",
              marginRight: isActive ? "500px" : "40px",
              marginLeft: isActive ? "5px" : "15px",
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
                <Grid item xs={4} md={3}>
                  <Typography
                    style={{ color: "#6D6D6D", fontSize: "13px" }}
                    variant="body2"
                  >
                    {format(item.start_time, "dd MMM yy")}
                  </Typography>
                </Grid>
                <CircleIcon
                  style={{
                    color: "#6D6D6D",
                    width: "4px",
                    height: "4px",
                    marginTop: "16px",
                    left: "66px",
                  }}
                />
                <Grid item>
                  <Typography
                    // aman this style should be in the css file and refactor it
                    style={{ color: "#6D6D6D", fontSize: "13px", pl: "30px" }}
                    variant="body2"
                  >
                    {language[item.lang]}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    );
  }

  return (
    <>
      <Container style={{ padding: "0" }} maxWidth="lg">
        <Typography
          style={{ marginLeft: isActive ? "5px" : "15px" }}
          mb={2}
          mt={2}
          variant="h6"
        >
          Upcoming Classes
        </Typography>

        <div
          className="pathway-enrolledClass-cards"
          style={{
            display: "flex",
            maxWidth: "100%",
            overflowX: "scroll",
            paddingBottom: "10px",
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
