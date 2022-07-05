import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as classActions } from "../../components/Class/redux/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Chip from "@mui/material/Chip";
import { METHODS } from "../../services/api";
import ExternalLink from "../../components/common/ExternalLink";
import { format, timeLeftFormat } from "../../common/date";
import {
  Typography,
  Container,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import useStyles from "./styles";
import { lang } from "../../constant";

const ClassCardContainer = ({
  sliceData,
  cSize,
  classes,
  enrollId,
  enrollClass,
  EnrolledAndTimer,
  handleClickOpen,
  open,
  handleClose,
  dropOutClass,
}) => {
  return (
    <Grid sx={{ mt: 5 }} container spacing={4}>
      {sliceData &&
        sliceData.map((item) => (
          <Grid item xs={12} ms={6} md={cSize}>
            <Card className={classes.classCard}>
              <CardContent>
                <Typography gutterBottom variant="subtitle1">
                  {item.title}
                </Typography>
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Chip color="primary" label="Batch" />
                  <Chip
                    color="primary"
                    sx={{ ml: 1 }}
                    label={lang[item.lang]}
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography>
                    {format(item.start_time, "dd MMM yy")},{" "}
                    {format(item.start_time, "hh:mm aaa")} -
                    {format(item.end_time, "hh:mm aaa")}
                  </Typography>
                </Box>

                <Typography
                  sx={{ mt: 2 }}
                  color="text.secondary"
                  gutterBottom
                  variant="body1"
                >
                  Please join at least 10 minutes before the scheduled time
                </Typography>
              </CardContent>
              <CardActions>
                {!enrollId ? (
                  <Button
                    onClick={() => {
                      enrollClass(item);
                    }}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Enroll
                  </Button>
                ) : (
                  <EnrolledAndTimer item={item} />
                )}
              </CardActions>
            </Card>
            <Box>
              {enrollId && (
                <Button
                  sx={{ mt: 5 }}
                  onClick={handleClickOpen}
                  color="error"
                  variant="text"
                >
                  Can't attend on this date?
                </Button>
              )}
            </Box>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm dropping out"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography variant="body1">
                    {" "}
                    Something urgent came up? Keep an eye for{" "}
                  </Typography>
                  future doubt classes
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button sx={{ color: "#2E2E2E" }} onClick={handleClose}>
                  Stay Enrolled
                </Button>
                <Button
                  color="error"
                  onClick={() => {
                    dropOutClass(item);
                  }}
                  autoFocus
                >
                  Drop Out
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        ))}
    </Grid>
  );
};

function AttendClass({
  setEnrollId,
  enrollId,
  setStepCompleted,
  setDisable,
  completed,
  pathwayId,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const { data = [] } = useSelector(({ Class }) => Class.allClasses);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(moment.utc(new Date()).format("YYYY-MM-DD"));
  const [proceed, setProceed] = useState(!!completed && enrollId == null);
  const [chooseClassAgain, setChooseClassAgain] = useState(false);
  const numOfClassesToShow = 3;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(classActions.getClasses());
  }, [dispatch]);

  const classData =
    data?.filter((item) => {
      return item.start_time.includes(date);
    }) || [];

  const possibleClasses =
    classData.length === 0
      ? data?.slice(0, numOfClassesToShow) || []
      : classData?.slice(0, numOfClassesToShow);

  const enrolledClass =
    !chooseClassAgain && possibleClasses.find((item) => item.id === enrollId);

  const sliceData = (enrolledClass && [enrolledClass]) || possibleClasses;
  const cSize = sliceData.length === 1 ? 8 : 4;

  const enrollClass = (Class) => {
    setOpen(false);
    setEnrollId(Class.id);
    setChooseClassAgain(false);
    const notify = () => {
      toast.success("You have been enrolled to class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    axios
      .post(
        `${process.env.REACT_APP_MERAKI_URL}/classes/${Class.id}/register`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.data.token,
            "register-to-all": "false",
          },
        }
      )
      .then((res) => {
        notify();
      });
  };

  const dropOutClass = (Class) => {
    setOpen(false);
    setProceed(false);
    setEnrollId(null);
    setChooseClassAgain(true);
    const notify = () => {
      toast.success("You have been dropout the class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    return axios({
      method: METHODS.DELETE,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${Class.id}/unregister`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        "unregister-all": "false",
      },
    }).then(() => {
      notify();
    });
  };

  const EnrolledAndTimer = ({ item }) => {
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
            <Button
              onClick={() => {
                setProceed(true);
              }}
              variant="contained"
              fullWidth
            >
              Join Now
            </Button>
          </ExternalLink>
        ) : Timer === "expired" ? (
          <Button disabled={true} variant="contained" fullWidth>
            Expired
          </Button>
        ) : (
          <Button disabled={true} variant="contained" fullWidth>
            Starts in {Timer}
          </Button>
        )}
      </>
    );
  };

  return (
    <Container sx={{ mt: 5, mb: 15 }} maxWidth="lg">
      {proceed ? (
        <>
          <Container maxWidth="sm">
            <Typography variant="h6">
              Please choose a class to attend
            </Typography>
            <Typography sx={{ mt: 2 }} variant="body1">
              Attending a class will help you observe how the teacher and
              students interact with each other. You may also stay a bit after
              the class to chat with the teacher. Once completed, please return
              to complete the onboarding.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <span style={{ fontWeight: "bold" }}>Note:</span> In case you
              missed to attend the previous class, it’s recommended to
              <Button
                variant="text"
                onClick={() => {
                  setProceed(false);
                  setEnrollId(null);
                  setChooseClassAgain(true);
                }}
              >
                enroll to another class
              </Button>
              else please proceed
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Checkbox />
              <Typography sx={{ ml: 2, mt: 2 }}>
                I have attended and got familiar with how classes are conducted
                on Meraki
              </Typography>
            </Box>
          </Container>
        </>
      ) : (
        <>
          <Container maxWidth="sm">
            <Typography variant="h6" gutterBottom>
              Please choose a class to attend
            </Typography>
            <Typography variant="body1" gutterBottom>
              Attending a class will help you observe how the teacher and
              students interact with each other. You may also stay a bit after
              the class to chat with the teacher. Once, completed please return
              to complete the onboarding
            </Typography>
            {!enrollId && (
              <TextField
                sx={{ mt: 2 }}
                type="date"
                id="outlined-basic"
                variant="outlined"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            )}
            {classData.length === 0 && !enrollId && (
              <Typography sx={{ mt: 2 }} color="error">
                There is no class on this date. Please choose another date or
                enroll with suggested class!
              </Typography>
            )}
            {sliceData.length === 1 && (
              <ClassCardContainer
                sliceData={sliceData}
                cSize={cSize}
                classes={classes}
                enrollId={enrollId}
                enrollClass={enrollClass}
                EnrolledAndTimer={EnrolledAndTimer}
                handleClickOpen={handleClickOpen}
                open={open}
                handleClose={handleClose}
                dropOutClass={dropOutClass}
              />
            )}
          </Container>
          {sliceData.length > 1 && (
            <ClassCardContainer
              sliceData={sliceData}
              cSize={cSize}
              classes={classes}
              enrollId={enrollId}
              enrollClass={enrollClass}
              EnrolledAndTimer={EnrolledAndTimer}
              handleClickOpen={handleClickOpen}
              open={open}
              handleClose={handleClose}
              dropOutClass={dropOutClass}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default AttendClass;
