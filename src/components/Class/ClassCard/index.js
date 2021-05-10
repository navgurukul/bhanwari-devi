import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";
import { METHODS } from "../../../services/api";
import "./styles.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../common/Modal";

toast.configure();

function ClassCard(props) {
  const [showModel, setShowModel] = React.useState(false);
  const [enrollClassId, setenrollClassId] = React.useState(0);
  const user = useSelector(({ User }) => User);

  const { item, index, handleDeleteData } = props;

  const classStartTime = item.start_time && item.start_time.replace("Z", "");
  const classEndTime = item.end_time && item.end_time.replace("Z", "");

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
    doubt_class: "Doubt Class",
    workshop: "Workshop",
  };

  const handleClose = () => {
    setShowModel(false);
  };

  const handleClickOpen = (id) => {
    setenrollClassId(id);
    setShowModel(!showModel);
  };

  const rolesList = user.data.user.rolesList;
  let flag = false;
  rolesList.map((role) => {
    role === "classAdmin" || role === "dumbeldore"
      ? (flag = true)
      : (flag = false);
  });

  const deleteHandler = (id) => {
    const notify = () => {
      toast.success(" Deleted the class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    };
    setShowModel(!showModel);
    return axios({
      method: METHODS.DELETE,
      url: `${process.env.REACT_APP_MERAKI_URL}/apiDocs/classes/${id}`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then(() => {
      notify();
      handleDeleteData(id);
    });
  };
  return (
    <div key={index} className="class-card">
      <div className="card-content">
        <div className="card-heading">
          <div className="title">{item.title}</div>
          <div className="class-type">{languageMap[item.type]}</div>
        </div>
        <div className="class-detail">
          <p>Facilitator Name : {item.facilitator.name} </p>
          <p>Language : {languageMap[item.lang]} </p>
          <p>Date:{moment(classStartTime).format("DD-MM-YYYY")} </p>
          <p>
            Time:{moment(classStartTime).format("hh:mm a")} -{" "}
            {moment(classEndTime).format("hh:mm a")}
          </p>
        </div>
        {item.facilitator.email === user.data.user.email || flag ? (
          <button
            className="delete-button"
            onClick={() => {
              handleClickOpen(item.id);
            }}
          >
            Delete
          </button>
        ) : null}

        {showModel ? (
          <Modal
            onClose={() => handleClickOpen()}
            className="confirmation-massage"
          >
            <h2>Are you sure you want to delete this class?</h2>
            <div className="wrap">
              <button
                onClick={() => {
                  return deleteHandler(enrollClassId);
                }}
                className="delete-btn"
              >
                Yes
              </button>
              <button onClick={handleClose} className="cancel-btn">
                Cancel
              </button>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
}

export default ClassCard;
