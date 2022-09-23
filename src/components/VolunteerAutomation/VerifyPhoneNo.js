import React, { useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Snackbar,
  InputAdornment,
} from "@mui/material";
// import PhoneInput from "../common/PhoneInput";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { number } from "prop-types";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// const appVerifier = window.recaptchaVerifier;
// const app = initializeApp(firebaseConfig);

function VerifyPhoneNo({ setDisable, setContact, contact }) {
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
  const [otp, setOtp] = React.useState("");
  const [startOtp, setStartOtp] = React.useState(false);
  const [confirmationResult, setConfirmationResult] = React.useState(null);
  const auth = getAuth();
  const setupRecaptcha = () => {
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
  const onSignInSubmit = (event) => {
    event.preventDefault();
    setupRecaptcha();
    const ContactNumber = contact.slice(3, contact.length);
    let countryCode = contact.slice(0, 2);
    if (countryCode[0] === "0") {
      countryCode = countryCode[1];
    }
    const phoneNumber = `+${countryCode}${ContactNumber}`;
    const appVerifier = window.recaptchaVerifier;
    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((result) => {
        setMessage("OTP sent successfully");
        otpRef.current.focus();
        setOpen(true);
        setStartOtp(true);
        setConfirmationResult(result);
      })
      .catch((error) => {
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
        } else {
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
        <Button
          disabled={contact.length < 13}
          id="sign-in-button"
          onClick={onSignInSubmit}
          style={{ marginTop: "10px" }}
          variant="outlined"
          size="large"
        >
          Get Otp
        </Button>
        <TextField
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
          type="number"
          variant="outlined"
          helperText="Enter 6 digit Otp"
          label="OTP"
          error={otp.length < 6 && otp.length !== 0}
          InputProps={{ maxLength: 6 }}
          ref={otpRef}
        />
        <Button
          disabled={otp.length < 6}
          id="sign-in-button"
          onClick={OtpEnter}
          variant="outlined"
          size="large"
        >
          Enter Otp
        </Button>
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
