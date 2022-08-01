import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import CreateClassComponent from "../../components/Class";
import ClassesList from "../../components/Class/ClassList";
import { useSelector } from "react-redux";
// import Modal from "../../components/common/Modal";
import "../../components/Class/ClassList/styles.scss";
import axios from "axios";
import { METHODS } from "../../services/api";
import "./styles.scss";
import {
  Container,
  Button,
  Modal,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import ClassForm from "../../components/Class/ClassForm";
import useStyles from "./styles";
import SuccessModel from "../../components/Class/SuccessModel";

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

  const rolesList = user.data.user.rolesList;
  const canSpecifyFacilitator =
    rolesList.indexOf("volunteer") > -1 || rolesList.indexOf("admin") > -1;

  const [calenderConsent, setCalenderConsent] = useState(true);
  const [authUrl, setAuthUrl] = useState("");

  const url = window.location.href;

  const toggleModalOpen = () => {
    // setFormType();
    setClassToEdit({});
    setShowModal(!showModal);
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
    })
      .then((res) => {
        setCalenderConsent(true);
      })
      .catch((err) => {
        setCalenderConsent(false);
        setShowConsentModal(true);
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

  return (
    <Container maxWidth="xl" sx={{ mt: "40px", width: "100%" }}>
      {canSpecifyFacilitator && (
        <Button
          variant="contained"
          onClick={toggleModalOpen}
          sx={{ m: "10px 0 40px 0px", width: "256px", height: "48px" }}
        >
          Create Batch
        </Button>
      )}
      <ClassesList
        editClass={editClass}
        isShow={showModal}
        // setIsEditMode={setIsEditMode}
      />
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
          <Modal onClose={handleClose} className="confirmation-for-consent">
            <h2>
              Meraki needs access to your calendar to create classes. <br />
              Do you want to go ahead?
            </h2>
            <div className="wrap">
              <button onClick={codeGenerate} className="delete-btn">
                Yes
              </button>
              <button onClick={handleClose} className="cancel-btn">
                No
              </button>
            </div>
          </Modal>
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

      {authUrl && (window.location.href = authUrl)}
    </Container>
  );
}

export default ToggleClassFormModal;
