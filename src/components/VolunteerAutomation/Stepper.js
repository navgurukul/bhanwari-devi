import React, { useState } from "react";
import { PATHS } from "../../constant";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { useHistory } from "react-router-dom";
import { StepLabel } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SelectTrack from "./SelectTrack";
import Confirmation from "./Confirmation";
import AttendClass from "./AttendClass";
import Availability from "./Availability";
import CodeOfConduct from "./CodeOfConduct";
import VerifyPhoneNo from "./VerifyPhoneNo";
import IntroVideo from "./IntroVideo";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { METHODS } from "../../services/api";
import { actions } from "../User/redux/action";
import { Link } from "react-router-dom";
import "./styles.scss";
import { getObjectState, saveObjectState } from "../../common/storage";

function HorizontalLinearStepper() {
  let history = useHistory();
  const user = useSelector(({ User }) => User);
  const roles = user?.data?.user.rolesList; // TODO: Use selector for this
  const uid = user?.data?.user.id; // TODO: Factor out common logic used for selected role PR # 660
  const allUsersState = getObjectState("volunteer_automation", "state");
  console.log(allUsersState, "4567890");
  const currentState = allUsersState?.[uid] || {
    completed: [],
  };
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(currentState.step || 0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [completed, setCompleted] = React.useState(currentState.completed);
  const [disable, setDisable] = React.useState(!completed[activeStep]);
  const [contact, setContact] = useState(currentState.contact);
  const [pathwayId, setPathwayId] = useState(currentState.pathwayId || []);
  const [enrollId, setEnrollId] = useState(currentState.enrollId || null);
  const [open, setOpen] = React.useState(false);
  const [nextButton, setNextButton] = React.useState("true");
  const [countryCode, setCountryCode] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const current_time = new Date();
  const [availability, setAvailability] = React.useState(
    currentState.availability || {
      hours_per_week: "",
      available_on_days: [],
      available_on_time: {
        first_time: current_time,
        second_time: current_time,
        third_time: current_time,
      },
    }
  );

  const itemValues = { contact, enrollId, pathwayId, availability };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateAndSaveState = (setter, key, value) => {
    setter && setter(value);
    currentState[key] = value;
    saveObjectState("volunteer_automation", "state", {
      ...allUsersState,
      [uid]: currentState,
    });
  };

  React.useEffect(() => {
    if (roles?.includes("volunteer")) {
      history.push(PATHS.CLASS);
    }
  }, [roles]);

  const setActiveStepCompleted = () => {
    const newCompleted = completed.slice();
    newCompleted[activeStep] = true;
    updateAndSaveState(setCompleted, "completed", newCompleted);
  };

  const steps = [
    {
      label: "Verify Phone No.",
      itemKey: "contact",
      component: (
        <VerifyPhoneNo
          contact={contact}
          setContact={setContact}
          setDisable={setDisable}
          setNextButton={setNextButton}
          phone={phone}
          setPhone={setPhone}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
        />
      ),
    },
    {
      label: "Select Track",
      itemKey: "pathwayId",
      component: (
        <SelectTrack
          setPathwayId={setPathwayId}
          pathwayId={pathwayId}
          setDisable={setDisable}
        />
      ),
    },
    {
      label: "Your Availability",
      itemKey: "availability",
      component: (
        <Availability
          setAvailability={setAvailability}
          availability={availability}
          setDisable={setDisable}
        />
      ),
    },
    {
      label: "Intro Video",
      component: <IntroVideo setDisable={setDisable} />,
    },
    {
      label: "Code of Conduct",
      component: <CodeOfConduct setDisable={setDisable} />,
    },
    // {
    //   label: "Attend Class",
    //   itemKey: "enrollId",
    //   component: (
    //     <AttendClass
    //       setEnrollId={updateAndSaveState.bind(null, setEnrollId, "enrollId")}
    //       enrollId={enrollId}
    //       pathwayId={pathwayId}
    //       setStepCompleted={setActiveStepCompleted}
    //       setDisable={setDisable}
    //       completed={completed[4]}
    //     />
    //   ),
    // },
    {
      label: "Confirmation",
      component: <Confirmation setDisable={setDisable} />,
    },
  ];

  console.log("data", {
    contact: contact,
    pathway_id: pathwayId,
    ...availability,
  });

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const setActiveStepHandler = (changeBy, prevActiveStep) => {
    const itemKey = steps[prevActiveStep]?.itemKey;
    const currentStep = prevActiveStep + changeBy;

    console.log("currentStep", currentStep);

    if (itemKey && !disable) {
      // button was enabled by Component for this step so it's completed
      //     and we should therefore update the state for this key
      currentState[itemKey] = itemValues[itemKey];
    }

    setDisable(!completed[currentStep]);

    updateAndSaveState(null, "step", currentStep);
    return currentStep;
  };

  const handleNext = () => {
    let newSkipped = skipped;
    setActiveStepCompleted();
    // currentState.completed should be present if the user didn't
    //     alter their localStorage but we'll check anyway to avoid a crash
    //currentState.completed && (currentState.completed[activeStep] = true);

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(setActiveStepHandler.bind(null, 1));
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(setActiveStepHandler.bind(null, -1));
  };

  const submit = () => {
    const contactNumber = contact.split("+")[1].split(" ").join("-");
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/volunteers/Automation`,
      method: METHODS.POST,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
      data: {
        contact: contactNumber,
        pathway_id: pathwayId,
        ...availability,
      },
    }).then(
      (res) => {
        localStorage.setItem("isNewVolunteer", true);
        history.push(PATHS.CLASS);
        return axios({
          url: `${process.env.REACT_APP_MERAKI_URL}/users/volunteerRole`,
          method: METHODS.POST,
          headers: {
            accept: "application/json",
            Authorization: user.data.token,
          },
        }).then(
          (res) => {
            console.log("res", res);

            dispatch(
              actions.onUserRefreshDataIntent({ token: user.data.token })
            );
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <AppBar position="static" color="background" elevation={2}>
        <Toolbar>
          <IconButton>
            <CloseIcon onClick={handleClickOpen} />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Leave Registration?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Goals can change all the time. However, we will keep your
                registration progress intact in case you return back.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Link
                style={{ textDecoration: "none" }}
                to={PATHS.VOLUNTEER_AUTOMATION}
              >
                <Button color="error">Leave</Button>
              </Link>
              <Button style={{ color: "#2E2E2E" }} onClick={handleClose}>
                Stay on Page
              </Button>
            </DialogActions>
          </Dialog>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
            Tutor Registration
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 8 }} maxWidth="lg">
        <div
          className="example"
          style={{
            overflowX: "scroll",
          }}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const stepProps = {};
              const labelProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={step.label} {...stepProps}>
                  <StepLabel sx={{ minWidth: "125px" }} {...labelProps}>
                    {step.label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <React.Fragment>
          <>
            {steps.map((step, index) => {
              console.log(typeof index, "index");
              console.log(typeof activeStep, "type");
              if (activeStep === index) {
                return (
                  <Box>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      {step.component}
                    </Typography>
                  </Box>
                );
              }
            })}
          </>
          <Container maxWidth="sm">
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "row",
                pt: 2,
                pb: 5,
              }}
            >
              {activeStep > 0 && (
                <Button
                  variant="text"
                  sx={{ color: "#6D6D6D", mr: 4 }}
                  color="inherit"
                  onClick={handleBack}
                  startIcon={<ArrowBackIosIcon />}
                >
                  Back
                </Button>
              )}

              <Box />
              {activeStep === steps.length - 1 ? (
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={submit}
                >
                  Go to Dashboard
                </Button>
              ) : (
                nextButton && (
                  <Button
                    color="primary"
                    variant="contained"
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={handleNext}
                    disabled={disable}
                  >
                    Next
                  </Button>
                )
              )}
            </Box>
          </Container>
        </React.Fragment>
      </Container>
    </>
  );
}

export default HorizontalLinearStepper;
