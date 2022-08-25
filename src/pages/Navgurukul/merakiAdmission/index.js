import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import YouTube from "react-youtube";
import { METHODS } from "../../../services/api";
import { useSelector } from "react-redux";

import { Container, Box, Grid, Typography, CardMedia } from "@mui/material";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ExternalLink from "../../../components/common/ExternalLink";

function Admission(props) {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
  });

  const [mobile, setMobile] = useState("");
  const [enrolmentKey, setEnrolmentKey] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const user = useSelector(({ User }) => User);

  let userToken = localStorage.getItem("Token");
  const partnerIdFromOpportunity =
    props.location.state && props.location.state.partnerId;

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
      headers: {
        accept: "application/json",
        Authorization: userToken != null ? userToken : user.data.token,
      },
    }).then((res) => {
      setPartnerId(res.data.user.partner_id);
    });
  }, []);

  const generateTestLink = async () => {
    try {
      const mobile = `0${userDetails.mobileNumber}`;
      const dataURL = `${process.env.REACT_APP_CHANAKYA_BASE_URL}helpline/register_exotel_call`;
      const response = await axios.get(dataURL, {
        params: {
          ngCallType: "getEnrolmentKey",
          From: mobile,
          partner_id: partnerId || partnerIdFromOpportunity || null,
        },
      });
      setEnrolmentKey(response.data.key);
      const params = {
        firstName: userDetails.firstName,
        middleName: userDetails.middleName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber,
      };
      const queryString = Object.keys(params)
        .filter((key) => params[key])
        .map((key) => `${key}=${params[key]}`)
        .join("&");

      const url = `${process.env.REACT_APP_TEST_URL}${enrolmentKey}?${queryString}`;

      window.open(url, "_blank");
      return response;
    } catch (e) {}
  };

  const giveTest = async () => {
    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.mobileNumber
    ) {
      toast.error(
        "To attempt the test, it is compulsory to enter your First Name, Last Name and Mobile Number. Middle Name is optional, you can choose not to enter.",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      return;
    }
    if (!/^[0-9]{10}$/.test(userDetails.mobileNumber.toString())) {
      toast.error("Please give 10 digits of the mobile number.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    await isDuplicate();

    setUserDetails({
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
    });
  };

  const isDuplicate = () => {
    const { firstName, middleName, lastName, mobileNumber } = userDetails;
    axios
      .get(`${process.env.REACT_APP_CHANAKYA_BASE_URL}/check_duplicate`, {
        params: {
          Name: firstName + " " + middleName + lastName,
          Number: mobileNumber,
        },
      })
      .then(async (data) => {
        const response = data.data.data;
        const stage = response.pendingInterviewStage;
        const url =
          `${process.env.REACT_APP_ADMISSIONS_URL}check_duplicate/` +
          new URLSearchParams({
            Name: `${firstName}${middleName}${lastName}`,
            Number: mobileNumber,
            Stage: stage,
          }).toString();
        if (response.alreadyGivenTest) {
          window.open(url, "_blank");
        } else {
          generateTestLink();
        }
      });
  };

  const changeHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container
        maxWidth="lg"
        className={
          isActive ? classes.admitionContaine1 : classes.admitionContainer
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "spaced-center",
            alignItems: "spaced-evenly",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              minWidth: "50%",
            }}
          >
            <CardMedia>
              <YouTube
                className={
                  !isActive ? classes.admitionVideo : classes.admitionVideo1
                }
                videoId={`vuSwndj5cbs`}
              />
            </CardMedia>
            <Typography variant="subtitle1" gutterBottom align="center">
              Experience of NG Alumni & Graduates
            </Typography>
            {/* <hr
              className={isActive ? classes.admitionHr1 : classes.admitionHr}
            /> */}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "50%",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              align="190%"
              className={isActive && classes.admitionSpacing1}
              mb={isActive ? 2 : 0}
            >
              Software Engineering Scholarship Test
            </Typography>
            <Box
              component="form"
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 3,
                width: "100%",
              }}
              className={
                isActive ? classes.admitionBottom1 : classes.admitionBottom
              }
            >
              <TextField
                label="First Name"
                type="text"
                value={userDetails.firstName}
                name="firstName"
                onChange={changeHandler}
                id="firstName"
                variant={isActive ? "standard" : "outlined"}
                required
              />

              <TextField
                label="Middel Name(Optional)"
                type="text"
                value={userDetails.middleName}
                name="middleName"
                onChange={changeHandler}
                id="middleName"
                variant={isActive ? "standard" : "outlined"}
              />
              <TextField
                label="Last Name"
                type="text"
                value={userDetails.lastName}
                name="lastName"
                onChange={changeHandler}
                id="lastName"
                variant={isActive ? "standard" : "outlined"}
                required
              />

              <TextField
                label="Mobile Number"
                type="number"
                pattern="^[0-9]{10}$"
                value={userDetails.mobileNumber}
                name="mobileNumber"
                onChange={changeHandler}
                id="mobileNumber"
                variant={isActive ? "standard" : "outlined"}
                required
              />

              <Button
                variant="contained"
                color="primary"
                className={
                  !isActive ? classes.admitionBtn1 : classes.admitionBtn2
                }
                onClick={giveTest}
              >
                Give Admission Test
              </Button>
            </Box>
            <Grid
              container
              className={classes.admitionSpacing}
              mt={isActive ? "32px" : "47px"}
            >
              <Grid item xs={12} sm={12} md={6}>
                <Box component="form" sx={{ display: "grid", gap: 2.5 }}>
                  <Typography variant="h6">Check Test Result</Typography>
                  <TextField
                    label="Mobile Number"
                    type="number"
                    pattern="^[0-9]{10}$"
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                    value={mobile}
                    variant={isActive ? "standard" : "outlined"}
                    required
                  />
                  <Button variant="contained" color="primary">
                    <ExternalLink
                      href={`${process.env.REACT_APP_ADMISSIONS_URL}status/${mobile}`}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Check Result
                    </ExternalLink>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Admission;
