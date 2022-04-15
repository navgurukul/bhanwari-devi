import React, { useEffect, useState } from "react";
import {
  Typography,
  CssBaseline,
  Container,
  Button,
  Card,
  Stack,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { actions as pathwayActions } from "../../components/PathwayCourse/redux/action";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid } from "@mui/material";
import useStyles from "./styles";
import PathwayCard from "./PathwayCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant";
import ExternalLink from "../../components/common/ExternalLink";

const pathwayData = [
  {
    title: "Python",
    code: "PRGPYT",
    image: "python",
    description: "Get familiar with programming with bite sized lessons",
  },
  {
    title: "Typing",
    code: "TYPGRU",
    image: "typing",
    description: "Learn to type with pinpoint accuracy and speed.",
  },
  {
    title: "Web Development",
    code: "JSRPIT",
    image: "web-development",
    description: "Learn the basics of tech that powers the web",
  },
  {
    title: "English",
    code: "SPKENG",
    image: "language",
    description: "Get familiar with programming with bite sized lessons",
  },
  {
    title: "Residential Programmes",
    image: "residential",
    description: "Interview preparation  to get you job ready",
  },
  {
    title: "Open Courses",
    image: "misc",
    description: "Courses on Android, Game dev projects and more",
  },
];

const merakiConcerns = [
  {
    image: "learn-python",
    description: "How will I learn Python without a teacher?",
  },
  {
    image: "never-typed",
    description: "I have never typed on a computer keyboard before",
  },
  {
    image: "difficulty-english",
    description: "I face difficulty in understanding and speaking English",
  },
];

const concernsText = [
  {
    description: "Learn through interactive classes and self study material",
  },
  {
    description: "I have never typed on a computer keyboard before",
  },
  {
    description: "I face difficulty in understanding and speaking English",
  },
];

