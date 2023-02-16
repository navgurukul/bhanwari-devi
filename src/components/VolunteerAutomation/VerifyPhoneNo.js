import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Snackbar,
  Grid,
} from "@mui/material";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import axios from "axios";
import { METHODS } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { MuiOtpInput } from "mui-one-time-password-input";

// import AppConfig from "App.config";
import MuiPhoneNumber from "material-ui-phone-number";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// const appVerifier = window.recaptchaVerifier;

const CountryList = require("country-list-with-dial-code-and-flag");

function VerifyPhoneNo(props) {
  const user = useSelector(({ User }) => User);
  const { setDisable, setContact, contact, setNextButton } = props;

  const app = initializeApp(firebaseConfig);
  console.log(app.name);
  const handleChange = (event) => {
    const number = event.target.value?.replace(/[^0-9]/g, "") || "";
    if (number.length <= 10) {
      setPhone(number);
    }
  };
  useEffect(() => {
    setDisable(true);
    setNextButton(false);
    if (contact) {
      setDisable(false);
      setNextButton(true);
      setVerifyOpen(true);
      setGenerateOtp(false);
    }
  }, []);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const otpRef = React.useRef();
  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };
  const [startOtp, setStartOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [Timer, setTimer] = useState("5:00");
  const [isStartTimer, setIsStartTimer] = useState(false);
  const [countryCode, setCountryCode] = useState(
    (contact && `${contact?.split(" ")[0]}`) || "+91"
  );
  const [phone, setPhone] = useState("");
  const setupRecaptcha = () => {
    console.log(firebaseConfig);
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
  const [otp, setOtp] = React.useState("");
  const [bgColor, setBgColor] = React.useState(false);
  const [verifyOpen, setVerifyOpen] = React.useState(false);
  const [close, setClose] = React.useState(true);
  const [generateOtp, setGenerateOtp] = React.useState(true);
  const handleChangeInput = (newValue) => {
    if (isNaN(newValue)) return false;
    setOtp(newValue);
  };

  const countTimer = () => {
    setIsStartTimer(true);
    let countDownDate = new Date().getTime() + 300000;
    let x = setInterval(function () {
      let now = new Date().getTime();
      let distance = countDownDate - now;
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimer(minutes + ":" + seconds);
      if (distance < 0) {
        clearInterval(x);
        setTimer(null);
        setIsStartTimer(false);
        setOtp("");
        setStartOtp(false);
      }
    }, 1000);
  };

  // const onSignInSubmit = (event) => {
  //   event.preventDefault();
  //   if (!confirmationResult) {
  //     setupRecaptcha();
  //   }
  //   const phoneNumber = `${countryCode} ${phone}`;
  //   setContact(phoneNumber);
  //   const appVerifier = window.recaptchaVerifier;
  //   const auth = getAuth();
  //   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  //     .then((result) => {
  //       setMessage("OTP sent successfully");
  //       setOpen(true);
  //       console.log("OTP sent", result);
  //       setStartOtp(true);
  //       setConfirmationResult(result);
  //       setIsStartTimer(true);
  //       countTimer();
  //       setVerifyOpen(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setMessage("Enter valid phone number");
  //       setOpen(true);
  //     });
  // }

  const onSignInSubmit = async (event) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_MERAKI_URL}/volunteers`,
        method: METHODS.GET,
        headers: {
          accept: "application/json",
          Authorization: user.data.token,
        },
      });

      const volunteers = response.data;
      let contactMatch = false;

      for (const item of volunteers) {
        let contact = item.contact;
        if (item.contact?.includes("-")) contact = item.contact?.split("-")[1];
        if (phone === contact) {
          console.log(
            "contact matched",
            "contact -",
            contact,
            "phone -",
            phone
          );
          setMessage(
            "The number has already registered. Please try with another number."
          );
          setOpen(true);
          contactMatch = true;
          break;
        }
      }
      if (!contactMatch) {
        event.preventDefault();
        if (!confirmationResult) {
          setupRecaptcha();
        }
        const phoneNumber = `${countryCode} ${phone}`;
        setContact(phoneNumber);
        const appVerifier = window.recaptchaVerifier;
        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((result) => {
            console.log(result);
            setMessage("OTP sent successfully");
            setOpen(true);
            console.log("OTP sent", result);
            setStartOtp(true);
            setConfirmationResult(result);
            setIsStartTimer(true);
            countTimer();
            setVerifyOpen(false);
          })
          .catch((error) => {
            console.log(error);
            setMessage("Enter valid phone number");
            setOpen(true);
          });
      }
    } catch (e) {
      console.log("failed: ", e);
    }
  };

  const OtpEnter = (event) => {
    confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;

        if (!user.isAnonymous) {
          setMessage("Phone number verified successfully");
          setOpen(false);
          setDisable(false);
          setIsStartTimer(false);
          setVerifyOpen(true);
          setClose(false);
          setNextButton(true);
        }
      })
      .catch((error) => {
        setMessage("enter valid otp");
        setOpen(true);
        setOtp("");
        setBgColor(true);
      });
  };
  //International
  // const handleChange = (number, countryInfo, phoneType) => {
  //   const isValid = !!phoneType;
  //   console.log(number, countryInfo, phoneType);
  //   setDisable(!isValid);
  //   setContact(number);
  //   //setContact(number.replace(/[^0-9]/g, "") || "");
  // };

  const countryData = CountryList.findFlagByDialCode(countryCode);

  // useEffect(() => {
  //   return axios({
  //     url: `${process.env.REACT_APP_MERAKI_URL}/volunteers`,
  //     method: METHODS.GET,
  //     headers: {
  //       accept: "application/json",
  //       Authorization: user.data.token,
  //     },
  //   }).then((res) => {
  //     console.log("res", res);
  //     setVolunteer(res.data);
  //   });
  // }, [contact]);

  // volunteer &&
  //   volunteer?.length > 0 &&
  //   volunteer.map((item) => {
  //     console.log(item.contact);
  //     if (item.contact == contact?.split(" ")[1]) {
  //       console.log("number matched");
  //       console.log(item.contact);
  //     }
  //   });

  // console.log("volunteer", volunteer);
  // console.log("contact", contact?.split(" ")[1]);

  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <div id="recaptcha-container"></div>

      <Typography variant="h6" gutterBottom>
        Please provide your phone number.
      </Typography>
      <Typography variant="body1" gutterBottom color="text.secondary">
        We only use your number to contact you for volunteer-related matters. We
        never share it with any third party.
      </Typography>
      <Box sx={{ mt: 4 }}>
        {generateOtp ? (
          <Grid container spacing={2} maxWidth="md">
            <Grid item xs={4} md={3}>
              <MuiPhoneNumber
                preferredCountries={["in"]}
                defaultCountry={"in"}
                variant="outlined"
                id="countryCode"
                value={countryCode}
                onChange={(val) => {
                  setCountryCode(countryCode);

                  return true;
                }}
              />
            </Grid>
            <Grid item xs={8} md={9}>
              <TextField
                label="Ten Digit phone Number"
                onChange={handleChange}
                value={phone}
                name="contact"
                id="contact"
                variant="outlined"
                helperText="Enter Phone Number with Country Code"
                fullWidth
                maxLength={10}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} maxWidth="md">
            <Grid item>
              <Box>{countryData.flag}</Box>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {`${countryData.dial_code} ${contact.split(" ")[1]}`}
                {/* {`+${contact.split(" ")[0]} ${contact.split(" ")[1]}`} */}
                {/* {console.log(
                  "contact",
                  contact.slice(countryData.dial_code.length)
                )} */}
              </Typography>
            </Grid>
          </Grid>
        )}

        {!startOtp && generateOtp && (
          <Button
            disabled={phone?.length < 10}
            id="sign-in-button"
            onClick={onSignInSubmit}
            style={{ marginTop: "10px" }}
            variant="contained"
            size="large"
          >
            Generate OTP
          </Button>
        )}

        {startOtp && close && (
          <>
            <Typography variant="body1" style={{ margin: "16px 0px" }}>
              Please enter the OTP sent to your phone
            </Typography>
            <MuiOtpInput
              value={otp}
              onChange={handleChangeInput}
              length={6}
              ref={otpRef}
              TextFieldsProps={{
                type: "text",
                size: "medium",
                placeholder: bgColor && "-",
                style: {
                  border: bgColor && "1px solid #F44336",
                  borderRadius: "8px",
                  width: "45px",
                },
              }}
              label="OTP"
              autoFocus
            />
            <Typography
              variant="caption"
              sx={{ display: "block", margin: "16px 0px" }}
            >
              {`OTP expire in  ${isStartTimer ? Timer : ""} `}
            </Typography>
            <Button
              disabled={otp.length < 6}
              id="sign-in-button"
              onClick={OtpEnter}
              variant="contained"
              size="large"
            >
              Verify OTP
            </Button>
          </>
        )}

        {verifyOpen && (
          <Grid container spacing={1} mt={1}>
            <Grid item>
              <img src={require("./assets/Vector.svg")} />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                You have been verified successfully
              </Typography>
            </Grid>
          </Grid>
        )}

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          onClose={handleClose}
          message={message}
        />
      </Box>
    </Container>
  );
}

export default VerifyPhoneNo;
