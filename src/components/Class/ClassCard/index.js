import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { METHODS } from "../../../services/api";
import { actions as classActions } from "../redux/action";
import "./styles.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../common/Modal";
import Loader from "../../common/Loader";
import { check } from "prettier";

toast.configure();

function ClassCard({ item, editClass, enroll, style }) {
  const dispatch = useDispatch();
  const [enrollShowModal, setEnrollShowModal] = useState(false);
  const [unenrollShowModal, setunenrollShowModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);
  const [deleteCohort, setDeleteCohort] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classEnrolled, setClassEnrolled] = useState("");
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
    window.location.reload();
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
  rolesList.includes("admin") || rolesList.includes("classAdmin")
    ? (flag = true)
    : (flag = false);

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

  //API CALL FOR /users/enrolment to check whether user is enrolled or not
  const checkEnrolled = (pathway_id) => {
    console.log("pathway_id", pathway_id);
    return axios({
      method: METHODS.POST,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/enrolment?email=${user.data.user.email}&pathway_id=${pathway_id}`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    })
      .then((res) => {
        // setClassEnrolled(res.data.message);
        // setClassEnrolled("not_enrolled");
        setClassEnrolled("enrolled");
        // setClassEnrolled("enrolled_but_finished");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  console.log("classEnrolled", classEnrolled);

  // API CALL FOR enroll class
  const handleSubmit = (Id, indicator) => {
    setLoading(true);
    const notify = () => {
      toast.success("You have been enrolled to class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    let getNotify = false;
    setEnrollShowModal(!enrollShowModal);
    const timer = setTimeout(() => {
      getNotify = true;
      dispatch(classActions.enrolledClass(Id));
      setLoading(false);
      notify();
    }, 10000);
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
      .then((res) => {
        console.log("response", res);
        if (!getNotify) {
          notify();
          clearTimeout(timer);
          setLoading(false);
        }
        dispatch(classActions.enrolledClass(Id));
      });
  };
  // API CALL FOR DROP OUT
  const handleDropOut = (Id) => {
    setLoading(true);

    const notify = () => {
      toast.success("You have been dropped out of class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    let getNotify = false;
    setunenrollShowModal(!unenrollShowModal);
    const timer = setTimeout(() => {
      getNotify = true;
      dispatch(classActions.dropOutClass(Id));
      setLoading(false);

      notify();
    }, 10000);
    return axios({
      method: METHODS.DELETE,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/unregister`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        "unregister-all": indicator,
      },
    }).then(() => {
      if (!getNotify) {
        notify();
        clearTimeout(timer);
        setLoading(false);
      }
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
        <p>
          Time:{moment(classStartTime).format("hh:mm a")} -{" "}
          {moment(classEndTime).format("hh:mm a")}
        </p>
        <div className="bottom-details">
          {!item.enrolled ? (
            loading ? (
              <div className="loader-button">
                <Loader />
              </div>
            ) : (
              <button
                type="submit"
                className={style}
                onClick={() => {
                  handleClickOpenEnroll(item.id);
                  checkEnrolled(item.pathway_id);
                }}
              >
                {enroll}
              </button>
            )
          ) : loading ? (
            <div className="loader-button">
              <Loader />
            </div>
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
                }}
              />
            </div>
          ) : null}
        </div>
        {showModal ? (
          <Modal onClose={handleClickOpen} className="confirmation-massage">
            <h2>Are you sure you want to delete this class?</h2>
            {item.type === "cohort" && (
              <label>
                <input
                  type="checkbox"
                  // align="center"
                  className="cohort-class"
                  onClick={() => {
                    setDeleteCohort(true);
                  }}
                />
                Delete all classes of this Batch?
              </label>
            )}
            <div className="wrap">
              <button
                onClick={() => {
                  return deleteHandler(item.id);
                }}
                className="delete-btn"
              >
                Delete
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
            {item.type === "cohort" && (
              <label>
                <input
                  type="checkbox"
                  // align="center"
                  className="cohort-class"
                  onClick={() => {
                    setIndicator(true);
                  }}
                />
                Edit all classes of this Batch?
              </label>
            )}
            <div className="wrap">
              <button
                onClick={() => {
                  return editClass(item.id, indicator);
                }}
                className="agree-btn"
              >
                Edit
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
            {classEnrolled === "enrolled" && item.type === "cohort" ? (
              <>
                <p className="modal-text">
                  You'll be enrolled to a single class of Batch <br /> As you
                  are already enrolled in another Batch.
                </p>
                <div className="wrap">
                  <button
                    onClick={() => {
                      handleSubmit(item.id, false);
                    }}
                    className="agree-btn"
                  >
                    Enroll
                  </button>
                  <button onClick={handleCloseEnroll} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Are you sure you want to enroll?</h2>
                {(classEnrolled === "enrolled_but_finished" ||
                  classEnrolled === "not_enrolled") &&
                  item.type === "cohort" && (
                    <>
                      <div className="wrap">
                        <button
                          onClick={() => {
                            handleSubmit(item.id, true);
                          }}
                          className="agree-btn"
                        >
                          Enroll
                        </button>
                        <button
                          onClick={handleCloseEnroll}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                {item.type !== "cohort" && (
                  <>
                    <div className="wrap">
                      <button
                        onClick={() => {
                          handleSubmit(item.id, false);
                        }}
                        className="agree-btn"
                      >
                        Enroll
                      </button>
                      <button
                        onClick={handleCloseEnroll}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </Modal>
        ) : null}
        {unenrollShowModal ? (
          <Modal
            onClose={() => handleCloseUnenroll()}
            className="confirmation-massage"
          >
            <h2> Are you sure you want to drop out</h2>
            {item.type === "cohort" && (
              <label>
                <input
                  type="checkbox"
                  // align="center"
                  className="cohort-class"
                  onClick={() => {
                    setIndicator(true);
                  }}
                />
                Drop all classes of this Batch?
              </label>
            )}
            <div className="wrap">
              <button
                onClick={() => {
                  return handleDropOut(item.id);
                }}
                className="delete-btn"
              >
                Drop
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
