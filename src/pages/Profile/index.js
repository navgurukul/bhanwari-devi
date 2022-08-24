import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  TextField,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { Box, fontSize } from "@mui/system";
import useStyles from "./styles";
import DropOutBatchesProfile from "../../components/DropOutBatches/DropOutBatchesProfile";

function Profile() {
  const classes = useStyles();
  const user = useSelector(({ User }) => User);
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState();
  const [msg, setMsg] = useState();
  const [LoadBatches, setLoadBatches] = useState(false);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      // get values of
      // res.data.user.UserEnrolledInBatches.map((item) =>
      //   console.log(item.isEnrolled)
      // );
      console.log(user.data);
      console.log(res.data);
      setUserData(res.data.user);
      setEditName(res.data.user.name ? res.data.user.name : "");
    });
  }, []);

  const editProfile = () => {
    setIsEditing(false);
    setMsg(true);
    axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
      data: {
        name: editName,
      },
    }).then((res) => {
      axios({
        method: METHODS.GET,
        url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
        headers: {
          accept: "application/json",
          Authorization: user.data.token,
        },
      }).then((res) => {
        setMsg(false);
        setUserData(res.data.user);
      });
    });
  };
  console.log("userData.profile_picture", userData);
  return (
    <>
      {/* <div className={classes.imageContainer}>
        <img className={classes.bgImage} src={require("./assest/bg.png")} />
      </div> */}
      {/* <img
        src="https://lh3.googleusercontent.com/a-/AOh14Gia7GolSruCwBw51D68IbuLSWZYEBcekXc8Ssjw=s96-c"
        alt="profile"
      /> */}
      <Container maxWidth="lg">
        <div item xs={12} md={6} className={classes.profileBox} align="center">
          <Avatar
            alt={userData.name}
            src={userData.profile_picture}
            sx={{ height: 100, width: 100 }}
          />
          {isEditing ? (
            <TextField
              id="standard-basic"
              label="name"
              variant="standard"
              value={editName}
              onChange={(e) => {
                setEditName(e.target.value);
              }}
            />
          ) : msg ? (
            <Typography>Please wait...</Typography>
          ) : (
            <Typography variant={isActive ? "subtitle1" : "h6"}>
              {userData.name}
              {isActive && !isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </Button>
              )}
            </Typography>
          )}
          <Typography align="center">{userData.email}</Typography>
          {isEditing ? (
            <Button pt={1} onClick={editProfile}>
              Save Profile
            </Button>
          ) : (
            <Button pt={1} onClick={() => setIsEditing(true)}>
              {!isActive && "Edit Profile"}
            </Button>
          )}
        </div>
        <DropOutBatchesProfile />
      </Container>
    </>
  );
}
export default Profile;
