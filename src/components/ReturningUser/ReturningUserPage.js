import React, { useEffect, useState } from "react";
import { Typography, Container, Card, CardContent, Box } from "@mui/material";
import { Grid } from "@mui/material";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";

function ReturningUserPage() {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg" mt={2}>
        <Typography variant="h5" mb={3}>
          My Learning Tracks
        </Typography>
        <Grid container spacing={2} align="center">
          <Grid xs={4}>
            <Box align="right" mt={1} maxWidth={350} mb={10}>
              <Card elevation={2} pl={10}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={2}>
                      <img
                        align="left"
                        src={require("./assets/python.svg")}
                        alt="Students Img"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography gutterBottom variant="subtitle1" pt={1}>
                        Python
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        mb={1}
                        color="text.secondary"
                        style={{
                          display: "flex",
                          padding: "10px 0",
                        }}
                      >
                        <img
                          src={require("./assets/Ellipse.svg")}
                          alt="Students Img"
                          style={{ marginRight: "12px" }}
                        />
                        8 Courses
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
                      // align={isActive ? "center" : "left"}
                      mr="10px"
                      variant="body2"
                      className={classes.courseNumber}
                    >
                      1
                    </Typography>
                    Introduction To Python
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box align="right" mt={1} maxWidth={350} mb={10}>
              <Card elevation={2} pl={10}>
                <CardContent>
                  <Grid container align="left">
                    <Grid item xs={2}>
                      <img
                        src={require("./assets/typeicon.svg")}
                        alt="Students Img"
                      />
                    </Grid>
                    <Grid item xs={4} mr={1}>
                      <Typography gutterBottom variant="subtitle1" pt={1}>
                        Typing Guru
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body1"
                        mb={1}
                        color="text.secondary"
                        style={{
                          display: "flex",
                          padding: "10px 0",
                        }}
                      >
                        <img
                          src={require("./assets/Ellipse.svg")}
                          alt="Students Img"
                          style={{ marginRight: "12px" }}
                        />
                        5 Courses
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
                      // align={isActive ? "center" : "left"}
                      variant="body2"
                      mr="10px"
                      className={classes.courseNumber}
                    >
                      1
                    </Typography>
                    Home Row
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box align="right" mt={1} maxWidth={350} mb={10}>
              <Card elevation={2} pl={10}>
                <CardContent>
                  <Grid container align="left">
                    <Grid item xs={2}>
                      <img
                        src={require("./assets/jsicon.svg")}
                        alt="Students Img"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography gutterBottom variant="subtitle1" pt={1}>
                        Javascript
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body1"
                        mb={1}
                        color="text.secondary"
                        style={{
                          display: "flex",
                          padding: "10px 0",
                        }}
                      >
                        <img
                          src={require("./assets/Ellipse.svg")}
                          alt="Students Img"
                          style={{ marginRight: "12px" }}
                        />
                        8 Courses
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
                      // align={isActive ? "center" : "left"}
                      variant="body2"
                      mr="10px"
                      className={classes.courseNumber}
                    >
                      2
                    </Typography>
                    JS Variables
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h5">My Open Courses</Typography>
      </Container>
    </>
  );
}
export default ReturningUserPage;
