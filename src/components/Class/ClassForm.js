import React, { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import CloseIcon from "@material-ui/icons/Close";
import { lang } from "../../constant";
import useStyles from "./styles";
import { METHODS } from "../../services/api";
import axios from "axios";
import { versionCode } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, FormHelperText } from "@mui/material";
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
import { formatInUtc } from "../../common/date";
import _ from "lodash";
import SuccessModel from "./SuccessModel";

function ClassForm({
  isEditMode,
  setShowModal,
  classToEdit,
  indicator,
  formType,
  setIsEditMode,
  Newpathways,
  setNewPathways,
}) {
  const user = useSelector(({ User }) => User);
  const [partnerPathwayId, setPartnerPathwayId] = useState();
  const [volunteer, setVolunteer] = useState([]);

  const [classFields, setClassFields] = useState({
    category_id: 3,
    title: classToEdit?.title || "",
    partner_id: classToEdit.partner_id || [],
    date: classToEdit.start_time
      ? moment.utc(classToEdit.start_time.split("T")[0]).format("YYYY-MM-DD")
      : moment.utc(new Date()).format("YYYY-MM-DD"),
    on_days: classToEdit.parent_class
      ? classToEdit.parent_class?.on_days?.split(",")
      : [],
    start_time: classToEdit.start_time
      ? new Date(classToEdit.start_time)
      : new Date(new Date().setSeconds(0)),
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
      classToEdit?.pathway_id?.[0] ||
      classToEdit?.pathway_v2?.[0] ||
      partnerPathwayId?.[0],
    volunteer_id: classToEdit?.volunteer_id || "",
    facilitator_name: classToEdit?.volunteer?.name || "",
    space_id: classToEdit?.id || "",
    schedule: classToEdit?.schedule || {},
  });
  const [display, setDisplay] = useState(false);
  const [matchDay, setMatchDay] = useState(false);
  const [partnerData, setPartnerData] = useState([]);
  const [exercisesForSelectedCourse, setExercisesForSelectedCourse] = useState(
    []
  );
  const [tutorPathwayId, setTutorPathwayId] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successModalMsg, setSuccessModalMsg] = useState("create");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showError, setShowError] = useState({
    title: false,
    partner: false,
    days: false,
    course: false,
    exercise: false,
    description: false,
  });
  const [helperText, setHelperText] = useState({
    title: "",
    partner: "",
    course: "",
    exercise: "",
    description: "",
  });
  const [onInput, setOnInput] = useState({
    title: false,
    partner: false,
    course: false,
    exercise: false,
    description: false,
  });
  const [onSpace, setOnSpace] = useState([]);
  const [selectSpace, setSelectSpace] = useState([]);
  const [checked, setChecked] = useState(true);
  //getting pathway courses
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state;
  });

  const handleTimeCheckedChange = (event) => {
    setChecked(!checked);
  };

  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: 1 }));
  }, [dispatch]);

  //For title error field (batch and doubt class)
  useEffect(() => {
    if (onInput.title === true && classFields.title === "") {
      setShowError((prev) => {
        return { ...prev, title: true };
      });
      setHelperText((prev) => {
        if (classFields.type === "batch") {
          return { ...prev, title: "Please enter a batch name" };
        } else {
          return { ...prev, title: "Please enter a class title" };
        }
      });
    } else {
      setShowError((prev) => {
        return { ...prev, title: false };
      });
      setHelperText((prev) => {
        return { ...prev, title: "" };
      });
    }
  }, [classFields.title]);

  //For partner error field (batch only)
  useEffect(() => {
    if (classFields.type == "batch") {
      if (onInput.partner && classFields.partner_id.length === 0) {
        setShowError((prev) => {
          return { ...prev, partner: true };
        });
        setHelperText((prev) => {
          return { ...prev, partner: "Please select one or more partners" };
        });
      } else {
        setShowError((prev) => {
          return { ...prev, partner: false };
        });
        setHelperText((prev) => {
          return { ...prev, partner: "" };
        });
      }
    }
  }, [classFields.partner_id?.length]);
  useEffect(() => {
    setClassFields((prev) => {
      return { ...prev, pathway_id: partnerPathwayId?.[0] };
    });
  }, [partnerPathwayId]);

  //For course error field (doubt class only)
  useEffect(() => {
    if (onInput.course && !classFields.course_id) {
      setShowError((prev) => {
        return { ...prev, course: true };
      });
      setHelperText((prev) => {
        return { ...prev, course: "Please select a course" };
      });
    } else {
      setShowError((prev) => {
        return { ...prev, course: false };
      });
      setHelperText((prev) => {
        return { ...prev, course: "" };
      });
    }
  }, [classFields.course_id, onInput.course]);

  //For exercise error field (doubt class only)
  useEffect(() => {
    if (onInput.exercise && !classFields.exercise_id && classFields.course_id) {
      setShowError((prev) => {
        return { ...prev, exercise: true };
      });
      setHelperText((prev) => {
        return {
          ...prev,
          exercise: "Please select an exercise for the above course",
        };
      });
    } else {
      setShowError((prev) => {
        return { ...prev, exercise: false };
      });
      setHelperText((prev) => {
        return { ...prev, exercise: "" };
      });
    }
  }, [classFields.exercise_id, onInput.exercise]);

  //For description error field (doubt class only)
  useEffect(() => {
    if (onInput.description && !classFields.description) {
      setShowError((prev) => {
        return { ...prev, description: true };
      });
      setHelperText((prev) => {
        return {
          ...prev,
          description: "Please enter a short description of the class",
        };
      });
    } else if (onInput.description && classFields.description.length > 555) {
      setShowError((prev) => {
        return { ...prev, description: true };
      });
      setHelperText((prev) => {
        return {
          ...prev,
          description: `Word limit exceeded by ${
            classFields.description.length - 555
          } characters`,
        };
      });
    } else {
      setShowError((prev) => {
        return { ...prev, description: false };
      });
      setHelperText((prev) => {
        return { ...prev, description: "" };
      });
    }
  }, [classFields.description]);

  //For disabled button (batch and doubt class)
  useEffect(() => {
    if (classFields.type === "batch") {
      if (
        classFields.title !== "" &&
        classFields.partner_id?.length > 0 &&
        classFields.on_days?.length > 0 &&
        (checked
          ? Object.keys(classFields.schedule).length === 0
          : Object.keys(classFields.schedule).length > 1)
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    } else {
      if (
        classFields.title !== "" &&
        ((classFields.course_id && classFields.exercise_id) ||
          classFields.pathway_id) &&
        classFields.description &&
        classFields.description.length < 555 &&
        (checked
          ? Object.keys(classFields.schedule).length === 0
          : Object.keys(classFields.schedule).length > 1)
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  }, [
    classFields.title,
    classFields.partner_id?.length,
    classFields.on_days?.length,
    classFields.start_time,
    classFields.end_time,
    classFields.course_id,
    classFields.exercise_id,
    classFields.description,
    checked,
    classFields.schedule,
  ]);

  const courses =
    data?.Pathways?.pathwayCourse?.data?.courses?.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    }) || [];

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
  const formultipleDays = {
    MO: "Monday",
    TU: "Tuesday",
    WE: "Wednesday",
    TH: "Thursday",
    FR: "Friday",
    SA: "Saturday",
    SU: "Sunday",
  };
  const commonElements = Object.keys(formultipleDays).filter((element) =>
    classFields.on_days.includes(element)
  );
  const filteredDayValues = commonElements.map((key) => formultipleDays[key]);

  function convert24To00(timeString) {
    // If the input is "24:xx:xx", convert "24" to "00" and keep the rest unchanged
    if (timeString.startsWith("24:")) {
      return `00${timeString.substring(2)}`;
    }

    return timeString;
  }

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
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners`,
      headers: {
        accept: "application/json",
        "version-code": versionCode,
        Authorization: user.data.token,
      },
    }).then((res) => {
      const partners = res.data.partners.map((item, index) => {
        return {
          label: item.name,
          id: item.id,
        };
      });
      setPartnerData(partners);
    });
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/volunteers`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      const volunteers = res?.data?.map((item, index) => {
        return {
          label: item.name,
          id: item.volunteer_id,
          pathway_id: item.pathway_id,
        };
      });
      setVolunteer(volunteers);
    });
  }, []);

  useEffect(() => {
    let datass = partnerData.filter((item) => {
      return classFields.partner_id.includes(item.id);
    });
    setSelectedPartners(datass);
  }, [partnerData]);

  const convertToIST = (d) => {
    const b = d.split(/\D+/);
    const dateInObj = new Date(
      Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])
    );
    const utc = dateInObj.getTime() + dateInObj.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * +5.5).toISOString();
  };

  const createClass = (payload) => {
    setLoading(true);
    if (checked) {
      payload.start_time = classFields.start_time;
      payload.end_time = classFields.end_time;
    }
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
        if (res.status === 200) {
          setLoading(false);
          setShowSuccessModal(true);
          setSuccessModalMsg("created");
          setTimeout(() => {
            setShowSuccessModal(false);
            setShowModal(false);
          }, 2000);
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const editClass = (payload) => {
    setLoading(true);
    if (checked) {
      payload.start_time = classFields.start_time;
      payload.end_time = classFields.end_time;
    }
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
        if (res.status === 200) {
          setLoading(false);
          setShowSuccessModal(true);
          setSuccessModalMsg("edited");
          setTimeout(() => {
            setShowSuccessModal(false);
            setShowModal(false);
          }, 2000);
        }
      },
      (error) => {
        setLoading(false);
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
        for (let k in days) {
          if (onDay === days[k]) {
            flag = true;
          }
          if (flag) {
            for (let j of weekDday) {
              if (days[j] === days[k]) {
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
        // Fields.date = moment.utc(newDate).format("YYYY-MM-DD");
        classFields.date = formatInUtc(newDate, "yyyy-MM-dd");
      } else {
        classFields.date = classFields.date;
      }
    } else {
      classFields.date = classFields.date;
    }

    //deleting partner_id when it's length is 0
    if (classFields.partner_id.length === 0) delete classFields.partner_id;

    const commonFields = [
      "title",
      "description",
      "start_time",
      "end_time",
      "category_id",
      "pathway_id",
      "lang",
      "type",
      "volunteer_id",
      "space_id",
    ];

    let payload;
    if (classFields.type === "doubt_class") {
      delete classFields.space_id;

      payload = _.pick(classFields, [
        ...commonFields,
        "course_id",
        "exercise_id",
        "partner_id",
      ]);
    } else if (classFields.type === "batch") {
      if (classFields.pathway_id != 7) {
        delete classFields.space_id;
      }
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
    } else {
      delete classFields.max_enrolment;
    }

    //deleting partner_id when it's length is 0
    if (classFields.partner_id.length === 0) delete classFields.partner_id;

    if (checked) {
      // same time for differnt days
      //taking hours and minues from the time
      classFields.start_time = `${classFields.start_time.getHours()}:${classFields.start_time.getMinutes()}`;

      classFields.end_time = `${classFields.end_time.getHours()}:${classFields.end_time.getMinutes()}`;

      //combining time and date
      const classStartTime = moment(
        `${classFields.date} ${classFields.start_time}`
      );
      const classEndTime = moment(
        `${classFields.date} ${classFields.end_time}`
      );

      if (classStartTime.valueOf() >= classEndTime.valueOf()) {
      } //checking start time is greater than end time

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
    } else {
      // timing for multiple days
      //taking first key value from schedule object
      const startDate = new Date();
      const startend =
        classFields.schedule[Object.keys(classFields.schedule)[0]];
      const endDate = new Date();

      startDate.setHours(startend.startTime.split(":")[0]);
      startDate.setMinutes(startend.startTime.split(":")[1]);
      endDate.setHours(startend.endTime.split(":")[0]);
      endDate.setMinutes(startend.endTime.split(":")[1]);
      const originalStartString = moment(startDate).format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
      );
      const tStartIndex = originalStartString.toUpperCase().indexOf("T"); //finding index of T
      const modifiedStartDateString =
        tStartIndex !== -1
          ? `${classFields.date}T${originalStartString.substring(
              tStartIndex + 1
            )}`
          : originalStartString; //combining time and date

      const originalEndString = moment(endDate).format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
      );
      //combining time and date with T and Z format for end time and start time

      const tEndIndex = originalEndString.toUpperCase().indexOf("T");
      const modifiedEndDateString =
        tEndIndex !== -1
          ? `${classFields.date}T${originalEndString.substring(tEndIndex + 1)}`
          : originalEndString;

      payload = {
        ...classFields,
        start_time: modifiedStartDateString,
        end_time: modifiedEndDateString,
      }; //adding start time and end time to payload

      delete payload.date;
      checked && delete payload.schedule; //deleting date and schedule from payload
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

  useEffect(() => {
    if (
      selectedPartners.length === 1 &&
      selectedPartners[0].label.toLocaleLowerCase() ===
        "amazon coding bootcamp".toLocaleLowerCase()
    ) {
      axios({
        method: METHODS.GET,
        url: `${process.env.REACT_APP_MERAKI_URL}/partners/space/${selectedPartners[0].id}`,
        headers: {
          accept: "application/json",
          "version-code": versionCode,
          Authorization: user.data.token,
        },
      }).then((res) => {
        const space = res.data.data.map((item) => {
          return {
            label: item.space_name,
            id: item.id,
          };
        });
        setOnSpace(space);
      });
    }
  }, [selectedPartners]);

  const pathwayName = partnerPathwayId?.map((item) => {
    const pathway = Newpathways.find((pathway) => pathway.id === item);
    return { id: pathway.id, label: pathway.name };
  });

  const sortedData =
    partnerPathwayId?.length && [...pathwayName].sort((a, b) => a.id - b.id);
  const partnerFormattedData =
    partnerPathwayId?.length &&
    sortedData
      .map((item) => item.label)
      .join(", ")
      .replace(/,([^,]*)$/, " and$1");

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
            <Grid container mb={3}>
              <Grid item xs={11}>
                <Typography variant="h6" component="h2">
                  {(isEditMode ? "Update " : "Create ") +
                    (classFields.type == "batch" ? "Batch" : "Doubt Class")}
                </Typography>
              </Grid>
              <Grid
                color="text.secondary"
                item
                xs={1}
                className={classes.FormCloseIcon}
              >
                <CloseIcon
                  open
                  onClick={() => {
                    setShowModal(false);
                    setIsEditMode(false);
                  }}
                />
              </Grid>
            </Grid>
            <Autocomplete
              value={{
                label: classFields.facilitator_name || "",
                id: classFields.volunteer_id || "",
              }}
              sx={{ mb: 3 }}
              options={volunteer}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              onChange={(e, newVal) => {
                setTutorPathwayId(newVal?.pathway_id);
                setPartnerPathwayId(newVal?.pathway_id);
                setClassFields((prev) => {
                  return {
                    ...prev,
                    volunteer_id: newVal?.id,
                    facilitator_name: newVal?.label,
                  };
                });
              }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="outlined-error-helper-text"
                  error={showError.partner}
                  onClick={() => {
                    // setOnInput((prev) => {
                    //   return { ...prev, partner: true };
                    // });
                  }}
                  helperText={helperText.partner}
                  variant="outlined"
                  label="For Tutor"
                />
              )}
            />
            {partnerPathwayId && classFields.type === "batch" && (
              <Typography
                variant="body2"
                color="text.secondary"
                // mb={isActive ? 3 : 4}
                mb={2}
              >
                {`The tutor has opted to teach ${partnerFormattedData} learning track.`}
              </Typography>
            )}

            {partnerPathwayId?.length >= 2 && (
              <>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  pr={2}
                  mt={2}
                  mb={1}
                >
                  Learning Track
                </Typography>

                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="radio-group"
                    name="radio-group"
                    onChange={(e) => {
                      setClassFields({
                        ...classFields,
                        pathway_id: parseInt(e.target.value),
                      });
                    }}
                    sx={{ marginBottom: "16px" }}
                  >
                    {sortedData.map((item, index) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.id}
                        control={<Radio />}
                        label={item.label}
                        labelPlacement="end"
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </>
            )}

            {classFields.type !== "batch" &&
              tutorPathwayId &&
              !tutorPathwayId.includes(7) && (
                <FormControl error={showError.course} fullWidth>
                  <InputLabel id="demo-simple-select-label">Courses</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Courses"
                    onClick={() => {
                      setOnInput((prev) => {
                        return { ...prev, course: true };
                      });
                    }}
                    value={selectedCourseLabel?.label}
                    onChange={(e) => {
                      onCourseChange(e.target.value);
                    }}
                  >
                    {data?.Pathways?.pathwayCourse?.data?.courses?.map(
                      (course) => {
                        return (
                          <MenuItem key={course.id} value={course.id}>
                            {course.name}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                  <FormHelperText>{helperText.course}</FormHelperText>
                </FormControl>
              )}
            {classFields.type !== "batch" &&
              tutorPathwayId &&
              !tutorPathwayId.includes(7) && (
                <FormControl
                  error={showError.exercise}
                  fullWidth
                  sx={{
                    mt: 3,
                    mb: 4,
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Exercises
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Courses"
                    onClick={() => {
                      setOnInput((prev) => {
                        return { ...prev, exercise: true };
                      });
                    }}
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
                  <FormHelperText>{helperText.exercise}</FormHelperText>
                </FormControl>
              )}

            <TextField
              // sx={{ mt: 1 }}
              error={showError.title}
              onClick={() => {
                setOnInput((prev) => {
                  return { ...prev, title: true };
                });
              }}
              id="outlined-error-helper-text"
              fullWidth
              label={`${
                classFields.type === "batch" ? "Batch Name" : "Class Title"
              }`}
              name="title"
              value={classFields.title}
              helperText={helperText.title}
              onChange={(e) => {
                changeHandler(e);
              }}
            />
            {classFields.type === "batch" && (
              <Typography variant="body2" color="text.secondary" mb={3} mt={1}>
                We will automatically create 28 classes for a Python batch with
                titles and descriptions
              </Typography>
            )}
            {/* {classFields.type === "batch" && ( */}
            <Stack mt="16px">
              <Autocomplete
                multiple
                // sx={{ mb: 3 }}
                value={selectedPartners}
                name="partner_id"
                options={partnerData}
                isOptionEqualToValue={(option, value) => {
                  return option.id === value.id;
                }}
                onChange={(e, newVal) => {
                  setSelectedPartners(newVal);
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
                    onClick={() => {
                      setOnInput((prev) => {
                        return { ...prev, partner: true };
                      });
                    }}
                    helperText={helperText.partner}
                    variant="outlined"
                    label="For Partner"
                  />
                )}
              />
            </Stack>
            {/* )} */}

            {classFields.type === "batch" &&
              selectedPartners.length === 1 &&
              selectedPartners[0].label === "amazon coding bootcamp" && (
                <Autocomplete
                  value={selectSpace}
                  sx={{ mt: 3 }}
                  options={onSpace}
                  isOptionEqualToValue={(option, value) => {
                    return option.id === value.id;
                  }}
                  onChange={(e, newVal) => {
                    setSelectSpace(newVal);
                    setClassFields({
                      ...classFields,
                      ["space_id"]: newVal.id,
                    });
                  }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-error-helper-text"
                      error={showError.partner}
                      onClick={() => {
                        setOnInput((prev) => {
                          return { ...prev, partner: true };
                        });
                      }}
                      helperText={helperText.partner}
                      variant="outlined"
                      label="For Group"
                    />
                  )}
                />
              )}

            {classFields.type === "batch" && (
              <Typography
                variant="body2"
                color="text.secondary"
                mb={isActive ? 3 : 4}
                mt={1}
              >
                This batch will be visible to students of only this partner
              </Typography>
            )}
            {classFields.type !== "batch" && (
              <TextField
                sx={{ mt: 3, mb: 4 }}
                type="text"
                value={classFields?.description}
                name="description"
                label="Description"
                error={showError.description}
                onClick={() => {
                  setOnInput((prev) => {
                    return { ...prev, description: true };
                  });
                }}
                helperText={helperText.description}
                multiline
                rows={3}
                fullWidth
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            )}
            <TextField
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
                    sx={{ mt: 3, mb: isActive && 2 }}
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
                          checked={classFields.on_days?.includes(item)}
                          onChange={handleDaySelection}
                        />
                      }
                      onClick={() => {
                        setOnInput((prev) => {
                          return { ...prev, days: true };
                        });
                      }}
                      label={item}
                      labelPlacement={item}
                    />
                  ))}
                </FormGroup>
                {classFields.on_days?.length === 0 && onInput.days ? (
                  <FormHelperText sx={{ color: "red" }} id="my-helper-text">
                    Please select atleast one day
                  </FormHelperText>
                ) : null}
              </>
            )}
            <Typography variant="body2" color="text.secondary" mt="16px">
              Class Timings
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  value={checked}
                  checked={checked}
                  onChange={handleTimeCheckedChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Keep the class timings same for all days"
              sx={{ marginBottom: "16px" }}
            />

            {checked ? (
              <Grid container spacing={2} mb={2}>
                {[
                  { label: "Start Time", prop: "start_time" },
                  { label: "End Time", prop: "end_time" },
                ].map(({ label, prop }) => (
                  <Grid item xs={isActive ? 12 : 6}>
                    {/* same time for every class */}
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
                              ? new Date(new Date().setSeconds(0))
                              : null
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                ))}
              </Grid>
            ) : (
              classFields.on_days?.map((item, index) => (
                <>
                  {/* change time day wise  */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    marginBottom="10px"
                  >
                    {filteredDayValues[index]} Time
                  </Typography>
                  {
                    <Grid container spacing={2}>
                      {[
                        { label: "Start Time", prop: "startTime" },
                        { label: "End Time", prop: "endTime" },
                      ].map(({ label, prop }, index) => (
                        <Grid
                          item
                          xs={isActive ? 12 : 6}
                          key={index}
                          marginBottom="16px"
                        >
                          <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                            key={index}
                          >
                            <Stack spacing={3} key={index}>
                              <DesktopTimePicker
                                key={index}
                                label={label}
                                // ampm={false}
                                value={
                                  classFields.schedule[item]
                                    ? new Date(
                                        `${classFields.date}T${classFields.schedule[item][prop]}`
                                      )
                                    : null
                                }
                                onChange={(time) => {
                                  setClassFields({
                                    ...classFields,
                                    schedule: {
                                      ...classFields.schedule,
                                      [item]: {
                                        ...classFields.schedule[item],
                                        [prop]: convert24To00(
                                          time.toLocaleTimeString("en-US", {
                                            hour12: false,
                                          })
                                        ),
                                      },
                                    },
                                  });
                                }}
                                minTime={
                                  classFields.date ===
                                  moment().format("YYYY-MM-DD")
                                    ? new Date(new Date().setSeconds(0))
                                    : null
                                }
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </Stack>
                          </LocalizationProvider>
                        </Grid>
                      ))}
                    </Grid>
                  }
                </>
              ))
            )}

            <Box display="flex" justifyContent="start">
              <FormControl>
                <Typography variant="body2" color="text.secondary" pr={2}>
                  Language
                </Typography>
                <RadioGroup
                  value={classFields.lang?.index}
                  row={isActive ? false : true}
                >
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
            <FormControl sx={{ mb: 4, mt: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fullwidth
                pt={1}
                pr={2}
              >
                Cap enrollments at
              </Typography>
              <RadioGroup row={isActive ? false : true}>
                {capEnrollment?.map((item) => {
                  return (
                    <FormControlLabel
                      key={item}
                      value={item}
                      name="max_enrolment"
                      control={<Radio />}
                      // checked={
                      //   classFields.max_enrolment &&
                      //   classFields.max_enrolment.includes(item)
                      // }
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      label={item}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            {loading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress color="primary" />
              </div>
            ) : (
              <Button
                style={buttonDisabled ? { backgroundColor: "#B3B3B3" } : null}
                variant="contained"
                fullWidth
                onClick={submitHandle}
              >
                {(isEditMode ? "Update " : "Create ") +
                  (classFields.type == "batch" ? "Batch" : "Doubt Class")}
              </Button>
            )}
          </Box>
        </Stack>
      )}
    </>
  );
}

export default ClassForm;
