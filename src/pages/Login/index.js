import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { actions as userActions } from "../../components/User/redux/action";
import { PATHS, interpolatePath } from "../../constant";
import { getQueryVariable } from "../../common/utils";
import Loader from "../../components/common/Loader";
import { METHODS } from "../../services/api";
import { actions as pathwayActions } from "../../components/PathwayCourse/redux/action";
// ../PathwayCourse/redux/action
import { Typography, Container, Grid, Stack, Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import GoogleIcon from "./assets/GoogleIcon";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";

function Login(props) {
  const [queryString, setqueryString] = useState(null);
  const dispatch = useDispatch();
  const pathway = useSelector((state) => state.Pathways);
  const updateQueryString = (value) => {
    setqueryString(value);
  };

  const { loading, data } = useSelector(({ User }) => User);
  const rolesList = data !== null && data.user.rolesList;
  const isAuthenticated = data && data.isAuthenticated;

  function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let { id_token: idToken } = googleUser.getAuthResponse();

    const googleData = {
      id: profile.getId(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
      idToken,
    };
    // let's send the data to our backend.
    dispatch(userActions.onUserSignin(googleData));
    updateQueryString(getQueryVariable("referrer"));
    // dispatch(userActions.onUserUpdate(referrer));
  }

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  const classes = useStyles();
  // const isActive = useMediaQuery("(max-width:600px)");
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const onGoogleLoginFail = (errorResponse) => {
    // eslint-disable-next-line no-console
    console.log("onGoogle login fail", errorResponse);
  };

  let pythonPathwayId;
  pathway.data &&
    pathway.data.pathways.forEach((pathway) => {
      if (pathway.code === "PRGPYT") pythonPathwayId = pathway.id;
    });

  const rolesLandingPages = {
    volunteer: PATHS.CLASS,
    admin: PATHS.PARTNERS,
    partner: PATHS.PARTNERS,
    default: interpolatePath(PATHS.PATHWAY_COURSE, {
      pathwayId: pythonPathwayId,
    }),
  };

  if (isAuthenticated) {
    if (queryString) {
      axios({
        method: METHODS.PUT,
        url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
        headers: {
          accept: "application/json",
          Authorization: data.token,
        },
        data: { referrer: queryString },
      }).then((res) => {});
    }
    if (props.location.state) {
      return <Redirect to={props.location.state.from.pathname} />;
    }
    return (
      <Redirect
        to={rolesLandingPages[rolesList[0]] || rolesLandingPages.default}
      />
    );
    // if (rolesList[0] === "volunteer") {
    //   return <Redirect to={PATHS.CLASS} />;
    // }
    // if (rolesList[0] === "admin") {
    //   return <Redirect to={PATHS.PARTNERS} />;
    // }
    // if (rolesList[0] === "partner") {
    //   return <Redirect to={PATHS.PARTNERS} />;
    // } else {
    //   return (
    //     <Redirect
    //       to={interpolatePath(PATHS.PATHWAY_COURSE, {
    //         pathwayId: pythonPathwayId,
    //       })}
    //     />
    //   );
    // }
  }

  if (rolesList != false) {
    if (!(rolesList.includes("partner") || rolesList.includes("admin"))) {
      return <Redirect to={PATHS.COURSE} />;
    }
  } else if (rolesList.length == 0) {
    return <Redirect to={PATHS.COURSE} />;
  }

  return (
    <>
      <Container className={classes.merakiLogin} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} ms={6} md={6}>
            <Container maxWidth="sm">
              <Typography
                sx={{ pt: { xs: "none", md: 24 } }}
                variant="h4"
                align={isActive ? "center" : "left"}
                color="textPrimary"
                gutterBottom
              >
                Embark on your learning journey with Meraki
              </Typography>

              {loading ? (
                <Box
                  className={isActive ? classes.responsiveLoder : classes.Loder}
                >
                  <Loader />
                </Box>
              ) : (
                <Stack alignItems={isActive ? "center" : "left"}>
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Continue with Google"
                    onSuccess={onSignIn}
                    render={(renderProps) => (
                      <Button
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        onClick={renderProps.onClick}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          width: "max-content",
                          margin: "10px 0",
                          fontSize: "18px",
                        }}
                      >
                        Continue with Google
                      </Button>
                    )}
                    onFailure={onGoogleLoginFail}
                    cookiePolicy={"single_host_origin"}
                    className={
                      isActive
                        ? classes.responsiveGoogleLogin
                        : classes.googleLogin
                    }
                  />
                </Stack>
              )}
            </Container>
          </Grid>
          <Grid
            item
            xs={12}
            ms={6}
            md={6}
            sx={{ mb: 5, display: { xs: "none", md: "flex" } }}
          >
            <img src={require("./assets/background.svg")} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Login;
