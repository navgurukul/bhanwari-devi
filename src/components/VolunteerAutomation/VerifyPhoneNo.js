import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Snackbar,
  InputAdornment,
  Stack,
} from "@mui/material";
// import PhoneInput from "../common/PhoneInput";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { number } from "prop-types";
import { MuiOtpInput } from "mui-one-time-password-input";
// import AppConfig from "App.config";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const appVerifier = window.recaptchaVerifier;

function VerifyPhoneNo(props) {
  const { setDisable, setContact, contact, ssnValues } = props;
  const app = initializeApp(firebaseConfig);
  console.log(app.name);
  const handleChange = (event) => {
    const number = event.target.value?.replace(/[^0-9]/g, "") || "";
    // give space only after first two digits
    if (number.length > 2) {
      const formattedNumber = `${number.slice(0, 2)} ${number.slice(
        2,
        number.length
      )}`;
      setContact(formattedNumber);
    } else {
      setContact(number);
    }
  };
  useEffect(() => {
    setDisable(true);
  }, []);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const otpRef = React.useRef();
  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };
  // const [otp, setOtp] = React.useState(new Array(6).fill(""));
  const [startOtp, setStartOtp] = React.useState(false);
  const [confirmationResult, setConfirmationResult] = React.useState(null);
  const [Timer, setTimer] = React.useState("5:00");
  const [isStartTimer, setIsStartTimer] = React.useState(false);

  console.log();
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

  const handleChangeInput = (newValue) => {
    if (isNaN(newValue)) return false;
    setOtp(newValue);
  };
  // const handleChangeData = (element, index) => {
  //   const { value, maxLength, name } = element;
  //   const [fieldName, fieldIndex] = name.split("-");

  //   if (isNaN(element.value)) return false;

  //   setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
  //   if (value.length >= maxLength) {
  //     if (parseInt(fieldIndex, 10) < 6) {
  //       const nextSibling = document.querySelector(
  //         `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
  //       );
  //       if (nextSibling !== null) {
  //         nextSibling.focus();
  //       }
  //     }
  //   }
  // };

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

  const onSignInSubmit = (event) => {
    event.preventDefault();
    if (!confirmationResult) {
      setupRecaptcha();
    }
    const ContactNumber = contact.slice(3, contact.length);
    let countryCode = contact.slice(0, 2);
    if (countryCode[0] == "0") {
      countryCode = countryCode[1];
    }
    const phoneNumber = `+${countryCode}${ContactNumber}`;
    const appVerifier = window.recaptchaVerifier;
    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((result) => {
        setMessage("OTP sent successfully");
        setOpen(true);
        console.log("OTP sent", result);
        setStartOtp(true);
        setConfirmationResult(result);
        setIsStartTimer(true);
        countTimer();
      })
      .catch((error) => {
        console.log(error);
        setMessage("Enter valid phone number");
        setOpen(true);
      });
  };
  const OtpEnter = (event) => {
    confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        if (!user.isAnonymous) {
          setMessage("Phone number verified successfully");
          setOpen(true);
          setDisable(false);
          setIsStartTimer(false);
        }
      })
      .catch((error) => {
        setMessage("enter valid otp");
        setOpen(true);
        setOtp("");
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
        <TextField
          label="Ten Digit phone Number"
          // <PhoneInput       //International
          onChange={handleChange}
          value={contact}
          name="contact"
          id="contact"
          variant="outlined"
          helperText="Enter Phone Number with Country Code"
          fullWidth
          InputProps={{
            maxLength: 12,
            startAdornment: <InputAdornment position="start">+</InputAdornment>,
          }}
        />
        {!startOtp && (
          <Button
            disabled={contact?.length < 13}
            id="sign-in-button"
            onClick={onSignInSubmit}
            style={{ marginTop: "10px" }}
            variant="outlined"
            size="large"
          >
            Get Otp
          </Button>
        )}

        {startOtp && (
          <>
            {" "}
            {/* <TextField
              onChange={(e) => {
                if (e.target.value.length <= 6) {
                  setOtp(e.target.value);
                }
              }}
              style={{
                margin: "20px 0",
              }}
              disabled={!startOtp}
              fullWidth
              value={otp}
              size="large"
              variant="outlined"
              helperText={`Enter 6 digit Otp ${
                isStartTimer ? "within " + Timer : ""
              } `}
              label="OTP"
              error={otp.length < 6 && otp.length !== 0}
              InputProps={{ maxLength: 6 }}
              ref={otpRef}
              
              
            /> */}
            <Typography variant="body1">
              Please enter the OTP sent to your phone
            </Typography>
            <MuiOtpInput
              value={otp}
              onChange={handleChangeInput}
              length={6}
              sx={{
                // width: '48px',
                // height: '56px',
                width: "400px",
                height: "70px",
                borderRadius: " 8px",
              }}
              ref={otpRef}
              helperText={`Enter 6 digit Otp ${
                isStartTimer ? "within " + Timer : ""
              } `}
              label="OTP"
              autoFocus
              error={otp.length < 6 && otp.length !== 0}
            />
            {/* <Stack direction="row" spacing={2}>
              {otp.map((data, index) => {
                return (
                  <TextField
                    // onChange={(e) => {
                    //   if (e.target.value.length <= 6) {
                    //     setOtp(e.target.value);
                    //   }
                    // }}
                    onChange={(e) => handleChangeData(e.target, index)}
                    style={{
                      width: "44px",
                    }}
                    type="text"
                    name={`otp-${index}`}
                    disabled={!startOtp}
                    // fullWidth
                    value={data}
                    size="small"
                    variant="outlined"
                    // helperText={`Enter 6 digit Otp ${
                    //   isStartTimer ? "within " + Timer : ""
                    // } `}

                    onFocus={(e) => e.target.select()}
                    ref={otpRef}
                    key={index}
                    InputProps={{ maxLength: 6 }}
                  />
                );
              })}
            </Stack> */}
            <Typography variant="caption" sx={{ display: "block" }}>
              {`OTP expire in  ${isStartTimer ? Timer : ""} `}
            </Typography>
            <Button
              // disabled={otp.join("").length < 6}
              disabled={otp.length < 6}
              id="sign-in-button"
              onClick={OtpEnter}
              variant="outlined"
              size="large"
            >
              Verify OTP
            </Button>
          </>
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
