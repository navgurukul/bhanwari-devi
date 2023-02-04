import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./style.scss";
import { useEffect, useRef } from "react";
import { METHODS } from "../../services/api";

function AddStudent({ openEditForm, setOpenEditForm, userId, userName }) {
  const [openForm, setOpenForm] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState();
  const user = useSelector(({ User }) => User);
  const partnerId = window.location.pathname.split("/")[2];

  const submit = () => {
    if (openEditForm) {
      editStudent();
    } else {
      addStudent();
    }
  };

  const editStudent = () => {
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/${userId}/user`,
      method: METHODS.PUT,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.data.token,
      },
      data: {
        name: studentName,
      },
    })
      .then((data) => {
        if (data.data.error) throw new Error(data.data.message);
        toast.success(`Student name ${data.data.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        window.location.reload(1);
      })
      .catch((e) => {
        toast.error(
          `Student couldn't be assigned to this partner!: ${e.message}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      });
  };

  const addStudent = () => {
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/addUser?partner_id=${partnerId}`,
      method: METHODS.POST,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.data.token,
      },
      data: {
        email: studentEmail,
      },
    })
      .then((data) => {
        if (data.data.error) throw new Error(data.data.message);
        toast.success("Student Added Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        window.location.reload(1);
      })
      .catch((e) => {
        toast.error(e.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <>
      <button
        onClick={() => {
          setOpenForm(true);
        }}
        className="add_student_btn"
      >
        Add Student
      </button>

      {openEditForm || openForm ? (
        <div className="add_student_form_background">
          <OutsideAlerter
            handleClick={() => {
              setOpenForm(false);
              setOpenEditForm(false);
            }}
          >
            <div className="add_student_form">
              <div className="student_form_container">
                <span
                  className="close_add_student_form"
                  onClick={() => {
                    setOpenForm(false);
                    setOpenEditForm(false);
                  }}
                >
                  X
                </span>
                <h2>Add New Student</h2>
                {openEditForm ? (
                  <>
                    <label>Name of Student</label>
                    <input
                      className="student_data_field"
                      placeholder="Name of Student"
                      type="text"
                      name="name"
                      required
                      aria-required
                      onChange={(e) => {
                        setStudentName(e.target.value);
                      }}
                      value={studentName}
                    />
                  </>
                ) : null}

                {openEditForm ? null : (
                  <>
                    <label>Email of Student</label>
                    <input
                      className="student_data_field"
                      placeholder="Email ID of Student"
                      type="email"
                      name="email"
                      required
                      aria-required
                      onChange={(e) => {
                        setStudentEmail(e.target.value);
                      }}
                      value={studentEmail}
                    />
                  </>
                )}
                <button
                  className="add_student_form_btn"
                  onClick={() => {
                    submit();
                    setOpenForm(false);
                  }}
                >
                  {openEditForm ? "Edit" : "Submit"}
                </button>
              </div>
            </div>
          </OutsideAlerter>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default AddStudent;
function useOutsideAlerter(ref, handleClick = false) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && handleClick) {
        handleClick();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, handleClick]);
}

function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.handleClick);

  return (
    <div ref={wrapperRef} className="d-inline">
      {props.children}
    </div>
  );
}
