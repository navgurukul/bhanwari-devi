import React, { useEffect } from "react";
import {
  Typography,
  CssBaseline,
  Container,
  Button,
  Card,
  Stack,
  Box,
  CardContent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectRolesData } from "../../components/User/redux/selectors";
import { actions as pathwayActions } from "../../components/PathwayCourse/redux/action";
import { Grid } from "@mui/material";
import useStyles from "./styles";
import PathwayCard from "./PathwayCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { breakpoints } from "../../theme/constant";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant";
import ExternalLink from "../../components/common/ExternalLink";
import { useHistory } from "react-router-dom";
import {
  ADMIN_ROLE_KEY as ADMIN,
  PARTNER_ROLE_KEY as PARTNER,
  STUDENT_ROLE_KEY as STUDENT,
  VOLUNTEER_ROLE_KEY as VOLUNTEER,
} from "../../components/Header/constant";
import { NavLink, useLocation } from "react-router-dom";

const pathwayData = [
  {
    title: "Python",
    code: "PRGPYT",
    image: "python",
    description: "Get familiar with programming with bite sized lessons",
  },
  {
    title: "Scratch (CEL)",
    code: "SHCEL",
    image: "scratch",
    description: "Get started with programming with block-based games",
  },
  {
    title: "Typing",
    code: "TYPGRU",
    image: "typing",
    description: "Learn to type with pinpoint accuracy and speed",
  },
  {
    title: "Spoken English",
    code: "SPKENG",
    image: "language",
    description: "Master English with easy to understand courses",
  },
  {
    title: "Javascript",
    code: "JSRPIT",
    image: "web-development",
    description: "Learn the basics of tech that powers the web",
  },
  {
    title: "Residential Programmes",
    image: "residential",
    description: "Interview preparation  to get you job ready",
  },
  {
    title: "Miscellaneous Courses",
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
  const user = useSelector(({ User }) => User);
  const roles = useSelector(selectRolesData);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");

  const classes = useStyles();
  const history = useHistory();

  const partnerGroupId = user?.data?.user?.partner_group_id;
  const partnerId = user?.data?.user?.partner_id;
  const role = user?.data?.user?.rolesList;

  const rolesLandingPages = {
    [STUDENT]: PATHS.NEW_USER_DASHBOARD,
    [ADMIN]: PATHS.PARTNERS,
    [VOLUNTEER]: PATHS.CLASS,
    [PARTNER]: partnerGroupId
      ? `${PATHS.STATE}/${partnerGroupId}`
      : `${PATHS.PARTNERS}/${partnerId}`,
  };

  let defalutPage = "/";
  roles.map((userRole) => {
    if (role?.length == 0) {
      defalutPage = "/pathway/1";
    } else if (role && userRole.key === role[0].toUpperCase()) {
      defalutPage = rolesLandingPages[userRole.key];
    }
  });

  useEffect(() => {
    history.push(defalutPage);
  }, [defalutPage]);

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
      <Grid
        sx={{ mt: isActive ? 2 : 3 }}
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid
          alignItems="right"
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: isActiveIpad ? (isActive ? "flow" : "flex") : "",
            justifyContent: isActiveIpad && "flex-end",
          }}
        >
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
        <Grid item xs={12} sm={6} md={4}>
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
          <Container maxWidth="lg">
            <Grid container>
              <Grid md={6} sx={{ padding: "64px 0px" }}>
                <Typography variant="h4">
                  India’s Premier Learning Platform for Underserved Communities
                </Typography>
                <Typography variant="body1">
                  Affordable and accessible programming education to the makers
                  of the future India
                </Typography>
                <Button
                  variant="contained"
                  sx={{ padding: "0px 70px", mt: "32px" }}
                >
                  Start Learning
                </Button>
              </Grid>
              <Grid md={6} mt="64px">
                <img
                  src={require("./assets/main_image.svg")}
                  alt={"Homeimage"}
                />
              </Grid>
            </Grid>
            <Grid container mt="80px">
              <Grid item md={4}>
                <Grid container>
                  <Grid item mt="5px">
                    <img
                      src={require("./assets/Group.svg")}
                      alt={"Homeimage"}
                      sx={{ width: "47px", height: "47px" }}
                    />
                  </Grid>
                  <Grid item marginLeft="16px">
                    <Typography variant="subtitle1">
                      Trusted by 30+ Partners
                    </Typography>
                    <Typography variant="body1">
                      Schools, NGOs and State level
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4}>
                <Grid container>
                  <Grid item mt="5px">
                    <img
                      src={require("./assets/girls.svg")}
                      alt={"Homeimage"}
                      sx={{ width: "47px", height: "47px" }}
                    />
                  </Grid>
                  <Grid item marginLeft="16px">
                    <Typography variant="subtitle1">
                      5000+ Active Students
                    </Typography>
                    <Typography variant="body1">
                      Schools, NGOs and State level
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4}>
                <Grid container>
                  <Grid item mt="12px">
                    <img
                      src={require("./assets/certificate.svg")}
                      alt={"Homeimage"}
                      sx={{ width: "47px", height: "47px" }}
                    />
                  </Grid>
                  <Grid item marginLeft="16px">
                    <Typography variant="subtitle1">
                      100+ Certificates Issued
                    </Typography>
                    <Typography variant="body1">
                      Schools, NGOs and State level
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
        <Container maxWidth="lg">
          <Grid container mt="64px" spacing={2}>
            <Grid item md={4}>
              <Box>
                <Typography variant="h5">Why Meraki?</Typography>
                <Typography variant="body1">
                  Learning with Meraki is like taking the first steps into the
                  world of tech.You can explore your interests before committing
                  to longer and often paid learning programs.
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box
                sx={{
                  background: "#FFF5CC",
                  padding: "32px",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={require("./assets/scale.svg")}
                  alt={"Homeimage"}
                  sx={{ Maxwidth: "48px", Maxheight: "50px" }}
                />
                <Typography variant="subtitle1" mt="16px">
                  Courses from the very basics
                </Typography>
                <Typography variant="body1">
                  Start from scratch and work your way through the basics
                </Typography>
              </Box>
              <Box
                sx={{
                  background: "#FFE5E3",
                  padding: "32px",
                  borderRadius: "8px",
                  marginTop: "32px",
                }}
              >
                <img
                  src={require("./assets/butterfly.svg")}
                  alt={"Homeimage"}
                  sx={{ Maxwidth: "48px", Maxheight: "50px" }}
                />
                <Typography variant="subtitle1" mt="16px">
                  Free of cost
                </Typography>
                <Typography variant="body1">
                  Meraki is free forever in line with our goal to make tech
                  education reach every underserved student in India
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box
                sx={{
                  background: "#D3EAFD",
                  padding: "32px",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={require("./assets/Layer.svg")}
                  alt={"Homeimage"}
                  sx={{ Maxwidth: "48px", Maxheight: "50px" }}
                />
                <Typography variant="subtitle1" mt="16px">
                  Live lessons from teachers
                </Typography>
                <Typography variant="body1">
                  Structured classes from each topic from people in the industry
                  to help you with every large or small concept and doubt
                </Typography>
              </Box>
              <Box
                sx={{
                  background: "#E9F5E9",
                  padding: "32px",
                  borderRadius: "8px",
                  marginTop: "32px",
                }}
              >
                <img
                  src={require("./assets/lang.svg")}
                  alt={"Homeimage"}
                  sx={{ Maxwidth: "48px", Maxheight: "50px" }}
                />
                <Typography variant="subtitle1" mt="16px">
                  Free of cost
                </Typography>
                <Typography variant="body1">
                  Meraki is free forever in line with our goal to make tech
                  education reach every underserved student in India
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>

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
          <Grid container spacing={isActive ? 2 : 4}>
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
        <Container maxWidth="lg" sx={{ marginTop: "64px" }}>
          <Typography variant="h5" textAlign="center" marginBottom="32px">
            Hear from our Users
          </Typography>
          <Grid container spacing={3}>
            <Grid item md={4}>
              <Card
                sx={{
                  padding: "32px",
                }}
              >
                <CardContent>
                  <img
                    src={require("./assets/leftquote.svg")}
                    alt={"Homeimage"}
                  />
                  <Typography variant="body1">
                    Last week, I had a thrilling blind experiences. It was a
                    dish I had never tasted. Made a lasting friend with the
                    chef.
                  </Typography>
                  <img
                    src={require("./assets/doublequote.svg")}
                    alt={"Homeimage"}
                    align="right"
                  />
                  <Box sx={{ align: "center" }}>
                    <img
                      src={require("./assets/user6.png")}
                      alt={"Homeimage"}
                      sx={{
                        marginLeft: "0px",
                        marginRight: "0px",
                        display: "block",
                        width: "50%",
                      }}
                    />
                    <Typography variant="subtitle1">Eleanor Pena</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card
                sx={{
                  padding: "32px",
                }}
              >
                <img
                  src={require("./assets/leftquote.svg")}
                  alt={"Homeimage"}
                />
                <Typography variant="body1">
                  Last week, I had a thrilling blind experiences. It was a dish
                  I had never tasted. Made a lasting friend with the chef.
                </Typography>
                <img
                  src={require("./assets/doublequote.svg")}
                  alt={"Homeimage"}
                  align="right"
                />
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card
                sx={{
                  padding: "32px",
                }}
              >
                <img
                  src={require("./assets/leftquote.svg")}
                  alt={"Homeimage"}
                />
                <Typography variant="body1">
                  Last week, I had a thrilling blind experiences. It was a dish
                  I had never tasted. Made a lasting friend with the chef.
                </Typography>
                <img
                  src={require("./assets/doublequote.svg")}
                  alt={"Homeimage"}
                  align="right"
                />
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Section 5 */}

        {/* Section 8  */}

        {
          <Container
            sx={{ mt: isActive ? 3 : 6, mb: isActive ? 3 : 6 }}
            maxWidth="sm"
          >
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
              sx={{ mt: isActive ? 2 : 3 }}
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
                      Via Email:{" "}
                    </span>

                    <ExternalLink
                      style={{
                        textDecoration: "none",
                        color: "#48a145",
                        fontStyle: "normal",
                      }}
                      href="mailto:merakilearn@navgurukul.org"
                    >
                      merakilearn@navgurukul.org
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
                      href="https://wa.me/918891300300"
                    >
                      {" "}
                      +91 8891300300
                    </ExternalLink>
                  </address>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        }
      </main>
    </>
  );
}
export default Home;
