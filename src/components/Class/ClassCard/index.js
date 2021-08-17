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

function ClassCard({ item, editClass, enroll, style, indicator }) {
  const dispatch = useDispatch();
  const [enrollShowModel, setEnrollShowModel] = React.useState(false);
  const [unenrollShowModel, setunenrollShowModel] = React.useState(false);
  const [showModel, setShowModel] = React.useState(false);
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
    setShowModel(false);
  };

  const handleClickOpen = () => {
    setShowModel(!showModel);
  };

  const handleCloseEnroll = () => {
    setEnrollShowModel(false);
  };
  const handleClickOpenEnroll = () => {
    setEnrollShowModel(!enrollShowModel);
  };

  const handleCloseUnenroll = () => {
    setunenrollShowModel(false);
  };
  const handleClickOpenUnenroll = () => {
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
        autoClose: 2500,
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
      data: {
        deleteAll: indicator,
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
        },
        {
          registerToAll: indicator,
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
    setunenrollShowModel(!unenrollShowModel);
    return axios({
      method: METHODS.DELETE,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/unregister`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
      data: {
        unregisterAll: indicator,
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
                  editClass(item.id, indicator);
                }}
              />
            </div>
          ) : null}
        </div>
        {showModel ? (
          <Modal onClose={handleClickOpen} className="confirmation-massage">
            <h2>Are you sure you want to delete this class?</h2>
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
        {enrollShowModel ? (
          <Modal
            onClose={() => handleCloseEnroll()}
            className="confirmation_massage-for-enroll"
          >
            <h2>Are you sure you do you want to enroll?</h2>
            <div className="wrap">
              <button
                onClick={() => {
                  return handleSubmit(item.id);
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
