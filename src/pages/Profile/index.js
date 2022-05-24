import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  Grid,
  Avatar,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import DropOutBatchesProfile from "../../components/DropOutBatches/DropOutBatchesProfile";

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
    <>
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
              justifyContent: "center",
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
              <Button
                style={{
                  padding: "0",
                }}
                onClick={editProfile}
              >
                Save Profile
              </Button>
            ) : (
              <Button
                style={{
                  padding: "0",
                }}
                variant="text"
                onClick={() => setIsEditing(true)}
              >
                {!isActive && "Edit Profile"}
              </Button>
            )}
          </div>
        </div>
      </div>
      <DropOutBatchesProfile />
    </>
  );
}
export default Profile;
