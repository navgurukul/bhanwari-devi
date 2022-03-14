import React from "react";
import {
  Typography,
  CssBaseline,
  Container,
  Button,
  Card,
  Stack,
} from "@mui/material";
import { Grid } from "@mui/material";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

function Home() {
  const isActive = useMediaQuery("(max-width:600px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.container}>
          <Container maxWidth="md">
            <Typography
              variant="h4"
              align={isActive ? "left" : "center"}
              className={!isActive && classes.heading}
              color="textPrimary"
              gutterBottom
            >
              Let income not be a barrier to your career dreams
            </Typography>
            <Typography
              variant="h6"
              align={isActive ? "left" : "center"}
              gutterBottom
            >
              With Meraki, begin your programming journey for free today
            </Typography>
            <div>
              <Grid
                sx={{ mt: 3 }}
                container
                spacing={2}
                justifyContent="center"
              >
                <Grid item>
                  <Button
                    className={
                      isActive ? classes.responsiveBtn : classes.LearningBtn
                    }
                    variant="contained"
                    color="primary"
                  >
                    Start Learning
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={
                      isActive ? classes.responsiveBtn : classes.LearningBtn
                    }
                    variant="outlined"
                    color="primary"
                  >
                    <img
                      className={classes.playstoreImg}
                      src={require("./assets/playstore.svg")}
                    />
                    <span className={classes.downloadBtn}>Download Meraki</span>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>

          {/* ********************** Section 2 ******************* */}

          <Container sx={{ mt: 4, display: { xs: "none", md: "flex" } }}>
            <Grid container>
              <Grid container item xs={4} justifyContent="flex-start">
                <Card className={classes.typingPopupCard}>
                  <CardContent>
                    <Typography color="text.secondary">
                      I want to be a typing assitant
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid container item xs={4} justifyContent="flex-end">
                <Card className={classes.engineerPopupCard}>
                  <Typography align="right" color="text.secondary">
                    I want to be the first software engineer in my family
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Container>
          <Container
            sx={{ mt: 3, display: isActive || isActiveIpad ? "none" : "flex" }}
          >
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <img src={require("./assets/graphic.svg")} />
              </Grid>
            </Grid>
          </Container>

          {/* ********************** Section 3 ******************* */}

          <Container sx={{ mt: 10 }} maxWidth="sm">
            <Typography
              variant="h5"
              component="h6"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Explore the Learning Tracks
            </Typography>
          </Container>

          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} ms={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    image={require("./assets/python.svg")}
                    alt="green iguana"
                  />
                  <CardContent className={classes.cardConten}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      align="center"
                      component="div"
                    >
                      Python
                    </Typography>
                    <Typography align="center">
                      Get familiar with programming with bite sized lessons
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} ms={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    src={require("./assets/typing.svg")}
                    alt="green iguana"
                  />
                  <CardContent className={classes.cardConten}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      align="center"
                      component="div"
                    >
                      Typing
                    </Typography>
                    <Typography align="center">
                      Learn to type with accuracy and speed
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} ms={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    image={require("./assets/web-development.svg")}
                    alt="green iguana"
                  />
                  <CardContent className={classes.cardConten}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      align="center"
                      component="div"
                    >
                      Web Development
                    </Typography>
                    <Typography align="center">
                      Learn the basics of tech that powers the web
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} ms={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    image={require("./assets/language.svg")}
                    alt="green iguana"
                  />
                  <CardContent className={classes.cardConten}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      align="center"
                      component="div"
                    >
                      English
                    </Typography>
                    <Typography align="center">
                      Master English with easy to understand courses
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} ms={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    image={require("./assets/soft-skills.svg")}
                    alt="green iguana"
                  />
                  <CardContent className={classes.cardConten}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      align="center"
                      component="div"
                    >
                      Soft Skills
                    </Typography>
                    <Typography align="center">
                      Interview preparation to get you job ready
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} ms={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    image={require("./assets/misc.svg")}
                    alt="green iguana"
                  />
                  <CardContent className={classes.cardConten}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      align="center"
                      component="div"
                    >
                      Open Courses
                    </Typography>
                    <Typography align="center">
                      Courses on Android, Game dev projects and more
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>

          {/* ********************** Section 4 ******************* */}
          <Container sx={{ mt: 10 }} maxWidth="sm">
            <Typography
              variant="h5"
              component="h6"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              How can Meraki help with your concerns?
            </Typography>
          </Container>

          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} ms={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    src={require("./assets/learn-python.svg")}
                    alt="green iguana"
                  />
                  <CardContent className={classes.cardConten}>
                    <Typography align="center">
                      How will I learn Python without a teacher?
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} ms={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    src={require("./assets/never-typed.svg")}
                    alt="green iguana"
                  />
                  <CardContent className={classes.cardConten}>
                    <Typography align="center">
                      I have never typed on a computer keyboard before
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} ms={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    src={require("./assets/difficulty-english.svg")}
                    alt="green iguana"
                  />
                  <CardContent className={classes.cardConten}>
                    <Typography align="center">
                      I face difficulty in understanding and speaking English
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} ms={6} md={4}>
                <Stack alignItems="center">
                  <img src={require("./assets/down-swirly.svg")} />
                </Stack>
                <Card>
                  <CardContent className={classes.cardConten}>
                    <Typography align="center">
                      Learn through interactive classes and self study material
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} ms={6} md={4}>
                <Stack alignItems="center">
                  <img src={require("./assets/down-swirly.svg")} />
                </Stack>
                <Card>
                  <CardContent className={classes.cardConten}>
                    <Typography align="center">
                      Get accurate and fast with our typing guru track
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} ms={6} md={4}>
                <Stack alignItems="center">
                  <img src={require("./assets/down-swirly.svg")} />
                </Stack>
                <Card>
                  <CardContent className={classes.cardConten}>
                    <Typography align="center" gutterBottom>
                      Become confident with our spoken English track
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
          {/* ********************** Section 5 ******************* */}
          <Container maxWidth="sm">
            <Stack alignItems="center">
              <img src={require("./assets/down-swirly.svg")} />
            </Stack>
            <Typography sx={{ mt: 3 }} align="center" gutterBottom>
              Our aim is to help you get technical and soft skills to become
              ready for advanced learning schools such as Zoho or Navgurukul
            </Typography>
          </Container>

          {/* ********************** Section 6 ******************* */}

          <Container maxWidth="md" sx={{ mt: 10 }}>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Our Partners
            </Typography>
            <Typography
              sx={{ mt: 4 }}
              variant="h2"
              align="center"
              color="primary"
            >
              30+
            </Typography>
            <Typography align="center" color="textPrimary" gutterBottom>
              Partners Across India
            </Typography>

            <Grid sx={{ mt: 1 }} container spacing={2}>
              <Grid item xs={2}>
                <img
                  className={classes.partner}
                  src={require("./assets/Wipro.png")}
                />
              </Grid>
              <Grid item xs={2}>
                <img
                  className={classes.partner}
                  src={require("./assets/Infosys.png")}
                />
              </Grid>
              <Grid item xs={2}>
                <img
                  className={classes.partner}
                  src={require("./assets/Milaap.png")}
                />
              </Grid>
              <Grid item xs={2}>
                <img
                  className={classes.partner}
                  src={require("./assets/Askforhope.png")}
                />
              </Grid>
              <Grid item xs={2}>
                <img
                  className={classes.partner}
                  src={require("./assets/Infosys.png")}
                />
              </Grid>
              <Grid item xs={2}>
                <img
                  className={classes.partner}
                  src={require("./assets/Milaap.png")}
                />
              </Grid>
            </Grid>

            <Typography
              sx={{ mt: 2 }}
              align="center"
              color="primary"
              gutterBottom
            >
              See all our partners
            </Typography>
          </Container>
          {/* ********************** Section 7 ******************* */}
          <Container
            maxWidth="false"
            sx={{ mt: 10, p: 6, background: "#E9F5E9" }}
          >
            <Container maxWidth="md">
              <Typography variant="h6" align="center" color="textPrimary">
                With Meraki, begin your programming journey for free today
              </Typography>

              <Grid
                sx={{ mt: 3 }}
                container
                spacing={2}
                justifyContent="center"
              >
                <Grid item>
                  <Button
                    className={
                      isActive ? classes.responsiveBtn : classes.LearningBtn
                    }
                    variant="contained"
                    color="primary"
                  >
                    Start Learning
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={
                      isActive ? classes.responsiveBtn : classes.LearningBtn
                    }
                    variant="outlined"
                    color="primary"
                  >
                    <img
                      className={classes.playstoreImg}
                      src={require("./assets/playstore.svg")}
                    />
                    <span className={classes.downloadBtn}>Download Meraki</span>
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Container>

          {/* ********************** Section 8 ******************* */}

          <Container sx={{ mt: 10 }} maxWidth="sm">
            <Typography
              variant="h5"
              component="h6"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Have Questions?
            </Typography>
            <Typography
              sx={{ mt: 5 }}
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Connect with us anytime for more information
            </Typography>

            <Grid sx={{ mt: 1 }} container spacing={2} justifyContent="center">
              <Grid item>
                <Typography align="center" color="primary" gutterBottom>
                  <span style={{ color: "#2E2E2E", fontWeight: "bold" }}>
                    Via email:
                  </span>{" "}
                  team@meraki.org
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="center" color="primary" gutterBottom>
                  <span style={{ color: "#2E2E2E", fontWeight: "bold" }}>
                    Via Whatsapp:
                  </span>{" "}
                  +91 8891300300
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    </>
  );
}

export default Home;
