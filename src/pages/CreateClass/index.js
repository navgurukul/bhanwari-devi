import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
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
  const [show, setShow] = useState(false);
  const { data = [] } = useSelector(({ Class }) => Class.allClasses);
  const user = useSelector(({ User }) => User);
  const [calenderConsent, setCalenderConsent] = useState(true);
  const [authUrl, setAuthUrl] = useState("");

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
        setShow(true);
      });
  };

  const handleClose = () => {
    setShow(false);
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

  useEffect(async () => {
    let code;
    let payload;
    let user_id;
    let user_email;
    if (url.includes("code")) {
      const decodedUri = url.replace(/%3D/g, "=").replace("%2B", "+");
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
    <div>
      <button className="create-class-button" onClick={toggleModalOpen}>
        CREATE A CLASS
      </button>
      <ClassesList editClass={editClass} isShow={showModal} />
      {showModal && calenderConsent ? (
        <Modal onClose={toggleModalOpen}>
          <CreateClassComponent
            classToEdit={classToEdit}
            toggleModalOpen={toggleModalOpen}
          />
        </Modal>
      ) : (
        show && (
          <Modal onClick={handleClose} className="confirmation-massage">
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

      {authUrl && (window.location.href = authUrl)}
    </div>
  );
}

export default ToggleClassFormModal;
