import React, { useEffect, useState, useRef } from "react";
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
} = CLASS_FIELDS;

function Class({ classToEdit, toggleModalOpen }) {
  const isEditMode = !_.isEmpty(classToEdit);
  const [loading, setLoading] = useState(false);

  const {
    title,
    description,
    facilitator,
    lang,
    type,
    start_time,
    end_time,
    course_id,
  } = classToEdit;

  const initialFormState = useRef({
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
  });

  const user = useSelector(({ User }) => User);
  const rolesList = user.data.user.rolesList;

  const canSpecifyFacilitator =
    rolesList.indexOf("classAdmin") > -1 ||
    rolesList.indexOf("dumbeldore") > -1;

  const [allCourse, setAllCourse] = useState([]);

  const editClass = (payload) => {
    return axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/apiDocs/classes/${classToEdit.id}`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
      data: payload,
    }).then(() => {
      toast.success("Updated class details!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 500,
      });
    });
  };

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/courses`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setAllCourse(res.data.courses);
    });
  }, []);

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

    if (!isEditMode) {
      createClass(payload);
    } else {
      editClass(payload);
    }
    toggleModalOpen();
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

    for (let [fieldName, value] of formData.entries()) {
      if (value) formFields[fieldName] = value;
    }

    handleTimeValidationAndCreateClass(formFields);
  };

  return (
    <div className="ng-create-class">
      <h2 className="title">
        {isEditMode ? "Update class" : "Create a class"}
      </h2>
      <Form
        className="form"
        onSubmit={onFormSubmit}
        initialFieldsState={initialFormState.current}
      >
        {({ formFieldsState, setFormField }) => {
          return (
            <>
              <label htmlFor="title">Title</label>
              <input
                className="input-field"
                type="text"
                name={TITLE}
                onChange={(e) => {
                  setFormField(e.target.value, TITLE);
                }}
                value={formFieldsState[TITLE]}
                id="title"
                required
                aria-required
              />
              <label htmlFor="description">Description</label>
              <textarea
                name={DESCRIPTION}
                rows="10"
                id="description"
                onChange={(e) => {
                  setFormField(e.target.value, DESCRIPTION);
                }}
                value={formFieldsState[DESCRIPTION]}
                className="textarea-field"
                required
                aria-required
              />
              {canSpecifyFacilitator && (
                <>
                  <label htmlFor="facilitator_name">Facilitator Name</label>
                  <input
                    className="input-field"
                    type="text"
                    name={FACILITATOR_NAME}
                    value={formFieldsState[FACILITATOR_NAME]}
                    onChange={(e) => {
                      setFormField(e.target.value, FACILITATOR_NAME);
                    }}
                    id="facilitator_name"
                  />
                  <label htmlFor="facilitator_email">Facilitator Email</label>
                  <input
                    className="input-field"
                    type="email"
                    value={formFieldsState[FACILITATOR_EMAIL]}
                    onChange={(e) => {
                      setFormField(e.target.value, FACILITATOR_EMAIL);
                    }}
                    name={FACILITATOR_EMAIL}
                    id="facilitator_email"
                  />
                </>
              )}
              <label htmlFor="start_time">Date</label>
              <input
                className="input-field input-field--short"
                type="date"
                name={START_TIME}
                value={formFieldsState[START_TIME]}
                onChange={(e) => {
                  setFormField(e.target.value, START_TIME);
                }}
                id="start_time"
                required
                aria-required
              />
              <label htmlFor="class_start_time">Start Time</label>
              <input
                className="input-field input-field--short"
                type="time"
                name={CLASS_START_TIME}
                onChange={(e) => {
                  setFormField(e.target.value, CLASS_START_TIME);
                }}
                value={formFieldsState[CLASS_START_TIME]}
                id="class_start_time"
                required
                aria-required
              />
              <label htmlFor="class_end_time">End Time</label>
              <input
                className="input-field input-field--short"
                type="time"
                name={CLASS_END_TIME}
                onChange={(e) => {
                  setFormField(e.target.value, CLASS_END_TIME);
                }}
                value={formFieldsState[CLASS_END_TIME]}
                id="class_end_time"
                required
                aria-required
              />
              <label htmlFor="lang">Select Language</label>
              <select
                className="create-class-select"
                name={LANG}
                value={formFieldsState[LANG]}
                onChange={(e) => {
                  setFormField(e.target.value, LANG);
                }}
                id="lang"
                required
                aria-required
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="te">Telugu</option>
                <option value="ta">Tamil</option>
              </select>
              <label htmlFor="type">Select Class Type</label>
              <select
                className="create-class-select"
                name={TYPE}
                value={formFieldsState[TYPE]}
                onChange={(e) => {
                  setFormField(e.target.value, TYPE);
                }}
                id="type"
                required
                aria-required
              >
                <option value="workshop">Workshop</option>
                <option value="doubt_class">Doubt Class</option>
              </select>
              <label htmlFor="course_id">Select Course</label>
              <select
                className="create-class-select"
                name={COURSE_ID}
                value={formFieldsState[COURSE_ID]}
                onChange={(e) => {
                  setFormField(e.target.value, COURSE_ID);
                }}
                id="course_id"
              >
                <option value="" disabled>
                  Select a course from options below
                </option>
                {allCourse.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <button type="submit" className="submit" disabled={loading}>
                {loading ? (
                  <Loader />
                ) : isEditMode ? (
                  "UPDATE CLASS"
                ) : (
                  "CREATE CLASS"
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
