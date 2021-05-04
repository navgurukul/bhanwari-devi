import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

import { TIME_CONSTANT } from "./constant";
import { actions } from "./redux/action";
import Loader from "../common/Loader";
import { METHODS } from "../../services/api";

import "./styles.scss";

function Class() {
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const [classDate, onClassDateChange] = useState(
    moment().format("YYYY-MM-DD")
  );
  const { loading } = useSelector(({ Class }) => Class);
  const rolesList = user.data.user.rolesList;

  const canSpecifyFacilitator =
    rolesList.indexOf("classAdmin") > -1 ||
    rolesList.indexOf("dumbeldore") > -1;

  const [allCourse, setAllCourse] = useState([]);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/apiDocs/pathways/courses`,
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
    else {
      delete payload[TIME_CONSTANT.CLASS_END_TIME];
      delete payload[TIME_CONSTANT.CLASS_START_TIME];
      payload[TIME_CONSTANT.CLASS_START_DATE] = `${moment(
        classStartTime
      ).format("YYYY-MM-DDTHH:mm:ss")}Z`;
      payload[TIME_CONSTANT.CLASS_END_DATE] = `${moment(classEndTime).format(
        "YYYY-MM-DDTHH:mm:ss"
      )}Z`;
      dispatch(actions.createClass(payload));
    }
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
  // disable the past dates
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = `${yyyy}-${mm}-${dd}`;

  return (
    <div className="ng-create-class">
      <h2 className="title">Create A Class </h2>
      <form className="form" onSubmit={onFormSubmit}>
        <label htmlFor="title">Title</label>
        <input
          className="input-field"
          type="text"
          name="title"
          id="title"
          required
          aria-required
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          rows="10"
          id="description"
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
              name="facilitator_name"
              id="facilitator_name"
              required
              aria-required
            />
            <label htmlFor="facilitator_email">Facilitator Email</label>
            <input
              className="input-field"
              type="email"
              name="facilitator_email"
              id="facilitator_email"
              pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
              required
              aria-required
            />
          </>
        )}
        <label htmlFor="start_time">Date</label>
        <input
          className="input-field input-field--short"
          type="date"
          name="start_time"
          value={classDate}
          onChange={(e) => {
            onClassDateChange(e.target.value);
          }}
          id="start_time"
          min={today}
          required
          aria-required
        />
        <label htmlFor="class_start_time">Start Time</label>
        <input
          className="input-field input-field--short"
          type="time"
          name="class_start_time"
          id="class_start_time"
          required
          aria-required
        />
        <label htmlFor="class_end_time">End Time</label>
        <input
          className="input-field input-field--short"
          type="time"
          name="class_end_time"
          id="class_end_time"
          required
          aria-required
        />
        <label htmlFor="lang">Select Language</label>
        <select
          className="create-class-select"
          name="lang"
          id="name"
          required
          aria-required
        >
          <option value="en">English</option>
          <option value="hi" selected>
            Hindi
          </option>
          <option value="te">Telugu</option>
          <option value="ta">Tamil</option>
        </select>
        <label htmlFor="type">Select Class Type</label>
        <select
          className="create-class-select"
          name="type"
          id="type"
          required
          aria-required
        >
          <option value="workshop">Workshop</option>
          <option value="doubt_class" selected>
            Doubt Class
          </option>
        </select>
        <label htmlFor="course_id">Select Course</label>
        <select className="create-class-select" name="course_id" id="course_id">
          <option value="" disabled selected>
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
          {loading ? <Loader /> : "CREATE CLASS"}
        </button>
      </form>
    </div>
  );
}
export default Class;
