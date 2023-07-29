import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Button, Box, useMediaQuery, Modal } from "@mui/material";
import { breakpoints } from "../../theme/constant";
import NewVolunteerCard from "../../components/Class/NewVolunteerCard";
import SuccessModel from "../../components/Class/SuccessModel";
import ClassesList from "../../components/Class/ClassList";
import ClassFormModal from "./ClassFormModal";

function ClassManagementPage() {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("batch");
  const [classToEdit, setClassToEdit] = useState({});
  const [indicator, setIndicator] = useState(false);
  const [openSuccessfullModal, setOpenSuccessfullModal] = useState(false);

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");

  const { data = [] } = useSelector(({ Class }) => Class.allClasses);
  const user = useSelector(({ User }) => User);

  const canSpecifyFacilitator = user.data.user.rolesList.includes("admin");

  const [newVolunteer, setNewVolunteer] = useState(false);

  useEffect(() => {
    const newVol = localStorage.getItem("isNewVolunteer");
    if (newVol === "true" && newVol != null) {
      setNewVolunteer(true);
    } else {
      setNewVolunteer(false);
    }
  }, []);

  const toggleModalOpen = () => {
    setShowModal(true);
  };

  const editClass = (classId, indicator) => {
    setClassToEdit(data.find((classData) => classData.id === classId));
    setShowModal(true);
    setIndicator(indicator);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: "40px", width: "90%" }}>
      {canSpecifyFacilitator && (
        <span>
          {newVolunteer && (
            <NewVolunteerCard setNewVolunteer={setNewVolunteer} />
          )}

          <Box sx={{ display: isActive ? "block" : "flex", direction: "row" }}>
            <Button
              variant="contained"
              style={{
                width: isActive ? "100%" : isActiveIpad ? "60%" : "19%",
              }}
              onClick={() => {
                setFormType("batch");
                toggleModalOpen();
              }}
              sx={{ m: !isActive ? "10px 16px 20px 5px" : "0px 0px" }}
            >
              Create Batch
            </Button>
            <Button
              variant="outlined"
              style={{
                width: isActive ? "100%" : isActiveIpad ? "60%" : "19%",
              }}
              onClick={() => {
                setFormType("doubt_class");
                toggleModalOpen();
              }}
              sx={{ m: !isActive ? "10px 8px 20px 10px" : "16px 0px " }}
            >
              Create Doubt Class
            </Button>
          </Box>
        </span>
      )}
      <ClassesList editClass={editClass} />
      <ClassFormModal
        showModal={showModal}
        setShowModal={setShowModal}
        isEditMode={true}
        indicator={indicator}
        classToEdit={classToEdit}
        formType={formType}
        setOpenSuccessfullModal={setOpenSuccessfullModal}
      />
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
    </Container>
  );
}

export default ClassManagementPage;
