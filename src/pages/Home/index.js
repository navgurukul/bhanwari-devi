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
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DraftsIcon from "@mui/icons-material/Drafts";

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
    image: "typeing",
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
    image: "misce",
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
  const user = useSelector(({ User }) => User);
  const roles = useSelector(selectRolesData);
  const history = useHistory();

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
    <>
      <CssBaseline />
      <main>
        {/* section 1 */}

        <div className={isActive ? classes.mobileContainer : classes.container}>
          <Container maxWidth="lg">
            <Grid container>
              <Grid md={6} sm={12}>
                <Typography variant="h4">
                  India’s Premier Learning Platform for Underserved Communities
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ margin: "16px 0px 32px 0px" }}
                >
                  Affordable and accessible programming education to the makers
                  of the future India
                </Typography>
                <Link to={PATHS.LOGIN} className={classes.link}>
                  <Button
                    variant="contained"
                    className={
                      isActive ? classes.responsiveBtn : classes.LearningBtn
                    }
                  >
                    Start Learning
                  </Button>
                </Link>
              </Grid>
              <Grid md={6} mt={isActive ? "16px" : "0px"} sm={12}>
                <img
                  src={require("./assets/main_image.svg")}
                  alt={"Homeimage"}
                  heigh={isActive ? "228px" : "413px"}
                  width={isActive ? "328px" : "592px"}
                />
              </Grid>
            </Grid>

            {/* section 2 */}

            <Grid container mt={isActive ? "16px" : "48px"} spacing={4}>
              <Grid item md={4}>
                <Grid container spacing={2}>
                  <Grid item md={2} xs={2} mt="5px">
                    <img
                      src={require("./assets/Group.svg")}
                      alt={"Homeimage"}
                      sx={{ width: "47px", height: "47px" }}
                    />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <Typography variant="subtitle1">
                      Trusted by 9+ Partners
                    </Typography>
                    <Typography variant="body1" pt="6px">
                      For our hybrid and free online learning approach
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4}>
                <Grid container spacing={2}>
                  <Grid item mt="5px" md={2} xs={2}>
                    <img
                      src={require("./assets/girls.svg")}
                      alt={"Homeimage"}
                      sx={{ width: "47px", height: "47px" }}
                    />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <Typography variant="subtitle1">
                      9000+ Active Students
                    </Typography>
                    <Typography variant="body1" pt="8px">
                      From all corners of India taking first step in tech world
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4}>
                <Grid container md={12} spacing={2}>
                  <Grid item mt="8px" md={2} xs={2}>
                    <img
                      src={require("./assets/Layer.svg")}
                      alt={"Homeimage"}
                      sx={{ width: "47px", height: "47px" }}
                    />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <Typography variant="subtitle1">
                      5+ Monthly Mentor Sessions
                    </Typography>
                    <Typography variant="body1" pt="8px">
                      For direct interaction with industry experts at Amazon
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>

        {/* section 3 */}

        <Container maxWidth="lg">
          <Grid container mt={isActive ? "32px" : "64px"} spacing={4}>
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
                  src={require("./assets/livelessons.svg")}
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

        {/* section 4 */}

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

        {/* Section 5 */}

        <Container maxWidth="lg" sx={{ marginTop: "64px" }}>
          <Typography variant="h5" textAlign="center" marginBottom="32px">
            Hear from our Users
          </Typography>
          <Grid container spacing={4}>
            <Grid item md={4}>
              <Card
                sx={{
                  padding: "16px",
                }}
                align="center"
              >
                <CardContent align="left">
                  <Box height="250px !important">
                    <img
                      src={require("./assets/leftquote.svg")}
                      alt={"Homeimage"}
                    />
                    <Typography variant="body1">
                      I learned python very well from meraki-classes. The class
                      was brilliant. Meraki classes provide us all session of
                      python classes. It is very usefull in future. so Thank you
                      for providing us for free classes.
                    </Typography>
                    <img
                      src={require("./assets/doublequote.svg")}
                      alt={"Homeimage"}
                      align="right"
                    />
                  </Box>
                </CardContent>

                <Box p="16px">
                  <img
                    src={require("./assets/user-3.png")}
                    alt={"Homeimage"}
                    height="100px !important"
                    width="100px !important"
                    style={{ borderRadius: "50%" }}
                  />
                  <Typography variant="subtitle1">
                    Rudresh Bhaleshwar
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card
                sx={{
                  padding: "16px",
                }}
                align="center"
              >
                <CardContent align="left">
                  <Box height="250px">
                    <img
                      src={require("./assets/leftquote.svg")}
                      alt={"Homeimage"}
                    />
                    <Typography variant="body1">
                      I took Meraki classes so I learned lot of things about
                      programming like python and learn how codes are execute .
                      So after taking Meraki classes I learnt more about
                      programming how it's work in application .
                    </Typography>
                    <img
                      src={require("./assets/doublequote.svg")}
                      alt={"Homeimage"}
                      align="right"
                    />
                  </Box>
                </CardContent>
                <Box p="16px">
                  <img
                    src={require("./assets/user-2.png")}
                    alt={"Homeimage"}
                    height="100px !important"
                    width="100px !important"
                    style={{ borderRadius: "50%" }}
                  />
                  <Typography variant="subtitle1">Durganand Sahu</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card
                sx={{
                  padding: "16px",
                }}
                align="center"
              >
                <CardContent align="left">
                  <Box height="250px">
                    <img
                      src={require("./assets/leftquote.svg")}
                      alt={"Homeimage"}
                    />
                    <Typography variant="body1">
                      I have enjoyed learning python in Meraki class. The
                      teachers were teaching greatly. I thank thank to Sainath
                      sir and Meraki class for doing available these python
                      classes.
                    </Typography>
                    <img
                      src={require("./assets/doublequote.svg")}
                      alt={"Homeimage"}
                      align="right"
                    />
                  </Box>
                </CardContent>
                <Box p="16px">
                  <img
                    src={require("./assets/user-1.png")}
                    alt={"Homeimage"}
                    height="100px !important"
                    width="100px !important"
                    style={{ borderRadius: "50%" }}
                  />
                  <Typography variant="subtitle1">Gayatri Panchal</Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Section 6 */}

        <Container
          sx={{ mt: isActive ? 3 : 6, mb: isActive ? 3 : 6 }}
          maxWidth="sm"
        >
          <Typography
            variant="h5"
            component="h6"
            align="center"
            color="textPrimary"
          >
            Have Questions?
          </Typography>

          <Grid
            marginTop="1px"
            display={isActive && "block"}
            container
            spacing={4}
            align="center"
            justifyContent="center"
          >
            <Grid item sm={isActive && 12}>
              <ExternalLink
                style={{
                  textDecoration: "none",
                  color: "#48a145",
                  fontStyle: "normal",
                }}
                href="mailto:team@meraki.org"
              >
                <img
                  // className={classes.playstoreImg}
                  src={require("./assets/Email.svg")}
                  alt="Google Playstore Icon"
                  height="32px !important"
                  width="32px !important"
                />

                <Typography variant="subtitle1">team@meraki.org</Typography>
              </ExternalLink>
            </Grid>
            <Grid item sm={isActive && 12}>
              <ExternalLink
                style={{
                  textDecoration: "none",
                  color: "#48a145",
                  fontStyle: "normal",
                }}
                href="https://wa.me/918891300300"
              >
                <img
                  // className={classes.playstoreImg}
                  src={require("./assets/whatsapp.svg")}
                  alt="Google Playstore Icon"
                  height="32px"
                  width="32px"
                />
                <Typography variant="subtitle1"> +91 8891300300</Typography>
              </ExternalLink>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}
export default Home;
