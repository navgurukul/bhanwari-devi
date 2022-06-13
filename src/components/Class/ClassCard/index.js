import React, { useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import useStyles from "../styles";
import { dateTimeFormat, TimeLeft } from "../../../constant";
// import { timeLeftFormat } from "../../common/date";
import { timeLeftFormat } from "../../../common/date";
import { METHODS } from "../../../services/api";
import { actions as classActions } from "../redux/action";
import "./styles.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../common/Modal";
import Loader from "../../common/Loader";
import {
  Typography,
  Card,
  Grid,
  Button,
  Box,
  Menu,
  MenuItem,
  CardActions,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExternalLink from "../../common/ExternalLink";

toast.configure();

function ClassCard({ item, editClass }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [enrollShowModal, setEnrollShowModal] = React.useState(false);
  const [unenrollShowModal, setunenrollShowModal] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [editShowModal, setEditShowModal] = React.useState(false);
  const [deleteCohort, setDeleteCohort] = React.useState(false);
  const [indicator, setIndicator] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const user = useSelector(({ User }) => User);

  const classStartTime = item.start_time && item.start_time.replace("Z", "");
  const classEndTime = item.end_time && item.end_time.replace("Z", "");
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
    // doubt_class: "Doubt Class",
    // workshop: "Workshop",
    cohort: "Batch",
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
        `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register?register-all=${indicator}`,
        // `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.data.token,
            // "register-all": indicator,
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
        // "unregister-all": indicator,
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

  console.log("indicator", indicator);
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
        {Timer == "joinNow" ? (
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
  return (
    <>
      <Card elevation={2} sx={{ p: 4 }} className={classes.card}>
        <Typography
          variant="subtitle1"
          color="primary"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {languageMap[item.type]}
          {item.enrolled && (
            <i className="check-icon check-icon fa fa-check-circle">Enrolled</i>
          )}
          {((rolesList.length == 0 && item.enrolled) ||
            (rolesList.length >= 1 &&
              (item.facilitator.email === user.data.user.email || flag))) && (
            <MoreVertIcon onClick={handleOpenUserMenu} sx={{ p: 0 }} />
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
              {/* <MenuItem
                onClick={() => handleClickOpen(item.id)}
                sx={{ width: 100, margin: "0px 10px" }}
              >
                <Typography textAlign="center">Delete</Typography>
              </MenuItem> */}
              <MenuItem
                onClick={() => handleEdit(item.id)}
                sx={{ width: 100, margin: "0px 10px" }}
              >
                <Typography textAlign="center">Edit</Typography>
              </MenuItem>
            </>
          )}

          {!rolesList.includes("volunteer") && (
            <MenuItem
              onClick={() => handleClickOpenUnenroll(item.id)}
              sx={{ width: 120, margin: "0px 10px" }}
            >
              <Typography textAlign="center">Dropout</Typography>
            </MenuItem>
          )}
        </Menu>
        <Typography variant="subtitle1" className={classes.spacing}>
          {item.title}
        </Typography>
        <Typography variant="body1" sx={{ display: "flex" }}>
          <img
            className={classes.icons}
            src={require("../assets/calendar.svg")}
          />
          {dateTimeFormat(item.start_time).finalDate}
        </Typography>
        <Typography variant="body1" sx={{ display: "flex" }}>
          <img className={classes.icons} src={require("../assets/time.svg")} />
          {moment(classStartTime).format("hh:mm a")} -{" "}
          {moment(classEndTime).format("hh:mm a")}
        </Typography>
        <Typography variant="body1" sx={{ display: "flex" }}>
          <img
            className={classes.icons}
            src={require("../assets/facilitator.svg")}
          />
          {item.facilitator.name}
        </Typography>
        <Typography variant="body1" sx={{ display: "flex" }}>
          <img
            className={classes.icons}
            src={require("../assets/language.svg")}
          />
          {languageMap[item.lang]}
        </Typography>
        <Grid container spacing={2} sx={{ mt: "10px" }}>
          <CardActions>
            {item.enrolled ? (
              loading ? (
                <div className="loader-button">
                  <Loader />
                </div>
              ) : (
                // <h1>Poonam</h1>
                <EnrolledAndTimer item={item} />
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
        </Grid>
      </Card>
      <Box>
        {showModal ? (
          <Modal onClose={handleClickOpen} className="confirmation-massage">
            <h2>Are you sure you want to delete this class?</h2>
            {item.type === "cohort" && (
              <label>
                <input
                  type="checkbox"
                  align="center"
                  className="cohort-class"
                  onClick={() => {
                    setDeleteCohort(true);
                  }}
                />
                Delete all classes of this cohort?
              </label>
            )}
            <div className="wrap">
              <button
                onClick={() => {
                  return deleteHandler(item.id);
                }}
                className="delete-btn"
              >
                Yes
              </button>
              <button onClick={handleClose} className="cancel-btn">
                Cancel
              </button>
            </div>
          </Modal>
        ) : null}
        {editShowModal ? (
          <Modal onClose={handleCloseEdit} className="confirmation-massage">
            <h2>Do you want to edit this class?</h2>
            {item.type === "cohort" && (
              <label>
                <input
                  type="checkbox"
                  align="center"
                  className="cohort-class"
                  onClick={() => {
                    setIndicator(true);
                  }}
                />
                Edit all classes of this cohort?
              </label>
            )}
            <div className="wrap">
              <button
                onClick={() => {
                  return editClass(item.id, indicator);
                }}
                className="agree-btn"
              >
                Yes
              </button>
              <button onClick={handleCloseEdit} className="cancel-btn">
                Cancel
              </button>
            </div>
          </Modal>
        ) : null}
        {enrollShowModal ? (
          <Modal
            onClose={() => handleCloseEnroll()}
            className="confirmation-massage"
          >
            <h2>Are you sure you want to enroll?</h2>
            {item.type === "cohort" && (
              <label>
                <input
                  type="checkbox"
                  align="center"
                  className="cohort-class"
                  onClick={() => {
                    setIndicator(true);
                  }}
                />
                Enroll all classes of this cohort?
              </label>
            )}
            <div className="wrap">
              <button
                onClick={() => {
                  return handleSubmit(item.id);
                }}
                className="agree-btn"
              >
                Yes
              </button>
              <button onClick={handleCloseEnroll} className="cancel-btn">
                Cancel
              </button>
            </div>
          </Modal>
        ) : null}
        {unenrollShowModal ? (
          <Modal
            onClose={() => handleCloseUnenroll()}
            className="confirmation-massage"
          >
            <h2> Are you sure you want to drop out</h2>
            {item.type === "cohort" && (
              <label>
                <input
                  type="checkbox"
                  align="center"
                  className="cohort-class"
                  onClick={() => {
                    setIndicator(true);
                  }}
                />
                Drop all classes of this cohort?
              </label>
            )}
            <div className="wrap">
              <button
                onClick={() => {
                  return handleDropOut(item.id);
                }}
                className="delete-btn"
              >
                Yes
              </button>
              <button onClick={handleCloseUnenroll} className="cancel-btn">
                Cancel
              </button>
            </div>
          </Modal>
        ) : null}
      </Box>
    </>
  );
}

export default ClassCard;
