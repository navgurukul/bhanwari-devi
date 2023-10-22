import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  CssBaseline,
  Container,
  Button,
  Card,
  Box,
  CardContent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectRolesData } from "../../components/User/redux/selectors";
import { actions as pathwayActions } from "../../components/PathwayCourse/redux/action";
import { Grid } from "@mui/material";
import { getQueryVariable } from "../../common/utils";
import useStyles from "./styles";
import PathwayCard from "./PathwayCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";

import { actions as userActions } from "../../components/User/redux/action";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant";
import ExternalLink from "../../components/common/ExternalLink";
import { useHistory } from "react-router-dom"; import { axios } from "axios";
import { Redirect } from "react-router-dom";
import { METHODS } from "../../services/api";
import { PATHWAYS_INFO } from "../../constant";
import { StateContext } from "../../common/stateContext";
import {
  ADMIN_ROLE_KEY as ADMIN,
  PARTNER_ROLE_KEY as PARTNER,
  STUDENT_ROLE_KEY as STUDENT,
  VOLUNTEER_ROLE_KEY as VOLUNTEER,
} from "../../components/Header/constant";


function Home(props) {
  const isActive = useMediaQuery("(max-width:600px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.Pathways);
  const user = useSelector(({ User }) => User);
  const roles = useSelector(selectRolesData);
  const history = useHistory();
  const { locationState, setlocationState } = useContext(StateContext);
  const [queryString, setqueryString] = useState(null);
  const rolesList = user !== null && user?.user?.rolesList;
  const isAuthenticated = user && user?.data?.isAuthenticated;
  const updateQueryString = (value) => {
    setqueryString(value);
  };
  const pathway = useSelector((state) => state.Pathways);

  const [loggedOut, setLoggedOut] = useState(localStorage.getItem("loggedOut"))
  const [isFirstLogin, setIsFirstLogin] = useState(localStorage.getItem("isFirstLogin"))
  useEffect(() => {
    console.log(props.location.state?.from, "The props");

    if (props.location.state?.from) {
      setlocationState(props.location.state?.from?.pathname)
    }
    if (localStorage.getItem("locationState")) {
      setlocationState(JSON.parse(localStorage.getItem("locationState")))
    }
    // console.log(isAuthenticated, "is auth")
  }, [])
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let tokenVal = urlParams?.get("token");
    localStorage.setItem("token", reverseLastFiveChars(tokenVal))
  }, [])

  function reverseLastFiveChars(inputString) {
    if (inputString?.length < 5) {
      // If the string has less than 5 characters, return it as it is
      return inputString;
    }

    // Split the string into an array of characters
    const charArray = inputString?.split('');

    // Reverse the last five characters
    const reversedChars = charArray?.slice(-5).reverse();

    // Join the reversed characters with the rest of the string
    return charArray?.slice(0, -5).concat(reversedChars).join('');
  }


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let tokenVal = urlParams?.get("token");
    localStorage.setItem("token", reverseLastFiveChars(tokenVal))
    let token = localStorage.getItem("token");

    if (tokenVal !== null) {
      dispatch(userActions.onUserSignin((tokenVal)));
      dispatch(
        pathwayActions.getPathways({
          authToken: user,
        })
      );

      updateQueryString(getQueryVariable("referrer"));
    }
  }, [])

  function reverseLastFiveChars (str){
    if (str?.length < 5) {
      return str;
  }else{ 
    const charArray = str?.slice(-5);
    return str?.slice(0, str?.length-5).concat(charArray?.split("").reverse().join(""))
  }
  }

  useEffect(() => {
    dispatch(
      pathwayActions.getPathways({
        authToken: user,
      })
    );
  }, [dispatch, user]);

  const miscellaneousPathway = data?.pathways.filter((pathway) =>
    PATHWAYS_INFO.some((miscPathway) => pathway.name === miscPathway.name)
  );
  const pathwayData = data?.pathways
    .filter((pathway) => !miscellaneousPathway.includes(pathway))
    .concat(miscellaneousPathway);

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

  const pythonPathway =
    pathway.data &&
    pathway.data.pathways.find((pathway) => pathway.code === "PRGPYT");
  const pythonPathwayId = pythonPathway && pythonPathway.id;

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


  if (isAuthenticated) {
    
    localStorage.setItem("isFirstLogin", false);
    if (queryString) {
      axios({
        method: METHODS.PUT,
        url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
        headers: {
          accept: "application/json",
          Authorization: data.token,
        },
        data: { referrer: queryString },
      }).then((res) => { 
      });
    }
    if (props.location.state == "/volunteer-with-us") {
      if (rolesList.includes("volunteer")) {
        return <Redirect to={PATHS.CLASS} />;
      } else {
        return <Redirect to={PATHS.VOLUNTEER_FORM} />;
      }
    }
    if (locationState) {
      return <Redirect to={locationState} />;
    }
    return (
      <>
        {pythonPathwayId && (
          <Redirect
            to={rolesLandingPages[rolesList[0]] || rolesLandingPages?.default}
          />
        )}
      </>
    );
  }
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
                  sx={{ margin: "16px 0px 32px 0px" }}>
                  Affordable and accessible programming education to the makers
                  of the future India
                </Typography>
                <a href={locationState ? `https://accounts.navgurukul.org?q=${locationState}&loggedOut=${loggedOut}&isFirstLogin=${isFirstLogin}` : `https://accounts.navgurukul.org/?loggedOut=${loggedOut}&isFirstLogin=${isFirstLogin}`}>
                  {/* <Link to={PATHS.LOGIN} className={classes.link}> */}
                  <Button
                    variant="contained"
                    className={
                      isActive ? classes.responsiveBtn : classes.LearningBtn
                    }>
                    Start Learning
                  </Button>
                  {/* </Link> */}
                </a>
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
                }}>
                <img
                  src={require("./assets/scale.svg")}
                  alt={"Homeimage"}
                  sx={{ Maxwidth: "48px", Maxheight: "50px" }}
                />
                <Typography variant="subtitle1" mt="16px">
                  Courses from the very basics
                </Typography>
                <Typography variant="body1" mt={1}>
                  Start from scratch and work your way through the basics
                </Typography>
              </Box>
              <Box
                sx={{
                  background: "#FFE5E3",
                  padding: "32px",
                  borderRadius: "8px",
                  marginTop: "32px",
                }}>
                <img
                  src={require("./assets/butterfly.svg")}
                  alt={"Homeimage"}
                  sx={{ Maxwidth: "48px", Maxheight: "50px" }}
                />
                <Typography variant="subtitle1" mt="16px">
                  Free of cost
                </Typography>
                <Typography variant="body1" mt={1}>
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
                }}>
                <img
                  src={require("./assets/livelessons.svg")}
                  alt={"Homeimage"}
                  sx={{ Maxwidth: "48px", Maxheight: "50px" }}
                />
                <Typography variant="subtitle1" mt="16px">
                  Live lessons from teachers
                </Typography>
                <Typography variant="body1" mt={1}>
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
                }}>
                <img
                  src={require("./assets/lang.svg")}
                  alt={"Homeimage"}
                  sx={{ Maxwidth: "48px", Maxheight: "50px" }}
                />
                <Typography variant="subtitle1" mt="16px">
                  In multiple regional languages
                </Typography>
                <Typography variant="body1" mt={1}>
                  Learn in your own mother tongue with clarity while also
                  developing your English skills with our program
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
            gutterBottom>
            Explore the Learning Tracks
          </Typography>
        </Container>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={isActive ? 2 : 4}>
            {pathwayData?.map((item) => (
              <Grid item xs={12} ms={6} md={4}>
                <PathwayCard
                  id={item.id}
                  name={item.name}
                  description={item.sub_description}
                  logo={item.logo}
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
                align="center">
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
                align="center">
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
                align="center">
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
          maxWidth="sm">
          <Typography
            variant="h5"
            component="h6"
            align="center"
            color="textPrimary">
            Have Questions?
          </Typography>
          <Grid
            marginTop="1px"
            display={isActive && "block"}
            container
            spacing={4}
            align="center"
            justifyContent="center">
            <Grid item sm={isActive && 12}>
              <ExternalLink
                style={{
                  textDecoration: "none",
                  color: "#48a145",
                  fontStyle: "normal",
                }}
                href="mailto:team@meraki.org">
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
                href="https://wa.me/918891300300">
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
