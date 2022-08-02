import React, { useEffect, useState, useMemo } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import CloseIcon from "@material-ui/icons/Close";
import { lang } from "../../constant";
import useStyles from "./styles";
import { METHODS } from "../../services/api";
import axios from "axios";
import { versionCode } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import { FormHelperText } from "@mui/material";
import { actions as pathwayActions } from "./../PathwayCourse/redux/action";
import {
  Typography,
  Grid,
  Button,
  Box,
  Stack,
  Autocomplete,
  Checkbox,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { breakpoints } from "../../theme/constant";
import useMediaQuery from "@mui/material/useMediaQuery";
import moment from "moment";
import _ from "lodash";
import SuccessModel from "./SuccessModel";

function ClassForm({
  isEditMode,
  setShowModal,
  classToEdit,
  indicator,
  formType,
}) {
  const user = useSelector(({ User }) => User);

  const [classFields, setClassFields] = useState({
    category_id: 3,
    title: classToEdit.title || "",
    partner_id: classToEdit.partner_id || [],
    date: classToEdit.start_time
      ? moment.utc(classToEdit.start_time.split("T")[0]).format("YYYY-MM-DD")
      : moment.utc(new Date()).format("YYYY-MM-DD"),
    on_days: classToEdit.parent_class
      ? classToEdit.parent_class.on_days.split(",")
      : [],
    start_time: classToEdit.start_time
      ? new Date(classToEdit.start_time)
      : new Date(),
    end_time: classToEdit.end_time
      ? new Date(classToEdit.end_time)
      : new Date(new Date().setTime(new Date().getTime() + 1 * 60 * 60 * 1000)),
    lang: classToEdit.lang || "en",
    max_enrolment:
      classToEdit.max_enrolment == null
        ? "No Limit"
        : classToEdit.max_enrolment || "10",
    frequency: classToEdit.parent_class
      ? classToEdit.parent_class.frequency
      : "WEEKLY",
    description: classToEdit.description
      ? classToEdit.description
      : formType === "batch"
      ? "abc"
      : "",
    type: classToEdit.type || formType,
    pathway_id:
      classToEdit.pathway_id ||
      classToEdit.pathway_v2 ||
      user.data.user.pathway_id ||
      "1",
  });

  const [display, setDisplay] = useState(false);
  const [matchDay, setMatchDay] = useState(false);
  const [partnerData, setPartnerData] = useState([]);
  const [exercisesForSelectedCourse, setExercisesForSelectedCourse] = useState(
    []
  );
  const [successModalMsg, setSuccessModalMsg] = useState("create");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showError, setShowError] = useState({
    batch: true,
    partner: true,
  });
  const [helperText, setHelperText] = useState({
    batch: "Please enter a batch name",
    partner: "Please select one or more partners",
  });
  //getting pathway courses
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state;
  });

  console.log("classFields", classFields);
  console.log("classToEdit", classToEdit);

  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: 1 }));
  }, [dispatch, 1]);

  useEffect(() => {
    if (classFields.type == "batch" && classFields.title !== "") {
      setShowError((prev) => {
        return { ...prev, batch: false };
      });
      setHelperText((prev) => {
        return { ...prev, batch: "" };
      });
    } else if (classFields.type == "batch" && classFields.title === "") {
      setShowError((prev) => {
        return { ...prev, batch: true };
      });
      setHelperText((prev) => {
        return { ...prev, batch: "Please enter a batch name" };
      });
    } else {
      setShowError(
        setShowError(() => {
          return { partner: "", batch: "" };
        })
      );
    }
  }, [classFields.title]);

  useEffect(() => {
    if (classFields.type == "batch" && classFields.partner_id.length > 0) {
      setShowError((prev) => {
        return { ...prev, partner: false };
      });
      setHelperText((prev) => {
        return { ...prev, partner: "" };
      });
    } else if (
      classFields.type == "batch" &&
      classFields.partner_id.length === 0
    ) {
      setShowError((prev) => {
        return { ...prev, partner: true };
      });
      setHelperText((prev) => {
        return { ...prev, partner: "Please select one or more partners" };
      });
    } else {
      setShowError(
        setShowError(() => {
          return { partner: "", batch: "" };
        })
      );
    }
  }, [classFields.partner_id.length]);

  useEffect(() => {
    if (classFields.date === moment().format("YYYY-MM-DD")) {
      setClassFields({
        ...classFields,
        ["start_time"]: classToEdit.start_time
          ? new Date(classToEdit.start_time)
          : new Date(),
      });

      setClassFields({
        ...classFields,
        ["end_time"]: classToEdit.end_time
          ? new Date(classToEdit.end_time)
          : new Date(),
      });
    }
  }, [classFields.date]);

  useEffect(() => {
    if (
      classFields.title !== "" &&
      classFields.partner_id.length > 0 &&
      classFields.on_days.length > 0 &&
      classFields.start_time <= classFields.end_time
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [
    classFields.title,
    classFields.partner_id.length,
    classFields.on_days.length,
    classFields.start_time,
    classFields.end_time,
  ]);

  useEffect(() => {
    if (classFields.start_time > classFields.end_time) {
      setClassFields({
        ...classFields,
        ["end_time"]: classFields.start_time,
      });
    }
  }, [classFields.start_time, classFields.end_time]);

  const courses =
    data.Pathways.data &&
    data.Pathways.data.pathways[0] &&
    data.Pathways.data.pathways[0].courses.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

  const selectedCourseLabel = courses.find(
    (item) => item.value === classFields.course_id
  );

  const selectedExerciseLabel = exercisesForSelectedCourse.find(
    (item) => item.id === classFields.exercise_id
  );

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const capEnrollment = ["No Limit", 10, 20, 30];
  const days = {
    MO: "Mon",
    TU: "Tue",
    WE: "Wed",
    TH: "Thu",
    FR: "Fri",
    SA: "Sat",
    SU: "Sun",
  };

  const changeHandler = (e) => {
    setClassFields({ ...classFields, [e.target.name]: e.target.value });
  };

  const handleDaySelection = (e) => {
    const index = classFields.on_days.indexOf(e.target.value);
    if (index === -1) {
      setClassFields({
        ...classFields,
        ["on_days"]: [...classFields.on_days, e.target.value],
      });
    } else {
      const dayDeleted = classFields.on_days.filter(
        (selectedDay) => selectedDay !== e.target.value
      );
      setClassFields({ ...classFields, ["on_days"]: dayDeleted });
    }
  };

  useEffect(() => {
    console.log("id", classFields.partner_id);
  }, [classFields.partner_id]);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners`,
      headers: {
        accept: "application/json",
        "version-code": versionCode,
        Authorization: user.data.token,
      },
    }).then((res) => {
      // console.log("res", res);
      const partners = res.data.partners.map((item, index) => {
        return {
          label: item.name,
          id: item.id,
        };
      });
      setPartnerData(partners);
    });
  }, []);

  const convertToIST = (d) => {
    const b = d.split(/\D+/);
    const dateInObj = new Date(
      Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])
    );
    const utc = dateInObj.getTime() + dateInObj.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * +5.5).toISOString();
  };

  const createClass = (payload) => {
    payload.start_time = convertToIST(payload.start_time);
    payload.end_time = convertToIST(payload.end_time);
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/classes`,
      method: METHODS.POST,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        "version-code": versionCode,
        role: "volunteer",
      },
      data: {
        ...payload,
      },
    }).then(
      (res) => {
        console.log("res", res);
        if (res.status === 200) {
          setShowSuccessModal(true);
          setSuccessModalMsg("created");
          setTimeout(() => {
            setShowSuccessModal(false);
            setShowModal(false);
          }, 2000);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  const editClass = (payload) => {
    payload.start_time = convertToIST(payload.start_time);
    payload.end_time = convertToIST(payload.end_time);
    return axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${classToEdit.id}`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        "version-code": versionCode,
        "update-all": indicator,
      },
      data: payload,
    }).then(
      (res) => {
        console.log("res", res);
        //We can also change the Successfull edit class modal here.
        //Need to change the text from create to edit
        if (res.status === 200) {
          setShowSuccessModal(true);
          setSuccessModalMsg("edited");
          setTimeout(() => {
            setShowSuccessModal(false);
            setShowModal(false);
          }, 2000);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  const onCourseChange = (courseId) => {
    setClassFields({ ...classFields, course_id: courseId });

    if (exercisesForSelectedCourse.length > 0) {
      return;
    }
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises`,
      headers: {
        accept: "application/json",
        "version-code": versionCode,
        Authorization: user.data.token,
      },
    }).then((res) => {
      const filteredExercises = res.data.course.exercises.filter(
        (exercise) => exercise.content_type === "exercise"
      );
      setExercisesForSelectedCourse(filteredExercises);
    });
  };

  const onExerciseChange = (exerciseId) => {
    setClassFields({ ...classFields, exercise_id: exerciseId });
  };

  const checkForDoubtClass =
    classFields.type === "doubt_class" &&
    classFields.course_id !== "" &&
    classFields.exercise_id !== "" &&
    classFields.title !== "" &&
    classFields.description !== "" &&
    classFields.start_time !== "" &&
    classFields.end_time !== ""
      ? false
      : true;

  const submitHandle = () => {
    const weekDday = Object.values(classFields.on_days);
    if (classFields.type === "batch") {
      let incrementedDate = new Date(classFields.date);
      let onDay = incrementedDate.toString().split(" ")[0];
      let flag = false;
      let firstDay = "";
      for (let i in days) {
        if (onDay === days[i]) {
          flag = true;
        }
        if (flag) {
          for (let j of weekDday) {
            if (days[j] === days[i]) {
              flag = false;
              firstDay = j;
              setMatchDay(false);
              break;
            } else {
              setMatchDay(true);
            }
          }
        }
      }
      const index = weekDday.indexOf(firstDay);
      if (days[firstDay] !== onDay) {
        let newDate;
        var i = 1;
        while (i <= 7) {
          incrementedDate = moment(incrementedDate).add(1, "days")._d;
          let Day = incrementedDate.toString().split(" ")[0];
          if (days[weekDday[index]] === Day) {
            newDate = incrementedDate;
            break;
          }
          i = i + 1;
        }
        classFields.date = moment.utc(newDate).format("YYYY-MM-DD");
      } else {
        classFields.date = classFields.date;
      }
    } else {
      classFields.date = classFields.date;
    }

    //taking hours and minues from the time
    classFields.start_time = `${classFields.start_time.getHours()}:${classFields.start_time.getMinutes()}`;

    classFields.end_time = `${classFields.end_time.getHours()}:${classFields.end_time.getMinutes()}`;

    //combining time and date
    const classStartTime = moment(
      `${classFields.date} ${classFields.start_time}`
    );
    const classEndTime = moment(`${classFields.date} ${classFields.end_time}`);

    if (classStartTime.valueOf() >= classEndTime.valueOf()) {
      console.log("Class end time must be later than class start time.");
    }

    //deleting partner_id when it's length is 0
    if (classFields.partner_id.length === 0) delete classFields.partner_id;

    //deleting date as we have combined with time and we don't want date separately
    delete classFields.date;
    // delete classFields[date];

    //adding combined date and time to start_time and end_time
    classFields.start_time = `${moment(classStartTime).format(
      "YYYY-MM-DDTHH:mm:ss"
    )}Z`;
    classFields.end_time = `${moment(classEndTime).format(
      "YYYY-MM-DDTHH:mm:ss"
    )}Z`;

    const commonFields = [
      "title",
      "description",
      "start_time",
      "end_time",
      "category_id",
      "pathway_id",
      "lang",
      "type",
    ];
    let payload;
    if (classFields.type === "doubt_class") {
      payload = _.pick(classFields, [
        ...commonFields,
        "course_id",
        "exercise_id",
      ]);
    } else if (classFields.type === "batch") {
      payload = _.pick(classFields, [
        ...commonFields,
        "partner_id",
        "frequency",
        "on_days",
      ]);
    }
    if (classFields.max_enrolment != "No Limit") {
      //add max_enrolment field only if it is not No Limit
      payload.max_enrolment = classFields.max_enrolment;
    }
    (!isEditMode ? createClass : editClass)(payload);
  };

  const handleFocus = (event) => {
    event.preventDefault();
    const { target } = event;
    if (classFields.title === "") {
      setDisplay(true);
    }
  };

  return (
    <>
      {showSuccessModal ? (
        <SuccessModel
          successModalMsg={successModalMsg}
          classType={classFields.type}
        />
      ) : (
        <Stack alignItems="center">
          <Box
            className={classes.ModelBox}
            sx={{
              width: { xs: 330, md: 500 },
              bgcolor: "background.paper",
            }}
          >
            <Grid container mb={4}>
              <Grid item xs={11}>
                <Typography variant="h6" component="h2">
                  {(isEditMode ? "Update " : "Create ") +
                    (classFields.type == "batch" ? "Batch" : "Doubt Class")}
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.FormCloseIcon}>
                <CloseIcon
                  color="text.secondary"
                  open
                  onClick={() => {
                    setShowModal(false);
                  }}
                />
              </Grid>
            </Grid>
            {classFields.type !== "batch" && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Courses</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Courses"
                  value={selectedCourseLabel?.label}
                  onChange={(e) => {
                    onCourseChange(e.target.value);
                  }}
                >
                  {courses.map((course) => {
                    return (
                      <MenuItem key={course.value} value={course.value}>
                        {course.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
            {classFields.type !== "batch" && (
              <FormControl
                fullWidth
                sx={{
                  mt: 3,
                  mb: 4,
                }}
              >
                <InputLabel id="demo-simple-select-label">Exercises</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Courses"
                  disabled={exercisesForSelectedCourse.length === 0}
                  value={selectedExerciseLabel?.label}
                  onChange={(e) => {
                    onExerciseChange(e.target.value);
                  }}
                >
                  {exercisesForSelectedCourse &&
                    exercisesForSelectedCourse.map((exercise) => {
                      return (
                        <MenuItem key={exercise.id} value={exercise.id}>
                          {exercise.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            )}
            <TextField
              // sx={{ mt: 4 }}
              error={showError.batch}
              id="outlined-error-helper-text"
              fullWidth
              label={`${
                classFields.type === "batch" ? "Batch Name" : "Class Title"
              }`}
              name="title"
              value={classFields.title}
              helperText={helperText.batch}
              onChange={(e) => {
                changeHandler(e);
              }}
            />

            {classFields.type === "batch" && (
              <Typography variant="body2" color="text.secondary" mb={4} mt={2}>
                We will automatically create 28 classes for a Python batch with
                titles and descriptions
              </Typography>
            )}
            {classFields.type === "batch" && (
              <Stack>
                <Autocomplete
                  multiple
                  // value={classFields.partner_id}
                  name="partner_id"
                  options={partnerData}
                  isOptionEqualToValue={(option, value) => {
                    return option.id === value.id;
                  }}
                  onChange={(e, newVal) => {
                    setClassFields({
                      ...classFields,
                      ["partner_id"]: newVal.map((item) => item.id),
                    });
                  }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-error-helper-text"
                      error={showError.partner}
                      helperText={helperText.partner}
                      variant="outlined"
                      label="For Partner"
                    />
                  )}
                />
              </Stack>
            )}
            {classFields.type === "batch" && (
              <Typography variant="body2" color="text.secondary" mb={4} mt={2}>
                This batch will be visible to students of only these partner
              </Typography>
            )}
            {classFields.type !== "batch" && (
              <TextField
                sx={{ mt: 3, mb: 4 }}
                type="text"
                value={classFields?.description}
                name="description"
                label="Description"
                error={classFields?.description?.length > 555}
                helperText={
                  classFields?.description?.length > 555
                    ? `Word limit exceeded by ${
                        classFields?.description?.length - 555
                      } characters`
                    : ""
                }
                multiline
                rows={3}
                fullWidth
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            )}
            <TextField
              // sx={{ mb: 4 }}
              type="date"
              variant="outlined"
              inputProps={{
                min: moment().format("YYYY-MM-DD"),
              }}
              value={classFields.date}
              name="date"
              label="Start Date"
              fullWidth
              onChange={(e) => {
                changeHandler(e);
              }}
            />
            {classFields.type === "batch" && (
              <>
                <FormLabel component="legend">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 4 }}
                    // mb={1}
                  >
                    Schedule on days
                  </Typography>
                </FormLabel>
                <FormGroup aria-label="position" row>
                  {Object.keys(days).map((item) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={item}
                          checked={classFields.on_days.includes(item)}
                          onChange={handleDaySelection}
                        />
                      }
                      label={item}
                      labelPlacement={item}
                    />
                  ))}
                </FormGroup>
                {classFields.on_days.length === 0 ? (
                  <FormHelperText sx={{ color: "red" }} id="my-helper-text">
                    Please select atleast one day
                  </FormHelperText>
                ) : null}
              </>
            )}
            <Grid container mt={2} spacing={2}>
              {[
                { label: "Start Time", prop: "start_time" },
                { label: "End Time", prop: "end_time" },
              ].map(({ label, prop }) => (
                <Grid item xs={isActive ? 12 : 6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DesktopTimePicker
                        label={label}
                        value={classFields[prop]}
                        onChange={(time) => {
                          setClassFields({
                            ...classFields,
                            [prop]: time,
                          });
                        }}
                        minTime={
                          classFields.date === moment().format("YYYY-MM-DD")
                            ? new Date()
                            : null
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="start">
              <FormControl>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  pr={2}
                  mt={4}
                >
                  Language
                </Typography>
                <RadioGroup value={classFields.lang?.index} row>
                  {Object.keys(lang)?.map((item) => {
                    if (item !== "mr") {
                      return (
                        <FormControlLabel
                          key={item}
                          value={item}
                          name="lang"
                          control={<Radio />}
                          checked={classFields.lang.includes(item)}
                          onChange={(e) => {
                            changeHandler(e);
                          }}
                          label={lang[item]}
                        />
                      );
                    }
                  })}
                </RadioGroup>
              </FormControl>
            </Box>
            <FormControl sx={{ mb: 4, mt: 4 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fullwidth
                pt={1}
                pr={2}
              >
                Cap enrollments at
              </Typography>
              <RadioGroup row>
                {capEnrollment?.map((item) => {
                  return (
                    <FormControlLabel
                      key={item}
                      value={item}
                      name="max_enrolment"
                      control={<Radio />}
                      checked={
                        classFields.max_enrolment &&
                        classFields.max_enrolment.includes(item)
                      }
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      label={item}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            <Button
              style={buttonDisabled ? { backgroundColor: "#B3B3B3" } : null}
              variant="contained"
              fullWidth
              onClick={submitHandle}
            >
              {(isEditMode ? "Update " : "Create ") +
                (classFields.type == "batch" ? "Batch" : "Doubt Class")}
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
}

export default ClassForm;
