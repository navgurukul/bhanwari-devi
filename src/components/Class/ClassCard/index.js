import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import useStyles from "../styles";
import { breakpoints } from "../../../theme/constant";

// import { dateTimeFormat, TimeLeft } from "../../../constant";
// import { timeLeftFormat } from "../../common/date";
import { format, dateTimeFormat, timeLeftFormat } from "../../../common/date";
import { METHODS } from "../../../services/api";
import { actions as classActions } from "../redux/action";
import "./styles.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../common/Loader";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Typography,
  Card,
  Grid,
  Button,
  Box,
  Stack,
  Menu,
  MenuItem,
  Checkbox,
  CardActions,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExternalLink from "../../common/ExternalLink";
import ClassJoinTimerButton from "../ClassJoinTimerButton";

toast.configure();

function ClassCard({ item, editClass }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [enrollShowModal, setEnrollShowModal] = React.useState(false);
  const [unenrollShowModal, setunenrollShowModal] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [editShowModal, setEditShowModal] = React.useState(false);
  const [deleteCohort, setDeleteCohort] = React.useState(false);
  const [indicator, setIndicator] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const user = useSelector(({ User }) => User);

  const classStartTime = item.start_time; // && item.start_time.replace("Z", "");
  const classEndTime = item.end_time; // && item.end_time.replace("Z", "");
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
    doubt_class: "Doubt Class",
    // workshop: "Workshop",
    // cohort: "Batch",
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClose = () => {
    setShowModal(false);
    setDeleteCohort(false);
  };

  const handleEdit = () => {
    setEditShowModal(true);
    setAnchorElUser(null);
  };

  const handleCloseEdit = () => {
    setEditShowModal(false);
    setIndicator(false);
  };

  const handleClickOpen = () => {
    setShowModal(!showModal);
    setIndicator(false);
    setAnchorElUser(null);
  };

  const handleCloseEnroll = () => {
    setEnrollShowModal(false);
    setIndicator(false);
  };
  const handleClickOpenEnroll = () => {
    setEnrollShowModal(!enrollShowModal);
    setIndicator(false);
  };

  const handleCloseUnenroll = () => {
    setunenrollShowModal(false);
    setIndicator(false);
  };
  const handleClickOpenUnenroll = () => {
    setunenrollShowModal(!unenrollShowModal);
    setIndicator(false);
    setAnchorElUser(null);
  };

  const rolesList = user.data.user.rolesList;
  let flag = false;
  rolesList.includes("admin") || rolesList.includes("classAdmin")
    ? (flag = true)
    : (flag = false);

  // API CALL FOR DELETE CLASS
  const deleteHandler = (id) => {
    const notify = () => {
      toast.success(" Deleted the class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    setShowModal(!showModal);
    return axios({
      method: METHODS.DELETE,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${id}`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        "delete-all": deleteCohort,
      },
    }).then(() => {
      notify();
      dispatch(classActions.deleteClass(id));
    });
  };

  // API CALL FOR enroll class
  const handleSubmit = (Id) => {
    setLoading(true);
    console.log("28002", Id);
    const notify = () => {
      toast.success("You have been enrolled to class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    let getNotify = false;
    setEnrollShowModal(!enrollShowModal);
    const timer = setTimeout(() => {
      getNotify = true;
      dispatch(classActions.enrolledClass(Id));
      setLoading(false);
      notify();
    }, 10000);
    axios
      .post(
        // `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register?register-all=${indicator}`,
        `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.data.token,
            "register-to-all": indicator,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        if (!getNotify) {
          notify();
          clearTimeout(timer);
          setLoading(false);
        }
        dispatch(classActions.enrolledClass(Id));
      });
  };

  // API CALL FOR DROP OUT
  const handleDropOut = (Id) => {
    console.log("28002", Id);
    setLoading(true);
    const notify = () => {
      toast.success("You have been dropped out of class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    let getNotify = false;
    setunenrollShowModal(!unenrollShowModal);
    const timer = setTimeout(() => {
      getNotify = true;
      dispatch(classActions.dropOutClass(Id));
      setLoading(false);

      notify();
    }, 10000);
    return axios({
      method: METHODS.DELETE,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/unregister?unregister-all=${indicator}`,
      // url: `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/unregister`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        // "unregister-to-all": indicator,
      },
    }).then((res) => {
      console.log("res", res);
      if (!getNotify) {
        notify();
        clearTimeout(timer);
        setLoading(false);
      }
      dispatch(classActions.dropOutClass(Id));
    });
  };

  //console.log("indicator", indicator);
  /*
  const EnrolledAndTimer = () => {
    const timeLeftOptions = {
      precision: [3, 3, 3, 2, 2, 1],
      cutoffNumArr: [0, 0, 0, 0, 10, 60],
      cutoffTextArr: ["", "", "", "", "joinNow", "joinNow"],
      expiredText: "joinNow",
    };
    const [Timer, setTimer] = useState(
      timeLeftFormat(item.start_time, timeLeftOptions)
    );
    const ONE_MINUTE = 60000; //millisecs
    setInterval(() => {
      setTimer(timeLeftFormat(item.start_time, timeLeftOptions));
    }, ONE_MINUTE);
    return (
      <>
        {Timer === "joinNow" ? (
          <ExternalLink
            style={{
              textDecoration: "none",
            }}
            href={item.meet_link}
          >
            <Button variant="contained" fullWidth>
              Join Now
            </Button>
          </ExternalLink>
        ) : (
          <Button disabled={true} variant="contained">
            Starts in {Timer}
          </Button>
        )}
      </>
    );
  };
  */
  return (
    <>
      <Card
        elevation={2}
        sx={{ p: 4, mt: isActive ? 4 : 5 }}
        className={classes.card}
      >
        <Typography
          variant="subtitle1"
          color="#6D6D6D"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {languageMap[item.type] === "Doubt Class"
            ? languageMap[item.type]
            : "Batch"}
          {item.enrolled && (
            <i className="check-icon check-icon fa fa-check-circle">Enrolled</i>
          )}
          {((rolesList.length === 0 && item.enrolled) ||
            (rolesList.length >= 1 &&
              (item.facilitator.email === user.data.user.email || flag))) && (
            <MoreVertIcon
              style={{ color: "#BDBDBD", cursor: "pointer" }}
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
            />
          )}
        </Typography>
        <Menu
          sx={{ mt: "15px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={() => {
            setAnchorElUser(null);
          }}
        >
          {(item.facilitator.email === user.data.user.email || flag) && (
            <>
              <MenuItem
                onClick={() => handleEdit(item.id)}
                sx={{ width: 100, margin: "0px 10px" }}
              >
                <Typography textAlign="center">Edit</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => handleClickOpen(item.id)}
                sx={{ width: 100, margin: "0px 10px", color: "#F44336" }}
              >
                <Typography textAlign="center">Delete</Typography>
              </MenuItem>
            </>
          )}

          {!rolesList.includes("volunteer") && item.enrolled && (
            <MenuItem
              onClick={() => handleClickOpenUnenroll(item.id)}
              sx={{ width: 120, margin: "0px 10px" }}
            >
              <Typography textAlign="center">Dropout</Typography>
            </MenuItem>
          )}
        </Menu>
        <Typography variant="subtitle1">{item.title}</Typography>
        <Typography
          sx={{ fontSize: "18px", fontWeight: "400" }}
          variant="subtitle2"
        >
          {item.sub_title}
        </Typography>
        <Typography variant="body1" sx={{ display: "flex" }}>
          <img
            className={classes.icons}
            src={require("../assets/calendar.svg")}
          />
          {format(item.start_time, "dd MMM yy")}
        </Typography>
        <Typography variant="body1" sx={{ display: "flex" }}>
          <img className={classes.icons} src={require("../assets/time.svg")} />
          {format(classStartTime, "hh:mm aaa")} -{" "}
          {format(classEndTime, "hh:mm aaa")}
        </Typography>
        <Typography variant="body1" sx={{ display: "flex" }}>
          <img
            className={classes.icons}
            src={require("../assets/facilitator.svg")}
          />
          {item?.volunteer?.name || item.facilitator.name}
        </Typography>
        <Typography variant="body1" sx={{ display: "flex" }}>
          <img
            className={classes.icons}
            src={require("../assets/language.svg")}
          />
          {languageMap[item.lang]}
        </Typography>
        <CardActions style={{ padding: "0px" }}>
          {item.enrolled ? (
            loading ? (
              <div className="loader-button">
                <Loader />
              </div>
            ) : (
              <ClassJoinTimerButton
                startTime={item?.start_time}
                link={item?.meet_link}
              />
            )
          ) : loading ? (
            <div className="loader-button">
              <Loader />
            </div>
          ) : (
            <Button
              type="submit"
              variant="contained"
              onClick={() => {
                handleClickOpenEnroll(item.id);
              }}
            >
              Enroll
            </Button>
          )}
        </CardActions>
      </Card>
      <Box>
        {showModal ? (
          <Dialog
            open={showModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>
              <Typography variant="h6" align="center">
                Are you sure you want to delete this class?
              </Typography>
            </DialogTitle>
            {(item.type === "cohort" || item.type === "batch") && (
              <Stack alignItems="center">
                <FormControlLabel
                  align="center"
                  control={
                    <Checkbox
                      onClick={() => {
                        setDeleteCohort(true);
                      }}
                    />
                  }
                  label="Delete all classes of this Batch?"
                />
              </Stack>
            )}
            <Stack alignItems="center">
              <DialogActions>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Button
                    onClick={() => {
                      return deleteHandler(item.id);
                    }}
                    color="error"
                    variant="contained"
                    sx={{ mr: "15px", width: "100px" }}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={handleClose}
                    color="grey"
                    variant="contained"
                    sx={{ width: "100px" }}
                  >
                    No
                  </Button>
                </Box>
              </DialogActions>
            </Stack>
          </Dialog>
        ) : null}
        {editShowModal ? (
          <Dialog
            open={editShowModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              style: {
                minWidth: "35%",
                borderRadius: 8,
              },
            }}
          >
            <DialogTitle>
              <Typography variant="h6" align="center">
                Do you want to edit this class?
              </Typography>
            </DialogTitle>

            {(item.type === "cohort" || item.type === "batch") && (
              <Stack alignItems="center">
                <FormControlLabel
                  align="center"
                  control={
                    <Checkbox
                      onClick={() => {
                        setIndicator(true);
                      }}
                    />
                  }
                  label=" Edit all classes of this Batch?"
                />
              </Stack>
            )}
            <Stack alignItems="center">
              <DialogActions>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Button
                    onClick={() => {
                      setEditShowModal(false);
                      return editClass(item.id, indicator);
                    }}
                    color="primary"
                    variant="contained"
                    sx={{ mr: "15px", width: "100px" }}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={handleCloseEdit}
                    color="grey"
                    variant="contained"
                    sx={{ width: "100px" }}
                  >
                    Cancel
                  </Button>
                </Box>
              </DialogActions>
            </Stack>
          </Dialog>
        ) : null}

        {enrollShowModal ? (
          <Dialog
            open={() => enrollShowModal()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              style: {
                minWidth: "35%",
                borderRadius: 8,
              },
            }}
          >
            <DialogTitle>
              <Typography variant="h6" align="center">
                Are you sure you want to enroll?
              </Typography>
            </DialogTitle>

            {(item.type === "cohort" || item.type === "batch") && (
              <Stack alignItems="center">
                <FormControlLabel
                  align="center"
                  control={
                    <Checkbox
                      onClick={() => {
                        setIndicator(!indicator);
                      }}
                    />
                  }
                  label=" Enroll all classes of this Batch?"
                />
              </Stack>
            )}
            <Stack alignItems="center">
              <DialogActions>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Button
                    onClick={() => {
                      return handleSubmit(item.id);
                    }}
                    color="primary"
                    variant="contained"
                    sx={{ mr: "15px", width: "100px" }}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={handleCloseEnroll}
                    color="grey"
                    variant="contained"
                    sx={{ width: "100px" }}
                  >
                    Cancel
                  </Button>
                </Box>
              </DialogActions>
            </Stack>
          </Dialog>
        ) : null}
        {unenrollShowModal ? (
          <Dialog
            open={() => unenrollShowModal()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              style: {
                minWidth: "35%",
                borderRadius: 8,
              },
            }}
          >
            <DialogTitle>
              <Typography variant="h6" align="center">
                Are you sure you want to drop out
              </Typography>
            </DialogTitle>

            {(item.type === "cohort" || item.type === "batch") && (
              <Stack alignItems="center">
                <FormControlLabel
                  align="center"
                  control={
                    <Checkbox
                      onClick={() => {
                        setIndicator(true);
                      }}
                    />
                  }
                  label=" Drop all classes of this Batch?"
                />
              </Stack>
            )}
            <Stack alignItems="center">
              <DialogActions>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Button
                    onClick={() => {
                      return handleDropOut(item.id);
                    }}
                    color="primary"
                    variant="contained"
                    sx={{ mr: "15px", width: "100px" }}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={handleCloseUnenroll}
                    color="grey"
                    variant="contained"
                    sx={{ width: "100px" }}
                  >
                    Cancel
                  </Button>
                </Box>
              </DialogActions>
            </Stack>
          </Dialog>
        ) : null}
      </Box>
    </>
  );
}

export default ClassCard;
