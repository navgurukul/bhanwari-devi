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
  const [enrollShowModel, setEnrollShowModel] = React.useState(false);
  const [unenrollShowModel, setunenrollShowModel] = React.useState(false);
  const [showModel, setShowModel] = React.useState(false);
  const [enrollClassId, setenrollClassId] = React.useState(0);
  const [unEnrollClassId, setUnEnrollClassId] = React.useState(0);
  const [deleteClassId, setdeleteClassId] = React.useState(0);
  const user = useSelector(({ User }) => User);
  const { item, handleDeleteData } = props;
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
    setdeleteClassId(id);
    setShowModel(!showModel);
  };

  const handleCloseEnroll = () => {
    setEnrollShowModel(false);
  };
  const handleClickOpenEnroll = (id) => {
    setenrollClassId(id);
    setEnrollShowModel(!enrollShowModel);
  };

  const handleCloseUnenroll = () => {
    setunenrollShowModel(false);
  };
  const handleClickOpenUnenroll = (id) => {
    setUnEnrollClassId(id);
    setunenrollShowModel(!unenrollShowModel);
  };

  const rolesList = user.data.user.rolesList;
  let flag = false;
  rolesList.map((role) => {
    role === "classAdmin" || role === "dumbeldore"
      ? (flag = true)
      : (flag = false);
  });

  // API CALL FOR DELETE CLASS
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
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${id}`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then(() => {
      notify();
      handleDeleteData(id);
    });
  };
  // API CALL FOR enroll class
  const handleSubmit = (Id) => {
    const notify = () => {
      toast.success("You have been enrolled to class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    };
    setEnrollShowModel(!enrollShowModel);
    axios

      .post(
        `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.data.token,
          },
        }
      )
      .then(() => {
        notify();
      });
  };

  // API CALL FOR DROP OUT
  const handleDelete = (Id) => {
    const notify = () => {
      toast.success("You have been dropped out of class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    };
    setunenrollShowModel(!unenrollShowModel);
    return axios({
      method: METHODS.DELETE,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/unregister`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then(() => {
      notify();
    });
  };
  return (
    <div className="class-card ">
      <div className="class-details">
        <span className="class-type">
          {languageMap[item.type]}
          {item.enrolled == true ? (
            <i className="check-icon check-icon fa fa-check-circle">
              {" "}
              Enrolled
            </i>
          ) : null}
        </span>
        <h4>{item.title}</h4>
        <p>Facilitator Name : {item.facilitator.name} </p>
        <p>Language : {languageMap[item.lang]} </p>
        <p>Date:{moment(classStartTime).format("DD-MM-YYYY")} </p>
        <p>
          Time:{moment(classStartTime).format("hh:mm a")} -{" "}
          {moment(classEndTime).format("hh:mm a")}
        </p>
        <div className="bottom-details">
          {!item.enrolled ? (
            <button
              type="submit"
              className="class-enroll"
              onClick={() => {
                handleClickOpenEnroll(item.id);
              }}
            >
              Enroll to class
            </button>
          ) : (
            <button
              type="submit"
              className="class-drop-out"
              onClick={() => {
                handleClickOpenUnenroll(item.id);
              }}
            >
              Drop out
            </button>
          )}

          {item.facilitator.email === user.data.user.email || flag ? (
            <i
              className="class-card-action-icon fa fa-trash"
              onClick={() => handleClickOpen(item.id)}
            />
          ) : null}
        </div>
        {showModel ? (
          <Modal
            onClose={() => handleClickOpen()}
            className="confirmation-massage"
          >
            <h2>Are you sure you want to delete this class?</h2>
            <div className="wrap">
              <button
                onClick={() => {
                  return deleteHandler(deleteClassId);
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
        {enrollShowModel ? (
          <Modal
            onClose={() => handleCloseEnroll()}
            className="confirmation_massage-for-enroll"
          >
            <h2>Are you sure you do you want to enroll?</h2>
            <div className="wrap">
              <button
                onClick={() => {
                  return handleSubmit(enrollClassId);
                }}
                className="enroll-btn"
              >
                Yes
              </button>
              <button onClick={handleCloseEnroll} className="cancel-btn">
                Cancel
              </button>
            </div>
          </Modal>
        ) : null}
        {unenrollShowModel ? (
          <Modal
            onClose={() => handleCloseUnenroll()}
            className="confirmation_massage-for-enroll"
          >
            <h2> Are you sure you do you want to drop out</h2>
            <div className="wrap">
              <button
                onClick={() => {
                  return handleDelete(unEnrollClassId);
                }}
                className="delete-btn"
              >
                Yes
              </button>
              <button onClick={handleCloseUnenroll} className="cancel-btn">
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