function MerakiEntry(props) {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  return (
    <div>
      <Typography
        color="textPrimary"
        align="center"
        gutterBottom
        {...props.headingAttr}
      >
        With Meraki, begin your programming journey for free today
      </Typography>
      <Grid sx={{ mt: 3 }} container spacing={2} justifyContent="center">
        <Grid alignItems="right" item xs={12} ms={12} md={4}>
          <Link to={PATHS.LOGIN} className={classes.link}>
            <Button
              className={isActive ? classes.responsiveBtn : classes.LearningBtn}
              variant="contained"
              color="primary"
            >
              Start Learning
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} ms={12} md={4}>
          <Button
            className={isActive ? classes.responsiveBtn : classes.LearningBtn}
            variant="outlined"
            color="primary"
            target="_blank"
            href="https://play.google.com/store/apps/details?id=org.merakilearn"
          >
            <img
              className={classes.playstoreImg}
              src={require("./assets/playstore.svg")}
              alt="Google Playstore Icon"
            />
            <span className={classes.downloadBtn}>Download Meraki</span>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

function Home() {
  const isActive = useMediaQuery("(max-width:600px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.Pathways);

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  data &&
    data.pathways &&
    data.pathways.forEach((pathway) => {
      pathwayData.forEach((item) => {
        if (pathway.code === item.code) {
          item["id"] = pathway.id;
        }
      });
    });

  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.container}>
          <Container maxWidth="md">
            <Typography
              variant="h4"
              align="center"
              className={!isActive && classes.heading}
              color="textPrimary"
              gutterBottom
            >
              Let income not be a barrier to your career dreams
            </Typography>
            <MerakiEntry
              headingAttr={{
                variant: "h6",
              }}
            />
          </Container>

          {/* Section 2  */}

          <Container sx={{ mt: 4, display: { xs: "none", md: "flex" } }}>
            <Grid container justifyContent="space-between">
              <Grid container item xs={4} justifyContent="flex-start">
                <Card elevation={2} className={classes.typingPopupCard}>
                  <Typography variant="body1" color="text.secondary">
                    I want to be a typing assistant
                  </Typography>
                </Card>
              </Grid>
              <Grid container item xs={4} justifyContent="flex-end">
                <Card elevation={2} className={classes.engineerPopupCard}>
                  <Typography
                    align="right"
                    variant="body1"
                    color="text.secondary"
                  >
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

          {/* Section 3  */}

          <Container sx={{ mt: 8 }} maxWidth="sm">
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
              {pathwayData.map((item) => (
                <Grid item xs={12} ms={6} md={4}>
                  <PathwayCard
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    hover={true}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>

          {/* Section 4 */}
          <Container sx={{ mt: 8 }} maxWidth="sm">
            <Typography
              variant="h5"
              component="h6"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              How can Meraki help you?
            </Typography>
          </Container>
          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
              {merakiConcerns.map((item, index) => (
                <Grid item xs={12} ms={6} md={4}>
                  <PathwayCard
                    image={item.image}
                    description={item.description}
                    hover={false}
                  />
                  <Stack sx={{ mt: 2 }} alignItems="center">
                    <img src={require("./assets/down-swirly.svg")} />
                  </Stack>
                  <Box sx={{ mt: 3 }}>
                    <PathwayCard
                      description={concernsText[index].description}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>

          {/* Section 5 */}
          <Container maxWidth="sm">
            <Stack sx={{ mt: 2 }} alignItems="center">
              <img src={require("./assets/down-swirly.svg")} />
            </Stack>
            <Typography sx={{ mt: 3 }} align="center" gutterBottom>
              Our aim is to help you get technical and soft skills to become
              ready for advanced learning schools such as Zoho or Navgurukul
            </Typography>
          </Container>
          {/* Section 6  */}

          <Container maxWidth="md" sx={{ mt: 9 }}>
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
            {/* <Grid sx={{ mt: 1 }} container spacing={2}>
              {[
                "Wipro",
                "Infosys",
                "Milaap",
                "Askforhope",
                "Infosys",
                "Milaap",
              ].map((partnerName, _, partnerArr) => (
                <Grid item xs={Math.floor(12 / partnerArr.length)}>
                  <img
                    className={classes.partner}
                    src={require("./assets/" + partnerName + ".png")}
                    alt={partnerName}
                  />
                </Grid>
              ))}
            </Grid> */}
            <Stack sx={{ mt: 3 }} alignItems="center">
              <Button href={PATHS.OUR_PARTNER}>
                See all our partners
                <ArrowForwardIosIcon sx={{ padding: "2px" }} />
              </Button>
            </Stack>
          </Container>
          {/* Section 7  */}
          <Container
            maxWidth="false"
            className={isActive ? classes.ResMerakiEntry : classes.MerakiEntry}
            sx={{ p: 5, background: "#E9F5E9" }}
          >
            <Container maxWidth="md">
              <MerakiEntry
                headingAttr={{
                  variant: "h5",
                }}
              />
            </Container>
          </Container>

          {/* Section 8  */}

          <Container sx={{ mt: 6, mb: 6 }} maxWidth="sm">
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
              sx={{ mt: 3 }}
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Connect with us anytime for more information
            </Typography>
            <Grid sx={{ mt: 1 }} container spacing={2} justifyContent="center">
              <Grid item>
                <Typography align="center" color="primary" gutterBottom>
                  <address
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <span
                      style={{
                        color: "#2E2E2E",
                        fontWeight: "bold",
                        fontStyle: "normal",
                      }}
                    >
                      Via email:{" "}
                    </span>

                    <ExternalLink
                      style={{
                        textDecoration: "none",
                        color: "#48a145",
                        fontStyle: "normal",
                      }}
                      href="mailto:team@meraki.org"
                    >
                      team@meraki.org
                    </ExternalLink>
                  </address>
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="center" color="primary" gutterBottom>
                  <address>
                    <span
                      style={{
                        color: "#2E2E2E",
                        fontWeight: "bold",
                        fontStyle: "normal",
                      }}
                    >
                      Via Whatsapp:
                    </span>
                    <ExternalLink
                      style={{
                        textDecoration: "none",
                        color: "#48a145",
                        fontStyle: "normal",
                      }}
                      href="tel:+918891300300"
                    >
                      {" "}
                      +91 8891300300
                    </ExternalLink>
                  </address>
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
