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
import useStyles from "./styles";
import { Box } from "@mui/system";
import DropOutBatchesProfile from "../../components/DropOutBatches/DropOutBatchesProfile";

function Profile() {
  const classes = useStyles();
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
      <div className={classes.backGround}>
        <div
          style={{ flexDirection: isActive ? "column" : "row" }}
          className={classes.profileDiv}
        >
          <div
            item
            xs={12}
            md={6}
            className={classes.profileBox}
            align="center"
          >
            <Avatar
              alt="Remy Sharp"
              src={userData.profile_picture}
              style={{ height: 100, width: 100 }}
            />

            <div className={classes.editText}>
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
              <Box className={classes.saveEdit}>
                <Typography textAlign="center">{userData.email}</Typography>
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
      </div>

      <DropOutBatchesProfile />
    </>
  );
}
export default Profile;
