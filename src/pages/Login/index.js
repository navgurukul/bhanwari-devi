import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { actions as userActions } from "../../components/User/redux/action";
import { PATHS, interpolatePath } from "../../constant";
import { getQueryVariable } from "../../common/utils";
import Loader from "../../components/common/Loader";
import { METHODS } from "../../services/api";
import { actions as pathwayActions } from "../../components/PathwayCourse/redux/action";
import { Typography, Container, Grid, Stack, Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import GoogleIcon from "./assets/GoogleIcon";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";
import StudentLogin from "./StudentLogin";

function Login(props) {
  const history = useHistory();
  const location = useLocation();
  const [queryString, setqueryString] = useState(null);
  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const pathway = useSelector((state) => state.Pathways);
  const updateQueryString = (value) => {
    setqueryString(value);
  };
  const { loading, data } = useSelector(({ User }) => User);
  const rolesList = data !== null && data?.user?.rolesList;
  const isAuthenticated = data && data?.isAuthenticated;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handlePasswordVisibility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPassword: !prevFormData.showPassword,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ username: "", password: "" });
    if (!formData.username && !formData.password) {
      setErrors({
        ...errors,
        username: "Please enter a username",
        password: "Please enter a password",
      });
      return;
    } else if (!formData.username) {
      setErrors({ ...errors, username: "Please enter a username" });
      return;
    } else if (!formData.password) {
      setErrors({ ...errors, password: "Please enter a password" });
      return;
    }
    dispatch(userActions.onUserLogin(formData));
  };

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
    if (user.error) {
      if (user.error.errorCode === 2001) {
        setErrors({ ...errors, username: user.error.message });
      } else if (user.error.errorCode === 2002) {
        setErrors({ ...errors, password: user.error.message });
      }
    }
    dispatch(
      pathwayActions.getPathways({
        authToken: user,
      })
    );
  }, [dispatch, user.error]);

  const classes = useStyles();
  // const isActive = useMediaQuery("(max-width:600px)");
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:768px)");

  const onGoogleLoginFail = (errorResponse) => {
    // eslint-disable-next-line no-console
    console.log(errorResponse);
  };

  const pythonPathway =
    pathway.data &&
    pathway.data.pathways.find((pathway) => pathway.code === "PRGPYT");
  const pythonPathwayId = pythonPathway && pythonPathway.id;

  // PathwayId for Amazon Pathway:-
  const amazonPathway =
    pathway.data &&
    pathway.data.pathways.find((pathway) => pathway.code === "ACB");
  const [amazonPathwayId, setAmazonPathwayId] = useState(null);

  useEffect(() => {
    if (amazonPathwayId == null) {
      setAmazonPathwayId(amazonPathway && amazonPathway.id);
    }
  }, [user]);

  // ---------------------------------------------

  const rolesLandingPages = {
    volunteer: PATHS.CLASS,
    admin: PATHS.PARTNERS,
    partner: PATHS.PARTNERS,
    default: interpolatePath(PATHS.NEW_USER_DASHBOARD),
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
      })
        .then((res) => {
          // For ACB Students joining using referrer link redirection below:-
          const queryParams = new URLSearchParams(location.search);
          const referrer = queryParams.get("referrer");
          if (referrer.includes("amazon")) {
            history.push(
              interpolatePath(PATHS.PATHWAY_COURSE, {
                pathwayId: amazonPathwayId,
              })
            );
          }
        })
        .catch((err) => {});
    }
    if (props.location.state == "/volunteer-with-us") {
      if (rolesList.includes("volunteer")) {
        return <Redirect to={PATHS.CLASS} />;
      } else {
        return <Redirect to={PATHS.VOLUNTEER_FORM} />;
      }
    }
    if (props.location.state) {
      return <Redirect to={props.location.state.from.pathname} />;
    }

    // For already registered ACB Students redirection below:-
    if (
      data?.user?.partner_id == 932 &&
      !data?.user?.rolesList.includes("partner") &&
      !data?.user?.rolesList.includes("admin")
    ) {
      return (
        <Redirect
          to={interpolatePath(PATHS.PATHWAY_COURSE, {
            pathwayId: amazonPathwayId,
          })}
        />
      );
    }

    return (
      <>
        {pythonPathwayId && (
          <Redirect
            to={rolesLandingPages[rolesList[0]] || rolesLandingPages.default}
          />
        )}
      </>
    );
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
      <Container
        className={isActive ? classes.resMerakilogin : classes.merakiLogin}
        sx={{
          width: isActive ? "auto" : "768px",
          height: isActive ? "auto" : "571px",
          marginTop: isActive ? "0" : "-60px",
        }}
        maxWidth="lg"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} ms={6} md={6}>
            <Container maxWidth="md">
              <Typography
                sx={{ pt: { xs: isActiveIpad ? 4 : 10, md: 24 } }}
                variant="h6"
                align={isActive || isActiveIpad ? "center" : "left"}
                mt={isActive ? 0 : isActiveIpad ? 12 : 0}
                color="textPrimary"
                gutterBottom
              >
                Embark on your learning journey with Meraki
              </Typography>

              {loading ? (
                <Box
                  className={
                    isActive || isActiveIpad
                      ? classes.responsiveLoder
                      : classes.Loder
                  }
                >
                  <Loader />
                </Box>
              ) : (
                <Stack
                  alignItems={isActive || isActiveIpad ? "center" : "left"}
                >
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Log In with Google "
                    onSuccess={onSignIn}
                    render={(renderProps) => (
                      <Button
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        onClick={renderProps.onClick}
                        style={{
                          border: "1px solid rgb(227 221 221)",
                          backgroundColor: "white",
                          color: "black",
                          width: isActive ? "100%" : "max-content",
                          margin: "10px 0",
                          paddingInline: "50px",
                          fontSize: "18px",
                        }}
                      >
                        Log In with Google
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
                  <StudentLogin
                    handleSubmit={handleSubmit}
                    errors={errors}
                    formData={formData}
                    handleChange={handleChange}
                    handlePasswordVisibility={handlePasswordVisibility}
                    loading={loading}
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
            sx={{
              mb: 5,
              width: "348px",
              height: "348px",
              marginTop: "190px",
              display: { xs: "none", md: "flex" },
            }}
          >
            <img src={require("./assets/login illustration.png")} alt="img" />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Login;
