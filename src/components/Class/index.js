import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";

import InputField from "../common/FormComponent/InputField";
import { TIME_CONSTANT, CLASS_FORM_FIELDS } from "./constant";
import { actions } from "./redux/action";
import Loader from "../common/Loader";

import "./styles.scss";

const SelectOptions = () => {
  const user = useSelector(({ User }) => User);
  const [allCourse, setAllCourse] = useState([]);

  useEffect(() => {
    axios
      .get("http://dev-api.navgurukul.org/apiDocs/courses", {
        headers: { Authorization: user.data.token },
      })
      .then((res) => {
        setAllCourse(res.data.allCourses);
      });
  }, []);

  return (
    <div>
      {/* Select box data items. HTML 5 way to render select box */}
      <datalist id="language">
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="Telugu">Telugu</option>
        <option value="Tamil">Tamil</option>
      </datalist>
      <datalist id="type">
        <option value="workshop">Workshop</option>
        <option value="Doubt Class">Doubt Class</option>
      </datalist>
      <datalist id="category">
        <option value="3">Programming</option>
      </datalist>
      <datalist id="Course">
        {allCourse.map((item, index) => {
          return <option key={index} data-value={item.id} value={item.name} />;
        })}
      </datalist>
    </div>
  );
};

function Class() {
  const dispatch = useDispatch();
  const { loading } = useSelector(({ Class }) => Class);
  const handleTimeValicationAndCreateClass = (payload) => {
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
    if (classStartTime.valueOf() > classEndTime.valueOf()) {
      alert("Class end time must be later than class start time.");
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
    dispatch(actions.createClass(payload));
  };

  const onFormSubmit = (event) => {
    event && event.preventDefault();
    const formData = new FormData(event.target);
    const formFields = {};

    const languageMap = {
      Hindi: "hi",
      Telugu: "te",
      English: "en",
      Tamil: "ta",
      "Doubt Class": "doubt_class",
    };

    for (let [fieldName, value] of formData.entries()) {
      // Only going to take the field in payload if the
      // input field is not empty.

      // tbd: hack to fix bug, replace appropriate datalist with select later
      if (fieldName === "course_id" && value) {
        let courseElement = document.getElementById("Course");
        let selectedOptionElement = courseElement.querySelector(
          'option[value="' + value + '"]'
        );
        if (selectedOptionElement) {
          value = selectedOptionElement.dataset.value;
        }
      }
      if (value) {
        if (languageMap[value]) {
          formFields[fieldName] = languageMap[value];
        } else {
          formFields[fieldName] = value;
        }
      }
    }

    handleTimeValicationAndCreateClass(formFields);
  };

  return (
    <div className="ng-create-class">
      <h2 className="title"> Create A Class </h2>
      <form className="form" onSubmit={onFormSubmit}>
        {CLASS_FORM_FIELDS.map((field, index) => (
          <InputField {...field} key={index} />
        ))}
        <button type="submit" className="submit" disabled={loading}>
          {loading ? <Loader /> : "CREATE CLASS"}
        </button>
      </form>
      <SelectOptions />
    </div>
  );
}
export default Class;
