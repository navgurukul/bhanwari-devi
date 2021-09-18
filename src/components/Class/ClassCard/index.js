import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { METHODS } from "../../../services/api";
import { actions as classActions } from "../redux/action";
import "./styles.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../common/Modal";

toast.configure();

function ClassCard({ item, editClass, enroll, style }) {
  const dispatch = useDispatch();
  const [enrollShowModal, setEnrollShowModal] = React.useState(false);
  const [unenrollShowModal, setunenrollShowModal] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [editShowModal, setEditShowModal] = React.useState(false);
  const [deleteCohort, setDeleteCohort] = React.useState(false);
  const [indicator, setIndicator] = React.useState(false);
  const user = useSelector(({ User }) => User);

  const classStartTime = item.start_time && item.start_time.replace("Z", "");
  const classEndTime = item.end_time && item.end_time.replace("Z", "");

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
    doubt_class: "Doubt Class",
    workshop: "Workshop",
    cohort: "Cohort",
  };

  const handleClose = () => {
    setShowModal(false);
    setDeleteCohort(false);
  };

  const handleEdit = () => {
    setEditShowModal(true);
  };

  const handleCloseEdit = () => {
    setEditShowModal(false);
    setIndicator(false);
  };

  const handleClickOpen = () => {
    setShowModal(!showModal);
    setIndicator(false);
  };

  const handleCloseEnroll = () => {
    setEnrollShowModal(false);
    setIndicator(false);
  };
  const handleClickOpenEnroll = () => {
    setEnrollShowModal(!enrollShowModal);
  };

  const handleCloseUnenroll = () => {
    setunenrollShowModal(false);
    setIndicator(false);
  };
  const handleClickOpenUnenroll = () => {
    setunenrollShowModal(!unenrollShowModal);
    setIndicator(false);
  };

  const rolesList = user.data.user.rolesList;
  let flag = false;
  rolesList.map((role) => {
    role === "admin" || role === "classAdmin" ? (flag = true) : (flag = false);
  });

  // API CALL FOR DELETE CLASS
  const deleteHandler = (id) => {
    const notify = () => {
      toast.success(" Deleted the class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    setShowModal(!showModal);
    return axios({
      method: METHODS.DELETE,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${id}`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        "delete-all": deleteCohort,
      },
    }).then(() => {
      notify();
      dispatch(classActions.deleteClass(id));
    });
  };
  // API CALL FOR enroll class
  const handleSubmit = (Id) => {
    const notify = () => {
      toast.success("You have been enrolled to class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    setEnrollShowModal(!enrollShowModal);
    axios
      .post(
        `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.data.token,
            "register-to-all": indicator,
          },
        }
      )
      .then(() => {
        notify();
        dispatch(classActions.enrolledClass(Id));
      });
  };

  // API CALL FOR DROP OUT
  const handleDropOut = (Id) => {
    const notify = () => {
      toast.success("You have been dropped out of class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    setunenrollShowModal(!unenrollShowModal);
    return axios({
      method: METHODS.DELETE,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/unregister`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        "unregister-all": indicator,
      },
    }).then(() => {
      notify();
      dispatch(classActions.dropOutClass(Id));
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
        <p>Facilitator : {item.facilitator.name} </p>
        <p>Language : {languageMap[item.lang]} </p>
        <p>Date:{moment(classStartTime).format("DD-MM-YYYY")} </p>
        {/* {item.email} */}
        <p>
          Time:{moment(classStartTime).format("hh:mm a")} -{" "}
          {moment(classEndTime).format("hh:mm a")}
        </p>
        <div className="bottom-details">
          {!item.enrolled ? (
            <button
              type="submit"
              className={style}
              onClick={() => {
                handleClickOpenEnroll(item.id);
              }}
            >
              {enroll}
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
          {item.facilitator.email == user.data.user.email || flag ? (
            <div className="class-card-actions">
              <i
                className="class-card-action-icon fa fa-trash"
                onClick={() => handleClickOpen(item.id)}
              />
              <i
                className="class-card-action-icon class-card-edit fa fa-edit"
                onClick={() => {
                  handleEdit(item.id);
                  // editClass(item.id, indicator);
                }}
              />
            </div>
          ) : null}
        </div>
        {showModal ? (
          <Modal onClose={handleClickOpen} className="confirmation-massage">
            <h2>Are you sure you want to delete this class?</h2>

            <label>
              <input
                type="checkbox"
                align="center"
                className="cohort-class"
                onClick={() => {
                  setDeleteCohort(true);
                }}
              />
              Delete all classes of this cohort?
            </label>
            <div className="wrap">
              <button
                onClick={() => {
                  return deleteHandler(item.id);
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
        {editShowModal ? (
          <Modal onClose={handleCloseEdit} className="confirmation-massage">
            <h2>Do you want to edit this class?</h2>

            <label>
              <input
                type="checkbox"
                align="center"
                className="cohort-class"
                onClick={() => {
                  setIndicator(true);
                }}
              />
              Edit all classes of this cohort?
            </label>
            <div className="wrap">
              <button
                onClick={() => {
                  return editClass(item.id, indicator);
                }}
                className="agree-btn"
              >
                Yes
              </button>
              <button onClick={handleCloseEdit} className="cancel-btn">
                Cancel
              </button>
            </div>
          </Modal>
        ) : null}
        {enrollShowModal ? (
          <Modal
            onClose={() => handleCloseEnroll()}
            className="confirmation-massage"
          >
            <h2>Are you sure you want to enroll?</h2>
            <label>
              <input
                type="checkbox"
                align="center"
                className="cohort-class"
                onClick={() => {
                  setIndicator(true);
                }}
              />
              Enroll all classes of this cohort?
            </label>
            <div className="wrap">
              <button
                onClick={() => {
                  return handleSubmit(item.id);
                }}
                className="agree-btn"
              >
                Yes
              </button>
              <button onClick={handleCloseEnroll} className="cancel-btn">
                Cancel
              </button>
            </div>
          </Modal>
        ) : null}
        {unenrollShowModal ? (
          <Modal
            onClose={() => handleCloseUnenroll()}
            className="confirmation-massage"
          >
            <h2> Are you sure you want to drop out</h2>
            <label>
              <input
                type="checkbox"
                align="center"
                className="cohort-class"
                onClick={() => {
                  setIndicator(true);
                }}
              />
              Drop all classes of this cohort?
            </label>
            <div className="wrap">
              <button
                onClick={() => {
                  return handleDropOut(item.id);
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
