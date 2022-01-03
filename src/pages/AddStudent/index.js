import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./style.scss";
import { useEffect, useRef } from "react";
import { METHODS } from "../../services/api";

function AddStudent({ openEditForm, setOpenEditForm, userId }) {
  const [openForm, setOpenForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ email: "" });
  const [studentName, setStudentNam] = useState("");
  const user = useSelector(({ User }) => User);

  const handleChange = async (event) => {
    setNewStudent({ ...newStudent, [event.target.name]: event.target.value });
  };

  console.log("openEditForm", openEditForm);
  console.log("userId", userId);

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
        console.log("data", data);
        if (data.data.error) throw new Error(data.data.message);
        toast.success("Student name changed successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
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
    axios
      .post(
        `${process.env.REACT_APP_MERAKI_URL}/partners/addUser`,
        newStudent,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.data.token,
          },
        }
      )
      .then((data) => {
        if (data.data.error) throw new Error(data.data.message);
        toast.success("Student Added", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((e) => {
        toast.error(`Student couldn't be created!: ${e.message}`, {
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
                        setStudentNam(e.target.value);
                      }}
                      value={newStudent.name}
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
                      onChange={handleChange}
                      value={newStudent.email}
                    />
                  </>
                )}
                <button
                  className="add_student_form_btn"
                  onClick={() => {
                    submit();
                    setOpenForm(false);
                    setNewStudent({ email: "" });
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
