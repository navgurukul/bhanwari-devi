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
import {
  Typography,
  Container,
  Grid,
  Stack,
  Box,
  Button,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import GoogleIcon from "./assets/GoogleIcon";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";

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
  const [isEmpty, setIsEmpty] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setIsEmpty(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ username: "", password: "" });
    if (formData.username === "" && formData.password === "") {
      setIsEmpty(true);
      setErrors({
        ...errors,
        username: "Please enter a username",
        password: "Please enter a password",
      });
      return;
    }
    if (formData.username === "") {
      setIsEmpty(true);
      setErrors({ ...errors, username: "Please enter a username" });
      return;
    }
    if (formData.password === "") {
      setIsEmpty(true);
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
      if (user.error.message.includes("Invalid username or password.")) {
        setErrors({ ...errors, username: "This username does not exist" });
      } else if (user.error.message.includes("The password does not match")) {
        setErrors({ ...errors, password: user.error.message });
      }
    }
    dispatch(
      pathwayActions.getPathways({
        authToken: user,
      })
    );
  }, [dispatch, user]);

  const classes = useStyles();
  // const isActive = useMediaQuery("(max-width:600px)");
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");

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
        sx={{ width: "768px", height: "571px", marginTop: "-60px" }}
        maxWidth="lg"
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            ms={6}
            md={6}
            sx={{ gap: "32px", width: "352px", height: "571px" }}
          >
            <Container maxWidth="md">
              <Typography
                sx={{ pt: { xs: "none", md: 24 } }}
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
                  <Typography
                    variant="subtitle1"
                    fontSize="12px"
                    textAlign="center"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                        padding: "20px 0",
                      }}
                    >
                      <div
                        style={{
                          height: "1px",
                          width: "40%",
                          backgroundColor: "gray",
                        }}
                      ></div>
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: "12px",
                          color: "black",
                          whiteSpace: "nowrap",
                          backgroundColor: "white",
                        }}
                      >
                        or login with Username and Password
                      </Typography>
                      <div
                        style={{
                          height: "1px",
                          width: "40%",
                          backgroundColor: "gray",
                        }}
                      ></div>
                    </div>
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Box
                      sx={{
                        marginBottom: errors.username ? "40px" : "25px",
                        marginBlock: "10px",
                      }}
                    >
                      <TextField
                        fullWidth
                        id="username"
                        name="username"
                        placeholder="Username"
                        label={user.error ? "Username" : ""}
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                        InputProps={{
                          sx: {
                            borderRadius: "8px",
                            padding: "25px 2px",
                            height: "56px",
                            color: isEmpty && "red",
                          },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        marginBottom: errors.password ? "40px" : "25px",
                        marginBlock: "25px",
                      }}
                    >
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        type={"password"}
                        placeholder="Password"
                        label={user.error ? "Password" : ""}
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                          sx: {
                            borderRadius: "8px",
                            padding: "25px 2px",
                            height: "56px",
                            color: isEmpty && "red",
                          },
                        }}
                      />
                    </Box>

                    <Grid container justifyContent="center" sx={{ mb: 3 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                          borderRadius: "10px",
                          padding: "18px",
                          width: "100%",
                        }}
                      >
                        Login
                      </Button>
                    </Grid>

                    <Grid container justifyContent="left" sx={{ mb: 4 }}>
                      <Typography variant="subtitle1" fontSize="12px">
                        Forgot password or Don't have login details?
                      </Typography>
                      <Typography
                        variant="body1"
                        fontSize="13px"
                        textAlign="left"
                      >
                        Please connect with your teacher to get the Username and
                        Password
                      </Typography>
                    </Grid>
                  </form>
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
