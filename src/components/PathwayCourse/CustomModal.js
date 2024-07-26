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
    phone_number: "",
    employee_type: "",
  });

  // console.log("teacherDetails", teacherDetails);

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
    "teacher",
    "principal",
    "mentor_teacher",
    "school_inspector",
    "clerical_staff",
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
    const containsNumbers = /\d/;
    const containsOnlyNumbers = /^\d+$/;

    if (!teacherDetails.zone) newErrors.zone = "Zone is required.";

    if (
      !teacherDetails.school_id &&
      teacherDetails.employee_type !== "clerical_staff"
    )
      newErrors.school_id = "School ID is required.";
    else if (
      teacherDetails.school_id &&
      !containsOnlyNumbers.test(teacherDetails.school_id)
    )
      newErrors.school_id = "School ID should contain only digits.";
    else if (
      teacherDetails.school_id &&
      teacherDetails.school_id.toString().length !== 7
    )
      newErrors.school_id = "School ID must be of 7 digits only";

    if (
      !teacherDetails.school_name &&
      teacherDetails.employee_type !== "clerical_staff"
    )
      newErrors.school_name = "School Name is required.";
    else if (containsNumbers.test(teacherDetails.school_name))
      newErrors.school_name = "School Name should not contain numbers.";

    // Validate fields based on employee type
    const validateEmployeeDetails = () => {
      if (!teacherDetails.teacher_name)
        newErrors.teacher_name = "Teacher Name is required.";
      else if (containsNumbers.test(teacherDetails.teacher_name))
        newErrors.teacher_name = "Teacher Name should not contain numbers.";

      if (
        !teacherDetails.teacher_id &&
        teacherDetails.employee_type !== "clerical_staff"
      )
        newErrors.teacher_id = "Teacher ID is required.";
      else if (
        teacherDetails.teacher_id &&
        !containsOnlyNumbers.test(teacherDetails.teacher_id)
      )
        newErrors.teacher_id = "Teacher ID should contain only digits.";
      else if (
        teacherDetails.teacher_id &&
        teacherDetails.teacher_id.toString().length !== 7
      )
        newErrors.teacher_id = "Teacher ID must be of 7 digits only";

      if (!teacherDetails.teacher_name)
        newErrors.teacher_name = "Pricipal Name is required.";
      else if (containsNumbers.test(teacherDetails.teacher_name))
        newErrors.teacher_name = "Pricipal Name should not contain numbers.";

      if (
        !teacherDetails.teacher_id &&
        teacherDetails.employee_type !== "clerical_staff"
      )
        newErrors.teacher_id = "Pricipal ID is required.";
      else if (
        teacherDetails.teacher_id &&
        !containsOnlyNumbers.test(teacherDetails.teacher_id)
      )
        newErrors.teacher_id = "Pricipal ID should contain only digits.";
      else if (
        teacherDetails.teacher_id &&
        teacherDetails.teacher_id.toString().length !== 7
      )
        newErrors.teacher_id = "Pricipal ID must be of 7 digits only";

      if (!teacherDetails.teacher_name)
        newErrors.teacher_name = "Mentor Teacher Name is required.";
      else if (containsNumbers.test(teacherDetails.teacher_name))
        newErrors.teacher_name =
          "Mentor Teacher Name should not contain numbers.";

      if (
        !teacherDetails.teacher_id &&
        teacherDetails.employee_type !== "clerical_staff"
      )
        newErrors.teacher_id = "Mentor Teacher ID is required.";
      else if (
        teacherDetails.teacher_id &&
        !containsOnlyNumbers.test(teacherDetails.teacher_id)
      )
        newErrors.teacher_id = "Mentor Teacher ID should contain only digits.";
      else if (
        teacherDetails.teacher_id &&
        teacherDetails.teacher_id.toString().length !== 7
      )
        newErrors.teacher_id = "Mentor Teacher ID must be of 7 digits only";

      if (!teacherDetails.teacher_name)
        newErrors.teacher_name = "School Inspector Name is required.";
      else if (containsNumbers.test(teacherDetails.teacher_name))
        newErrors.teacher_name =
          "School Inspector Name should not contain numbers.";

      if (
        !teacherDetails.teacher_id &&
        teacherDetails.employee_type !== "clerical_staff"
      )
        newErrors.teacher_id = "School Inspector ID is required.";
      else if (
        teacherDetails.teacher_id &&
        !containsOnlyNumbers.test(teacherDetails.teacher_id)
      )
        newErrors.teacher_id =
          "School Inspector ID should contain only digits.";
      else if (
        teacherDetails.teacher_id &&
        teacherDetails.teacher_id.toString().length !== 7
      )
        newErrors.teacher_id = "School Inspector ID must be of 7 digits only";

      if (!teacherDetails.teacher_name)
        newErrors.teacher_name = "Employee Name is required.";
      else if (containsNumbers.test(teacherDetails.teacher_name))
        newErrors.teacher_name = "Employee Name should not contain numbers.";

      if (
        !teacherDetails.teacher_id &&
        teacherDetails.employee_type !== "clerical_staff"
      )
        newErrors.teacher_id = "Employee ID is required.";
      else if (
        teacherDetails.teacher_id &&
        !containsOnlyNumbers.test(teacherDetails.teacher_id)
      )
        newErrors.teacher_id = "Employee ID should contain only digits.";
      else if (
        teacherDetails.teacher_id &&
        teacherDetails.teacher_id.toString().length !== 7
      )
        newErrors.teacher_id = "EmployeeID must be of 7 digits only";
    };

    if (teacherDetails.employee_type === "teacher") {
      validateEmployeeDetails();
      if (!teacherDetails.class_of_teacher)
        newErrors.class_of_teacher = "Class of Teacher is required.";
    } else if (teacherDetails.employee_type === "principal") {
      validateEmployeeDetails();
    } else if (teacherDetails.employee_type === "mentor_teacher") {
      validateEmployeeDetails();
    } else if (teacherDetails.employee_type === "school_inspector") {
      validateEmployeeDetails();
    } else if (teacherDetails.employee_type === "clerical_staff") {
      validateEmployeeDetails();
    }
    if (!teacherDetails.phone_number)
      newErrors.phone_number = "Phone number is required.";
    else if (!containsOnlyNumbers.test(teacherDetails.phone_number))
      newErrors.phone_number = "Phone number should contain only digits.";
    else if (teacherDetails.phone_number.toString().length !== 10)
      newErrors.phone_number = "Phone number must be of 10 digits only";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitteacherDetails = () => {
    if (validateForm()) {
      const dataToSend = { ...teacherDetails };

      if (
        teacherDetails.employee_type !== "teacher" &&
        teacherDetails.employee_type !== "mentor_teacher"
      ) {
        delete dataToSend.class_of_teacher;
      }

      if (teacherDetails.employee_type === "clerical_staff") {
        delete dataToSend.school_id;
        delete dataToSend.school_name;
      } else {
        if (dataToSend.school_id && isNaN(Number(dataToSend.school_id))) {
          delete dataToSend.school_id;
        }
        if (!dataToSend.school_name || dataToSend.school_name.trim() === "") {
          delete dataToSend.school_name;
        }
      }

      axios({
        method: METHODS.POST,
        url: `${process.env.REACT_APP_MERAKI_URL}/teacher/create`,
        headers: {
          accept: "application/json",
          Authorization: user?.data?.token,
        },
        data: dataToSend,
      })
        .then((res) => {
          handleFormModalClose();
          setisFormFilled(true);
          setTeacherDetails({
            zone: "",
            school_id: "",
            school_name: "",
            teacher_name: "",
            teacher_id: "",
            class_of_teacher: "",
            phone_number: "",
            employee_type: "",
          });
        })
        .catch((err) => console.log(err));
    }
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
                setTeacherDetails({
                  zone: "",
                  school_id: "",
                  school_name: "",
                  teacher_name: "",
                  teacher_id: "",
                  class_of_teacher: "",
                  phone_number: "",
                  employee_type: e.target.value,
                });
                setTeacherClass([]);
                setErrors({});
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
                id="teacher_name"
                label="Principal Name"
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
                id="teacher_id"
                label="Principal ID"
                variant="outlined"
                value={teacherDetails.teacher_id}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    teacher_id: e.target.value,
                  }));
                }}
              />
              {renderError("teacher_id")}
            </>
          )}

          {teacherDetails.employee_type === "teacher" && (
            <>
              <TextField
                id="teacher_name"
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
                id="teacher_id"
                label="Teacher ID"
                variant="outlined"
                value={teacherDetails.teacher_id}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    teacher_id: e.target.value,
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
            </>
          )}

          {teacherDetails.employee_type === "mentor_teacher" && (
            <>
              <TextField
                id="teacher_name"
                label="Mentor Teacher Name"
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
                id="teacher_id"
                label="Mentor Teacher ID"
                variant="outlined"
                value={teacherDetails.teacher_id}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    teacher_id: e.target.value,
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
            </>
          )}
          {teacherDetails.employee_type === "school_inspector" && (
            <>
              <TextField
                id="teacher_name"
                label="School Inspector Name"
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
                id="teacher_id"
                label="School Inspector ID"
                variant="outlined"
                value={teacherDetails.teacher_id}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    teacher_id: e.target.value,
                  }));
                }}
              />
              {renderError("teacher_id")}
            </>
          )}

          {teacherDetails.employee_type === "clerical_staff" && (
            <>
              <TextField
                id="teacher_name"
                label="Employee Name"
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
                id="teacher_id"
                label="Employee ID"
                variant="outlined"
                value={teacherDetails.teacher_id}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    teacher_id: e.target.value,
                  }));
                }}
              />
              {renderError("teacher_id")}
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

          {teacherDetails.employee_type !== "clerical_staff" && (
            <>
              <TextField
                id="school_id"
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
              <TextField
                id="school_name"
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
            </>
          )}
          <TextField
            id="phone_number"
            label="Contect Number"
            variant="outlined"
            value={teacherDetails.phone_number}
            onChange={(e) => {
              e.persist();
              setTeacherDetails((prev) => ({
                ...prev,
                phone_number: e.target.value,
              }));
            }}
          />
          {renderError("phone_number")}
        </Box>
        <Button
          variant="contained"
          sx={{ marginLeft: "60%" }}
          onClick={handleSubmitteacherDetails}
        >
          Share Details
        </Button>
      </Box>
    </Modal>
  );
}
export default CustomModal;
