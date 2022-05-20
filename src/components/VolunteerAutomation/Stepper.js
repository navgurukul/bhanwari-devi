import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { StepLabel, StepContent } from "@mui/material";
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
import { useSelector, useDispatch } from "react-redux";
// import { versionCode } from "../../constant"
import { METHODS } from "../../services/api";

import "./styles.scss";

function HorizontalLinearStepper() {
  const user = useSelector(({ User }) => User);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [disable, setDisable] = React.useState(true);

  const [contact, setContact] = useState();
  const [pathwayId, setPathwayId] = useState();

  console.log(contact, "contact");
  console.log(pathwayId, "pathwayId");

  const steps = [
    {
      label: "Verify Phone No.",
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
      component: (
        <SelectTrack setPathwayId={setPathwayId} setDisable={setDisable} />
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
      component: <AttendClass setDisable={setDisable} />,
    },
    {
      label: "Confirmation",
      component: <Confirmation setDisable={setDisable} />,
    },
  ];

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setDisable(true);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const submit = () => {
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/volunteers/Automation`,
      method: METHODS.POST,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        // versionCode: versionCode,
      },
      data: {
        contact: contact,
        pathway_id: pathwayId,
      },
    }).then(
      (res) => {
        console.log(res, "-------");
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
            console.log();
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
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
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
              <Button
                variant="contained"
                sx={{ color: "#6D6D6D", mr: 4 }}
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBackIosIcon />}
              >
                Back
              </Button>
              <Box />
              {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

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
                  Next Step
                </Button>
              )}

              {/* <Button
                color="primary"
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
                onClick={handleNext}
                disabled={disable}
              >
                {activeStep === steps.length - 1
                  ? "Go to Dashboard"
                  : " Next Step"}
              </Button> */}
            </Box>
          </Container>
        </React.Fragment>
      )}
    </Container>
  );
}

export default HorizontalLinearStepper;
