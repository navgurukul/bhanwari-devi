import React from "react";
import CreateClassComponent from "../../components/Class";
import ClassesList from "../../components/Class/ClassList";
import Modal from "../../components/common/Modal";
import "../../components/Class/ClassList/styles.scss";

function ToggleClassFormModal() {
  const [showModel, setShowModel] = React.useState(false);

  const handleClickOpen = () => {
    setShowModel(!showModel);
  };
  return (
    <div>
      <button className="create-class-button" onClick={handleClickOpen}>
        CREATE A CLASS
      </button>
      <ClassesList />
      {showModel ? (
        <Modal onClose={() => handleClickOpen()}>
          <CreateClassComponent />
        </Modal>
      ) : null}
    </div>
  );
}

export default ToggleClassFormModal;
