import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  Grid,
  Avatar,
  TextField,
  Typography,
  Button,
} from "@mui/material";

function Profile() {
  const user = useSelector(({ User }) => User);
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState();
  const [msg, setMsg] = useState();

  const isActive = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
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
  return (
    <Container maxWidth="lg" sx={{ pt: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} align={isActive ? "center" : "right"}>
          <Avatar
            alt="Remy Sharp"
            src={userData.profile_picture}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={12} md={6} align={isActive ? "center" : "none"}>
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
            <Typography variant="h5">
              {userData.name}
              {isActive && !isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </Button>
              )}
            </Typography>
          )}
          <Typography>{userData.email}</Typography>
          {isEditing ? (
            <Button onClick={editProfile}>Save Profile</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              {!isActive && "Edit Profile"}
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
export default Profile;
