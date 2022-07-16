import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, TextField, Typography, Button, Box } from "@mui/material";

function Profile() {
  const user = useSelector(({ User }) => User);
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState();
  const [msg, setMsg] = useState();

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
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isActive ? "column" : "row",
        }}
      >
        <div
          item
          xs={12}
          md={6}
          align={isActive ? "center" : "right"}
          sx={{ pr: "16px" }}
        >
          <Avatar
            alt="Remy Sharp"
            src={userData.profile_picture}
            sx={{ width: 100, height: 100 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            // justifyContent: "center",
            marginLeft: 20,
          }}
        >
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
            <Typography variant={isActive ? "subtitle1" : "h5"}>
              {userData.name}
              {isActive && !isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </Button>
              )}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography>{userData.email}</Typography>
            {isEditing ? (
              <Button pt={1} onClick={editProfile}>
                Save Profile
              </Button>
            ) : (
              <Button pt={1} onClick={() => setIsEditing(true)}>
                {!isActive && "Edit Profile"}
              </Button>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}
export default Profile;
