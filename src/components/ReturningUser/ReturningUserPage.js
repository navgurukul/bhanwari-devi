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

const CardData = [
  {
    image: "python",
    course_Name: "Python",
    NoOfCourse: "8",
    NoOfTopic: "1",
    TopicName: "Introduction To Python",
  },
  // {
  //   image: "typeicon",
  //   course_Name: "Typing Guru",
  //   NoOfCourse: "5",
  //   NoOfTopic: "1",
  //   TopicName: "Home Row",
  // },
  // {
  //   image: "jsicon",
  //   course_Name: "Javascript",
  //   NoOfCourse: "8",
  //   NoOfTopic: "2",
  //   TopicName: "JS Variable",
  // },
];

function ReturningUserPage() {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Container maxWidth="lg" mt={2}>
        <Typography variant="h5" mb={3}>
          My Learning Tracks
        </Typography>
        <Grid container spacing={2} align="center">
          {CardData.map((item) => (
            <Grid
              onClick={() => {
                history.push(interpolatePath(PATHS.LOGIN));
              }}
              xs={4}
            >
              <Box align="right" mt={1} maxWidth={350} mb={10}>
                <Card elevation={2} pl={10}>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={2}>
                        <img
                          align="left"
                          src={require("./assets/" + item.image + ".svg")}
                          alt="Students Img"
                        />
                      </Grid>
                      <Grid item xs={4} mr={1}>
                        <Typography gutterBottom variant="subtitle1" pt={1}>
                          {item.course_Name}
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
                          {item.NoOfCourse} Courses
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
                    <Typography
                      style={{ display: "flex" }}
                      mt={2}
                      variant="body1"
                    >
                      <Typography
                        mr="10px"
                        variant="body2"
                        className={classes.courseNumber}
                      >
                        {item.NoOfTopic}
                      </Typography>
                      {item.TopicName}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
        {/* <Typography variant="h5">My Open Courses</Typography>
        <Grid sx={{ mt: 2 }} container spacing={3} align="center">
          {CardData.map((item, index) => (
            <Grid key={index} xs={12} sm={6} md={3}>
              <Link>
                <Card
                  elevation={0}
                  className={classes.pathwayCard}
                  sx={{
                    background: "#EEF1F5",
                    m: "15px",
                    height: "190px",
                  }}
                >
                  <Typography
                    align="center"
                    variant="subtitle1"
                    sx={{
                      p: "10px",
                      mt: "60px",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid> */}
      </Container>
    </>
  );
}
export default ReturningUserPage;
