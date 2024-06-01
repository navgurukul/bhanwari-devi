import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./style.scss";
import { METHODS } from "../../services/api";
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormHelperText } from "@mui/material";

function AddStudent({
  openEditForm,
  setOpenEditForm,
  userId,
  userName,
  userEmail,
  setTriggeredGet,
}) {
  const [openForm, setOpenForm] = useState(false);
  const [studentEmail, setStudentEmail] = useState(userEmail || "");
  const [studentName, setStudentName] = useState(userName || "");
  const [newUserName, setNewUserName] = useState(userName || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState(
    userEmail ? "email" : "username"
  );
  const user = useSelector(({ User }) => User);
  const partnerId = window.location.pathname.split("/")[2];
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState("");
  const [isEmpty, setIsEmpty] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!studentName) return "Student name is required";
    if (loginMethod === "email" && !studentEmail) return "Email is required";
    if (
      loginMethod === "username" &&
      (!newUserName || (!password && !openEditForm))
    )
      return "Username and Password are required";
    return null;
  };

  const submit = () => {
    setErrors({ username: "", password: "" });

    if (!studentName) {
      setIsEmpty(true);
      setErrors({ ...errors, username: "Please enter a student name" });
      return;
    }

    if (loginMethod === "email" && !studentEmail) {
      setIsEmpty(true);
      setErrors({ ...errors, username: "Please enter an email" });
      return;
    }

    if (
      loginMethod === "username" &&
      (!newUserName || (!password && !openEditForm))
    ) {
      setIsEmpty(true);
      setErrors({
        ...errors,
        username: "Please enter a username",
        password: "Please enter a password",
      });
      return;
    }

    if (loginMethod === "username" && !newUserName) {
      setIsEmpty(true);
      setErrors({ ...errors, username: "Please enter a username" });
      return;
    }

    setError(false);

    if (openEditForm) {
      setOpenEditForm(false);
      editStudent();
      setStudentName("");
    } else {
      setOpenForm(false);
      addStudent();
    }
  };

  const editStudent = () => {
    const data = { name: studentName };
    if (password) {
      data.password = password;
    }

    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/${userId}/user`,
      method: METHODS.PUT,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.data.token,
      },
      data,
    })
      .then((data) => {
        if (data.data.error) throw new Error(data.data.message);
        toast.success(`Student ${data.data.message}`, {
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
    const url = `${process.env.REACT_APP_MERAKI_URL}/partners/addUser?partner_id=${partnerId}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: user.data.token,
    };
    const data =
      loginMethod === "email"
        ? { name: studentName, email: studentEmail }
        : { name: studentName, user_name: newUserName, password: password };
    return axios({
      url,
      method: METHODS.POST,
      headers,
      data,
    })
      .then((response) => {
        if (response.data.error) throw new Error(response.data.message);
        toast.success("Student Added Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        window.location.reload(1);
        setNewUserName("");
        setStudentName("");
        setPassword("");
        setStudentEmail("");
        // setTriggeredGet(true)
      })
      .catch((e) => {
        setErrorData(e.message);
        setError(true);
        setOpenForm(true);
      });
  };
  return (
    <>
      <button onClick={() => setOpenForm(true)} className="add_student_btn">
        Add Student
      </button>

      {(openEditForm || openForm) && (
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
                {openEditForm ? (
                  <h2 className="Edit">Edit Student</h2>
                ) : (
                  <h2 className="left">Add New Student</h2>
                )}
                <TextField
                  className="student_data_field"
                  placeholder="Name of Student"
                  type="text"
                  name="name"
                  required
                  aria-required
                  onChange={(e) => setStudentName(e.target.value)}
                  value={studentName}
                  variant="outlined"
                  fullWidth
                />
                <Typography variant="h6" marginTop={5}>
                  Login Method
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="loginMethod"
                    name="loginMethod"
                    value={loginMethod}
                    onChange={(e) => setLoginMethod(e.target.value)}
                    row
                    disabled={openEditForm}
                  >
                    <FormControlLabel
                      value="email"
                      control={<Radio />}
                      label="Email"
                      disabled={openEditForm}
                    />
                    <FormControlLabel
                      value="username"
                      control={<Radio />}
                      label="Username and Password"
                      disabled={openEditForm}
                    />
                  </RadioGroup>
                </FormControl>
                {loginMethod === "email" ? (
                  <TextField
                    className="student_data_field"
                    placeholder="Email ID of Student"
                    type="email"
                    name="email"
                    required
                    aria-required
                    onChange={(e) => setStudentEmail(e.target.value)}
                    value={studentEmail}
                    variant="outlined"
                    fullWidth
                    disabled={openEditForm}
                    sx={{ mt: 1 }}
                  />
                ) : (
                  <>
                    <TextField
                      className="student_data_field"
                      placeholder="Username"
                      type="text"
                      name="user_name"
                      required
                      aria-required
                      onChange={(e) => setNewUserName(e.target.value)}
                      value={newUserName}
                      variant="outlined"
                      fullWidth
                      disabled={openEditForm}
                      sx={{ mt: 1 }}
                    />
                    <TextField
                      className="student_data_field"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      aria-required={!openEditForm}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 1 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            <IconButton
                              onClick={handlePasswordVisibility}
                            ></IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                )}
                {error && (
                  <FormHelperText error={true} id="component-error-text">
                    {errorData}
                  </FormHelperText>
                )}
                <button
                  className="add_student_form_btn"
                  onClick={submit}
                  disabled={
                    openEditForm
                      ? false
                      : loginMethod === "email"
                      ? !studentEmail
                      : !newUserName || !password
                  }
                >
                  {openEditForm ? "Edit" : "Add Student"}
                </button>
              </div>
            </div>
          </OutsideAlerter>
        </div>
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
