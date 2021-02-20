import React, { useState } from "react";
import moment from "moment";
import axios from "axios";

import "./styles.scss";

function ClassCard(props) {
  const { item, index } = props;
  const Id = item.id;

  const [addClass, setAddClass] = useState({
    user_id: "",
    class_id: "",
    registered_at: new Date(),
  });

  const handleSubmit = () => {
    axios
      .post(
        `http://dev-api.navgurukul.org/apiDocs/classes/${Id}/register`,
        addClass,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "token",
          },
        }
      )
      .then((response) => {
        setAddClass(response.data);
        // console.log(response);
      });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const classStartTime = item.start_time && item.start_time.replace("Z", "");
  const classEndTime = item.end_time && item.end_time.replace("Z", "");

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
    doubt_class: "Doubt Class",
    workshop: "Workshop",
  };

  return (
    <div>
      <div key={index} className="class-card">
        <div className="card-content">
          <div className="card-heading">
            <div className="title">{item.title}</div>
            <div className="class-type">{languageMap[item.type]}</div>
          </div>
          <div className="class-detail">
            <p>Facilitator Name : {item.facilitator.name} </p>
            <p>id:{item.id}</p>
            <p>Language:{languageMap[item.lang]} </p>
            <p>Date : {moment(classStartTime).format("DD-MM-YYYY")} </p>
            <p>
              {" "}
              Time :{moment(classStartTime).format("hh:mm a")}-{" "}
              {moment(classEndTime).format("hh:mm a")}
            </p>
          </div>
        </div>
        <div className="feature-card-footer">
          <button
            type="submit"
            className="button button3"
            onClick={handleSubmit}
          >
            {" "}
            Enroll To Class
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
