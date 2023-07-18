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
import { max } from "date-fns";
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
  let [teacherDetails, setTeacherDetails] = useState({
    zone: "",
    school_id: "",
    school_name: "",
    teacher_name: "",
    teacher_id: "",
    class_of_teacher: "",
    
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
  const fieldArray = [
    { label: "School Name", key: "school_name" },
    { label: "School Id", key: "school_id", type: "number" },
    { label: "Teacher Name", key: "teacher_name" },
    { label: "Teacher ID", key: "teacher_id", type: "number" },
  ];

  const [teacherClass, setTeacherClass] = React.useState([]);

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

        <Box className={classes.modalBox}>
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
          {renderError("zone")}
          {fieldArray.map((field) => (
            <React.Fragment key={field.key}>
              <TextField
                id="outlined-basic"
                label={field.label}
                variant="outlined"
                type={field.type}
                value={teacherDetails[field.key]}
                onChange={(e) => {
                  e.persist();
                  setTeacherDetails((prev) => ({
                    ...prev,
                    [field.key]:
                      field.type === "number"
                        ? parseInt(e.target.value)
                        : e.target.value,
                  }));
                }}
              />
              {renderError(field.key)}
            </React.Fragment>
          ))}
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

          {renderError("class_of_teacher")}
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
