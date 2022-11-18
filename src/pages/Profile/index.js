import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MuiPhoneNumber from "material-ui-phone-number";
import ImageUpload from "@material-ui/core";
import VerifyPhoneNo from "../../components/VolunteerAutomation/VerifyPhoneNo";
import Avatar from "react-avatar-edit";

import {
  Grid,
  // Avatar,
  TextField,
  Typography,
  Button,
  Container,
  Box,
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
  const [open, setOpen] = React.useState(false);
  const [imgDialogs, setImgDialoags] = useState(false);
  const [imgCrop, setImgCrop] = useState(false);
  const [storeImg, setStoreImg] = useState([]);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const onCrop = (view) => {
    setImgCrop(view);
  };

  const onExit = () => {
    setImgCrop(null);
  };

  const saveImg = () => {
    setStoreImg([...storeImg, { imgCrop }]);
    setImgDialoags(false);
  };

  const New_Profile = storeImg.map((item) => item.imgCrop);

  const handleClickOpen = () => {
    setIsEditing(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          {/* <Avatar
            alt={userData.name}
            src={userData.profile_picture}
            sx={{ height: 100, width: 100, mt: isActive ? 3 : 0 }}
          /> */}
          <img
            alt={userData.name}
            // src={userData.profile_picture}//
            src={New_Profile.length ? New_Profile : userData.profile_picture}
          />
          {isEditing ? (
            <Dialog
              // sx = {{p : "40px"}}
              // style = {{padding : "40px"}}
              open={open}
              onClose={handleClose}
              // className={classes.dialog}
              // aria-labelledby="alert-dialog-title"
              // aria-describedby="alert-dialog-description"
            >
              {/* < */}
              <Box
                sx={{ p: "40px" }}
                // style = {{margin : "40px"}}
              >
                <DialogTitle
                // id="alert-dialog-title"
                >
                  {"Edit Profile"}
                </DialogTitle>
                <Grid container>
                  <Grid item xs={3}>
                    <img
                      style={{ width: "120px", height: "120px" }}
                      //  src={userData.profile_picture}
                      src={
                        New_Profile.length
                          ? New_Profile
                          : userData.profile_picture
                      }
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Box>
                      <Button onClick={() => setImgDialoags(true)}>
                        {/* <Typography my = {2} color = "primary" > */}
                        Update Photo
                        {/* </Typography> */}
                      </Button>
                      <Dialog
                        open={imgDialogs}
                        onClose={() => setImgDialoags(false)}
                      >
                        <Typography variant="h5" mb={4}>
                          Update Photo
                        </Typography>
                        <Avatar
                          width={300}
                          height={200}
                          onExit={onExit}
                          onCrop={onCrop}
                        />
                        <Button onClick={saveImg}>Save</Button>
                      </Dialog>
                      <Typography variant="body2" color="text.secondary">
                        Tips: Try square JPG or PNG with atleast 500*500
                        resolution for high quality profile display
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* <DialogContent>
              <DialogContentText>
                Goals can change all the time. However, we will keep your
                registration progress intact in case you return back.
              </DialogContentText>
            </DialogContent> */}
                <DialogActions>
                  <Box>
                    <TextField
                      error={showError}
                      // id="standard-basic"
                      label="Name"
                      fullWidth
                      sx={{ mt: "10px", width: "100%" }}
                      value={editName}
                      helperText={helperText}
                      onChange={(e) => {
                        setEditName(e.target.value);
                      }}
                    />

                    <TextField
                      align="center"
                      sx={{ mt: 4, mb: 1 }}
                      fullWidth
                      disabled
                      value={userData.email}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Email cannot be changed as it is linked to your Google
                      account
                    </Typography>
                  </Box>
                </DialogActions>
                {/* <Box my = {4} p = {1}>
            <Grid container spacing={2} >
          <Grid item xs={4}>
            <MuiPhoneNumber
              preferredCountries={["in"]}
              defaultCountry={"in"}
              variant="outlined"
              id="countryCode"
              // value={countryCode}
              // onChange={(val) => {
              //   setCountryCode(val);
              //   return true;
              // }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Phone Number"
              // onChange={handleChange}
              // value={contact}
              name="contact"
              id="contact"
              variant="outlined"
              // helperText="Enter Phone Number with Country Code"
              fullWidth
              // maxLength={12}
            />
          </Grid>
        </Grid>
        </Box> */}

                {/* {isEditing ? (
            <> */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    sx={{ mr: "30px" }}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={editProfile}
                    disabled={showError}
                  >
                    Save Changes
                  </Button>
                </Box>
                {/* </>
          ) : (
            <Button pt={1} onClick={handleClickOpen}
            // onClick={() => setIsEditing(true)}
            >
              {!isActive && "Edit Profile"}
            </Button>
          )} */}
              </Box>
            </Dialog>
          ) : // <TextField
          //   error={showError}
          //   id="standard-basic"
          //   label="Name"
          //   sx={{ mt: "10px" }}
          //   value={editName}
          //   helperText={helperText}
          //   onChange={(e) => {
          //     setEditName(e.target.value);
          //   }}
          // />
          msg ? (
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
          <Typography my={1} align="center">
            {userData.email}
          </Typography>
          <Typography my={1} align="center">
            {user.data.user.rolesList.includes("volunteer") &&
              userData.contact !== null && (
                <>
                  <Typography>
                    {userData.contact}
                    <img
                      className={classes.Right_tick}
                      alt="Right tick"
                      src={require("./assest/right_tick.svg")}
                    />
                  </Typography>
                </>
              )}
          </Typography>
          {/* {isEditing ? (
            <>
              <Button sx={{ mr: "30px" }} onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={editProfile} disabled={showError}>
                Save Profile
              </Button>
            </>
          ) : ( */}
          <Button
            pt={1}
            onClick={handleClickOpen}
            // onClick={() => setIsEditing(true)}
          >
            {!isActive && "Edit Profile"}
          </Button>
          {/* )} */}
        </div>
        <DropOutBatchesProfile />
      </Container>
    </>
  );
}
export default Profile;
