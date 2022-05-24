import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { dateTimeFormat, lang, TimeLeft } from "../../constant";
import AlertDialog from "./AlertDialog";
import DropOut from "./DropOut";

export const MoreDetails = (props) => {
  const { open, setOpen } = props;

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const { actions, value } = props;
  console.log(actions, value);
  const toggleDrawer = (changeTo) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(changeTo);
  };
  const [ConfirmationOpen, setConfirmationOpen] = useState(false);

  const [openDropOut, setOpenDropOut] = useState(false);
  const anchorPos = "right";
  const close = () => {
    setConfirmationOpen(false);
  };
  let [TimeLefts, setTimeLefts] = useState(TimeLeft(actions.start_time));
  var ONE_MINUTE = 60 * 1000;
  setInterval(() => {
    setTimeLefts(TimeLeft(actions.start_time));
    console.log("TimeChange");
  }, ONE_MINUTE);
  const closeDropOut = () => {
    setOpenDropOut(false);
  };
  return (
    <div>
      <SwipeableDrawer
        anchor={anchorPos}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{
            width: anchorPos === "top" || anchorPos === "bottom" ? "auto" : 350,
          }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Box m={4}>
            <Typography variant="h5" mb={2}>
              Doubt Class
            </Typography>
            <Typography variant="h6" mb={1}>
              {actions?.title}
            </Typography>
            <Box mb={3}>
              <Button
                variant="outlined"
                color="secondary"
                style={{
                  borderRadius: 90,
                  height: 30,
                  backgroundColor: "#DADAEC",
                }}
              >
                <Typography variant="body2">Doubt Class</Typography>
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginLeft: 10, borderRadius: 90, height: 30 }}
              >
                <Typography variant="body2">{lang[actions?.lang]}</Typography>
              </Button>
            </Box>
            <Typography variant="body">
              Clear your doubts related to the first class of Python and other
              queries during your studies
            </Typography>
            <Typography
              variant="body2"
              mt={2}
              style={{
                display: "flex",
                padding: "10px 0",
              }}
            >
              <img
                className={classes.icons}
                src={require("./assets/calender.svg")}
                alt="Students Img"
              />
              {actions?.start_time
                ? dateTimeFormat(actions?.start_time).finalDate
                : ""}
              ,
              {actions?.start_time
                ? dateTimeFormat(actions?.start_time).finalTime
                : ""}{" "}
              -
              {actions?.end_time
                ? dateTimeFormat(actions?.end_time).finalTime
                : ""}
            </Typography>
            <Typography
              variant="body1"
              mb={2}
              style={{
                display: "flex",
              }}
            >
              {" "}
              <img
                className={classes.icons}
                src={require("./Revision/assets/Group.svg")}
                alt="Students Img"
              />
              {actions?.facilitator_name}
            </Typography>
            <Typography variant="body" color="text.secondary" mb={2}>
              Please join at least 10 mintues before the scheduled time
            </Typography>
            {actions?.is_enrolled ? (
              <>
                {TimeLefts == "joinNow" ? (
                  <a
                    style={{
                      textDecoration: "none",
                    }}
                    href={actions?.meet_link}
                    target="_blank"
                  >
                    <Button
                      variant="contained"
                      style={{ marginTop: 20 }}
                      fullWidth
                    >
                      Join Now
                    </Button>
                  </a>
                ) : (
                  <Button
                    disabled={true}
                    variant="contained"
                    sx={{ fontSize: "1rem" }}
                    fullWidth
                    style={{ marginTop: 20 }}
                  >
                    Starts in {TimeLefts}
                  </Button>
                )}
                <DropOut
                  open={openDropOut}
                  close={closeDropOut}
                  title={actions?.title}
                  id={actions?.id}
                />
                <Typography
                  align="center"
                  mt={2}
                  onClick={() => {
                    setOpenDropOut(true);
                  }}
                  variant="body2"
                  color="red"
                >
                  can`t attend?
                </Typography>{" "}
              </>
            ) : (
              <Button
                variant="contained"
                fullWidth
                style={{ marginTop: 20 }}
                onClick={() => setConfirmationOpen(true)}
              >
                Enroll
              </Button>
            )}
          </Box>
        </Box>
      </SwipeableDrawer>
      <AlertDialog
        open={ConfirmationOpen}
        close={close}
        title={actions?.title}
        start_time={actions?.start_time}
        end_time={actions?.end_time}
        id={actions?.id}
      />
    </div>
  );
};

const DoubtClassExerciseComponent = (props) => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const { actions, value } = props;
  const [open, setOpen] = useState(false);
  const start_time = dateTimeFormat(actions?.start_time);
  const end_time = dateTimeFormat(actions?.end_time);

  return !actions?.is_enrolled ? (
    <>
      <Box backgroundColor="primary.light" p={2} mt={2}>
        <Typography
          variant="body1"
          mb={1}
          align="left"
          style={{
            display: "flex",
          }}
        >
          {" "}
          <img
            className={classes.icons}
            src={require("./Revision/assets/Group.svg")}
            alt="Students Img"
          />
          Need help? We got you covered. Enroll in the doubt class on{" "}
          {start_time.finalDate}
          at {start_time.finalTime} - {end_time.finalTime}
        </Typography>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            endIcon={<ArrowForwardIosIcon />}
            onClick={() => {
              setOpen(true);
            }}
            sx={{
              width: isActive ? "90%" : "215px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            View Class Details
          </Button>
        </div>
      </Box>
      <MoreDetails
        open={open}
        setOpen={setOpen}
        actions={actions}
        value={value}
      />
    </>
  ) : (
    <>
      <MoreDetails
        open={open}
        setOpen={setOpen}
        actions={actions}
        value={value}
      />

      <>
        <Box
          onClick={() => {
            setOpen(true);
          }}
          fullWidth
          boxShadow={3}
          mt={4}
          p={2}
        >
          <Box
            style={{ margin: "20px 0" }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <svg
              width="8"
              height="9"
              viewBox="0 0 8 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4.5" r="4" fill="#FFC107" />
            </svg>
            <Typography variant="body2" ml={1}>
              Upcoming Doubt Class
            </Typography>
          </Box>
          <Typography variant="subtitle1" mt={1}>
            {actions.title}
          </Typography>
          <Typography variant="body2" mt={1}>
            {dateTimeFormat(actions.start_time).finalDate}
          </Typography>
          <Typography variant="body2" mt={1}>
            {dateTimeFormat(actions.start_time).finalTime} to{" "}
            {dateTimeFormat(actions.end_time).finalTime}
          </Typography>
        </Box>
      </>
    </>
  );
};
export default DoubtClassExerciseComponent;
