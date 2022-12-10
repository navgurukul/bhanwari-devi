import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MuiPhoneNumber from "material-ui-phone-number";
import ImageUpload from "@material-ui/core";
import VerifyPhoneNo from "../../components/VolunteerAutomation/VerifyPhoneNo";
import Avatar from "react-avatar-edit";

import {
  Grid,
  // Avatar,
  TextField,
  Typography,
  Button,
  Container,
  Box,
  FormControl,
  FormHelperText,
  Snackbar,
} from "@mui/material";
import { actions } from "../../components/User/redux/action";
import useStyles from "./styles";
import DropOutBatchesProfile from "../../components/DropOutBatches/DropOutBatchesProfile";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

function Profile() {
  const classes = useStyles();
  const user = useSelector(({ User }) => User);
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(null);
  const [msg, setMsg] = useState();
  const [LoadBatches, setLoadBatches] = useState(false);
  const dispatch = useDispatch();
  const [helperText, setHelperText] = useState();
  const [showError, setShowError] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [imgDialogs, setImgDialoags] = useState(false);
  const [imgCrop, setImgCrop] = useState(false);
  const [storeImg, setStoreImg] = useState([]);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [new_Profiles, setNew_Profiles] = useState(userData.profile_picture);
  const [countryCode, setCountryCode] = useState(
    `+${user?.data?.user?.contact?.split("-")?.[0]}` || "+91"
  );
  const [contact, setContact] = useState(
    user?.data?.user?.contact?.split("-")?.[1] || null
  );

  const [confirmationResult, setConfirmationResult] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [startOtp, setStartOtp] = React.useState(false);

  const [otp, setOtp] = React.useState("");
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
    setMessage("");
  };
  const onCrop = (view) => {
    setImgCrop(view);
  };

  const onExit = () => {
    setImgCrop(null);
  };

  const saveImg = () => {
    setShowError(false);
    setStoreImg([...storeImg, { imgCrop }]);
    setImgDialoags(false);
  };

  const New_Profile = storeImg.map((item) => item.imgCrop);

  const handleClickOpen = () => {
    setIsEditing(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // OTP AUTH FUNCTION
  const app = initializeApp(firebaseConfig);
  const onSignInSubmit = (event) => {
    event.preventDefault();
    if (!confirmationResult) {
      setupRecaptcha();
    }
    const phoneNumber = `${countryCode}${contact}`;
    const appVerifier = window.recaptchaVerifier;
    const auth = getAuth();

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((result) => {
        setMessage("OTP sent successfully");
        setSnackBarOpen(true);
        setStartOtp(true);
        setConfirmationResult(result);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Enter valid phone number");
        setOpen(true);
      });
  };
  const setupRecaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
        },
      },
      auth
    );
  };
  useEffect(() => {}, [showError]);
  const OtpEnter = (event) => {
    confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        if (!user.isAnonymous) {
          setShowError(false);
          setMessage("Phone number verified successfully");
          setSnackBarOpen(true);
        }
      })
      .catch((error) => {
        setMessage("enter valid otp");
        setOpen(true);
        setOtp("");
      });
  };
  // OTP AUTH FUNCTION
  useEffect(() => {
    dispatch(actions.onUserRefreshDataIntent({ token: user.data.token }));

    setEditName(user.data.user.name);
    setUserData(user.data.user);
    console.log("user");
  }, []);

  useEffect(() => {
    if (editName == "") {
      setHelperText("Please enter your name");
      setShowError(true);
    } else if (
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/.test(editName) ||
      /\d/.test(editName)
    ) {
      setHelperText(
        "Please use only capital or small letters. Numbers and symbols cannot be used in a name"
      );
      setShowError(true);
    } else if (editName?.length > 25) {
      setHelperText("Name length should not be more than 25");
    } else {
      setHelperText();
    }
  }, [editName]);

  const editProfile = () => {
    let payload = {
      name: editName,
      profile_picture: new_Profiles,
    };

    if (contact != null) {
      payload["contact"] = `${countryCode.replace("+", "")}-${contact}`;
    }

    console.log("contact", `${countryCode.replace("+", "")}-${contact}`);
    setIsEditing(false);
    setMsg(true);
    axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/${user.data.user.id}`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
      data: payload,
    }).then((res) => {
      dispatch(actions.onUserRefreshDataIntent({ token: user.data.token }));
      setMsg(false);
      setUserData(res.data.user);
      window.location.reload();
    });
  };

  return (
    <>
      {/* <div className={classes.imageContainer}>
        <img className={classes.bgImage} src={require("./assest/bg.png")} />
      </div> */}
      <Container maxWidth="lg">
        <div item xs={12} md={6} className={classes.profileBox} align="center">
          {/* <Avatar
            alt={userData.name}
            src={userData.profile_picture}
            sx={{ height: 100, width: 100, mt: isActive ? 3 : 0 }}
          /> */}
          <img
            alt={userData.name}
            // src={userData.profile_picture}//
            style={{
              height: 100,
              width: 100,
              borderRadius: "50%",
            }}
            src={New_Profile.length ? New_Profile : userData.profile_picture}
          />
          {isEditing ? (
            <Dialog
              // sx = {{p : "40px"}}
              // style = {{padding : "40px"}}
              open={open}
              onClose={handleClose}
              // className={classes.dialog}
              // aria-labelledby="alert-dialog-title"
              // aria-describedby="alert-dialog-description"
            >
              {/* < */}
              <Box
                sx={{ p: isActive ? "8px" : "32px" }}
                // style = {{margin : "40px"}}
              >
                <Typography
                  variant="h6"
                  pl={1}
                  pb={4}
                  // id="alert-dialog-title"
                >
                  {"Edit Profile"}
                </Typography>
                <Grid container>
                  <Grid item xs={4} sm={3} pr={2}>
                    <img
                      style={{ width: "120px", height: "120px" }}
                      //  src={userData.profile_picture}
                      src={
                        New_Profile.length
                          ? New_Profile
                          : userData.profile_picture
                      }
                    />
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Box>
                      <Typography
                        variant="body1"
                        onClick={() => {
                          setImgDialoags(true);
                          setImgCrop(false);
                        }}
                        color="primary"
                        sx={{ cursor: "pointer", pb: 2 }}
                      >
                        {/* <Typography my = {2} color = "primary" > */}
                        Update Photo
                        {/* </Typography> */}
                      </Typography>
                      <Dialog
                        open={imgDialogs}
                        onClose={() => setImgDialoags(false)}
                      >
                        <Typography variant="h5" mb={4} p={0}>
                          Update Photo
                        </Typography>
                        <Avatar
                          width={300}
                          height={200}
                          onExit={onExit}
                          onFileLoad={(file) => {
                            console.log("onFileLoad", file);
                            const formDatas = new FormData();
                            formDatas.append("image", file);
                            fetch(
                              `${process.env.REACT_APP_MERAKI_URL}/courseEditor/ImageUploadS3`,
                              {
                                headers: {
                                  accept: "application/json, text/plain, */*",
                                  "accept-language":
                                    "en-GB,en-US;q=0.9,en;q=0.8",
                                },
                                referrerPolicy:
                                  "strict-origin-when-cross-origin",
                                body: formDatas,
                                method: "POST",
                                mode: "cors",
                                credentials: "omit",
                              }
                            ).then((res) => {
                              res.json().then((data) => {
                                console.log(data.file.url);
                                setNew_Profiles(data.file.url);
                              });
                            });
                          }}
                          onCrop={onCrop}
                        />
                        <Button disabled={!imgCrop} onClick={saveImg}>
                          Save
                        </Button>
                      </Dialog>
                      <Typography variant="body2" color="text.secondary">
                        Tips: Try square JPG or PNG with atleast 500*500
                        resolution for high quality profile display
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* <DialogContent>
              <DialogContentText>
                Goals can change all the tSharmaime. However, we will keep your
                registration progress intact in case you return back.
              </DialogContentText>
            </DialogContent> */}
                <div id="recaptcha-container"></div>
                <DialogActions>
                  <Box>
                    <TextField
                      error={editName?.length == 0 || helperText?.length > 0}
                      // id="standard-basic"
                      label="Name"
                      fullWidth
                      sx={{ mt: "10px", width: "100%" }}
                      value={editName}
                      helperText={helperText}
                      onChange={(e) => {
                        setEditName(e.target.value);
                        console.log(userData.name, e.target.value);
                        if (e.target.value != userData.name) {
                          setShowError(false);
                        }
                      }}
                    />

                    <TextField
                      align="center"
                      sx={{ mt: 4, mb: 1 }}
                      fullWidth
                      disabled
                      value={userData.email}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Email cannot be changed as it is linked to your Google
                      account
                    </Typography>
                  </Box>
                </DialogActions>
                <Box my={2} p={1}>
                  <Grid container spacing={2}>
                    <Grid item sm={3} xs={4}>
                      <MuiPhoneNumber
                        preferredCountries={["in"]}
                        defaultCountry={"in"}
                        variant="outlined"
                        id="countryCode"
                        value={countryCode}
                        onChange={(val) => {
                          setCountryCode(val);
                        }}
                      />
                    </Grid>
                    <Grid item sm={9} xs={8}>
                      <TextField
                        label="Phone Number"
                        onChange={(e) => {
                          setContact(e.target.value);
                        }}
                        value={contact}
                        name="contact"
                        id="contact"
                        variant="outlined"
                        helperText="Enter Phone Number"
                        fullWidth
                        maxLength={10}
                        error={contact?.length != 10 && contact?.length > 0}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Button
                        variant="outlined"
                        onClick={(event) => {
                          onSignInSubmit(event);
                          setShowError(true);
                        }}
                        disabled={contact?.length != 10}
                      >
                        Get OTP
                      </Button>{" "}
                    </Grid>
                    {startOtp && (
                      <>
                        <Grid item xs={8}>
                          <TextField
                            label="OTP"
                            onChange={(e) => {
                              setOtp(e.target.value);
                            }}
                            value={otp}
                            name="OTP"
                            id="contact"
                            variant="outlined"
                            helperText="Enter OTP"
                            fullWidth
                            maxLength={6}
                            error={otp.length != 6 && otp.length > 0}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Button
                            variant="outlined"
                            onClick={(e) => {
                              OtpEnter(e);
                            }}
                            disabled={otp.length != 6}
                          >
                            Verify OTP
                          </Button>{" "}
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Box>
                <Snackbar
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  open={snackBarOpen}
                  onClose={handleSnackBarClose}
                  message={message}
                />
                {/* {isEditing ? (
            <> */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    sx={{ mr: "30px" }}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={editProfile}
                    disabled={showError}
                  >
                    Save Changes
                  </Button>
                </Box>
                {/* </>
          ) : (
            <Button pt={1} onClick={handleClickOpen}
            // onClick={() => setIsEditing(true)}
            >
              {!isActive && "Edit Profile"}
            </Button>
          )} */}
              </Box>
            </Dialog>
          ) : // <TextField
          //   error={showError}
          //   id="standard-basic"
          //   label="Name"
          //   sx={{ mt: "10px" }}
          //   value={editName}
          //   helperText={helperText}
          //   onChange={(e) => {
          //     setEditName(e.target.value);
          //   }}
          // />
          msg ? (
            <Typography>Please wait...</Typography>
          ) : (
            <Typography
              variant={isActive ? "subtitle1" : "h6"}
              sx={{ mt: "10px" }}
            >
              {userData.name}
              {isActive && !isEditing && (
                <Button
                  onClick={handleClickOpen}
                  // onClick={() => setIsEditing(true)}
                >
                  <EditIcon />
                </Button>
              )}
            </Typography>
          )}
          <Typography my={1} align="center">
            {userData.email}
          </Typography>
          <Typography my={1} align="center">
            {user.data.user.rolesList.includes("volunteer") &&
              userData.contact !== null && (
                <>
                  <Typography>
                    {`+${userData.contact?.replace("-", "")}`}
                    <img
                      className={classes.Right_tick}
                      alt="Right tick"
                      src={require("./assest/right_tick.svg")}
                    />
                  </Typography>
                </>
              )}
          </Typography>
          {/* {isEditing ? (
            <>
              <Button sx={{ mr: "30px" }} onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={editProfile} disabled={showError}>
                Save Profile
              </Button>
            </>
          ) : ( */}
          <Button
            pt={1}
            onClick={handleClickOpen}
            // onClick={() => setIsEditing(true)}
          >
            {!isActive && "Edit Profile"}
          </Button>
          {/* )} */}
        </div>
        <DropOutBatchesProfile />
      </Container>
    </>
  );
}
export default Profile;
