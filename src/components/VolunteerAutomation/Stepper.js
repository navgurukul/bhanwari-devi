import React, { useState, useEffect } from "react";
import { PATHS } from "../../constant";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { useHistory } from "react-router-dom";
import { StepLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SelectTrack from "./SelectTrack";
import Confirmation from "./Confirmation";
import AttendClass from "./AttendClass";
import CodeOfConduct from "./CodeOfConduct";
import VerifyPhoneNo from "./VerifyPhoneNo";
import IntroVideo from "./IntroVideo";
import axios from "axios";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";

import "./styles.scss";
import { getObjectState, saveObjectState } from "../../common/storage";

function HorizontalLinearStepper() {
  let history = useHistory();
  const currentState = getObjectState("volunteer_automation", "state") || {
    completed: [],
  };
  const user = useSelector(({ User }) => User);
  const [activeStep, setActiveStep] = React.useState(currentState.step || 0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [completed, setCompleted] = React.useState(currentState.completed);
  const [disable, setDisable] = React.useState(!completed[activeStep]);
  const [contact, setContact] = useState(currentState.contact);
  const [pathwayId, setPathwayId] = useState(currentState.pathwayId);
  const [enrollId, setEnrollId] = useState(currentState.enrollId || null);
  const itemValues = { contact, enrollId, pathwayId };

  const updateAndSaveState = (setter, key, value) => {
    setter && setter(value);
    currentState[key] = value;
    saveObjectState("volunteer_automation", "state", currentState);
  };

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
      label: "Intro Video",
      component: <IntroVideo setDisable={setDisable} />,
    },
    {
      label: "Code of Conduct",
      component: <CodeOfConduct setDisable={setDisable} />,
    },
    {
      label: "Attend Class",
      itemKey: "enrollId",
      component: (
        <AttendClass
          setEnrollId={updateAndSaveState.bind(null, setEnrollId, "enrollId")}
          enrollId={enrollId}
          pathwayId={pathwayId}
          setStepCompleted={setActiveStepCompleted}
          setDisable={setDisable}
          completed={completed[4]}
        />
      ),
    },
    {
      label: "Confirmation",
      component: <Confirmation setDisable={setDisable} />,
    },
  ];

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const setActiveStepHandler = (changeBy, prevActiveStep) => {
    const itemKey = steps[prevActiveStep]?.itemKey;
    const currentStep = prevActiveStep + changeBy;

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
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/volunteers/Automation`,
      method: METHODS.POST,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
      data: {
        contact: contact,
        pathway_id: pathwayId,
      },
    }).then(
      (res) => {
        history.push(PATHS.CLASS);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Container sx={{ mt: 4 }} maxWidth="lg">
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
            if (activeStep == index) {
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
              <Button
                color="primary"
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
                onClick={handleNext}
                disabled={disable}
              >
                Next
              </Button>
            )}
          </Box>
        </Container>
      </React.Fragment>
    </Container>
  );
}

export default HorizontalLinearStepper;
