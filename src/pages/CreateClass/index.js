import React, { useState } from "react";
import CreateClassComponent from "../../components/Class";
import ClassesList from "../../components/Class/ClassList";
import { useSelector } from "react-redux";
import Modal from "../../components/common/Modal";
import "../../components/Class/ClassList/styles.scss";

function ToggleClassFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [classToEdit, setClassToEdit] = useState({});
  const [indicator, setIndicator] = useState(false);
  const { data = [] } = useSelector(({ Class }) => Class.allClasses);

  const toggleModalOpen = () => {
    setClassToEdit({});
    setShowModal(!showModal);
  };

  const editClass = (classId, indicator) => {
    setClassToEdit(data.find((classData) => classData.id === classId));
    setShowModal(true);
    setIndicator(indicator);
  };

  return (
    <div>
      <button className="create-class-button" onClick={toggleModalOpen}>
        CREATE A CLASS
      </button>
      <ClassesList editClass={editClass} isShow={showModal} />
      {showModal ? (
        <Modal onClose={toggleModalOpen}>
          <CreateClassComponent
            classToEdit={classToEdit}
            indicator={indicator}
            toggleModalOpen={toggleModalOpen}
          />
        </Modal>
      ) : null}
    </div>
  );
}

export default ToggleClassFormModal;
