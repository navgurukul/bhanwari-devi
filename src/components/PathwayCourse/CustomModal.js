import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
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
import { max } from "date-fns";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  margin: "2rem 0rem"
};

function CustomModal({ isFormModalOpen, setisFormModalOpen, setisFormFilled, user }) {

  let [teacherDetails, setTeacherDetails] = useState({
    zone: "",
    school_id: "",
    school_name: "",
    teacher_name: "",
    teacher_id: "",
    class_of_teacher: "",
    email: "",
  });
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
  const classesOfTeacher = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const zoneArray = ["Central", "Civil Lines", "CTSP", "Karol Bagh", "Keshavpuram", "Narela", "Rohini", "Nazafgarh", "South", "Sharda.North", "Sharda.South", "West"]

  const [teacherClass, setTeacherClass] = React.useState([]);

  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTeacherClass(
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    setTeacherDetails((prev) => ({
      ...prev,
      class_of_teacher: teacherClass.join(",")
    }));
  }, [teacherClass])

  const handleFormModalClose = () => {
    setisFormModalOpen(false);
  };



  const validateForm = () => {
    const newErrors = {};
    if (!teacherDetails.zone) {
      newErrors.zone = "Zone is required.";
    }
    if (!teacherDetails.school_id) {
      newErrors.school_id = "School ID is required.";
    } else if (teacherDetails.school_id.toString().length !== 7) {
      newErrors.school_id = "School ID must be of 7 digits only";
    }
    if (!teacherDetails.school_name) {
      newErrors.school_name = "School Name is required.";
    }
    if (!teacherDetails.teacher_name) {
      newErrors.teacher_name = "Teacher Name is required.";
    }
    if (!teacherDetails.teacher_id) {
      newErrors.teacher_id = "Teacher ID is required.";
    } else if (teacherDetails.teacher_id.toString().length !== 8) {
      newErrors.teacher_id = "Teacher ID must be of 8 digits only";
    }
    if (!teacherDetails.class_of_teacher) {
      newErrors.class_of_teacher = "Class of Teacher is required.";
    }
    if (!teacherDetails.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teacherDetails.email)) {
      newErrors.email = "Invalid email format.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitteacherDetails = () => {
    if (validateForm() === true) {
      axios({
        method: METHODS.POST,
        url: `${process.env.REACT_APP_MERAKI_URL}/teacher/create`,
        headers: {
          accept: "application/json",
          Authorization: user?.data?.token,
        },
        data: teacherDetails,
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
            email: "",
          });
        })
        .catch((err) => console.log(err));
    }
  };


  return (
    <Modal sx={{ overflow: "scroll", border: "none", borderRadius: "10px" }} open={isFormModalOpen} onClose={handleFormModalClose}>
      <Box sx={style} style={{ border: "none", borderRadius: "10px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              marginBottom: "2rem",
            }}
          >
            Teacher Details
          </Typography>
          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={handleFormModalClose}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Zone</InputLabel>
            <Select
              label="Select Zone"
              id="demo-simple-select"
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
          {errors.zone && (
            <small style={{ color: "red" }}>{errors.zone}</small>
          )}
          <TextField
            id="outlined-basic"
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
          {errors.school_name && (
            <small style={{ color: "red" }}>{errors.school_name}</small>
          )}
          <TextField
            id="outlined-basic"
            label="School Id"
            type="number"
            variant="outlined"
            value={teacherDetails.school_id}
            onChange={(e) => {
              e.persist();
              setTeacherDetails((prev) => ({
                ...prev,
                school_id: parseInt(e.target.value),
              }));
            }}
          />
          {errors.school_id && (
            <small style={{ color: "red" }}>{errors.school_id}</small>
          )}
          <TextField
            id="outlined-basic"
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
          {errors.teacher_name && (
            <small style={{ color: "red" }}>{errors.teacher_name}</small>
          )}
          <TextField
            id="outlined-basic"
            label="Email "
            variant="outlined"
            value={teacherDetails.email}
            onChange={(e) => {
              e.persist();
              setTeacherDetails((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
          {errors.email && (
            <small style={{ color: "red" }}>{errors.email}</small>
          )}
          <TextField
            id="outlined-basic"
            label="Teacher ID"
            type="number"
            variant="outlined"
            value={teacherDetails.teacher_id}
            onChange={(e) => {
              e.persist();
              setTeacherDetails((prev) => ({
                ...prev,
                teacher_id: parseInt(e.target.value),
              }));
            }}
          />
          {errors.teacher_id && (
            <small style={{ color: "red" }}>{errors.teacher_id}</small>
          )}
          <FormControl sx={{ width: max }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Select Class
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
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
          {errors.class_of_teacher && (
            <small style={{ color: "red" }}>{errors.class_of_teacher}</small>
          )}
        </Box>
        <Button
          variant="contained"
          sx={{
            marginLeft: "60%",
          }}
          onClick={handleSubmitteacherDetails}
        >
          Share Details
        </Button>
      </Box>
    </Modal>
  )
}

export default CustomModal