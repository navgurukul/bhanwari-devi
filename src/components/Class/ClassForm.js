import React, { useEffect, useState, useMemo } from "react";
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

function ClassForm({ isEditMode, setShowModal, classToEdit, indicator }) {
  const [classFields, setClassFields] = useState({
    category_id: 3,
    title: "",
    partner_id: [],
    date: moment.utc(new Date()).format("YYYY-MM-DD"),
    on_days: [],
    start_time: new Date("2018-01-01T00:00:00.000Z"),
    end_time: new Date("2018-01-01T00:00:00.000Z"),
    lang: "",
    max_enrolment: "",
    frequency: "WEEKLY",
    description: "abc",
    type: "batch",
    pathway_id: "1",
  });

  // const isEditMode = !_.isEmpty(classFields);
  // const isEditMode = false;
  const [partnerData, setPartnerData] = useState([]);
  const [Selected_partner_id, setSelected_partner_id] = useState();
  const [createBatch, setCreateBatch] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [exercisesForSelectedCourse, setExercisesForSelectedCourse] = useState(
    {}
  );

  // const [openModal, setOpenModal] = useState(false);
  const user = useSelector(({ User }) => User);

  //getting pathway courses
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state;
  });
  // const { pathwayCourse } = useSelector((state) => state.Pathways);

  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: 1 }));
  }, [dispatch, 1]);

  console.log(data, "data");

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
    (item) => item.value === selectedCourse
  );

  console.log(courses, "courses");

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  const capEnrollment = ["No Limit", 10, 20, 30];
  const partnerList = ["p1", "p2", "p3"];

  const changeHandler = (e) => {
    setClassFields({ ...classFields, [e.target.name]: e.target.value });
  };

  console.log("classFields", classFields);
  console.log("Selected_partner_id", Selected_partner_id);
  console.log("isEditMode", isEditMode);

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
      console.log("res", res);
      const partners = res.data.partners.map((item, index) => {
        return {
          label: item.name,
          id: item.id,
        };
      });
      setPartnerData(partners);
    });
  }, []);

  useEffect(() => {
    console.log("exercisesForSelectedCourse", exercisesForSelectedCourse);
  }, [exercisesForSelectedCourse]);

  console.log("partnerData", partnerData);

  const convertToIST = (d) => {
    const b = d.split(/\D+/);
    const dateInObj = new Date(
      Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])
    );
    const utc = dateInObj.getTime() + dateInObj.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * +5.5).toISOString();
  };

  const createClass = (payload) => {
    console.log("Poonam");
    payload.start_time = convertToIST(payload.start_time);
    payload.end_time = convertToIST(payload.end_time);
    // setLoading(true);
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
        // toast.success("You successfully created a class.", {
        //   position: toast.POSITION.BOTTOM_RIGHT,
        // });
        // setLoading(false);
        // window.location.reload(1);
      },
      (error) => {
        console.log("error", error);
        // toast.error(
        //   `Something went wrong with error status: ${error.response.status} ${error.response.data.message}`,
        //   {
        //     position: toast.POSITION.BOTTOM_RIGHT,
        //   }
        // );
        // setLoading(false);
      }
    );
  };

  const editClass = (payload) => {
    console.log("Punnu");
    payload.start_time = convertToIST(payload.start_time);
    payload.end_time = convertToIST(payload.end_time);
    // if (classToEdit.type === "batch") {
    //   if (indicator === false) {
    //     delete payload.frequency;
    //   }
    // }

    // setLoading(true);
    return axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/apiDocs/classes/${classToEdit.id}`,
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
        // toast.success("Updated class details!", {
        //   position: toast.POSITION.BOTTOM_RIGHT,
        //   autoClose: 2500,
        // });
        // setLoading(false);
        // window.location.reload(1);
      },
      (error) => {
        console.log("error", error);
        // toast.error(
        //   `Something went wrong with error status: ${error.response.status} ${error.response.data.message}`,
        //   {
        //     position: toast.POSITION.BOTTOM_RIGHT,
        //   }
        // );
        // setLoading(false);
      }
    );
  };

  const onCourseChange = (courseId) => {
    setSelectedCourse(courseId);
    if (exercisesForSelectedCourse[courseId]) {
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
      setExercisesForSelectedCourse({
        ...exercisesForSelectedCourse,
        [courseId]: res.data.course.exercises,
      });
    });
  };

  const submitHandle = () => {
    //taking hours and minues from the time
    classFields.start_time = `${classFields.start_time.getHours()}:${classFields.start_time.getMinutes()}`;
    classFields.end_time = `${classFields.end_time.getHours()}:${classFields.end_time.getMinutes()}`;

    console.log("classFields.start_time", classFields.start_time);

    //combining time and date
    const classStartTime = moment(
      `${classFields.date} ${classFields.start_time}`
    );
    const classEndTime = moment(`${classFields.date} ${classFields.end_time}`);

    console.log("classStartTime", classStartTime);
    console.log("classEndTime", classEndTime);
    // if (classStartTime.valueOf() >= classEndTime.valueOf()) {
    //   // toast.error("Class end time must be later than class start time.", {
    //   //   position: toast.POSITION.BOTTOM_RIGHT,
    //   // });
    //   console.log("Class end time must be later than class start time.");
    //   // Making the class end time field focused, so user can edit it.
    //   console.log("focus", document.getElementById(classFields.end_time));
    //   // return document.getElementById(classFields.end_time).focus();
    // }

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

    console.log("classFields", classFields);

    if (!isEditMode) {
      createClass(classFields);
    } else {
      editClass(classFields);
    }

    // if (true) {
    //   setShowModal(false);
    //   setOpenSuccessfullModal(true);
    // }
  };

  return (
    <>
      {createBatch ? (
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
                  Create Batch
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
            <TextField
              fullWidth
              label="Batch Name"
              name="title"
              value={classFields.title}
              onChange={(e) => {
                changeHandler(e);
              }}
            />

            <Typography variant="body2" color="text.secondary" mb={3} mt={3}>
              We will automatically create 28 classes for a Python batch with
              titles and descriptions
            </Typography>
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
                  // setClassFields({
                  //   ...classFields,
                  //   ["partner_id"]: [...classFields.partner_id, newVal.id],
                  // });
                  console.log(newVal.id);
                  setSelected_partner_id(newVal.id);
                }}
                // getOptionLabel={(option) => option}
                // onChange={(event, value) => {
                //   setClassFields({ ...classFields, ["partner_id"]: value });
                // [...classFields.on_days, e.target.value]
                // }}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="For Partner"
                  />
                )}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary" mt={3}>
              This batch will be visible to students of only these partner
            </Typography>
            <TextField
              sx={{ mt: 3 }}
              type="date"
              variant="outlined"
              value={classFields.date}
              name="date"
              label="Start Date"
              fullWidth
              onChange={(e) => {
                changeHandler(e);
              }}
            />
            <FormLabel component="legend">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ pt: 3 }}
                mb={2}
              >
                Schedule on days
              </Typography>
            </FormLabel>
            <FormGroup aria-label="position" row>
              {days.map((item) => (
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
            <Grid container mt={2} spacing={2}>
              <Grid item xs={isActive ? 12 : 6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopTimePicker
                      label="Start Time"
                      value={classFields.start_time}
                      onChange={(startTime) => {
                        setClassFields({
                          ...classFields,
                          ["start_time"]: startTime,
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={isActive ? 12 : 6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopTimePicker
                      label="End-Time"
                      value={classFields.end_time}
                      onChange={(endTime) => {
                        setClassFields({
                          ...classFields,
                          ["end_time"]: endTime,
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="start">
              <FormControl>
                <FormLabel sx={{ mt: 3, mb: 2 }}>Language</FormLabel>
                <RadioGroup value={classFields.lang?.index} row>
                  {Object.keys(lang)?.map((item) => {
                    if (item !== "mr") {
                      return (
                        <FormControlLabel
                          key={item}
                          value={item}
                          name="lang"
                          control={<Radio />}
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
              <RadioGroup row>
                <Typography variant="body1" pt={1} pr={2}>
                  Cap enrollments at
                </Typography>
                {capEnrollment?.map((item) => {
                  return (
                    <FormControlLabel
                      key={item}
                      value={item}
                      name="max_enrolment"
                      control={<Radio />}
                      label={item}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            <Button variant="contained" fullWidth onClick={submitHandle}>
              Create Batch
            </Button>
          </Box>
        </Stack>
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
                  Create Doubt Class
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Courses</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Courses"
                value={selectedCourseLabel?.label}
                onChange={(e) => {
                  onCourseChange(e.target.value);
                  console.log(e.target.value);
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
            <FormControl
              fullWidth
              sx={{
                mt: 3,
              }}
            >
              <InputLabel id="demo-simple-select-label">Exercises</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Exercises"
              ></Select>
            </FormControl>

            <TextField
              sx={{ mt: 3 }}
              type="text"
              value={classFields.name}
              name="Class Title"
              label="Class Title"
              fullWidth
              onChange={(e) => {
                changeHandler(e);
              }}
            />

            <TextField
              sx={{ mt: 3 }}
              type="text"
              value={classFields.name}
              name="Description"
              label="Description"
              multiline
              rows={3}
              fullWidth
              onChange={(e) => {
                changeHandler(e);
              }}
            />

            <TextField
              sx={{ mt: 3 }}
              type="date"
              variant="outlined"
              value={classFields.date}
              name="date"
              label="Start Date"
              fullWidth
              onChange={(e) => {
                changeHandler(e);
              }}
            />

            <Grid container mt={2} spacing={2}>
              <Grid item xs={isActive ? 12 : 6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopTimePicker
                      label="Start Time"
                      value={classFields.start_time}
                      onChange={(startTime) => {
                        setClassFields({
                          ...classFields,
                          ["start_time"]: startTime,
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={isActive ? 12 : 6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopTimePicker
                      label="End-Time"
                      value={classFields.end_time}
                      onChange={(endTime) => {
                        setClassFields({
                          ...classFields,
                          ["end_time"]: endTime,
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="start">
              <FormControl>
                <Typography variant="body2" pt={1} pr={2} mt={2}>
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
              <Typography variant="body2" fullwidth pt={1} pr={2}>
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
                      label={item}
                      sx={{ mr: 2 }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      fullwidth
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            <Button variant="contained" fullWidth onClick={submitHandle}>
              Create Class
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
}

export default ClassForm;
