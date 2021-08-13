import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
import { toast } from "react-toastify";
import axios from "axios";

import { TIME_CONSTANT, CLASS_FIELDS } from "./constant";
import Loader from "../common/Loader";
import Form from "../common/form";
import { METHODS } from "../../services/api";
import "./styles.scss";

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
  COURSE_ID,
  EXERCISE_ID,
  MAX_ENROLMENT,
  FREQUENCY,
  ON_DAYS,
  OCCURRENCE,
  UNTIL,
} = CLASS_FIELDS;

function Class({ classToEdit, formFieldsState }) {
  const isEditMode = !_.isEmpty(classToEdit);
  const [loading, setLoading] = useState(false);
  const [classType, setClassType] = useState();
  const [pathwayId, setPathwayId] = useState();

  console.log("formFieldsState upr", formFieldsState);
  const {
    title,
    description,
    facilitator,
    lang,
    type,
    start_time,
    end_time,
    course_id,
    exercise_id,
    max_enrolment,
    frequency,
    on_days,
    occurrence,
    until,
  } = classToEdit;

  const initialFormState = useMemo(() => {
    return {
      [TITLE]: title || "",
      [DESCRIPTION]: description || "",
      [FACILITATOR_NAME]: facilitator ? facilitator.name : "",
      [FACILITATOR_EMAIL]: facilitator ? facilitator.email : "",
      [START_TIME]: start_time
        ? moment.utc(start_time).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
      [CLASS_START_TIME]: start_time
        ? moment.utc(start_time).format("kk:mm")
        : moment().format("kk:mm"),
      [CLASS_END_TIME]: end_time
        ? moment.utc(end_time).format("kk:mm")
        : moment().add(15, "minute").format("kk:mm"),
      [LANG]: lang || "hi",
      [TYPE]: type || "doubt_class",
      [COURSE_ID]: course_id || "",
      [EXERCISE_ID]: exercise_id || "",
      [MAX_ENROLMENT]: max_enrolment || "",
      [FREQUENCY]: frequency || "",
      [ON_DAYS]: on_days || [],
      [OCCURRENCE]: occurrence || "",
      [UNTIL]: until || "",
      // [UNTIL]: until
      //   ? moment.utc(until).format("YYYY-MM-DD")
      //   : moment().format("YYYY-MM-DD"),
    };
  }, [classToEdit]);

  const user = useSelector(({ User }) => User);
  const rolesList = user.data.user.rolesList;

  const canSpecifyFacilitator =
    rolesList.indexOf("classAdmin") > -1 ||
    rolesList.indexOf("dumbeldore") > -1;

  const [pathways, setPathways] = useState([]);
  const [exercisesForSelectedCourse, setExercisesForSelectedCourse] = useState(
    {}
  );

  const editClass = (payload) => {
    setLoading(true);
    return axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/apiDocs/classes/${classToEdit.id}`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
      data: payload,
    }).then(
      () => {
        toast.success("Updated class details!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
        });
        setLoading(false);
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
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setPathways(res.data.pathways);
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
        Authorization: user.data.token,
      },
    }).then((res) => {
      setExercisesForSelectedCourse({
        ...exercisesForSelectedCourse,
        [courseId]: res.data.course.exercises,
      });
    });
  };

  const handleTimeValidationAndCreateClass = (payload) => {
    console.log("payload", payload);
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

    if (!isEditMode) {
      createClass(payload);
    } else {
      editClass(payload);
    }
  };

  const changeHandler = (e, setField, field) => {
    if (e.target.name === "occurrence") {
      console.log(e.target);
      setField({ [until]: "ujd" });
    }
    if (e.target.name === "until") {
      setField({ ...field, [occurrence]: "poo" });
    }
    setField({ ...field, [e.target.name]: e.target.value });
  };

  const checkBoxHandler = (e, day, key, field, setField) => {
    if (e.target.checked === true) {
      const daysList = [...field[key], day];
      setField(daysList, key);
    } else {
      _.remove(field[key], function (del) {
        return del === day;
      });
    }
  };

  const createClass = (payload) => {
    setLoading(true);
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/classes`,
      method: METHODS.POST,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
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
      },
      (error) => {
        // if (OCCURRENCE === "" && UNTIL === "") {
        //   console.log("I love you Poonam");
        //   toast.error(`You must fill either occurrence or untill field`, {
        //     position: toast.POSITION.BOTTOM_RIGHT,
        //   });
        // }
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
    const formFields = {
      category_id: 3,
    };

    console.log("rona aa rha", formFields);

    for (let [fieldName, value] of formData.entries()) {
      if (value) {
        if (fieldName === "max_enrolment") {
          formFields[fieldName] = Number(value);
        } else {
          formFields[fieldName] = value;
        }
      }
    }

    handleTimeValidationAndCreateClass(formFields);
  };

  return (
    <div className="ng-create-class">
      <h2 className="title">
        {isEditMode ? "Update class" : "Create Cohort / Single Class"}
      </h2>
      <Form
        className="form"
        onSubmit={onFormSubmit}
        initialFieldsState={initialFormState}
      >
        {({ formFieldsState, setFormField, setFormFieldsState }) => {
          console.log("formFieldsState", formFieldsState);
          return (
            <>
              <label htmlFor="class_type" className="label-field">
                Class Type
              </label>
              <span>
                <label htmlFor="class_type">
                  <input
                    className="radio-field"
                    type="radio"
                    // name="class_type"
                    onChange={(e) => {
                      setClassType("cohort");
                    }}
                    value={classType}
                    id="class_type"
                  />
                  Cohort
                </label>
                <label htmlFor="class_type">
                  <input
                    className="radio-field"
                    type="radio"
                    // name="class_type"
                    onChange={(e) => {
                      setClassType("workshop");
                    }}
                    value={classType}
                    id="class_type"
                  />
                  Workshop
                </label>
                <label htmlFor="class_type">
                  <input
                    className="radio-field"
                    type="radio"
                    // name="class_type"
                    onChange={(e) => {
                      setClassType("doubt_class");
                    }}
                    value={classType}
                    id="class_type"
                  />
                  Doubt Class
                </label>
              </span>
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
                // onChange={(e) => {
                //   setFormField(e.target.value, TITLE);
                // }}
                value={formFieldsState[TITLE]}
                id="title"
                required
                aria-required
              />
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
                // onChange={(e) => {
                //   setFormField(e.target.value, DESCRIPTION);
                // }}
                value={formFieldsState[DESCRIPTION]}
                className="textarea-field"
                required
                aria-required
              />
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
                    // onChange={(e) => {
                    //   setFormField(e.target.value, FACILITATOR_NAME);
                    // }}
                    id="facilitator_name"
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
                    // onChange={(e) => {
                    //   setFormField(e.target.value, FACILITATOR_EMAIL);
                    // }}
                    name={FACILITATOR_EMAIL}
                    id="facilitator_email"
                  />
                </>
              )}
              <label htmlFor="start_time" className="label-field">
                Date
              </label>
              <input
                className="input-field input-field--short"
                type="date"
                name={START_TIME}
                value={formFieldsState[START_TIME]}
                onChange={(e) =>
                  changeHandler(e, setFormFieldsState, formFieldsState)
                }
                // onChange={(e) => {
                //   setFormField(e.target.value, START_TIME);
                // }}
                id="start_time"
                required
                aria-required
              />
              <label htmlFor="class_start_time" className="label-field">
                Start Time
              </label>
              <input
                className="input-field input-field--short"
                type="time"
                name={CLASS_START_TIME}
                onChange={(e) =>
                  changeHandler(e, setFormFieldsState, formFieldsState)
                }
                // onChange={(e) => {
                //   setFormField(e.target.value, CLASS_START_TIME);
                // }}
                value={formFieldsState[CLASS_START_TIME]}
                id="class_start_time"
                required
                aria-required
              />
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
                // onChange={(e) => {
                //   setFormField(e.target.value, CLASS_END_TIME);
                // }}
                value={formFieldsState[CLASS_END_TIME]}
                id="class_end_time"
                required
                aria-required
              />
              <label htmlFor="type">Select Class Type</label>
              <span>
                <label htmlFor="type">
                  <input
                    type="radio"
                    className="radio-field"
                    name={TYPE}
                    // onChange={(e) =>
                    //   changeHandler(e, setFormFieldsState, formFieldsState)
                    // }
                    onChange={(e) => {
                      setFormField("workshop", TYPE);
                    }}
                    value={formFieldsState[TYPE]}
                    id="type"
                  />
                  Workshop
                </label>
                <label htmlFor="type">
                  <input
                    type="radio"
                    className="radio-field"
                    name={TYPE}
                    // onChange={(e) =>
                    //   changeHandler(e, setFormFieldsState, formFieldsState)
                    // }
                    onChange={(e) => {
                      setFormField("doubt_class", TYPE);
                    }}
                    value={formFieldsState[TYPE]}
                    id="type"
                  />
                  Doubt Class
                </label>
              </span>
              <label htmlFor="lang" className="label">
                Select Language
              </label>
              <span>
                <label htmlFor="lang">
                  <input
                    type="radio"
                    className="radio-field"
                    name={LANG}
                    // onChange={(e) =>
                    //   changeHandler(e, setFormFieldsState, formFieldsState)
                    // }
                    onChange={(e) => {
                      setFormField("en", LANG);
                    }}
                    value={formFieldsState[LANG]}
                    id="lang"
                  />
                  English
                </label>
                <label htmlFor="lang">
                  <input
                    type="radio"
                    className="radio-field"
                    name={LANG}
                    // onChange={(e) =>
                    //   changeHandler(e, setFormFieldsState, formFieldsState)
                    // }
                    onChange={(e) => {
                      setFormField("hi", LANG);
                    }}
                    value={formFieldsState[LANG]}
                    id="lang"
                  />
                  Hindi
                </label>
                <label htmlFor="lang">
                  <input
                    type="radio"
                    className="radio-field"
                    name={LANG}
                    // onChange={(e) =>
                    //   changeHandler(e, setFormFieldsState, formFieldsState)
                    // }
                    onChange={(e) => {
                      setFormField("te", LANG);
                    }}
                    value={formFieldsState[LANG]}
                    id="lang"
                  />
                  Telugu
                </label>
                <label htmlFor="lang">
                  <input
                    type="radio"
                    className="radio-field"
                    name={LANG}
                    // onChange={(e) =>
                    //   changeHandler(e, setFormFieldsState, formFieldsState)
                    // }
                    onChange={(e) => {
                      setFormField("ta", LANG);
                    }}
                    value={formFieldsState[LANG]}
                    id="lang"
                  />
                  Tamil
                </label>
              </span>
              <label htmlFor="pathway" className="label-field">
                Select Pathway
              </label>
              <select
                className="input-field"
                value={pathwayId}
                required
                aria-required
                // onChange={(e) =>
                //   changeHandler(e, setFormFieldsState, formFieldsState)
                // }
                onChange={(e) => {
                  setPathwayId(e.target.value);
                }}
                id="pathway"
              >
                <option value="">Select a pathway from options below</option>
                {pathways.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              {pathwayId &&
                pathways.map((pathway) => {
                  if (pathwayId == pathway.id) {
                    return (
                      <React.Fragment key={pathway.id}>
                        <label htmlFor="course_id" className="label-field">
                          Select Course{" "}
                        </label>
                        <select
                          className="input-field"
                          required
                          aria-required
                          name={COURSE_ID}
                          value={formFieldsState[COURSE_ID]}
                          // onChange={(e) =>
                          //   changeHandler(
                          //     e,
                          //     setFormFieldsState,
                          //     formFieldsState
                          //   )
                          // }
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
                    // onChange={(e) =>
                    //   changeHandler(e, setFormFieldsState, formFieldsState)
                    // }
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
              <label htmlFor={MAX_ENROLMENT} className="label-field">
                Maximum Enrollments
                <span className="optional-field">(optional)</span>
              </label>
              <span className="description-for-enrollments">
                This is specific to Spoken English Classes, to cap the students
                per class between <br />5 - 10 so that you can provide
                individual attention to each student's progress.{" "}
              </span>
              <input
                className="input-field"
                type="number"
                name={MAX_ENROLMENT}
                id={MAX_ENROLMENT}
                onChange={(e) =>
                  changeHandler(e, setFormFieldsState, formFieldsState)
                }
                // onChange={(e) => {
                //   setFormField(e.target.value, MAX_ENROLMENT);
                // }}
                value={formFieldsState[MAX_ENROLMENT]}
                placeholder="Maximum students per class"
              />
              {classType === "cohort" && (
                <>
                  <label htmlFor="frequency" className="label-field">
                    Frequency
                  </label>
                  <spam>
                    <label htmlFor="frequency">
                      <input
                        type="radio"
                        className="radio-field-course"
                        name={FREQUENCY}
                        // onChange={(e) =>
                        //   changeHandler(e, setFormFieldsState, formFieldsState)
                        // }
                        onChange={(e) => {
                          setFormField("DAILY", FREQUENCY);
                        }}
                        value={formFieldsState[FREQUENCY]}
                        id="frequency"
                      />
                      DAILY
                    </label>
                    <label htmlFor="frequency">
                      <input
                        type="radio"
                        className="radio-field-course"
                        name={FREQUENCY}
                        // onChange={(e) =>
                        //   changeHandler(e, setFormFieldsState, formFieldsState)
                        // }
                        onChange={(e) => {
                          setFormField("WEEKLY", FREQUENCY);
                        }}
                        value={formFieldsState[FREQUENCY]}
                        id="frequency"
                      />
                      WEEKLY
                    </label>
                  </spam>
                  <label htmlFor="on_days" className="label-field">
                    On days
                  </label>
                  <spam>
                    <label htmlFor="on_days" for="on_days">
                      <input
                        type="checkbox"
                        className="radio-field-course"
                        name={ON_DAYS}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "MO",
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        value={formFieldsState[ON_DAYS]}
                        id="on_days"
                      />
                      MO
                    </label>
                    <label htmlFor="on_days">
                      <input
                        type="checkbox"
                        className="radio-field-course"
                        name={ON_DAYS}
                        // onChange={(e) => {
                        //   var days = [...formFieldsState[ON_DAYS], "TU"];
                        //   setFormField(days, ON_DAYS);
                        // }}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "TU",
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        value={[...formFieldsState[ON_DAYS]]}
                        id="on_days"
                      />
                      TU
                    </label>
                    <label htmlFor="on_days">
                      <input
                        type="checkbox"
                        className="radio-field-course"
                        name={ON_DAYS}
                        // onChange={(e) => {
                        //   var days = [...formFieldsState[ON_DAYS], "WE"];
                        //   setFormField(days, ON_DAYS);
                        // }}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "WE",
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        value={[...formFieldsState[ON_DAYS]]}
                        id="on_days"
                      />
                      WE
                    </label>
                    <label htmlFor="on_days">
                      <input
                        type="checkbox"
                        className="radio-field-course"
                        name={ON_DAYS}
                        // onChange={(e) => {
                        //   var days = [...formFieldsState[ON_DAYS], "TH"];
                        //   setFormField(days, ON_DAYS);
                        // }}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "TH",
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        value={formFieldsState[ON_DAYS]}
                        id="on_days"
                      />
                      TH
                    </label>
                    <label htmlFor="on_days">
                      <input
                        type="checkbox"
                        className="radio-field-course"
                        name={ON_DAYS}
                        // onChange={(e) => {
                        //   var days = [...formFieldsState[ON_DAYS], "FR"];
                        //   setFormField(days, ON_DAYS);
                        // }}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "FR",
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        value={formFieldsState[ON_DAYS]}
                        id="on_days"
                      />
                      FR
                    </label>
                    <label htmlFor="on_days">
                      <input
                        type="checkbox"
                        className="radio-field-course"
                        name={ON_DAYS}
                        // onChange={(e) => {
                        //   var days = [...formFieldsState[ON_DAYS], "SA"];
                        //   setFormField(days, ON_DAYS);
                        // }}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "SA",
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        value={formFieldsState[ON_DAYS]}
                        id="on_days"
                      />
                      SA
                    </label>
                    <label htmlFor="on_days">
                      <input
                        type="checkbox"
                        className="radio-field-course"
                        name={ON_DAYS}
                        // onChange={(e) => {
                        //   var days = [...formFieldsState[ON_DAYS], "SU"];
                        //   setFormField(days, ON_DAYS);
                        // }}
                        onClick={(e) =>
                          checkBoxHandler(
                            e,
                            "SU",
                            ON_DAYS,
                            formFieldsState,
                            setFormField
                          )
                        }
                        value={formFieldsState[ON_DAYS]}
                        id="on_days"
                      />
                      SU
                    </label>
                  </spam>
                  <label htmlFor={UNTIL} className="label-field">
                    Until
                    <span className="optional-field">(optional)</span>
                  </label>
                  <input
                    className="input-field input-field--short"
                    type="date"
                    data-date-format="YYYY MM DD"
                    name={UNTIL}
                    id={UNTIL}
                    // disabled="disabled"
                    onChange={(e) =>
                      changeHandler(e, setFormFieldsState, formFieldsState)
                    }
                    value={formFieldsState[UNTIL]}
                    placeholder="Until when recurring classes"
                  />
                  <label htmlFor={OCCURRENCE} className="label">
                    Occurrence
                    <span className="optional-field">(optional)</span>
                  </label>
                  <input
                    className="input-field"
                    type="number"
                    name={OCCURRENCE}
                    id={OCCURRENCE}
                    onChange={(e) =>
                      changeHandler(e, setFormFieldsState, formFieldsState)
                    }
                    value={formFieldsState[OCCURRENCE]}
                    placeholder="How many recurring classes"
                  />
                </>
              )}
              <button type="submit" className="submit" disabled={loading}>
                {loading ? (
                  <Loader />
                ) : isEditMode ? (
                  "UPDATE CLASS"
                ) : (
                  "Create Class"
                )}
              </button>
            </>
          );
        }}
      </Form>
    </div>
  );
}
export default Class;
