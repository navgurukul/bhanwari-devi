import React, { useEffect, useState } from "react";
import { breakpoints } from "../../theme/constant";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { METHODS } from "../../services/api";
import TextField from "@mui/material/TextField";
import useStyles from "./styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  margin: "3rem 0rem",
};

function CustomModal({
  isFormModalOpen,
  setisFormModalOpen,
  setisFormFilled,
  user,
}) {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles({ isActive });
  const [teacherDetails, setTeacherDetails] = useState({
    zone: "",
    school_id: "",
    school_name: "",
    teacher_name: "",
    teacher_id: "",
    class_of_teacher: "",
    pricipal_name: "",
    pricipal_id: "",
    mentor_name: "",
    mentor_id: "",
    school_inspector_name: "",
    school_inspector_id: "",
    parent_school_name: "",
    parent_school_id: "",
    employee_name: "",
    employee_id: "",
    contect_number: "",
    employee_type: "",
  });

  console.log("teacherDetails", teacherDetails);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const classesOfTeacher = [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
  ];

  const zoneArray = [
    "Central",
    "Civil Lines",
    "CTSP",
    "Karol Bagh",
    "Keshavpuram",
    "Narela",
    "Rohini",
    "Nazafgarh",
    "South",
    "Sharda.North",
    "Sharda.South",
    "West",
  ];

  const employeetype = [
    "teachers",
    "principal",
    "mentor",
    "school inspector",
    "clerical staff",
  ];

  const [teacherClass, setTeacherClass] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTeacherClass(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    setTeacherDetails((prev) => ({
      ...prev,
      class_of_teacher: teacherClass.join(","),
    }));
  }, [teacherClass]);

  const handleFormModalClose = () => {
    setisFormModalOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!teacherDetails.zone) newErrors.zone = "Zone is required.";
    if (
      !teacherDetails.school_id &&
      teacherDetails.employee_type !== "clerical staff"
    )
      newErrors.school_id = "School ID is required.";
    else if (
      teacherDetails.school_id &&
      teacherDetails.school_id.toString().length !== 7
    )
      newErrors.school_id = "School ID must be of 7 digits only";
    if (
      !teacherDetails.school_name &&
      teacherDetails.employee_type !== "clerical staff"
    )
      newErrors.school_name = "School Name is required.";

    // Validate fields based on employee type

    if (teacherDetails.employee_type === "teachers") {
      if (!teacherDetails.teacher_name)
        newErrors.teacher_name = "Teacher Name is required.";
      if (!teacherDetails.teacher_id)
        newErrors.teacher_id = "Teacher ID is required.";
      else if (teacherDetails.teacher_id.toString().length !== 8)
        newErrors.teacher_id = "Teacher ID must be of 8 digits only";
    } else if (teacherDetails.employee_type === "principal") {
      if (!teacherDetails.pricipal_name)
        newErrors.pricipal_name = "Principal Name is required.";
      if (!teacherDetails.pricipal_id)
        newErrors.pricipal_id = "Principal ID is required.";
      else if (teacherDetails.pricipal_id.toString().length !== 8)
        newErrors.pricipal_id = "Principal ID must be of 8 digits only";
    } else if (teacherDetails.employee_type === "mentor") {
      if (!teacherDetails.mentor_name)
        newErrors.mentor_name = "Mentor Name is required.";
      if (!teacherDetails.mentor_id)
        newErrors.mentor_id = "Mentor ID is required.";
      else if (teacherDetails.mentor_id.toString().length !== 8)
        newErrors.mentor_id = "Mentor ID must be of 8 digits only";
    } else if (teacherDetails.employee_type === "school inspector") {
      if (!teacherDetails.school_inspector_name)
        newErrors.school_inspector_name = "School Inspector Name is required.";
      if (!teacherDetails.school_inspector_id)
        newErrors.school_inspector_id = "School Inspector ID is required.";
      else if (teacherDetails.school_inspector_id.toString().length !== 8)
        newErrors.school_inspector_id =
          "School Inspector ID must be of 8 digits only";
    } else if (teacherDetails.employee_type === "clerical staff") {
      if (!teacherDetails.employee_name)
        newErrors.employee_name = "Employee Name is required.";
      if (!teacherDetails.employee_id)
        newErrors.employee_id = "Employee ID is required.";
      else if (teacherDetails.employee_id.toString().length !== 8)
        newErrors.employee_id = "Employee ID must be of 8 digits only";
    }
    if (
      !teacherDetails.class_of_teacher &&
      teacherDetails.employee_type === "teachers"
    )
      newErrors.class_of_teacher = "Class of Teacher is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitteacherDetails = () => {
    console.log("teacherDetails", teacherDetails);

    // if (validateForm()) {
    //   axios({
    //     method: METHODS.POST,
    //     url: `${process.env.REACT_APP_MERAKI_URL}/teacher/create`,
    //     headers: {
    //       accept: "application/json",
    //       Authorization: user?.data?.token,
    //     },
    //     data: teacherDetails,
    //   })
    //     .then((res) => {
    //       handleFormModalClose();
    //       setisFormFilled(true);
    //       setTeacherDetails({
    //         zone: "",
    //         school_id: "",
    //         school_name: "",
    //         teacher_name: "",
    //         teacher_id: "",
    //         class_of_teacher: "",
    //         pricipal_name: "",
    //         pricipal_id: "",
    //         mentor_name: "",
    //         mentor_id: "",
    //         school_inspector_name: "",
    //         school_inspector_id: "",
    //         parent_school_name: "",
    //         parent_school_id: "",
    //         contect_number: "",
    //         employee_name: "",
    //         employee_id: "",
    //         employee_type: "",
    //       });
    //     })
    //     .catch((err) => console.log(err));
    // }
  };

  const renderError = (field) =>
    errors[field] && <small style={{ color: "red" }}>{errors[field]}</small>;

  return (
    <Modal
      className={classes.customModalContainer}
      open={isFormModalOpen}
      onClose={handleFormModalClose}
    >
      <Box className={classes.modalContainer} sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "2rem" }}
          >
            Employee Details
          </Typography>
          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={handleFormModalClose}
          />
        </Box>

        <Box className={classes.modalBox}>
          <FormControl fullWidth>
            <InputLabel id="employee-type-select-label">
              Select Employee Type
            </InputLabel>
            <Select
              label="Select Employee Type"
              id="employee-type-select"
              value={teacherDetails.employee_type}
              onChange={(e) => {
                setTeacherDetails((prev) => ({
                  ...prev,
                  employee_type: e.target.value,
                }));
              }}
            >
              {employeetype.map((name) => (
                <MenuItem key={name} value={name}>
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {teacherDetails.employee_type === "principal" && (
            <>
              <TextField
                id="principal-name-input"
                label="Principal Name"
                variant="outlined"
                value={teacherDetails.pricipal_name}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    pricipal_name: e.target.value,
                  }));
                }}
              />
              {renderError("pricipal_name")}

              <TextField
                id="principal-id-input"
                label="Principal ID"
                variant="outlined"
                type="number"
                value={teacherDetails.pricipal_id}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    pricipal_id: parseInt(e.target.value),
                  }));
                }}
              />
              {renderError("pricipal_id")}

              <TextField
                id="contect_number-input"
                label="Contect Number"
                variant="outlined"
                type="number"
                value={teacherDetails.contect_number}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    contect_number: parseInt(e.target.value),
                  }));
                }}
              />
              {renderError("contect_number")}
            </>
          )}

          {teacherDetails.employee_type === "teachers" && (
            <>
              <TextField
                id="teacher-name-input"
                label="Teacher Name"
                variant="outlined"
                value={teacherDetails.teacher_name}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    teacher_name: e.target.value,
                  }));
                }}
              />
              {renderError("teacher_name")}

              <TextField
                id="teacher-id-input"
                label="Teacher ID"
                variant="outlined"
                type="number"
                value={teacherDetails.teacher_id}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    teacher_id: parseInt(e.target.value),
                  }));
                }}
              />
              {renderError("teacher_id")}

              <FormControl fullWidth>
                <InputLabel id="class-select-label">Select Class</InputLabel>
                <Select
                  label="Select Class"
                  id="class-select"
                  multiple
                  value={teacherClass}
                  onChange={handleChange}
                  input={<OutlinedInput label="Select Class" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {classesOfTeacher.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={teacherClass.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {renderError("class_of_teacher")}

              <TextField
                id="contect_number-input"
                label="Contect Number"
                variant="outlined"
                type="number"
                value={teacherDetails.contect_number}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    contect_number: parseInt(e.target.value),
                  }));
                }}
              />
              {renderError("contect_number")}
            </>
          )}

          {teacherDetails.employee_type === "mentor" && (
            <>
              <TextField
                id="mentor-name-input"
                label="Mentor Name"
                variant="outlined"
                value={teacherDetails.mentor_name}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    mentor_name: e.target.value,
                  }));
                }}
              />
              {renderError("mentor_name")}

              <TextField
                id="mentor-id-input"
                label="Mentor ID"
                variant="outlined"
                type="number"
                value={teacherDetails.mentor_id}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    mentor_id: parseInt(e.target.value),
                  }));
                }}
              />
              {renderError("mentor_id")}

              <TextField
                id="contect_number-input"
                label="Contect Number"
                variant="outlined"
                type="number"
                value={teacherDetails.contect_number}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    contect_number: parseInt(e.target.value),
                  }));
                }}
              />
              {renderError("contect_number")}

              <TextField
                id="parent_school_name-input"
                label="Parent School Name"
                variant="outlined"
                value={teacherDetails.parent_school_name}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    parent_school_name: e.target.value,
                  }));
                }}
              />
              {renderError("parent_school_name")}

              <TextField
                id="parent_school_id-input"
                label="Parent School ID"
                variant="outlined"
                value={teacherDetails.parent_school_id}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    parent_school_id: e.target.value,
                  }));
                }}
              />
              {renderError("parent_school_id")}
            </>
          )}

          {teacherDetails.employee_type === "school inspector" && (
            <>
              <TextField
                id="school-inspector-name-input"
                label="School Inspector Name"
                variant="outlined"
                value={teacherDetails.school_inspector_name}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    school_inspector_name: e.target.value,
                  }));
                }}
              />
              {renderError("school_inspector_name")}

              <TextField
                id="school-inspector-id-input"
                label="School Inspector ID"
                variant="outlined"
                type="number"
                value={teacherDetails.school_inspector_id}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    school_inspector_id: parseInt(e.target.value),
                  }));
                }}
              />
              {renderError("school_inspector_id")}

              <TextField
                id="contect_number-input"
                label="Contect Number"
                variant="outlined"
                type="number"
                value={teacherDetails.contect_number}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    contect_number: parseInt(e.target.value),
                  }));
                }}
              />
              {renderError("contect_number")}

              <TextField
                id="parent_school_name-input"
                label="Parent School Name"
                variant="outlined"
                value={teacherDetails.parent_school_name}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    parent_school_name: e.target.value,
                  }));
                }}
              />
              {renderError("parent_school_name")}

              <TextField
                id="parent_school_id-input"
                label="Parent School ID"
                variant="outlined"
                value={teacherDetails.parent_school_id}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    parent_school_id: e.target.value,
                  }));
                }}
              />
              {renderError("parent_school_id")}
            </>
          )}

          {teacherDetails.employee_type === "clerical staff" && (
            <>
              <TextField
                id="employee-name-input"
                label="Employee Name"
                variant="outlined"
                value={teacherDetails.employee_name}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    employee_name: e.target.value,
                  }));
                }}
              />
              {renderError("employee_name")}

              <TextField
                id="employee_id-input"
                label="Employee ID"
                variant="outlined"
                type="number"
                value={teacherDetails.employee_id}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    employee_id: parseInt(e.target.value),
                  }));
                }}
              />
              {renderError("employee_id")}

              <TextField
                id="contect_number-input"
                label="Contect Number"
                variant="outlined"
                type="number"
                value={teacherDetails.contect_number}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    contect_number: parseInt(e.target.value),
                  }));
                }}
              />
              {renderError("contect_number")}
            </>
          )}

          <FormControl fullWidth>
            <InputLabel id="zone-select-label">Select Zone</InputLabel>
            <Select
              label="Select Zone"
              id="zone-select"
              value={teacherDetails.zone}
              onChange={(e) => {
                setTeacherDetails((prev) => ({
                  ...prev,
                  zone: e.target.value,
                }));
              }}
            >
              {zoneArray.map((name) => (
                <MenuItem key={name} value={name}>
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {renderError("zone")}

          {teacherDetails.employee_type !== "clerical staff" &&
            teacherDetails.employee_type !== "mentor" &&
            teacherDetails.employee_type !== "school inspector" && (
              <>
                <TextField
                  id="school-name-input"
                  label="School Name"
                  variant="outlined"
                  value={teacherDetails.school_name}
                  onChange={(e) => {
                    e.persist();
                    setTeacherDetails((prev) => ({
                      ...prev,
                      school_name: e.target.value,
                    }));
                  }}
                />
                {renderError("school_name")}

                <TextField
                  id="school-id-input"
                  label="School ID"
                  variant="outlined"
                  value={teacherDetails.school_id}
                  onChange={(e) => {
                    e.persist();
                    setTeacherDetails((prev) => ({
                      ...prev,
                      school_id: e.target.value,
                    }));
                  }}
                />
                {renderError("school_id")}
              </>
            )}

          <Button
            variant="contained"
            sx={{ marginLeft: "60%" }}
            onClick={handleSubmitteacherDetails}
          >
            Share Details
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default CustomModal;
