import React from "react";
import CreateClassComponent from '../../components/Class'
import ClassesList from '../../components/Class/ClassesList'
import Modal from '../../components/common/Modal'
import "../../components/Class/ClassesList/styles.scss"


function CreateClass() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

 
  return (
    <div>
       <button
       className="create-class-button"
       onClick={handleClickOpen}
      >
      CREATE A CLASS
      </button>
    <ClassesList/>
    {open ? (
      <Modal onClose = {() => handleClickOpen()}>
        <CreateClassComponent />
        </Modal>
      ) : 
      null}

    
  
   </div>
  )
}

export default CreateClass;
