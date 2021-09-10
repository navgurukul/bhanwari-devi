import React, { useState, useEffect, useRef } from "react";
import CreateClassComponent from "../../components/Class";
import ClassesList from "../../components/Class/ClassList";
import { useSelector } from "react-redux";
import Modal from "../../components/common/Modal";
import "../../components/Class/ClassList/styles.scss";
import axios from "axios";
import { METHODS } from "../../services/api";

function ToggleClassFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [classToEdit, setClassToEdit] = useState({});
  const { data = [] } = useSelector(({ Class }) => Class.allClasses);
  const user = useSelector(({ User }) => User);
  const [calenderConsent, setCalenderConsent] = useState(true);
  const [autUrl, setAuthUrl] = useState("");

  const url = window.location.href;

  const toggleModalOpen = () => {
    setClassToEdit({});
    setShowModal(!showModal);
    CalenderConsent();
  };

  const editClass = (classId) => {
    setClassToEdit(data.find((classData) => classData.id === classId));
    setShowModal(true);
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
      });
  };

  const codeGenerate = () => {
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

  if (!calenderConsent) {
    codeGenerate();
  }

  const calledOnce = useRef(false);

  let code;
  if (url.includes("code")) {
    code = url.split("code=")[1].split("scope")[0];
    calledOnce.current = true;
  }

  useEffect(() => {
    if (calledOnce.current) {
      return axios({
        method: METHODS.PUT,
        url: `${process.env.REACT_APP_MERAKI_URL}/users/calendar/tokens`,
        headers: {
          accept: "application/json",
          Authorization: user.data.token,
          code: code,
        },
      }).then((res) => {
        if (res.data.success) {
          setShowModal(true);
        }
      });
    }
  }, [calledOnce]);

  return (
    <div>
      <button className="create-class-button" onClick={toggleModalOpen}>
        CREATE A CLASS
      </button>
      <ClassesList editClass={editClass} isShow={showModal} />
      {showModal && (
        <Modal onClose={toggleModalOpen}>
          <CreateClassComponent
            classToEdit={classToEdit}
            toggleModalOpen={toggleModalOpen}
          />
        </Modal>
      )}
      {autUrl && (window.location.href = autUrl)}
    </div>
  );
}

export default ToggleClassFormModal;
