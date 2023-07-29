/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";
import { Modal, Button } from "@mui/material";
import ClassForm from "../../components/Class/ClassForm";

function ClassFormModal({
  showModal,
  setShowModal,
  isEditMode,
  indicator,
  classToEdit,
  formType,
  setOpenSuccessfullModal,
}) {
  const user = useSelector(({ User }) => User);
  const [calenderConsent, setCalenderConsent] = useState(true);
  const [authUrl, setAuthUrl] = useState("");

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
        if (res.data.success) {
          setCalenderConsent(true);
          setShowModal(true);
        } else {
          setCalenderConsent(false);
          codeGenerate(); // Call codeGenerate function to generate consent URL
        }
      })
      .catch((error) => {
        console.log("Error fetching calendar consent:", error);
      });
  };

  const codeGenerate = () => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/calendar/generateAuthURL`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    })
      .then((res) => {
        setAuthUrl(res.data.url);
      })
      .catch((error) => {
        console.log("Error generating calendar consent URL:", error);
      });
  };

  useEffect(() => {
    CalenderConsent();
  }, []);

  useEffect(() => {
    if (authUrl) {
      window.location.href = authUrl;
    }
  }, [authUrl]);

  return (
    <>
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
        </Modal>
      ) : null}

      {authUrl ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => (window.location.href = authUrl)}
          style={{ margin: "10px" }}
        >
          Grant Calendar Consent
        </Button>
      ) : null}
    </>
  );
}

export default ClassFormModal;
