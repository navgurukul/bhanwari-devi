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
import { Link, useHistory } from "react-router-dom";
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
// import { useHistory } from 'react-router-dom';
import ClassJoinTimerButton from "../ClassJoinTimerButton";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { interpolatePath, PATHS } from "../../../constant";
import EditClass from "../EditClass";
toast.configure();

function BatchCard({ item, editClass, setRefreshKey, showClass }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [enrollShowModal, setEnrollShowModal] = React.useState(false);
  const [unenrollShowModal, setunenrollShowModal] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [editShowModal, setEditShowModal] = React.useState(false);
  const [deleteCohort, setDeleteCohort] = React.useState(false);
  const [indicator, setIndicator] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const user = useSelector(({ User }) => User);
  const [canJoin, setCanJoin] = useState(false);

  // const classStartTime = item.start_time; // && item.start_time.replace("Z", "");
  // const classEndTime = item.end_time; // && item.end_time.replace("Z", "");
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
    doubt_class: "Doubt Class",
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

  // API CALL FOR enroll class
  const handleSubmit = (Id) => {
    setLoading(true);
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
      setLoading(false);
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
            "register-to-all": true,
          },
        }
      )
      .then((res) => {
        if (!getNotify) {
          notify();
          clearTimeout(timer);
          setLoading(false);
        }
        dispatch(classActions.enrolledClass(Id));
      })
      .catch((res) => {
        toast.error("Already enrolled in another batch", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
          color: "red",
        });
        setLoading(false);
      });
  };
  // API CALL FOR DROP OUT
  const handleDropOut = (Id) => {
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
      if (!getNotify) {
        notify();
        clearTimeout(timer);
        setLoading(false);
      }
      dispatch(classActions.dropOutClass(Id));
    });
  };

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
        sx={{
          p: 4,
          mt: isActive ? 4 : 5,
          bgcolor: canJoin ? "secondary.light" : "primary.lighter",
          cursor: "pointer",
          height: "332px",
        }}
        className={classes.card}
        onClick={() => {
          showClass &&
            history.push(
              interpolatePath(PATHS.BATCH_CLASSES, {
                batchId: item?.recurring_id,
              })
            );
        }}
      >
        <Typography
          variant="subtitle1"
          color="#6D6D6D"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "100%",
          }}
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: "400" }}
            variant="subtitle2"
          >
            {item?.title}
          </Typography>

          {item?.enroled && (
            <i
              className="check-icon check-icon fa fa-check-circle
            "
              style={{ backgroundColor: "transparent" }}
            >
              Enrolled
            </i>
          )}
          {((rolesList.length === 0 && item.enrolled) ||
            (rolesList.length >= 1 &&
              (item?.facilitator?.email === user.data.user.email || flag))) && (
            <Typography>
              <EditClass
                item={item}
                editClass={editClass}
                indicator={true}
                setRefreshKey={setRefreshKey}
              />
            </Typography>
          )}
        </Typography>
        {showClass ? (
          <Typography variant="body1" sx={{ display: "flex" }}>
            <img
              className={classes.icons}
              src={require("../assets/calendar.svg")}
            />
            {format(item?.batch_start, "dd MMM yy")} -{" "}
            {format(item?.batch_end, "dd MMM yy")}
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ display: "flex" }}>
            <img
              className={classes.icons}
              src={require("../assets/calendar.svg")}
            />
            {format(item?.start_time, "dd MMM yy")} -{" "}
            {format(item?.end_time, "dd MMM yy")}
          </Typography>
        )}

        {/* <Typography variant="body1" sx={{ display: "flex" }}>
          <img className={classes.icons} src={require("../assets/time.svg")} />
          {format(classStartTime, "hh:mm aaa")} -{" "}
          {format(classEndTime, "hh:mm aaa")}
        </Typography> */}
        <Typography variant="body1" sx={{ display: "flex" }}>
          <img
            className={classes.icons}
            src={require("../assets/facilitator.svg")}
          />
          {item?.volunteer?.name || item?.facilitator?.name}
        </Typography>
        <Typography variant="body1" sx={{ display: "flex" }}>
          <img
            className={classes.icons}
            src={require("../assets/language.svg")}
          />
          {languageMap[item?.lang]}
        </Typography>

        {/* it's for enroll class, join class and  class Timer button */}
        <CardActions className={classes.cardActions}>
          {item?.enrolled ? (
            loading ? (
              <div className="loader-button">
                <Loader />
              </div>
            ) : (
              <ClassJoinTimerButton
                startTime={item?.start_time}
                link={item?.meet_link}
                onCanJoin={setCanJoin}
              />
            )
          ) : loading ? (
            <div className="loader-button">
              <Loader />
            </div>
          ) : (
            <Button
              type="submit"
              variant="text"
              onClick={(e) => {
                e.stopPropagation();

                handleClickOpenEnroll();
              }}
              endIcon={<ArrowRightAltIcon />}
            >
              Enroll
            </Button>
          )}
        </CardActions>
      </Card>
      <Box>
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

            {/* <Stack alignItems="center">
                <FormControlLabel
                  align="center"
                  label=" Enroll all classes of this Batch?"
                />
              </Stack> */}

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
      {/* </Link> */}
    </>
  );
}

export default BatchCard;
