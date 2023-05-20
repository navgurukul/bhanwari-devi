import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import CreateClassComponent from "../../components/Class";
import ClassesList from "../../components/Class/ClassList";
import { useSelector } from "react-redux";
import "../../components/Class/ClassList/styles.scss";
import axios from "axios";
import { METHODS } from "../../services/api";
import "./styles.scss";
import useStyles from "./styles";
import {
  Container,
  Button,
  Modal,
  useMediaQuery,
  Box,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Drawer,
  Grid,
} from "@mui/material";
import { breakpoints } from "../../theme/constant";
import ClassForm from "../../components/Class/ClassForm";

import SuccessModel from "../../components/Class/SuccessModel";
import NewVolunteerCard from "../../components/Class/NewVolunteerCard";
import DrawerLeft from "./Drawer";
import { Divider } from "@material-ui/core";

function ToggleClassFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("batch");
  const [classToEdit, setClassToEdit] = useState({});
  const [indicator, setIndicator] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const { data = [] } = useSelector(({ Class }) => Class.allClasses);
  const user = useSelector(({ User }) => User);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [openSuccessfullModal, setOpenSuccessfullModal] = useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const classes = useStyles();

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");

  const rolesList = user.data.user.rolesList;
  const canSpecifyFacilitator = rolesList.indexOf("admin") > -1;

  const [calenderConsent, setCalenderConsent] = useState(true);
  const [authUrl, setAuthUrl] = useState("");
  const [showClass, setShowClasses] = useState(true);
  const url = window.location.href;

  const toggleModalOpen = () => {
    // setFormType();
    setClassToEdit({});
    // setShowModal(!showModal);
    CalenderConsent();
  };

  //here can check
  const editClass = (classId, indicator) => {
    setClassToEdit(data.find((classData) => classData.id === classId));
    setIsEditMode(true);
    setShowModal(true);
    setIndicator(indicator);
  };

  const CalenderConsent = () => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/calendar/tokens`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      if (res.data.success) {
        setCalenderConsent(true);
        setShowModal(true);
      } else {
        setCalenderConsent(false);
        setShowConsentModal(true);
        setShowModal(false);
      }
    });
  };

  const handleClose = () => {
    setShowConsentModal(false);
  };

  const codeGenerate = async () => {
    return axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/calendar/generateAuthURL`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setAuthUrl(res.data.url);
    });
  };
  console.log(editClass);
  // console.log("authUrl", authUrl);

  const calledOnce = useRef(false);
  const history = useHistory();

  useEffect(() => {
    let code;
    let payload;
    let user_id;
    let user_email;
    if (url.includes("code")) {
      const decodedUri = decodeURIComponent(url);
      user_id = decodedUri.split("=")[2].split("+")[0];
      user_email = decodedUri.split("=")[3].split("&")[0];
      code = url.split("code=")[1].split("scope")[0];
      console.log("code", code);
      payload = {
        ...payload,
        user_id: parseInt(user_id, 10),
        user_email: user_email,
      };
      calledOnce.current = true;
    }
    if (calledOnce.current) {
      return axios({
        method: METHODS.PUT,
        url: `${process.env.REACT_APP_MERAKI_URL}/users/calendar/tokens`,

        headers: {
          accept: "application/json",
          Authorization: user.data.token,
          code: code,
        },
        data: payload,
      }).then((res) => {
        if (res.data.success) {
          setShowModal(true);
          history.push("/class");
        }
      });
    }
  }, [calledOnce]);
  const [newVolunteer, setNewVolunteer] = useState(false);
  useEffect(() => {
    const newVol = localStorage.getItem("isNewVolunteer");
    if (newVol == "true" && newVol != null) {
      setNewVolunteer(true);
    } else {
      setNewVolunteer(false);
    }
  }, [newVolunteer]);
  return (
    <Container sx={{ mt: "40px", width: "90%" }}>
      <Grid container>
        <Grid item>
          <DrawerLeft />
        </Grid>
        <Grid item md={9}>
          {canSpecifyFacilitator && (
            <span>
              {newVolunteer && (
                <NewVolunteerCard setNewVolunteer={setNewVolunteer} />
              )}
              <Typography variant="h6">Python</Typography>
              <Grid container marginTop="32px" gap={6}>
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    onClick={() => {
                      setShowClasses(true);
                    }}
                    style={{ cursor: "pointer" }}
                    color="primary.main"
                  >
                    Batches
                  </Typography>
                  <Divider classname={classes.dividerColor} />
                </Grid>
                <Grid>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    variant="subtitle2"
                    onClick={() => {
                      setShowClasses(false);
                    }}
                  >
                    Doubt Classes
                  </Typography>
                </Grid>
              </Grid>
              <Divider />

              <ClassesList
                editClass={editClass}
                isShow={showModal}
                // setIsEditMode={setIsEditMode}
                showClass={showClass}
                setFormType={setFormType}
                toggleModalOpen={toggleModalOpen}
              />
            </span>
          )}

          {showModal && calenderConsent ? (
            <Modal
              open={showModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{ overflow: "scroll" }}
            >
              <ClassForm
                isEditMode={isEditMode}
                indicator={indicator}
                classToEdit={classToEdit}
                formType={formType}
                setShowModal={setShowModal}
                setOpenSuccessfullModal={setOpenSuccessfullModal}
              />
              {/* <CreateClassComponent
            classToEdit={classToEdit}
            indicator={indicator}
            toggleModalOpen={toggleModalOpen}
          /> */}
            </Modal>
          ) : (
            showConsentModal && (
              <Dialog
                open={showConsentModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                  style: {
                    minWidth: "45%",
                    borderRadius: 8,
                  },
                }}
              >
                <DialogTitle>
                  <Typography variant="h6" align="center">
                    Meraki needs access to your calendar to create classes.{" "}
                    <br />
                    Do you want to go ahead?
                  </Typography>
                </DialogTitle>
                <Stack alignItems="center">
                  <DialogActions>
                    <Box sx={{ display: "flex", mb: 2 }}>
                      <Button
                        onClick={codeGenerate}
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
            )
          )}

          {openSuccessfullModal && (
            <Modal
              open={openSuccessfullModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{ overflow: "scroll" }}
            >
              <SuccessModel />
            </Modal>
          )}
        </Grid>
      </Grid>

      {authUrl && (window.location.href = authUrl)}
    </Container>
  );
}

export default ToggleClassFormModal;
