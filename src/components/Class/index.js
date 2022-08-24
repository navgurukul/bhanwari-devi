import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
import { toast } from "react-toastify";
import axios from "axios";
import { versionCode } from "../../constant";
import { TIME_CONSTANT, CLASS_FIELDS } from "./constant";
import Loader from "../common/Loader";
import Form from "../common/form";
import { METHODS } from "../../services/api";
import "./styles.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const {
  TITLE,
  DESCRIPTION,
  FACILITATOR_EMAIL,
  FACILITATOR_NAME,
  START_TIME,
  CLASS_START_TIME,
  CLASS_END_TIME,
  LANG,
  TYPE,
  PATHWAY_ID,
  COURSE_ID,
  PARTNER_ID,
  EXERCISE_ID,
  MAX_ENROLMENT,
  FREQUENCY,
  ON_DAYS,
  OCCURRENCE,
  UNTIL,
} = CLASS_FIELDS;

function Class({ classToEdit, indicator }) {
  const isEditMode = !_.isEmpty(classToEdit);
  const [loading, setLoading] = useState(false);
  const [pathwayId, setPathwayId] = useState();
  const [pathwayCode, setPathwayCode] = useState();
  const [checkedState, setCheckedState] = useState(new Array(7).fill(false));
  const [day, setDay] = useState({});
  const [matchDay, setMatchDat] = useState(false);
  const [classType, setClassType] = useState("batch");
  const [partnerData, setPartnerData] = useState([]);
  const [Selected_partner_id, setSelected_partner_id] = useState();

  const {
    title,
    description,
    facilitator,
    lang,
    type,
    start_time,
    end_time,
    pathway_id,
    course_id,
    // partner_id,
    exercise_id,
    max_enrolment,
    frequency,
    parent_class,
  } = classToEdit;

  const initialFormState = useMemo(() => {
    let on_days_list = [];
    let occurrence_data = "";
    let until_data = "";
    if (parent_class) {
      if (parent_class.on_days) on_days_list = parent_class.on_days.split(",");
      if (parent_class.occurrence) occurrence_data = parent_class.occurrence;
      if (parent_class.until) until_data = parent_class.until;
    }
    return {
      [TITLE]: title || "",
      [DESCRIPTION]: description || "",
      [FACILITATOR_NAME]: facilitator ? facilitator.name : "",
      [FACILITATOR_EMAIL]: facilitator ? facilitator.email : "",
      [START_TIME]: start_time
        ? moment.utc(start_time).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
      [CLASS_START_TIME]: start_time
        ? moment.utc(start_time).add(330, "minute").format("kk:mm")
        : moment().format("kk:mm"),
      [CLASS_END_TIME]: end_time
        ? moment.utc(end_time).add(330, "minute").format("kk:mm")
        : moment().add(60, "minute").format("kk:mm"),
      [LANG]: lang || "hi",
      [TYPE]: type || "batch",
      [COURSE_ID]: course_id || "",
      [PATHWAY_ID]: pathway_id || "",
      [EXERCISE_ID]: exercise_id || "",
      [MAX_ENROLMENT]: max_enrolment || "0",
      [FREQUENCY]: frequency || "",
      [ON_DAYS]: on_days_list || [],
      [OCCURRENCE]: occurrence_data || "28",
      [UNTIL]: until_data || "",
    };
  }, [classToEdit]);

  const days = {
    MO: "Mon",
    TU: "Tue",
    WE: "Wed",
    TH: "Thu",
    FR: "Fri",
    SA: "Sat",
    SU: "Sun",
  };

  const user = useSelector(({ User }) => User);
  const rolesList = user.data.user.rolesList;

  const canSpecifyFacilitator =
    rolesList.indexOf("classAdmin") > -1 || rolesList.indexOf("admin") > -1;

  const [pathways, setPathways] = useState([]);
  const [exercisesForSelectedCourse, setExercisesForSelectedCourse] = useState(
    {}
  );

  const editClass = (payload) => {
    payload.start_time = convertToIST(payload.start_time);
    payload.end_time = convertToIST(payload.end_time);
    if (classToEdit.type === "batch") {
      if (indicator === false) {
        delete payload.frequency;
      }
    }

    setLoading(true);
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
      () => {
        toast.success("Updated class details!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
        });
        setLoading(false);
        window.location.reload(1);
      },
      (error) => {
        toast.error(
          `Something went wrong with error status: ${error.response.status} ${error.response.data.message}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways?courseType=json`,
      headers: {
        accept: "application/json",
        "version-code": versionCode,
        Authorization: user.data.token,
      },
    }).then((res) => {
      setPathways(res.data.pathways);
    });
  }, []);

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
  }, []);

  const onCourseChange = (courseId) => {
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

  const convertToIST = (d) => {
    const b = d.split(/\D+/);
    const dateInObj = new Date(
      Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])
    );
    const utc = dateInObj.getTime() + dateInObj.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * +5.5).toISOString();
  };

  const handleTimeValidationAndCreateClass = (payload) => {
    const classStartTime = moment(
      `${payload[TIME_CONSTANT.CLASS_START_DATE]} ${
        payload[TIME_CONSTANT.CLASS_START_TIME]
      }`
    );
    const classEndTime = moment(
      `${payload[TIME_CONSTANT.CLASS_START_DATE]} ${
        payload[TIME_CONSTANT.CLASS_END_TIME]
      }`
    );

    if (classStartTime.valueOf() >= classEndTime.valueOf()) {
      toast.error("Class end time must be later than class start time.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // Making the class end time field focused, so user can edit it.
      return document.getElementById(TIME_CONSTANT.CLASS_END_TIME).focus();
    }
    // remove the unnecessary time fields and add date parameter
    delete payload[TIME_CONSTANT.CLASS_END_TIME];
    delete payload[TIME_CONSTANT.CLASS_START_TIME];
    payload[TIME_CONSTANT.CLASS_START_DATE] = `${moment(classStartTime).format(
      "YYYY-MM-DDTHH:mm:ss"
    )}Z`;
    payload[TIME_CONSTANT.CLASS_END_DATE] = `${moment(classEndTime).format(
      "YYYY-MM-DDTHH:mm:ss"
    )}Z`;

    payload[PARTNER_ID] = Selected_partner_id;

    if (!isEditMode) {
      createClass(payload);
    } else {
      editClass(payload);
    }
  };

  const changeHandler = async (e, setField, field) => {
    if (e.target.name === "occurrence") {
      setField({ ...field, [e.target.name]: e.target.value, until: "" });
    } else if (e.target.name === "until") {
      setField({
        ...field,
        [e.target.name]: e.target.value,
        occurrence: "",
      });
    } else {
      setField({ ...field, [e.target.name]: e.target.value });
    }
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  // const checkBoxHandler = (e, day, key, field, setField) => {
  const checkBoxHandler = (e, days, count, key, field, setField) => {
    const obj = {
      [count]: days,
    };
    if (e.target.checked === true) {
      // const daysList = [...field[key], day];
      const daysList = [...field[key], days];
      const forDate = Object.assign(day, obj);
      setField(daysList, key);
      setDay(forDate);
    } else {
      _.remove(field[key], function (del) {
        return del === days;
      });
      delete day[count];
    }
  };

  const createClass = (payload) => {
    payload.start_time = convertToIST(payload.start_time);
    payload.end_time = convertToIST(payload.end_time);
    setLoading(true);
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
      () => {
        toast.success("You successfully created a class.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(false);
        window.location.reload(1);
      },
      (error) => {
        toast.error(
          `Something went wrong with error status: ${error.response.status} ${error.response.data.message}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        setLoading(false);
      }
    );
  };

  const onFormSubmit = (event) => {
    event && event.preventDefault();
    const formData = new FormData(event.target);

    let formFields = {
      category_id: 3,
    };

    for (let [fieldName, value] of formData.entries()) {
      if (value) {
        const weekDday = Object.values(day);
        if (fieldName === "start_time") {
          if (classType === "batch") {
            let incrementedDate = new Date(value);
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
                    setMatchDat(false);
                    break;
                  } else {
                    setMatchDat(true);
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
              formFields[fieldName] = moment.utc(newDate).format("YYYY-MM-DD");
            } else {
              formFields[fieldName] = value;
            }
          } else {
            formFields[fieldName] = value;
          }
        } else if (fieldName === "max_enrolment") {
          formFields[fieldName] = Number(value);
          if (value == 0) {
            delete formFields.max_enrolment;
          }
        } else if (fieldName === "type") {
          if (value === "batch") {
            formFields = { ...formFields, type: "batch", frequency: "WEEKLY" };
          } else {
            formFields[fieldName] = value;
          }
        } else if (fieldName === "on_days") {
          formFields[fieldName] = value.split(",");
        }
        // if (fieldName === "pathway_id") {
        //   // formFields[fieldName] = parseInt(value);
        //   console.log("removing pathway_id from payload");
        //   continue;
        // }
        else {
          formFields[fieldName] = value;
        }
      }
    }
    handleTimeValidationAndCreateClass(formFields);
  };

  return (
    <div className="ng-create-class">
      <h2 className="title">
        {isEditMode
          ? `Update ${
              initialFormState[TYPE] == "batch" ? "batch" : "doubt"
            } class`
          : "Create a Batch"}
      </h2>
      <Form
        className="form"
        onSubmit={onFormSubmit}
        initialFieldsState={initialFormState}
      >
        {({ formFieldsState, setFormField, setFormFieldsState }) => {
          // const checkEquivalence = _.isEqual(initialFormState, formFieldsState);
          let checkEquivalence = true;
          let disable =
            formFieldsState[TYPE] &&
            formFieldsState[PATHWAY_ID] &&
            formFieldsState[TITLE] &&
            formFieldsState[DESCRIPTION] &&
            formFieldsState[DESCRIPTION].length < 555;

          if (formFieldsState[TYPE] === "batch") {
            if (
              disable &&
              formFieldsState[ON_DAYS] &&
              (formFieldsState[UNTIL] || formFieldsState[OCCURRENCE])
            ) {
              checkEquivalence = false;
            }
          } else {
            if (disable) {
              checkEquivalence = false;
            }
          }

          return (
            <>
              <label htmlFor="type">Class Type</label>
              <span>
                <label htmlFor="type1" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={TYPE}
                    onChange={(e) => {
                      setClassType("batch");
                      setFormField("batch", TYPE);
                    }}
                    value={formFieldsState[TYPE]}
                    id="type1"
                    checked={
                      formFieldsState.type === "batch" ? "checked" : false
                    }
                    disabled={
                      isEditMode
                        ? formFieldsState[TYPE] === "batch"
                          ? false
                          : true
                        : false
                    }
                  />
                  Batch
                </label>
                <label htmlFor="type2" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={TYPE}
                    onChange={(e) => {
                      setClassType("doubt_class");
                      setFormField("doubt_class", TYPE);
                    }}
                    value={formFieldsState[TYPE]}
                    id="type2"
                    checked={
                      formFieldsState.type === "doubt_class" ? "checked" : false
                    }
                    disabled={
                      isEditMode
                        ? formFieldsState[TYPE] === "doubt_class"
                          ? false
                          : true
                        : false
                    }
                  />
                  Doubt Class
                </label>
              </span>

              <label htmlFor="pathway">Pathway</label>
              <div
                className={
                  formFieldsState[PATHWAY_ID] && "radio-field-with-validation"
                }
              >
                <span>
                  {pathways.map((item, index) => {
                    if (item.code == "PRGPYT" || item.code == "SPKENG") {
                      return (
                        <label
                          htmlFor={`pathway-${index}`}
                          className="radio-pointer"
                        >
                          <input
                            type="radio"
                            className="radio-field"
                            key={item.id}
                            name={PATHWAY_ID}
                            value={item.id}
                            onChange={(e) => {
                              setPathwayCode(item.code);
                              setPathwayId(e.target.value);
                              setFormField(item.id, PATHWAY_ID);
                            }}
                            checked={
                              pathwayId === `${item.id}` ? "checked" : false
                            }
                            id={`pathway-${index}`}
                          />
                          {item.name}
                        </label>
                      );
                    }
                  })}
                </span>
              </div>
              {!formFieldsState[PATHWAY_ID] && (
                <span className="field-validation">
                  Please choose a pathway
                </span>
              )}
              {formFieldsState[TYPE] === "doubt_class" &&
                pathways.map((pathway) => {
                  if (pathwayId == pathway.id) {
                    return (
                      <React.Fragment key={pathway.id}>
                        <label htmlFor="course_id" className="label-field">
                          Select Course
                        </label>
                        <select
                          className="input-field"
                          required={isEditMode ? false : true}
                          aria-required
                          name={COURSE_ID}
                          value={formFieldsState[COURSE_ID]}
                          onChange={(e) => {
                            onCourseChange(e.target.value);
                            setFormField(e.target.value, COURSE_ID);
                          }}
                          id="course_id"
                        >
                          <option value="">Select a course</option>
                          {pathway.courses.map((course) => {
                            return (
                              <option key={course.id} value={course.id}>
                                {course.name}
                              </option>
                            );
                          })}
                        </select>
                      </React.Fragment>
                    );
                  }
                })}
              {formFieldsState[TYPE] === "doubt_class" &&
                pathwayId &&
                formFieldsState[COURSE_ID] == "" && (
                  <span className="field-validation">Select a course</span>
                )}
              {formFieldsState[COURSE_ID] && exercisesForSelectedCourse && (
                <>
                  <label htmlFor="exercise_id" className="label-field">
                    Select Exercise
                    <span className="optional-field">(optional)</span>
                  </label>
                  <select
                    className="input-field"
                    name={EXERCISE_ID}
                    value={formFieldsState[EXERCISE_ID]}
                    onChange={(e) => {
                      setFormField(e.target.value, EXERCISE_ID);
                    }}
                    id="exercise_id"
                  >
                    <option value="">Select an exercise</option>
                    {(
                      exercisesForSelectedCourse[formFieldsState[COURSE_ID]] ||
                      []
                    ).map((exercise) => {
                      return (
                        <option key={exercise.id} value={exercise.id}>
                          {exercise.name}
                        </option>
                      );
                    })}
                  </select>
                </>
              )}
              <label htmlFor="title" className="label-field">
                Title
              </label>
              <input
                className="input-field"
                type="text"
                name={TITLE}
                onChange={(e) =>
                  changeHandler(e, setFormFieldsState, formFieldsState)
                }
                value={formFieldsState[TITLE]}
                id="title"
                required
                aria-required
              />
              {!formFieldsState[TITLE] && (
                <span className="field-validation">Title cannot be empty</span>
              )}

              {/* {formFieldsState[PATHWAY_ID] !== 1 && (
                <> */}
              <label htmlFor="description" className="label-field">
                Description
              </label>
              <textarea
                name={DESCRIPTION}
                rows="10"
                id="description"
                onChange={(e) =>
                  changeHandler(e, setFormFieldsState, formFieldsState)
                }
                value={formFieldsState[DESCRIPTION]}
                className={
                  !formFieldsState[DESCRIPTION] ||
                  formFieldsState[DESCRIPTION].length > 555
                    ? "textarea-field"
                    : "textarea-field-without-validation"
                }
                disabled={isEditMode && true}
                required
                aria-required
              />
              {!formFieldsState[DESCRIPTION] ? (
                <span className="field-validation">
                  Description cannot be empty
                </span>
              ) : (
                formFieldsState[DESCRIPTION].length > 555 && (
                  <span className="field-validation">
                    Description cannot be more than 555 character
                  </span>
                )
              )}
              {/* </>
              )} */}

              {canSpecifyFacilitator && (
                <>
                  <label htmlFor="facilitator_name" className="label-field">
                    Facilitator Name
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    name={FACILITATOR_NAME}
                    value={formFieldsState[FACILITATOR_NAME]}
                    onChange={(e) =>
                      changeHandler(e, setFormFieldsState, formFieldsState)
                    }
                    id="facilitator_name"
                    disabled={isEditMode ? true : false}
                  />
                  <label htmlFor="facilitator_email" className="label-field">
                    Facilitator Email
                  </label>
                  <input
                    className="input-field"
                    type="email"
                    value={formFieldsState[FACILITATOR_EMAIL]}
                    onChange={(e) =>
                      changeHandler(e, setFormFieldsState, formFieldsState)
                    }
                    name={FACILITATOR_EMAIL}
                    id="facilitator_email"
                    disabled={isEditMode ? true : false}
                  />
                </>
              )}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={partnerData && partnerData}
                isOptionEqualToValue={(option, value) => {
                  return option.id === value.id;
                }}
                onChange={(e, newVal) => {
                  setSelected_partner_id(newVal.id);
                }}
                name={PARTNER_ID}
                sx={{ width: 300, mb: "30px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Partner Name"
                    variant="standard"
                  />
                )}
              />
              <label htmlFor="start_time" className="label-field">
                Date
              </label>
              <input
                className="input-field input-field--short"
                type="date"
                name={START_TIME}
                value={formFieldsState[START_TIME]}
                onChange={(e) => {
                  changeHandler(e, setFormFieldsState, formFieldsState);
                }}
                id="start_time"
                required
                aria-required
              />
              <span className="class_main_time">
                <div className="class_time">
                  <label htmlFor="class_start_time" className="label-field">
                    Start Time
                  </label>
                  <input
                    className="input-field input-field--short"
                    type="time"
                    name={CLASS_START_TIME}
                    onChange={(e) => {
                      changeHandler(e, setFormFieldsState, formFieldsState);
                    }}
                    value={formFieldsState[CLASS_START_TIME]}
                    id="class_start_time"
                    required
                    aria-required
                  />
                </div>
                <div className="class_time">
                  <label htmlFor="class_end_time" className="label-field">
                    End Time
                  </label>
                  <input
                    className="input-field input-field--short"
                    type="time"
                    name={CLASS_END_TIME}
                    onChange={(e) =>
                      changeHandler(e, setFormFieldsState, formFieldsState)
                    }
                    value={formFieldsState[CLASS_END_TIME]}
                    id="class_end_time"
                    required
                    aria-required
                  />
                </div>
              </span>
              <label htmlFor="lang" className="label-field">
                Select Language
              </label>
              <span>
                <label htmlFor="lang-en" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={LANG}
                    onChange={(e) => {
                      setFormField("en", LANG);
                    }}
                    value={formFieldsState[LANG]}
                    id="lang-en"
                    checked={formFieldsState.lang === "en" ? "checked" : false}
                  />
                  English
                </label>
                <label htmlFor="lang-hi" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={LANG}
                    onChange={(e) => {
                      setFormField("hi", LANG);
                    }}
                    value={formFieldsState[LANG]}
                    id="lang-hi"
                    checked={formFieldsState.lang === "hi" ? "checked" : false}
                  />
                  Hindi
                </label>
                <label htmlFor="lang-te" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={LANG}
                    onChange={(e) => {
                      setFormField("te", LANG);
                    }}
                    value={formFieldsState[LANG]}
                    id="lang-te"
                    checked={formFieldsState.lang === "te" ? "checked" : false}
                  />
                  Telugu
                </label>
                <label htmlFor="lang-ta" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={LANG}
                    onChange={(e) => {
                      setFormField("ta", LANG);
                    }}
                    value={formFieldsState[LANG]}
                    id="lang-ta"
                    checked={formFieldsState.lang === "ta" ? "checked" : false}
                  />
                  Tamil
                </label>
              </span>

              <label htmlFor={MAX_ENROLMENT} className="label-field">
                Maximum Enrollments
              </label>
              <span>
                <label htmlFor="enrole-0" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={MAX_ENROLMENT}
                    onChange={(e) => {
                      setFormField("0", MAX_ENROLMENT);
                    }}
                    value={formFieldsState[MAX_ENROLMENT]}
                    id="enrole-0"
                    checked={
                      formFieldsState.max_enrolment == "0" ? "checked" : false
                    }
                  />
                  No limit
                </label>
                <label htmlFor="enrole-5" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={MAX_ENROLMENT}
                    onChange={(e) => {
                      setFormField("5", MAX_ENROLMENT);
                    }}
                    value={formFieldsState[MAX_ENROLMENT]}
                    id="enrole-5"
                    checked={
                      formFieldsState.max_enrolment == "5" ? "checked" : false
                    }
                  />
                  5
                </label>
                <label htmlFor="enrole-10" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={MAX_ENROLMENT}
                    onChange={(e) => {
                      setFormField("10", MAX_ENROLMENT);
                    }}
                    value={formFieldsState[MAX_ENROLMENT]}
                    id="enrole-10"
                    checked={
                      formFieldsState.max_enrolment == "10" ? "checked" : false
                    }
                  />
                  10
                </label>
                <label htmlFor="enrole-15" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={MAX_ENROLMENT}
                    onChange={(e) => {
                      setFormField("15", MAX_ENROLMENT);
                    }}
                    value={formFieldsState[MAX_ENROLMENT]}
                    id="enrole-15"
                    checked={
                      formFieldsState.max_enrolment == "15" ? "checked" : false
                    }
                  />
                  15
                </label>
                <label htmlFor="enrole-20" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={MAX_ENROLMENT}
                    onChange={(e) => {
                      setFormField("20", MAX_ENROLMENT);
                    }}
                    value={formFieldsState[MAX_ENROLMENT]}
                    id="enrole-20"
                    checked={
                      formFieldsState.max_enrolment == "20" ? "checked" : false
                    }
                  />
                  20
                </label>
                <label htmlFor="enrole-25" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={MAX_ENROLMENT}
                    onChange={(e) => {
                      setFormField("25", MAX_ENROLMENT);
                    }}
                    value={formFieldsState[MAX_ENROLMENT]}
                    id="enrole-25"
                    checked={
                      formFieldsState.max_enrolment == "25" ? "checked" : false
                    }
                  />
                  25
                </label>
                <label htmlFor="enrole-30" className="radio-pointer">
                  <input
                    type="radio"
                    className="radio-field"
                    name={MAX_ENROLMENT}
                    onChange={(e) => {
                      setFormField("30", MAX_ENROLMENT);
                    }}
                    value={formFieldsState[MAX_ENROLMENT]}
                    id="enrole-30"
                    checked={
                      formFieldsState.max_enrolment == "30" ? "checked" : false
                    }
                  />
                  30
                </label>
              </span>
              {formFieldsState[TYPE] === "batch" && (
                <>
                  <label htmlFor="on_days" className="label-field">
                    On days
                  </label>
                  <span>
                    <label htmlFor="on_days_mo" className="checkbox">
                      <input
                        type="checkbox"
                        className="checkbox-field"
                        name={ON_DAYS}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "MO",
                            1,
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        onChange={() => handleOnChange(0)}
                        value={formFieldsState[ON_DAYS]}
                        id="on_days_mo"
                        disabled={isEditMode && !indicator ? true : false}
                        checked={
                          formFieldsState[ON_DAYS].indexOf("MO") > -1
                            ? "checked"
                            : false
                        }
                      />
                      MO
                    </label>
                    <label htmlFor="on_days_tu" className="checkbox">
                      <input
                        type="checkbox"
                        className="checkbox-field"
                        name={ON_DAYS}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "TU",
                            2,
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        onChange={() => handleOnChange(1)}
                        value={[...formFieldsState[ON_DAYS]]}
                        id="on_days_tu"
                        disabled={isEditMode && !indicator ? true : false}
                        checked={
                          formFieldsState[ON_DAYS].indexOf("TU") > -1
                            ? "checked"
                            : false
                        }
                      />
                      TU
                    </label>
                    <label htmlFor="on_days_we" className="checkbox">
                      <input
                        type="checkbox"
                        className="checkbox-field"
                        name={ON_DAYS}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "WE",
                            3,
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        onChange={() => handleOnChange(2)}
                        value={[...formFieldsState[ON_DAYS]]}
                        id="on_days_we"
                        disabled={isEditMode && !indicator ? true : false}
                        checked={
                          formFieldsState[ON_DAYS].indexOf("WE") > -1
                            ? "checked"
                            : false
                        }
                      />
                      WE
                    </label>
                    <label htmlFor="on_days_th" className="checkbox">
                      <input
                        type="checkbox"
                        className="checkbox-field"
                        name={ON_DAYS}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "TH",
                            4,
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        onChange={() => handleOnChange(3)}
                        value={formFieldsState[ON_DAYS]}
                        id="on_days_th"
                        disabled={isEditMode && !indicator ? true : false}
                        checked={
                          formFieldsState[ON_DAYS].indexOf("TH") > -1
                            ? "checked"
                            : false
                        }
                      />
                      TH
                    </label>
                    <label htmlFor="on_days_fr" className="checkbox">
                      <input
                        type="checkbox"
                        className="checkbox-field"
                        name={ON_DAYS}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "FR",
                            5,
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        onChange={() => handleOnChange(4)}
                        value={formFieldsState[ON_DAYS]}
                        id="on_days_fr"
                        disabled={isEditMode && !indicator ? true : false}
                        checked={
                          formFieldsState[ON_DAYS].indexOf("FR") > -1
                            ? "checked"
                            : false
                        }
                      />
                      FR
                    </label>
                    <label htmlFor="on_days_sa" className="checkbox">
                      <input
                        type="checkbox"
                        className="checkbox-field"
                        name={ON_DAYS}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "SA",
                            6,
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        onChange={() => handleOnChange(5)}
                        value={formFieldsState[ON_DAYS]}
                        id="on_days_sa"
                        disabled={isEditMode && !indicator ? true : false}
                        checked={
                          formFieldsState[ON_DAYS].indexOf("SA") > -1
                            ? "checked"
                            : false
                        }
                      />
                      SA
                    </label>
                    <label htmlFor="on_days_su" className="checkbox">
                      <input
                        type="checkbox"
                        className="checkbox-field"
                        name={ON_DAYS}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "SU",
                            7,
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        onChange={() => handleOnChange(6)}
                        value={formFieldsState[ON_DAYS]}
                        id="on_days_su"
                        disabled={isEditMode && !indicator ? true : false}
                        checked={
                          formFieldsState[ON_DAYS].indexOf("SU") > -1
                            ? "checked"
                            : false
                        }
                      />
                      SU
                    </label>
                  </span>
                  {formFieldsState[ON_DAYS].length == 0 && (
                    <span className="field-validation">Select days</span>
                  )}
                  {matchDay && (
                    <span className="field-validation">
                      Days does not match to selected date
                    </span>
                  )}
                  {/* <label htmlFor={UNTIL} className="label-field">
                    Until
                    <span className="optional-field">
                      (either until or occurrence is required)
                    </span>
                  </label>
                  <input
                    className="input-field input-field--short"
                    type="date"
                    data-date-format="YYYY MM DD"
                    name={UNTIL}
                    id={UNTIL}
                    onChange={(e) =>
                      changeHandler(e, setFormFieldsState, formFieldsState)
                    }
                    value={formFieldsState[UNTIL]}
                    placeholder="Until when recurring classes"
                    disabled={isEditMode && !indicator ? true : false}
                    required={
                      formFieldsState[TYPE] === "batch" &&
                      formFieldsState[OCCURRENCE] === ""
                        ? true
                        : false
                    }
                  />
                  {!formFieldsState[UNTIL] && !formFieldsState[OCCURRENCE] && (
                    <span className="field-validation">Select date</span>
                  )} */}
                  <label htmlFor={OCCURRENCE} className="label-field">
                    Occurrence
                    <span className="optional-field">
                      (either occurrence or until is required)
                    </span>
                  </label>
                  <input
                    className="input-field"
                    type="number"
                    name={OCCURRENCE}
                    id={OCCURRENCE}
                    onChange={(e) =>
                      changeHandler(e, setFormFieldsState, formFieldsState)
                    }
                    disabled={true}
                    value={formFieldsState[OCCURRENCE]}
                    placeholder="How many recurring classes"
                    // disabled={isEditMode && !indicator ? true : false}
                    required={
                      formFieldsState[TYPE] === "batch" &&
                      formFieldsState[UNTIL] === ""
                        ? true
                        : false
                    }
                    max={48}
                  />
                </>
              )}
              {loading ? (
                <div>
                  <Loader />
                </div>
              ) : (
                <button
                  type="submit"
                  className={checkEquivalence ? "submit disabled" : "submit"}
                  disabled={checkEquivalence}
                >
                  {isEditMode ? `UPDATE CLASS` : "Create Class"}
                </button>
              )}
            </>
          );
        }}
      </Form>
    </div>
  );
}
export default Class;
