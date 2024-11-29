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
import { initializeApp } from "firebase/app";
import MuiPhoneNumber from "material-ui-phone-number";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const CountryList = require("country-list-with-dial-code-and-flag");

function VerifyPhoneNo(props) {
  const { setDisable, setContact, contact, setNextButton } = props;
  const [otp, setOtp] = useState("");
  const [bgColor, setBgColor] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [generateOtp, setGenerateOtp] = useState(true);
  const [startOtp, setStartOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [timer, setTimer] = useState("5:00");
  const [isStartTimer, setIsStartTimer] = useState(false);
  const [countryCode, setCountryCode] = useState(
    (contact && `${contact?.split(" ")[0]}`) || "+91"
  );
  const [phone, setPhone] = useState("");
  const phoneData = `${countryCode.slice(1)}-${phone}`;
  const app = initializeApp(firebaseConfig);

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
  }, [contact]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  const setupRecaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          onSignInSubmit();
        },
      },
      auth
    );
  };

  const countTimer = () => {
    setIsStartTimer(true);
    let countDownDate = new Date().getTime() + 300000;
    const interval = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimer(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      if (distance < 0) {
        clearInterval(interval);
        setTimer(null);
        setIsStartTimer(false);
        setOtp("");
        setStartOtp(false);
      }
    }, 1000);
  };

  const onSignInSubmit = async () => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_MERAKI_URL}/volunteers/${phoneData}`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      if (response.data !== "please register your mobile number") {
        setOpen(true);
        setMessage(response.data);
      } else {
        if (!confirmationResult) {
          setupRecaptcha();
        }
        const phoneNumber = `${countryCode} ${phone}`;
        setContact(phoneNumber);
        const appVerifier = window.recaptchaVerifier;
        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((result) => {
            setMessage("OTP sent successfully");
            setOpen(true);
            setStartOtp(true);
            setConfirmationResult(result);
            countTimer();
            setVerifyOpen(false);
          })
          .catch(() => {
            setMessage("Enter valid phone number or tried too many times");
            setOpen(true);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const verifyOtp = () => {
    confirmationResult
      .confirm(otp)
      .then(() => {
        setMessage("Phone number verified successfully");
        setOpen(true);
        setDisable(false);
        setIsStartTimer(false);
        setVerifyOpen(true);
        setNextButton(true);
      })
      .catch(() => {
        setMessage("Invalid OTP");
        setOpen(true);
        setOtp("");
        setBgColor(true);
      });
  };

  const countryData = CountryList.findFlagByDialCode(countryCode);

  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <div id="recaptcha-container"></div>
      <Typography variant="h6" gutterBottom>
        Please provide your phone number.
      </Typography>
      <Box sx={{ mt: 4 }}>
        {generateOtp ? (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <MuiPhoneNumber
                preferredCountries={["in"]}
                defaultCountry={"in"}
                variant="outlined"
                value={countryCode}
                onChange={(val) => setCountryCode(val)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Phone Number"
                onChange={handleChange}
                value={phone}
                fullWidth
              />
            </Grid>
          </Grid>
        ) : (
          <Typography>{`${countryData.dial_code} ${contact.split(" ")[1]}`}</Typography>
        )}

        {!startOtp && generateOtp && (
          <Button
            disabled={phone?.length < 10}
            onClick={onSignInSubmit}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Generate OTP
          </Button>
        )}

        {startOtp && (
          <>
            <TextField
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
              inputProps={{
                maxLength: 6,
                style: {
                  backgroundColor: bgColor ? "#fdecea" : "inherit",
                },
              }}
            />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              {`OTP expires in ${isStartTimer ? timer : ""}`}
            </Typography>
            <Button
              onClick={verifyOtp}
              variant="contained"
              sx={{ mt: 2 }}
              disabled={otp.length < 6}
            >
              Verify OTP
            </Button>
          </>
        )}

        {verifyOpen && (
          <Typography sx={{ mt: 2, color: "green" }}>
            You have been verified successfully.
          </Typography>
        )}

        <Snackbar
          open={open}
          onClose={handleClose}
          message={message}
          autoHideDuration={6000}
        />
      </Box>
    </Container>
  );
}

export default VerifyPhoneNo;
