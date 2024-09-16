import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./style.scss";
import { METHODS } from "../../services/api";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Grid,
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
  setTriggerdGet,
  studentid,
  stupassword,
}) {
  const [openForm, setOpenForm] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const user = useSelector(({ User }) => User);
  const partnerId = window.location.pathname.split("/")[2];
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
  });

  const handlePasswordVisibility = (e) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({ name: "", username: "", password: "", email: "" });
    if (name === "studentName") setStudentName(value);
    if (name === "studentEmail") setStudentEmail(value);
    if (name === "newUserName") setNewUserName(value);
    if (name === "password") setPassword(value);
  };

  const clearFormAndErrors = () => {
    setStudentName("");
    setStudentEmail("");
    setNewUserName("");
    setPassword("");
    setErrors({
      name: "",
      username: "",
      password: "",
      email: "",
    });
    setError(false);
    setErrorData("");
  };

  useEffect(() => {
    if (openEditForm) {
      setStudentName(userName);
      setStudentEmail(userEmail);
      setLoginMethod(userEmail ? "email" : "username");
      setPassword(stupassword);
      setNewUserName(studentid);
    } else {
      clearFormAndErrors();
    }
  }, [openEditForm, userName, userEmail, studentid, stupassword]);

  const validateForm = () => {
    const newErrors = {
      name: "",
      username: "",
      password: "",
      email: "",
    };
    let isValid = true;
    if (!studentName) {
      newErrors.name = "Please enter a student name";
      isValid = false;
    }
    if (loginMethod === "email") {
      if (!studentEmail) {
        newErrors.email = "Please enter an email";
        isValid = false;
      }
    } else {
      if (!newUserName) {
        newErrors.username = "Please enter a username";
        isValid = false;
      }
      if (!password) {
        newErrors.password = "Please enter a password";
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const submit = () => {
    if (validateForm()) {
      setError(false);
      if (openEditForm) {
        editStudent();
      } else {
        addStudent();
      }
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
        if (data.data.error) {
          // Throw the full response data object
          throw data.data;
        }
        toast.success(`Student ${data.data.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setTriggerdGet((prev) => {
          return !prev;
        });
        clearFormAndErrors();
        setOpenEditForm(false);
      })
      .catch((e) => {
        if (e.erorrCode === 2001) {
          setErrors({ ...errors, name: e?.message });
        } else if (e.erorrCode === 2003) {
          setErrors({ ...errors, password: e?.message });
        } else {
          setErrorData(e?.message);
          setError(true);
        }
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
        if (response.data.error) {
          // Throw the full response data object
          throw response.data;
        }
        toast.success("Student Added Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setTriggerdGet((prev) => {
          return !prev;
        });
        clearFormAndErrors();
      })
      .catch((e) => {
        if (e.erorrCode === 2005) {
          setErrors({ ...errors, email: e?.message });
        } else if (e.erorrCode === 2001) {
          setErrors({ ...errors, name: e?.message });
        } else if (e.erorrCode === 2003) {
          setErrors({ ...errors, password: e?.message });
        } else {
          setErrorData(e?.message);
          setError(true);
        }
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
              clearFormAndErrors();
            }}
          >
            <div className="add_student_form">
              <div className="student_form_container">
                <div className="student_form_header">
                  <h2 className={openEditForm ? "Edit" : "left"}>
                    {openEditForm ? "Edit Student" : "Add New Student"}
                  </h2>
                  <span
                    className="close_add_student_form"
                    onClick={() => {
                      setOpenForm(false);
                      setOpenEditForm(false);
                      clearFormAndErrors();
                    }}
                  >
                    X
                  </span>
                </div>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} xs={12}>
                    <TextField
                      className="student_data_field"
                      type="text"
                      label={"Student Name"}
                      name="studentName"
                      placeholder="Student Name"
                      error={!!errors.name}
                      helperText={errors.name}
                      aria-required
                      onChange={handleInputChange}
                      value={studentName}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item lg={12} md={12} xs={12}>
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
                  </Grid>

                  {loginMethod === "email" ? (
                    <Grid item lg={12} md={12} xs={12}>
                      <TextField
                        className="student_data_field"
                        label={"Email ID of Student"}
                        placeholder="Email ID of Student"
                        type="email"
                        name="studentEmail"
                        error={!!errors.email}
                        helperText={errors.email}
                        aria-required
                        onChange={handleInputChange}
                        value={studentEmail}
                        variant="outlined"
                        fullWidth
                        disabled={openEditForm}
                        sx={{ mt: 1 }}
                      />
                    </Grid>
                  ) : (
                    <>
                      <Grid item lg={12} md={12} xs={12}>
                        <TextField
                          className="student_data_field"
                          label={"Username"}
                          placeholder="Username"
                          type="text"
                          name="newUserName"
                          error={!!errors.username}
                          helperText={errors.username}
                          aria-required
                          onChange={handleInputChange}
                          value={newUserName}
                          variant="outlined"
                          fullWidth
                          disabled={openEditForm}
                          sx={{ mt: 1 }}
                        />
                      </Grid>

                      <Grid item lg={12} md={12} xs={12}>
                        <TextField
                          className="student_data_field"
                          label={"Password"}
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          error={!!errors.password}
                          helperText={errors.password}
                          aria-required={!openEditForm}
                          onChange={handleInputChange}
                          value={password}
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 1, cursor: "pointer" }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <div className="icon-button">
                                  <IconButton
                                    onClick={(e) => handlePasswordVisibility(e)}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </div>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </>
                  )}

                  {error && (
                    <Grid item lg={12} md={12} xs={12}>
                      <FormHelperText error={true} id="component-error-text">
                        {errorData}
                      </FormHelperText>
                    </Grid>
                  )}

                  <Grid item lg={12} md={12} xs={12}>
                    <button
                      className={
                        openEditForm
                          ? "update_student_form_btn"
                          : "add_student_form_btn"
                      }
                      onClick={submit}
                    >
                      {openEditForm ? "Update Student Details" : "Add Student"}
                    </button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </OutsideAlerter>
        </div>
      )}
    </>
  );
}

export default AddStudent;

function useOutsideAlerter(ref, handleClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClick(event);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleClick]);
}

function OutsideAlerter({ children, handleClick }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleClick);
  return (
    <div ref={wrapperRef} className="d-inline">
      {children}
    </div>
  );
}
