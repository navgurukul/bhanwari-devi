import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  FormControl,
  FormHelperText,
} from "@mui/material";
import { actions } from "../../components/User/redux/action";
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
  const dispatch = useDispatch();
  const [helperText, setHelperText] = useState();
  const [showError, setShowError] = useState(false);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    setEditName(user.data.user.name);
    setUserData(user.data.user);
  }, []);

  useEffect(() => {
    if (editName == "") {
      setHelperText("Please enter your name");
      setShowError(true);
    } else if (
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(editName) ||
      /\d/.test(editName)
    ) {
      setHelperText(
        "Please use only capital or small letters. Numbers and symbols cannot be used in a name"
      );
      setShowError(true);
    } else {
      setShowError(false);
      setHelperText();
    }
  }, [editName]);

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
      dispatch(actions.onUserRefreshDataIntent({ token: user.data.token }));
      setMsg(false);
      setUserData(res.data.user);
    });
  };

  return (
    <>
      {/* <div className={classes.imageContainer}>
        <img className={classes.bgImage} src={require("./assest/bg.png")} />
      </div> */}
      <Container maxWidth="lg">
        <div item xs={12} md={6} className={classes.profileBox} align="center">
          <Avatar
            alt={userData.name}
            src={userData.profile_picture}
            sx={{ height: 100, width: 100, mt: isActive ? 3 : 0 }}
          />
          {isEditing ? (
            <TextField
              error={showError}
              id="standard-basic"
              label="Name"
              sx={{ mt: "10px" }}
              value={editName}
              helperText={helperText}
              onChange={(e) => {
                setEditName(e.target.value);
              }}
            />
          ) : msg ? (
            <Typography>Please wait...</Typography>
          ) : (
            <Typography
              variant={isActive ? "subtitle1" : "h6"}
              sx={{ mt: "10px" }}
            >
              {userData.name}
              {isActive && !isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </Button>
              )}
            </Typography>
          )}
          <Typography mt={1} align="center">
            {userData.email}
          </Typography>
          {isEditing ? (
            <>
              <Button sx={{ mr: "30px" }} onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={editProfile} disabled={showError}>
                Save Profile
              </Button>
            </>
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
